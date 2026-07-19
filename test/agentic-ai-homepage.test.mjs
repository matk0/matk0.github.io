import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const index = readFileSync(new URL('../src/pages/index.astro', import.meta.url), 'utf8');
const hero = readFileSync(new URL('../src/components/Hero.astro', import.meta.url), 'utf8');
const en = JSON.parse(readFileSync(new URL('../src/i18n/en.json', import.meta.url), 'utf8'));
const sk = JSON.parse(readFileSync(new URL('../src/i18n/sk.json', import.meta.url), 'utf8'));

test('the public homepage is the Agentic AI consulting site', () => {
  assert.equal(en.home.heroTitle, 'Stop doing work that AI should be doing for you.');
  assert.equal('heroTypewords' in en.home, false);
  assert.equal('heroTypewordTemplate' in en.home, false);
  assert.equal(en.home.heroDescription, "AI should save your business time and money, not create more work. Together, we'll find where to start, what makes the most sense for your business, and launch the first useful solution.");
  assert.equal(sk.home.heroTitle, 'Prestaňte robiť prácu, ktorú má za Vás robiť AI.');
  assert.equal('heroTypewords' in sk.home, false);
  assert.equal('heroTypewordTemplate' in sk.home, false);
  assert.equal(sk.home.heroDescription, 'AI Vám má šetriť čas a peniaze, nie vytvárať ďalšiu prácu. Spolu nájdeme, kde začať, čo má pre Vás najväčší zmysel a spustíme prvé užitočné riešenie.');
  assert.equal(sk.home.firstStepOffer.title, 'Audit AI príležitostí');
  assert.equal(en.home.painTitle, 'Bringing AI into your company only makes sense when it solves a real business problem.');
  assert.equal(en.home.servicesTitle, 'How can I help you?');
  assert.match(index, /<Hero\s/);
  assert.match(index, /title=\{strings\.home\.heroTitle\}/);
  assert.doesNotMatch(index, /typewords|typewordTemplate/);
  assert.doesNotMatch(hero, /typewriter|typewords|typewordTemplate/);
  assert.doesNotMatch(index, /<ServiceCard/);
  assert.match(index, /<FirstStepOffer/);
  assert.doesNotMatch(index, /Strategický poradca/);
});

test('service sections are grouped under the compact services heading', () => {
  const serviceSections = index.match(/<ServiceSection[\s\S]*?\/>/g) ?? [];
  const servicesGroup = index.match(/<section id="services"[\s\S]*?\n  <\/section>/)?.[0] ?? '';

  assert.match(servicesGroup, /\{strings\.home\.servicesTitle\}/);
  assert.match(index, /<section id="services" class="py-8 md:py-10 bg-surface-alt relative"/);
  assert.match(index, /<h2 class="text-2xl md:text-4xl font-bold text-center mb-8 md:mb-10 reveal">/);
  assert.equal(serviceSections.length, 3);
  assert.equal((servicesGroup.match(/<ServiceSection/g) ?? []).length, 3);
  serviceSections.forEach((section) => assert.match(section, /\bnested\b/));
});
