import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const index = readFileSync(new URL('../src/pages/index.astro', import.meta.url), 'utf8');
const hero = readFileSync(new URL('../src/components/Hero.astro', import.meta.url), 'utf8');
const en = JSON.parse(readFileSync(new URL('../src/i18n/en.json', import.meta.url), 'utf8'));
const sk = JSON.parse(readFileSync(new URL('../src/i18n/sk.json', import.meta.url), 'utf8'));

test('the public homepage presents the approved AI systems and software positioning', () => {
  assert.equal(en.home.pageTitle, 'Matej Lukášik — AI Systems & Software Engineering Consultant');
  assert.equal(en.home.heroTitle, 'Replace time-consuming workflows and software that no longer fits.');
  assert.equal('heroTypewords' in en.home, false);
  assert.equal('heroTypewordTemplate' in en.home, false);
  assert.equal(en.home.heroDescription, 'I’m an AI Systems & Software Engineering Consultant for SMBs. I find and build the right mix of bespoke software systems, automations, and AI agents.');
  assert.equal(en.home.ctaPrimary, 'Book a Free 30-Minute Consultation');
  assert.equal(en.home.ctaSecondary, 'See How I Can Help');
  assert.equal(sk.home.pageTitle, 'Matej Lukášik — Konzultant pre AI systémy a softvérové inžinierstvo');
  assert.equal(sk.home.heroTitle, 'Nahraďte časovo náročné procesy a softvér, ktorý už Vašej firme nevyhovuje.');
  assert.equal('heroTypewords' in sk.home, false);
  assert.equal('heroTypewordTemplate' in sk.home, false);
  assert.equal(sk.home.heroDescription, 'Som konzultant pre AI systémy a softvérové inžinierstvo. Malým a stredným firmám pomáham nájsť a vytvoriť správnu kombináciu softvérových systémov na mieru, automatizácií a AI agentov.');
  assert.equal(sk.home.ctaPrimary, 'Dohodnúť si bezplatnú 30-minútovú konzultáciu');
  assert.equal(sk.home.ctaSecondary, 'Ako Vám môžem pomôcť');
  assert.equal(sk.home.firstStepOffer.title, 'Začnime bezplatnou 30-minútovou konzultáciou');
  assert.equal(en.home.painTitle, 'AI and/or new software only make sense when they solve a real business problem.');
  assert.equal(sk.home.painTitle, 'AI, nový softvér alebo ich kombinácia majú zmysel len vtedy, keď riešia skutočný problém vo Vašom podnikaní.');
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
