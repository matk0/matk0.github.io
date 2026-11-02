import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const index = readFileSync(new URL('../src/pages/index.astro', import.meta.url), 'utf8');
const footer = readFileSync(new URL('../src/components/Footer.astro', import.meta.url), 'utf8');
const i18n = readFileSync(new URL('../src/i18n/index.ts', import.meta.url), 'utf8');
const en = JSON.parse(readFileSync(new URL('../src/i18n/en.json', import.meta.url), 'utf8'));
const sk = JSON.parse(readFileSync(new URL('../src/i18n/sk.json', import.meta.url), 'utf8'));

test('i18n exposes Agent Threat Atlas URLs', () => {
  assert.match(i18n, /ATLAS_URL = 'https:\/\/atlas\.matejlukasik\.sk\/'/);
  assert.match(i18n, /ATLAS_THREATS_URL = 'https:\/\/atlas\.matejlukasik\.sk\/threats'/);
});

test('homepage keeps Agent Threat Atlas in the footer rather than separate content blocks', () => {
  assert.doesNotMatch(index, /ATLAS_URL/);
  assert.doesNotMatch(index, /strings\.home\.pain3AtlasText/);
  assert.doesNotMatch(index, /strings\.home\.atlasProofTitle/);
  assert.doesNotMatch(index, /strings\.about\.atlasText/);
  assert.doesNotMatch(index, /strings\.about\.atlasLink/);
  assert.doesNotMatch(index, /ATLAS_THREATS_URL/);
  assert.doesNotMatch(index, /ProcessTimeline|<FAQ/);
  assert.match(footer, /href=\{ATLAS_URL\}/);
});

test('homepage omits the dedicated Agent Threat Atlas landing section', () => {
  assert.doesNotMatch(index, /AtlasLanding/);
  assert.doesNotMatch(index, /atlasLanding/);
  assert.equal(en.home.atlasLandingId, undefined);
  assert.equal(sk.home.atlasLandingId, undefined);
});

test('retained Atlas copy and footer headings stay localized', () => {
  assert.equal(sk.home.atlasProofTitle, 'Bezpečnosť AI agentov nie je abstraktné riziko.');
  assert.equal(sk.home.atlasProofCta, 'Otvoriť Agent Threat Atlas');
  assert.equal(sk.home.pain3AtlasText, undefined);
  assert.equal(sk.footer.research, 'Projekty');
  assert.equal(sk.about.atlasText, undefined);
  assert.equal(sk.about.atlasLink, undefined);

  assert.equal(en.home.atlasProofCta, 'Open Agent Threat Atlas');
  assert.equal(en.footer.research, 'Projects');
  assert.equal(en.about.atlasText, undefined);
  assert.equal(en.about.atlasLink, undefined);
});

test('footer renders the Atlas research link', () => {
  assert.match(footer, /strings\.footer\.research/);
  assert.match(footer, /ATLAS_URL/);
});
