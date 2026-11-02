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
const { CONTACT_EMAIL, CONTACT_HREF, getAlternateUrl, getExpectedPath, getLangFromUrl, getLocalizedPaths } = await import(moduleUrl);
const nav = readFileSync(new URL('../src/components/Nav.astro', import.meta.url), 'utf8');
const layout = readFileSync(new URL('../src/layouts/Layout.astro', import.meta.url), 'utf8');
const middleware = readFileSync(new URL('../src/middleware.ts', import.meta.url), 'utf8');

test('alternate language links stay on the current origin outside production', () => {
  assert.equal(
    getAlternateUrl('en', '/cv', new URL('http://localhost:4321/cv')),
    'http://localhost:4321/cv?lang=sk',
  );
});

test('alternate language links preserve local query params when switching language', () => {
  assert.equal(
    getAlternateUrl('en', '/projects', new URL('http://localhost:4321/projects?ref=profile')),
    'http://localhost:4321/projekty?ref=profile&lang=sk',
  );
});

test('alternate language links keep production domain switching in production', () => {
  assert.equal(
    getAlternateUrl('en', '/projects', new URL('https://matejlukasik.com/projects')),
    'https://matejlukasik.sk/projekty',
  );
});

test('email contact is language independent and is not exposed as a website page', () => {
  assert.equal(CONTACT_EMAIL, 'matej@matejlukasik.com');
  assert.equal(CONTACT_HREF, 'mailto:matej@matejlukasik.com');
  for (const lang of ['en', 'sk']) {
    assert.equal('contact' in getLocalizedPaths(lang), false);
  }
});

test('project pages switch between their localized routes', () => {
  assert.equal(
    getAlternateUrl('en', '/projects', new URL('http://localhost:4321/projects')),
    'http://localhost:4321/projekty?lang=sk',
  );
  assert.equal(
    getAlternateUrl('sk', '/projekty', new URL('https://matejlukasik.sk/projekty')),
    'https://matejlukasik.com/projects',
  );
});

test('CV stays on its own route when switching language locally or in production', () => {
  assert.equal(
    getAlternateUrl('en', '/cv', new URL('http://localhost:4321/cv?lang=en')),
    'http://localhost:4321/cv?lang=sk',
  );
  assert.equal(
    getAlternateUrl('sk', '/cv', new URL('https://matejlukasik.sk/cv')),
    'https://matejlukasik.com/cv',
  );
  assert.equal(
    getAlternateUrl('en', '/cv', new URL('https://matejlukasik.com/cv')),
    'https://matejlukasik.sk/cv',
  );

  for (const lang of ['en', 'sk']) {
    assert.equal(getLocalizedPaths(lang).cv, '/cv');
    assert.equal(getExpectedPath(lang, '/cv'), '/cv');
  }
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
