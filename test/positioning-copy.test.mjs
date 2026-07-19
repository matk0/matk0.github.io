import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const en = JSON.parse(readFileSync(new URL('../src/i18n/en.json', import.meta.url), 'utf8'));
const sk = JSON.parse(readFileSync(new URL('../src/i18n/sk.json', import.meta.url), 'utf8'));
const llms = readFileSync(new URL('../src/pages/llms.txt.ts', import.meta.url), 'utf8');

test('english homepage positions Matej around practical SMB AI adoption', () => {
  assert.equal(en.home.heroTitle, 'Stop doing work that AI should be doing for you.');
  assert.equal(
    en.home.heroDescription,
    "AI should save your business time and money, not create more work. Together, we'll find where to start, what makes the most sense for your business, and launch the first useful solution.",
  );
  assert.equal(en.about.heroTitle, 'Who I Am');
  assert.equal(en.about.heroDescription, 'I help companies turn AI pressure into safe, measurable solutions.');
  assert.equal(en.about.bioTitle, 'Agentic AI Consultant');
});

test('service copy emphasizes strategy, implementation, and team adoption', () => {
  assert.equal(en.home.consultingTitle, 'AI Consulting and Strategy');
  assert.equal(en.home.implementationTitle, 'AI Solution Implementation');
  assert.equal(en.home.trainingTitle, 'AI Workshops and Adoption');
  assert.equal(en.services.training.title, 'AI Workshops and Adoption');
  assert.ok(en.services.training.description.includes('new work habits that stick'));
  assert.equal(sk.home.consultingTitle, 'Konzultácie a AI stratégia');
  assert.equal(sk.home.implementationTitle, 'Implementácia AI riešení');
  assert.equal(sk.home.trainingTitle, 'AI workshopy a zavedenie do praxe');
  assert.equal(sk.services.training.title, 'AI workshopy a zavedenie do praxe');
  assert.equal(sk.services.training.cta, 'Dohodnúť workshop');
  assert.ok(sk.services.training.description.includes('nové pracovné návyky'));
});

test('slovak process copy frames the collaboration clearly', () => {
  assert.equal(sk.home.processTitle, 'Ako prebieha spolupráca?');
  assert.deepEqual(
    sk.home.processSteps.map((step) => step.title),
    ['Úvodný rozhovor', 'Plán prvého kroku', 'Realizácia', 'Odovzdanie do praxe'],
  );
  assert.ok(sk.home.processSteps[2].description.includes('meriame jeho dopad'));
});

test('homepage presents the free opportunity audit as the common first step', () => {
  assert.equal(sk.home.firstStepOffer.eyebrow, 'Najčastejší prvý krok');
  assert.equal(sk.home.firstStepOffer.title, 'Audit AI príležitostí');
  assert.equal(
    sk.home.firstStepOffer.description,
    'Za bezplatných 45 minút zmapujeme, kde má AI vo Vašej firme zmysel, ktorý workflow riešiť ako prvý, aké riziká treba ošetriť a ako budeme merať úspech.',
  );
  assert.equal(sk.home.firstStepOffer.cta, sk.home.ctaPrimary);

  assert.equal(en.home.firstStepOffer.title, 'AI Opportunity Audit');
  assert.equal(
    en.home.firstStepOffer.description,
    "In a free 45-minute consultation, we'll map where AI makes sense in your company, which workflow to tackle first, which risks need addressing, and how we'll measure success.",
  );
});

test('service pages avoid premature architecture promises', () => {
  const combinedCopy = `${JSON.stringify({ en, sk })}\n${llms}`;
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

test('machine-readable copy mirrors the free AI Opportunity Audit', () => {
  assert.match(llms, /\*\*AI Opportunity Audit\*\* — In a free 45-minute consultation/);
  assert.match(llms, /\*\*Audit AI prilezitosti\*\* — Za bezplatnych 45 minut/);
  assert.doesNotMatch(llms, /1–2 weeks|1–2 tyzdne/);
});
