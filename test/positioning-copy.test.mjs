import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const en = JSON.parse(readFileSync(new URL('../src/i18n/en.json', import.meta.url), 'utf8'));
const sk = JSON.parse(readFileSync(new URL('../src/i18n/sk.json', import.meta.url), 'utf8'));
const llms = readFileSync(new URL('../src/pages/llms.txt.ts', import.meta.url), 'utf8');
const llmsFull = readFileSync(new URL('../src/pages/llms-full.txt.ts', import.meta.url), 'utf8');

test('english homepage positions Matej around practical SMB AI adoption', () => {
  assert.equal(en.home.pageTitle, 'Matej Lukášik - Specialist in actually useful AI');
  assert.equal(en.home.heroTitle, 'Stop doing work that AI should be doing for you.');
  assert.equal(
    en.home.heroDescription,
    "AI should save your business time and money, not create more work. First, we'll find the recurring work that takes up the most time in your business. Then we'll simplify it, automate it, and measure the result.",
  );
  assert.equal(en.home.ctaBandTitle, "Let's start with the process that costs your business the most time.");
  assert.equal(
    en.home.processSteps[1].description,
    'I propose the first process worth solving, a success metric, security rules, and a realistic rollout path.',
  );
  assert.equal(
    en.home.trustDescription,
    'I recommend the technology and rollout path that fit your business problem, team, budget, and security requirements.',
  );
  assert.equal(en.about.heroTitle, 'Who I Am');
  assert.equal(en.about.heroDescription, 'I help companies turn AI pressure into safe, measurable solutions.');
  assert.equal(en.about.bioTitle, 'Specialist in actually useful AI');
  assert.match(en.about.bioText, /I take a practical approach to projects/);
  assert.doesNotMatch(en.about.bioText, /I enter projects practically/);
});

test('slovak homepage uses the useful AI specialist page title', () => {
  assert.equal(sk.home.pageTitle, 'Matej Lukášik - Špecialista na užitočnú AI');
});

test('service copy presents outcome-led assessment, automation, and team adoption offers', () => {
  assert.deepEqual(
    [en.home.consultingTitle, en.services.consulting.title, en.contact.serviceOptions.consulting],
    ['Process and AI Opportunity Audit', 'Process and AI Opportunity Audit', 'Process and AI Opportunity Audit'],
  );
  assert.deepEqual(
    [en.home.implementationTitle, en.services.implementation.title, en.contact.serviceOptions.implementation],
    ['Automating One Specific Process', 'Automating One Specific Process', 'Automating One Specific Process'],
  );
  assert.deepEqual(
    [en.home.trainingTitle, en.services.training.title, en.contact.serviceOptions.training],
    ["AI in Your Team's Day-to-Day Work", "AI in Your Team's Day-to-Day Work", "AI in Your Team's Day-to-Day Work"],
  );
  assert.equal(
    en.services.consulting.subtitle,
    'Find out which process is worth tackling before you spend time or money.',
  );
  assert.deepEqual(en.services.consulting.includes, [
    'Processes currently taking the most time',
    '3–5 opportunities ranked by impact and effort',
    'A recommended first process and success metric',
    'A concrete next-step plan',
  ]);
  assert.equal(en.services.implementation.subtitle, 'One process. One metric. A solution tested on real work.');
  assert.deepEqual(en.services.implementation.includes, [
    'An automated process connected to your existing tools',
    'Testing on real cases and error checks',
    'Before-and-after measurement of time, quality, or cost',
    'Team training and a safe handoff',
  ]);
  assert.equal(en.services.training.subtitle, 'Not a one-off demo. Concrete tasks, rules, and work habits.');
  assert.ok(en.services.training.description.includes('new work habits that stick'));
  assert.equal(sk.home.consultingTitle, 'Audit procesov a AI príležitostí');
  assert.equal(sk.home.implementationTitle, 'Automatizácia jedného konkrétneho procesu');
  assert.equal(sk.home.trainingTitle, 'AI v každodennej práci tímu');
  assert.equal(sk.services.training.title, 'AI v každodennej práci tímu');
  assert.equal(sk.services.consulting.cta, 'Zistiť, čo sa oplatí automatizovať');
  assert.equal(sk.services.implementation.cta, 'Prebrať riešenie na mieru');
  assert.equal(sk.services.training.cta, 'Prebrať workshop pre tím');
  assert.equal(en.services.consulting.cta, "Find Out What's Worth Automating");
  assert.equal(en.services.implementation.cta, 'Discuss a Custom Solution');
  assert.equal(en.services.training.cta, 'Discuss a Workshop for Your Team');
  assert.ok(sk.services.training.description.includes('nové pracovné návyky'));
});

test('pain copy names recognizable recurring work and measurable outcomes', () => {
  assert.equal(sk.home.pain1Title, 'Prepisovanie medzi e-mailmi, tabuľkami a systémami');
  assert.equal(sk.home.pain2Title, 'Ponuky, reporty a odpovede stále vznikajú ručne');
  assert.equal(sk.home.pain3Title, 'AI nesmie byť ďalší experiment bez výsledku');
  assert.match(sk.home.pain2Description, /Váš pracovník si zachováva kontrolu a finálne rozhodnutie/);
  assert.equal(en.home.pain1Title, 'Copying between emails, spreadsheets, and systems');
  assert.equal(en.home.pain3Title, 'AI must not become another experiment without results');
});

test('booking CTAs promise the diagnostic outcome instead of leading with price', () => {
  assert.equal(sk.nav.bookCall, 'Zistiť, čo sa oplatí automatizovať');
  assert.equal(sk.home.ctaPrimary, sk.nav.bookCall);
  assert.equal(sk.home.firstStepOffer.cta, sk.nav.bookCall);
  assert.equal(sk.home.ctaSecondary, 'Pozrieť možnosti spolupráce');
  assert.equal(en.nav.bookCall, "Find Out What's Worth Automating");
  assert.equal(en.home.ctaPrimary, en.nav.bookCall);
  assert.equal(en.home.firstStepOffer.cta, en.nav.bookCall);
  assert.equal(en.home.ctaSecondary, 'See Ways We Can Work Together');
});

test('slovak process copy frames the collaboration clearly', () => {
  assert.equal(sk.home.processTitle, 'Ako prebieha spolupráca?');
  assert.equal(sk.home.ctaBandTitle, 'Začnime procesom, ktorý Vašu firmu stojí najviac času.');
  assert.deepEqual(
    sk.home.processSteps.map((step) => step.title),
    ['45-minútová diagnostika možností AI', 'Plán prvého kroku', 'Realizácia', 'Odovzdanie do praxe'],
  );
  assert.ok(sk.home.processSteps[2].description.includes('zmeriame jeho prínos'));
});

test('homepage presents the 45-minute AI opportunity diagnostic as the common first step', () => {
  assert.equal(sk.home.firstStepOffer.eyebrow, 'Najčastejší prvý krok');
  assert.equal(sk.home.firstStepOffer.title, '45-minútová diagnostika možností AI');
  assert.equal(
    sk.home.firstStepOffer.description,
    'Za 45 minút zmapujeme jeden opakujúci sa proces a posúdime, či sa ho oplatí automatizovať. Ak nie, poviem Vám to priamo. Diagnostika je bezplatná a bez záväzkov.',
  );
  assert.equal(sk.home.firstStepOffer.cta, sk.home.ctaPrimary);

  assert.equal(en.home.firstStepOffer.title, '45-Minute AI Opportunity Diagnostic');
  assert.equal(
    en.home.firstStepOffer.description,
    "In 45 minutes, we'll map one recurring process and assess whether it is worth automating. If it isn't, I'll tell you directly. The diagnostic is free and comes with no commitment.",
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

test('machine-readable copy mirrors the 45-minute AI opportunity diagnostic', () => {
  assert.match(llms, /\*\*45-Minute AI Opportunity Diagnostic\*\* — In 45 minutes/);
  assert.match(llms, /\*\*45-minutova diagnostika moznosti AI\*\* — Za 45 minut/);
  assert.match(llms, /const EN = `# Matej Lukášik — AI Process Audits and Automation/);
  assert.match(llms, /\*\*Process and AI Opportunity Audit\*\*/);
  assert.doesNotMatch(llms, /const EN = `# Matej Lukášik — AI Agent Consulting/);
  assert.doesNotMatch(llms, /1–2 weeks|1–2 tyzdne/);
});

test('full machine-readable copy mirrors only sections rendered on the current site', () => {
  assert.doesNotMatch(llmsFull, /s\.home\.consultingTitle/);
  assert.doesNotMatch(llmsFull, /s\.home\.atlasProofTitle/);
  assert.doesNotMatch(llmsFull, /s\.home\.trustTitle/);
  assert.doesNotMatch(llmsFull, /s\.about\.approachTitle/);
  assert.doesNotMatch(llmsFull, /s\.about\.techTitle/);
  assert.match(llmsFull, /s\.home\.ctaBandTitle/);
});
