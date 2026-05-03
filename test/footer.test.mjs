import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { test } from 'node:test';

const footer = readFileSync(new URL('../src/components/Footer.astro', import.meta.url), 'utf8');
const i18n = readFileSync(new URL('../src/i18n/index.ts', import.meta.url), 'utf8');
const en = JSON.parse(readFileSync(new URL('../src/i18n/en.json', import.meta.url), 'utf8'));
const sk = JSON.parse(readFileSync(new URL('../src/i18n/sk.json', import.meta.url), 'utf8'));

test('footer uses the same logotype as the navigation', () => {
  assert.match(footer, /src="\/logo\.svg"/);
  assert.match(footer, /alt="Matej Lukášik"/);
  assert.doesNotMatch(footer, /matejlukasik<\/a>/);
});

test('footer has a direct booking CTA and privacy route', () => {
  assert.match(footer, /focus=calendar/);
  assert.match(footer, /strings\.footer\.privacy/);
  assert.match(i18n, /privacy: lang === 'sk' \? '\/sukromie' : '\/privacy'/);
  assert.equal(existsSync(new URL('../src/pages/privacy.astro', import.meta.url)), true);
  assert.equal(existsSync(new URL('../src/pages/sukromie.astro', import.meta.url)), true);
});

test('footer copy is specific to small and medium businesses', () => {
  assert.equal(
    sk.footer.description,
    'Agentická AI pre malé a stredné firmy, pre ktoré sú merateľnosť a bezpečnosť dôležité.',
  );
  assert.equal(
    en.footer.description,
    'Agentic AI for small and medium-sized businesses that want safe, measurable results.',
  );
});

test('footer only shows curated professional social profiles', () => {
  assert.match(footer, /linkedin\.com\/in\/matej-lukasik/);
  assert.match(footer, /github\.com\/matk0/);
  assert.doesNotMatch(footer, /x\.com\/matejlukasik/);
  assert.doesNotMatch(footer, /youtube\.com\/@matejlukasik/);
});
