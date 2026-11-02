import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const index = readFileSync(new URL('../src/pages/index.astro', import.meta.url), 'utf8');
const hero = readFileSync(new URL('../src/components/Hero.astro', import.meta.url), 'utf8');
const nav = readFileSync(new URL('../src/components/Nav.astro', import.meta.url), 'utf8');
const footer = readFileSync(new URL('../src/components/Footer.astro', import.meta.url), 'utf8');
const en = JSON.parse(readFileSync(new URL('../src/i18n/en.json', import.meta.url), 'utf8'));

test('the public homepage presents the approved AI systems and software positioning', () => {
  assert.equal(en.home.pageTitle, 'Matej Lukášik — Senior Product Engineer');
  assert.equal(en.home.heroTitle, 'Senior Product Engineer');
  assert.equal('heroTypewords' in en.home, false);
  assert.equal('heroTypewordTemplate' in en.home, false);
  assert.equal(en.home.heroDescription, 'I turn loosely defined problems into simple, intuitive and reliable software products. I present a unique and powerful blend of ten years of software engineering experience, exceptional product judgment, design sensibility and AI-assisted development (SW Factories FTW!).');
  assert.equal('ctaPrimary' in en.home, false);

  assert.equal(en.home.painTitle, 'AI and/or new software only make sense when they solve a real business problem.');

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
