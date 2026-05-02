import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { transformSync } from 'esbuild';

const source = readFileSync(new URL('../src/i18n/index.ts', import.meta.url), 'utf8')
  .replace("import en from './en.json';", 'const en = {};')
  .replace("import sk from './sk.json';", 'const sk = {};');

const { code } = transformSync(source, {
  format: 'esm',
  loader: 'ts',
});

const moduleUrl = `data:text/javascript;base64,${Buffer.from(code).toString('base64')}`;
const { getAlternateUrl, getLangFromUrl } = await import(moduleUrl);
const nav = readFileSync(new URL('../src/components/Nav.astro', import.meta.url), 'utf8');
const layout = readFileSync(new URL('../src/layouts/Layout.astro', import.meta.url), 'utf8');
const middleware = readFileSync(new URL('../src/middleware.ts', import.meta.url), 'utf8');

test('alternate language links stay on the current origin outside production', () => {
  assert.equal(
    getAlternateUrl('en', '/contact', new URL('http://localhost:4321/contact')),
    'http://localhost:4321/kontakt?lang=sk',
  );
});

test('alternate language links preserve local query params when switching language', () => {
  assert.equal(
    getAlternateUrl('en', '/contact', new URL('http://localhost:4321/contact?service=training')),
    'http://localhost:4321/kontakt?service=training&lang=sk',
  );
});

test('alternate language links keep production domain switching in production', () => {
  assert.equal(
    getAlternateUrl('en', '/contact', new URL('https://matejlukasik.com/contact')),
    'https://matejlukasik.sk/kontakt',
  );
});

test('local language can be selected by query param or cookie', () => {
  assert.equal(getLangFromUrl(new URL('http://localhost:4321/?lang=sk')), 'sk');
  assert.equal(getLangFromUrl(new URL('http://localhost:4321/'), 'sk'), 'sk');
});

test('production language ignores local override params and cookies', () => {
  assert.equal(getLangFromUrl(new URL('https://matejlukasik.com/?lang=sk'), 'sk'), 'en');
  assert.equal(getLangFromUrl(new URL('https://matejlukasik.sk/?lang=en'), 'en'), 'sk');
});

test('nav alternate links receive the current request URL', () => {
  assert.match(nav, /currentUrl\?: URL/);
  assert.match(nav, /getAlternateUrl\(lang, currentPath, currentUrl\)/);
  assert.match(layout, /<Nav lang={lang} currentPath={currentPath} currentUrl={Astro\.url} \/>/);
});

test('localized path redirects are limited to production hosts', () => {
  assert.match(middleware, /isProductionHost\(url\.hostname\)/);
  assert.match(
    middleware,
    /if \(isProductionHost\(url\.hostname\) && expected !== null && expected !== url\.pathname\)/,
  );
});
