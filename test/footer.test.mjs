import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { test } from 'node:test';

const footer = readFileSync(new URL('../src/components/Footer.astro', import.meta.url), 'utf8');
const i18n = readFileSync(new URL('../src/i18n/index.ts', import.meta.url), 'utf8');
const layout = readFileSync(new URL('../src/layouts/Layout.astro', import.meta.url), 'utf8');
const structuredData = readFileSync(new URL('../src/structured-data.ts', import.meta.url), 'utf8');
const en = JSON.parse(readFileSync(new URL('../src/i18n/en.json', import.meta.url), 'utf8'));
const sk = JSON.parse(readFileSync(new URL('../src/i18n/sk.json', import.meta.url), 'utf8'));

test('footer uses the same logotype as the navigation', () => {
  assert.match(footer, /src="\/logo\.svg"/);
  assert.match(footer, /alt="Matej Lukášik"/);
  assert.doesNotMatch(footer, /matejlukasik<\/a>/);
});

test('footer has privacy route without location or booking CTA', () => {
  assert.match(footer, /strings\.footer\.privacy/);
  assert.match(i18n, /privacy: lang === 'sk' \? '\/sukromie' : '\/privacy'/);
  assert.equal(existsSync(new URL('../src/pages/privacy.astro', import.meta.url)), true);
  assert.equal(existsSync(new URL('../src/pages/sukromie.astro', import.meta.url)), true);
  assert.doesNotMatch(footer, /strings\.contact\.location/);
  assert.doesNotMatch(footer, /strings\.nav\.bookCall/);
  assert.doesNotMatch(footer, /focus=calendar/);
});

test('footer repeats the Slovak homepage promise', () => {
  assert.equal(
    sk.footer.description,
    'Prestaňte robiť prácu, ktorú má za Vás robiť AI.',
  );
  assert.equal(
    en.footer.description,
    'Stop doing work that AI should be doing for you.',
  );
});

test('footer shows selected professional and publishing profiles', () => {
  assert.equal(sk.footer.followMe, 'Sociálne médiá');
  assert.equal(en.footer.followMe, 'Social Media');
  assert.match(footer, /linkedin\.com\/in\/matej-lukasik/);
  assert.match(footer, /x\.com\/matejlukasik/);
  assert.match(footer, /github\.com\/matk0/);
  assert.match(footer, /youtube\.com\/@matejlukasik/);
  assert.match(footer, /aria-label="X"/);
  assert.match(footer, /aria-label="YouTube"/);
  assert.match(structuredData, /x\.com\/matejlukasik/);
  assert.match(layout, /getStructuredData/);
});
