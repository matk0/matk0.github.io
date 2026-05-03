import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const en = JSON.parse(readFileSync(new URL('../src/i18n/en.json', import.meta.url), 'utf8'));
const sk = JSON.parse(readFileSync(new URL('../src/i18n/sk.json', import.meta.url), 'utf8'));

test('english homepage positions Matej around practical SMB AI adoption', () => {
  assert.equal(en.home.heroTitle, 'AI agents for your team.');
  assert.equal(
    en.home.heroDescription,
    'You know you need AI. Together we find where to start, what creates the most value, and launch the first useful solution.',
  );
  assert.equal(en.about.bioTitle, 'Agentic AI Consultant for SMBs');
});

test('service copy emphasizes strategy, implementation, and team adoption', () => {
  assert.equal(en.home.consultingTitle, 'AI consulting and strategy');
  assert.equal(en.home.implementationTitle, 'AI solution implementation');
  assert.equal(en.home.trainingTitle, 'Team training and adoption');
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

test('homepage names the common first paid engagement after the free call', () => {
  assert.equal(sk.home.firstStepOffer.eyebrow, 'Najčastejší prvý krok');
  assert.equal(sk.home.firstStepOffer.title, 'Audit AI príležitostí a rizík');
  assert.equal(
    sk.home.firstStepOffer.description,
    'Za 1–2 týždne zmapujeme, kde má AI vo Vašej firme zmysel, ktorý workflow riešiť ako prvý, aké riziká treba ošetriť a ako budeme merať úspech.',
  );
  assert.equal(sk.home.firstStepOffer.cta, sk.home.ctaPrimary);

  assert.equal(en.home.firstStepOffer.title, 'AI opportunity and risk audit');
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
