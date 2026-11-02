import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const index = readFileSync(new URL('../src/pages/index.astro', import.meta.url), 'utf8');
const hero = readFileSync(new URL('../src/components/Hero.astro', import.meta.url), 'utf8');
const nav = readFileSync(new URL('../src/components/Nav.astro', import.meta.url), 'utf8');
const footer = readFileSync(new URL('../src/components/Footer.astro', import.meta.url), 'utf8');
const en = JSON.parse(readFileSync(new URL('../src/i18n/en.json', import.meta.url), 'utf8'));
const sk = JSON.parse(readFileSync(new URL('../src/i18n/sk.json', import.meta.url), 'utf8'));

test('the public homepage presents the approved AI systems and software positioning', () => {
  assert.equal(en.home.pageTitle, 'Matej Lukášik — AI Systems & Software Engineering Consultant');
  assert.equal(en.home.heroTitle, 'Senior Product Engineer');
  assert.equal('heroTypewords' in en.home, false);
  assert.equal('heroTypewordTemplate' in en.home, false);
  assert.equal(en.home.heroDescription, 'I turn loosely defined problems into simple, intuitive and reliable software products. I combine ten years of software engineering experience with product judgment, exceptional design sensibility and AI-assisted development—from shaping the solution to building, shipping and iteratively improving.');
  assert.equal('ctaPrimary' in en.home, false);
  assert.equal(sk.home.pageTitle, 'Matej Lukášik — Konzultant pre AI systémy a softvérové inžinierstvo');
  assert.equal(sk.home.heroTitle, 'Nahraďte časovo náročné procesy a softvér, ktorý už Vašej firme nevyhovuje.');
  assert.equal('heroTypewords' in sk.home, false);
  assert.equal('heroTypewordTemplate' in sk.home, false);
  assert.equal(sk.home.heroDescription, 'Som konzultant pre AI systémy a softvérové inžinierstvo. Firmám pomáham nájsť a vytvoriť správnu kombináciu softvérových systémov na mieru, automatizácií a AI agentov.');
  assert.equal('ctaPrimary' in sk.home, false);
  assert.equal('firstStepOffer' in sk.home, false);
  assert.equal(en.home.painTitle, 'AI and/or new software only make sense when they solve a real business problem.');
  assert.equal(sk.home.painTitle, 'AI, nový softvér alebo ich kombinácia majú zmysel len vtedy, keď riešia skutočný problém vo Vašom podnikaní.');
  assert.match(index, /<Hero\s/);
  assert.match(index, /title=\{strings\.home\.heroTitle\}/);
  assert.doesNotMatch(index, /typewords|typewordTemplate/);
  assert.doesNotMatch(hero, /typewriter|typewords|typewordTemplate/);
  assert.doesNotMatch(index, /<ServiceCard/);
  assert.doesNotMatch(index, /<FirstStepOffer/);
  assert.doesNotMatch(index, /Strategický poradca/);
});

test('homepage omits the services, process and FAQ sections and the services hero link', () => {
  assert.doesNotMatch(index, /ServiceSection|id="services"|strings\.home\.servicesTitle/);
  assert.doesNotMatch(index, /href="#services"|strings\.home\.ctaSecondary/);
  assert.doesNotMatch(index, /ProcessTimeline|<FAQ|strings\.home\.processTitle|strings\.contact\.faqTitle/);
});

test('site navigation omits services links and retains about and contact', () => {
  for (const source of [nav, footer]) {
    assert.doesNotMatch(source, /href="\/?#services"|strings\.nav\.services/);
    assert.match(source, /href="\/?#about"/);
    assert.match(source, /href=\{CONTACT_HREF\}/);
  }
});
