import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const en = JSON.parse(readFileSync(new URL('../src/i18n/en.json', import.meta.url), 'utf8'));
const sk = JSON.parse(readFileSync(new URL('../src/i18n/sk.json', import.meta.url), 'utf8'));
const index = readFileSync(new URL('../src/pages/index.astro', import.meta.url), 'utf8');

test('homepage uses concise advisory positioning in English and Slovak', () => {
  assert.match(index, /Strategic Advisor to Founder-Led Digital Businesses/);
  assert.doesNotMatch(index, /Former CTO and product builder/);
  assert.match(index, /greeting: 'Strategický poradca'/);
  assert.match(
    index,
    /Pomáham majiteľom firiem pomenovať skutočný problém, pochopiť súvislosti a rozhodnúť sa, čo ďalej\./,
  );
  assert.match(index, /href="#consultation"/);
  assert.match(index, /strategickej konzultácie/);
  assert.match(index, /href="#diagnosis"/);
  assert.match(index, /diagnostického šprintu/);
  assert.match(index, /href="#co-ceo"/);
  assert.match(index, /co-CEO na mesiac/);
  assert.match(index, /cta: 'Pozrieť si možnosti spolupráce'/);
  assert.match(index, /id=\{offer\.id\}/);
  assert.doesNotMatch(index, /Bývalý CTO a tvorca produktov/);
  assert.doesNotMatch(index, /AUTHENTIC CREATION|material abundance|AUTENTICKÚ TVORBU|materiálnu hojnosť/);
  assert.doesNotMatch(index, /UX, SEO, checkout/);
});

test('service copy emphasizes strategy, implementation, and team adoption', () => {
  assert.equal(en.home.consultingTitle, 'AI Consulting and Strategy');
  assert.equal(en.home.implementationTitle, 'AI Solution Implementation');
  assert.equal(en.home.trainingTitle, 'AI Workshops and Adoption');
  assert.equal(en.services.training.title, 'AI Workshops and Adoption');
  assert.ok(en.services.training.description.includes('new work habits that stick'));
  assert.equal(sk.home.consultingTitle, 'Nájdeme správny prvý proces');
  assert.equal(sk.home.implementationTitle, 'Postavíme AI workflow v praxi');
  assert.equal(sk.home.trainingTitle, 'Naučíme tím používať nový spôsob práce');
  assert.equal(sk.services.training.title, 'Naučíme tím používať nový spôsob práce');
  assert.equal(sk.services.training.cta, 'Dohodnúť úvodný hovor');
  assert.ok(sk.services.training.description.includes('pracovný návyk'));
});

test('slovak process copy frames the collaboration clearly', () => {
  assert.equal(sk.home.processTitle, 'Ako prebieha spolupráca?');
  assert.deepEqual(
    sk.home.processSteps.map((step) => step.title),
    ['Úvodný rozhovor', 'Výber prvého workflowu', 'Návrh a stavba', 'Používanie a zlepšovanie'],
  );
  assert.ok(sk.home.processSteps[2].description.includes('reálnych prípadoch'));
});

test('homepage names the common first paid engagement after the free call', () => {
  assert.equal(sk.home.firstStepOffer.eyebrow, 'Najčastejší prvý krok');
  assert.equal(sk.home.firstStepOffer.title, 'Prvý AI workflow sprint');
  assert.equal(
    sk.home.firstStepOffer.description,
    'Za 10 pracovných dní vyberieme jeden opakujúci sa proces, zmapujeme ako funguje dnes, postavíme AI verziu s ľudským schvaľovaním a otestujeme ju na reálnych príkladoch.',
  );
  assert.equal(sk.home.firstStepOffer.cta, sk.home.ctaPrimary);

  assert.equal(en.home.firstStepOffer.title, 'AI Opportunity and Risk Audit');
  assert.match(en.home.firstStepOffer.description, /1–2 weeks/);
});

test('service pages avoid premature architecture promises', () => {
  const combinedCopy = JSON.stringify({ en, sk });
  const bannedPhrases = [
    'One API key',
    'CEO orchestrator',
    'AI agent per employee via Slack',
    'agent pre kazdeho zamestnanca cez Slack',
    'CEO agent',
    'CEO agentom',
  ];

  for (const phrase of bannedPhrases) {
    assert.ok(!combinedCopy.includes(phrase), `${phrase} should not appear in public service copy`);
  }
});
