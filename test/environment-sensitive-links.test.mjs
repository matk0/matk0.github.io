import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { transformSync } from 'esbuild';

const read = (path) => readFileSync(new URL(path, import.meta.url), 'utf8');
const source = read('../src/i18n/index.ts').replace("import en from './en.json';", 'const en = {};');
const { code } = transformSync(source, { format: 'esm', loader: 'ts' });
const { CONTACT_EMAIL, CONTACT_HREF, getSiteOrigin, getLocalizedPaths } = await import(`data:text/javascript;base64,${Buffer.from(code).toString('base64')}`);

test('contact uses one direct email address rather than a page', () => {
  assert.equal(CONTACT_EMAIL, 'matej@matejlukasik.com');
  assert.equal(CONTACT_HREF, 'mailto:matej@matejlukasik.com');
  assert.equal('contact' in getLocalizedPaths('en'), false);
});

test('canonical site origin respects local development and production', () => {
  assert.equal(getSiteOrigin('en', new URL('http://localhost:4321/cv')), 'http://localhost:4321');
  assert.equal(getSiteOrigin('en', new URL('https://matejlukasik.com/cv')), 'https://matejlukasik.com');
  assert.equal(getSiteOrigin('en', new URL('https://matejlukasik.sk/cv')), 'https://matejlukasik.com');
});

test('navigation exposes English paths and no language switcher', () => {
  assert.deepEqual(getLocalizedPaths('en'), { about: '/#about', cv: '/cv', projects: '/projects', privacy: '/privacy' });
  assert.doesNotMatch(read('../src/components/Nav.astro'), /getAlternateUrl|altLang/);
  assert.doesNotMatch(read('../src/layouts/Layout.astro'), /hreflang/);
});
