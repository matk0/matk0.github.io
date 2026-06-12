import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const index = readFileSync(new URL('../src/pages/index.astro', import.meta.url), 'utf8');
const atlasLanding = readFileSync(new URL('../src/components/AtlasLanding.astro', import.meta.url), 'utf8');
const footer = readFileSync(new URL('../src/components/Footer.astro', import.meta.url), 'utf8');
const faq = readFileSync(new URL('../src/components/FAQ.astro', import.meta.url), 'utf8');
const i18n = readFileSync(new URL('../src/i18n/index.ts', import.meta.url), 'utf8');
const en = JSON.parse(readFileSync(new URL('../src/i18n/en.json', import.meta.url), 'utf8'));
const sk = JSON.parse(readFileSync(new URL('../src/i18n/sk.json', import.meta.url), 'utf8'));

test('i18n exposes Agent Threat Atlas URLs', () => {
  assert.match(i18n, /ATLAS_URL = 'https:\/\/atlas\.matejlukasik\.sk\/'/);
  assert.match(i18n, /ATLAS_THREATS_URL = 'https:\/\/atlas\.matejlukasik\.sk\/threats'/);
});

test('minimal homepage does not render the Agent Threat Atlas campaign surface', () => {
  assert.doesNotMatch(index, /ATLAS_URL/);
  assert.doesNotMatch(index, /AtlasLanding/);
  assert.doesNotMatch(index, /strings\.home\.atlasProofTitle/);
  assert.doesNotMatch(index, /strings\.about\.atlasText/);
  assert.doesNotMatch(index, /strings\.about\.atlasLink/);
  assert.doesNotMatch(index, /ATLAS_THREATS_URL/);
});

test('Atlas landing component remains tracked when used elsewhere', () => {
  assert.match(atlasLanding, /data-analytics-section="atlas_landing"/);
  assert.match(atlasLanding, /data-analytics-event="service_cta_clicked"/);
  assert.match(atlasLanding, /data-analytics-position="atlas_landing"/);
  assert.match(atlasLanding, /data-analytics-service="agentic_ai_security"/);
  assert.match(atlasLanding, /scroll-mt-24/);
});

test('Slovak copy connects security concern to Agent Threat Atlas', () => {
  assert.equal(en.home.atlasLandingId, 'agentic-ai-security');
  assert.equal(sk.home.atlasLandingId, 'bezpecnost-agentickej-ai');
  assert.equal(en.home.atlasLandingEyebrow, 'Came from Agent Threat Atlas?');
  assert.equal(sk.home.atlasLandingEyebrow, 'Prišli ste z Agent Threat Atlas?');
  assert.equal(en.home.atlasLandingCta, 'Talk through your agent risks');
  assert.equal(sk.home.atlasLandingCta, 'Prejsť riziká Vašich agentov');

  assert.equal(sk.home.atlasProofTitle, 'Bezpečnosť AI agentov nie je abstraktné riziko.');
  assert.equal(sk.home.atlasProofCta, 'Otvoriť Agent Threat Atlas');
  assert.equal(sk.home.pain3AtlasText, 'Pozrite si verejný Agent Threat Atlas');
  assert.equal(sk.contact.faq[3].linkHref, 'https://atlas.matejlukasik.sk/');
  assert.equal(sk.contact.faq[3].linkText, 'Otvoriť Agent Threat Atlas');
  assert.equal(sk.footer.research, 'Projekty');
  assert.equal(sk.about.atlasText, undefined);
  assert.equal(sk.about.atlasLink, undefined);

  assert.equal(en.home.atlasProofCta, 'Open Agent Threat Atlas');
  assert.equal(en.contact.faq[3].linkHref, 'https://atlas.matejlukasik.sk/');
  assert.equal(en.footer.research, 'Projects');
  assert.equal(en.about.atlasText, undefined);
  assert.equal(en.about.atlasLink, undefined);
});

test('FAQ and footer render optional Atlas links', () => {
  assert.match(faq, /item\.linkHref/);
  assert.match(faq, /item\.linkText/);
  assert.match(footer, /strings\.footer\.research/);
  assert.match(footer, /ATLAS_URL/);
});
