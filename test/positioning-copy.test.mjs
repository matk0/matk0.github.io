import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const en = JSON.parse(readFileSync(new URL('../src/i18n/en.json', import.meta.url), 'utf8'));
const sk = JSON.parse(readFileSync(new URL('../src/i18n/sk.json', import.meta.url), 'utf8'));
const llms = readFileSync(new URL('../src/pages/llms.txt.ts', import.meta.url), 'utf8');
const llmsFull = readFileSync(new URL('../src/pages/llms-full.txt.ts', import.meta.url), 'utf8');
const structuredData = readFileSync(new URL('../src/structured-data.ts', import.meta.url), 'utf8');

test('public positioning remains neutral about company size', () => {
  const publicPositioning = [JSON.stringify(en), JSON.stringify(sk), llms, structuredData].join('\n');

  assert.doesNotMatch(publicPositioning, /\bSMBs?\b|small and medium-sized businesses/i);
  assert.doesNotMatch(
    publicPositioning,
    /mal(?:ým|é|ých)\s+a\s+stredn(?:ým|é|ých)\s+firm(?:ám|y|ách)/iu,
  );
});

test('english homepage positions Matej as an AI systems and software consultant', () => {
  assert.equal(en.home.pageTitle, 'Matej Lukášik — AI Systems & Software Engineering Consultant');
  assert.equal(en.home.heroTitle, 'Replace time-consuming workflows and software that no longer fits.');
  assert.equal(
    en.home.heroDescription,
    'I’m an AI Systems & Software Engineering Consultant. I find and build the right mix of bespoke software systems, automations, and AI agents.',
  );
  assert.equal(en.home.ctaBandTitle, "Let's start with the process that costs your business the most time.");
  assert.equal(
    en.home.ctaBandDescription,
    'Start with a free 30-minute consultation. We’ll clarify the problem, determine whether I can help, and agree on the right next step. No commitment.',
  );
  assert.equal(
    en.home.processSteps[1].description,
    'I map how work actually happens, including handoffs, exceptions, and workarounds, and recommend the highest-value change with a clear success metric.',
  );
  assert.equal(
    en.home.trustDescription,
    'I recommend the technology and rollout path that fit your business problem, team, budget, and security requirements.',
  );
  assert.equal(en.about.heroTitle, 'Who I Am');
  assert.equal(
    en.about.heroDescription,
    'I help companies solve business problems with the right mix of bespoke software, automation, and AI.',
  );
  assert.equal(en.about.bioTitle, 'AI Systems & Software Engineering Consultant');
  assert.equal(
    en.about.bioText,
    'I’m an AI Systems & Software Engineering Consultant with 10 years of software engineering experience. I help companies replace time-consuming workflows and software that no longer fits with the right mix of bespoke software systems, automations, and AI agents.\n\nI start with the business problem, current workflows, systems, and data. Only then do I recommend a solution that makes technical and business sense. I use AI only where it adds value; sometimes the right answer is a simple automation or new software.\n\nI design, build, and test the solution on real work, then help the team adopt it. My goal is a system leadership understands, the team can use reliably, and the business can own and improve over time.',
  );
});

test('slovak homepage uses the approved AI systems and software engineering title', () => {
  assert.equal(sk.home.pageTitle, 'Matej Lukášik — Konzultant pre AI systémy a softvérové inžinierstvo');
  assert.equal(sk.about.bioTitle, 'Konzultant pre AI systémy a softvérové inžinierstvo');
  assert.equal(
    sk.home.ctaBandDescription,
    'Začnime bezplatnou 30-minútovou konzultáciou. Spoločne si ujasníme problém, posúdime, či Vám viem pomôcť, a dohodneme sa na správnom ďalšom kroku. Bez záväzkov.',
  );
});

test('service copy presents the assessment, implementation, and adoption lifecycle', () => {
  assert.deepEqual(
    [en.home.consultingTitle, en.services.consulting.title, en.contact.serviceOptions.consulting],
    ['Workflow & Software Assessment Sprint', 'Workflow & Software Assessment Sprint', 'Workflow & Software Assessment Sprint'],
  );
  assert.deepEqual(
    [en.home.implementationTitle, en.services.implementation.title, en.contact.serviceOptions.implementation],
    ['Bespoke Software, Automation & AI Agents', 'Bespoke Software, Automation & AI Agents', 'Bespoke Software, Automation & AI Agents'],
  );
  assert.deepEqual(
    [en.home.trainingTitle, en.services.training.title, en.contact.serviceOptions.training],
    ['Adoption, Handoff & Improvement', 'Adoption, Handoff & Improvement', 'Adoption, Handoff & Improvement'],
  );
  assert.equal(
    en.services.consulting.subtitle,
    'Find the highest-value changes before you invest in technology.',
  );
  assert.equal(
    en.services.consulting.description,
    'I map how work actually happens—not just how it is documented—including handoffs, exceptions, workarounds, and the systems involved. You receive a prioritized plan showing what to streamline, automate, rebuild, or support with AI.',
  );
  assert.deepEqual(en.services.consulting.includes, [
    'Real workflows, systems, handoffs, and exceptions mapped',
    'Time losses, bottlenecks, and workarounds quantified',
    'Opportunities ranked by impact, effort, and risk',
    'Recommended first implementation and success metric',
  ]);
  assert.equal(en.services.implementation.subtitle, 'Build the right system for one important business problem.');
  assert.deepEqual(en.services.implementation.includes, [
    'A solution designed around one defined problem',
    'Integration with your existing tools and data',
    'Testing on real work, including error and failure handling',
    'Outcome measurement, documentation, and safe handoff',
  ]);
  assert.equal(en.services.training.subtitle, 'Make the new system part of everyday work.');
  assert.ok(en.services.training.description.includes('adopt the solution'));
  assert.equal(sk.home.consultingTitle, 'Assessment Sprint pre procesy a softvér');
  assert.equal(sk.home.implementationTitle, 'Softvér na mieru, automatizácie a AI agenti');
  assert.equal(sk.home.trainingTitle, 'Zavedenie do praxe, odovzdanie a zlepšovanie');
  assert.equal(sk.services.training.title, 'Zavedenie do praxe, odovzdanie a zlepšovanie');
  assert.equal(sk.services.consulting.cta, 'Prebrať Assessment Sprint');
  assert.equal(
    sk.services.consulting.description,
    'Zmapujem prácu tak, ako vo Vašej firme skutočne prebieha — vrátane používaných systémov, odovzdávania práce, výnimiek a obchádzok. Dostanete plán zoradený podľa priority, ktorý ukáže, čo zjednodušiť, automatizovať, nanovo postaviť alebo podporiť pomocou AI.',
  );
  assert.deepEqual(sk.services.consulting.includes, [
    'Zmapovanie reálnych procesov, systémov, odovzdávania práce a výnimiek',
    'Vyčíslenie časových strát, úzkych miest a obchádzok',
    'Príležitosti zoradené podľa prínosu, náročnosti a rizika',
    'Odporúčanie prvej implementácie a metriky úspechu',
  ]);
  assert.equal(sk.services.implementation.cta, 'Prebrať implementáciu');
  assert.equal(sk.services.training.cta, 'Prebrať zavedenie a podporu');
  assert.equal(en.services.consulting.cta, 'Discuss an Assessment Sprint');
  assert.equal(en.services.implementation.cta, 'Discuss an Implementation');
  assert.equal(en.services.training.cta, 'Discuss Adoption & Support');
  assert.ok(sk.services.training.description.includes('osvojiť si nový systém'));
});

test('pain copy names recognizable recurring work and measurable outcomes', () => {
  assert.equal(sk.home.painTitle, 'AI, nový softvér alebo ich kombinácia majú zmysel len vtedy, keď riešia skutočný problém vo Vašom podnikaní.');
  assert.equal(sk.home.pain1Title, 'Práca sa zasekáva medzi ľuďmi a systémami');
  assert.equal(
    sk.home.pain1Description,
    'Schvaľovanie, údaje a rozhodnutia sa medzi ľuďmi a systémami presúvajú cez e-maily, tabuľky a opakované urgencie. Ako firma rastie, práca sa spomaľuje, rastie riziko chýb a kľúčoví ľudia sa stávajú úzkym miestom.',
  );
  assert.equal(sk.home.pain2Title, 'Softvér už nezodpovedá tomu, ako Vaša firma funguje');
  assert.equal(
    sk.home.pain2Description,
    'Chýbajúce funkcie a nepružné systémy vedú k pomocným tabuľkám, duplicitnému zadávaniu údajov a ručným kontrolám. Softvér sa má prispôsobiť firme, nie firma softvéru.',
  );
  assert.equal(sk.home.pain3Title, 'AI nesmie byť ďalší experiment bez výsledku');
  assert.equal(en.home.painTitle, 'AI and/or new software only make sense when they solve a real business problem.');
  assert.equal(en.home.pain1Title, 'Work gets stuck between people and systems');
  assert.equal(
    en.home.pain1Description,
    'Approvals, data, and decisions move through emails, spreadsheets, and manual follow-ups. As the company grows, work slows down, mistakes become more likely, and key people become bottlenecks.',
  );
  assert.equal(en.home.pain2Title, 'Your software no longer matches how the business works');
  assert.equal(
    en.home.pain2Description,
    'Missing features and rigid systems lead to spreadsheets, duplicate entry, and manual checks. Software should fit the business—not force the business to work around it.',
  );
  assert.equal(en.home.pain3Title, 'AI must not become another experiment without results');
});

test('booking CTAs use the approved consultation wording', () => {
  assert.equal(sk.nav.bookCall, 'Dohodnúť si bezplatnú 30-minútovú konzultáciu');
  assert.equal(sk.home.ctaPrimary, sk.nav.bookCall);
  assert.equal(sk.home.ctaSecondary, 'Ako Vám môžem pomôcť');
  assert.equal(en.nav.bookCall, 'Book a Free 30-Minute Consultation');
  assert.equal(en.home.ctaPrimary, en.nav.bookCall);
  assert.equal(en.home.ctaSecondary, 'See How I Can Help');
  assert.deepEqual(en.services.notSure, {
    title: 'Not sure where to start?',
    description: 'Start with a free 30-minute consultation. We’ll clarify the problem, determine whether I can help, and agree on the right next step. No commitment.',
    cta: 'Book a Free Consultation',
  });
  assert.equal(en.contact.bookTitle, 'Free 30-Minute Consultation');
  assert.equal(en.contact.bookDescription, en.home.firstStepOffer.description);
  assert.deepEqual(sk.services.notSure, {
    title: 'Neviete, kde začať?',
    description: 'Začnime bezplatnou 30-minútovou konzultáciou. Spoločne si ujasníme problém, posúdime, či Vám viem pomôcť, a dohodneme sa na správnom ďalšom kroku. Bez záväzkov.',
    cta: 'Dohodnúť si bezplatnú konzultáciu',
  });
  assert.equal(sk.contact.bookTitle, 'Bezplatná 30-minútová konzultácia');
  assert.equal(sk.contact.bookDescription, sk.home.firstStepOffer.description);
});

test('process copy follows consultation, assessment, implementation, and handoff', () => {
  assert.equal(en.home.processTitle, 'How We Work Together');
  assert.deepEqual(
    en.home.processSteps.map(({ title, description }) => ({ title, description })),
    [
      {
        title: 'Free 30-Minute Consultation',
        description: 'We discuss the business problem, the current workflow or software, and whether an Assessment Sprint is the right next step.',
      },
      {
        title: 'Workflow & Software Assessment Sprint',
        description: 'I map how work actually happens, including handoffs, exceptions, and workarounds, and recommend the highest-value change with a clear success metric.',
      },
      {
        title: 'Implementation',
        description: 'I build and test the agreed software, automation, AI agent, or combination on real work.',
      },
      {
        title: 'Adoption & Handoff',
        description: 'I help your team adopt the system, measure the result, and take ownership—with ongoing support available if useful.',
      },
    ],
  );

  assert.equal(sk.home.processTitle, 'Ako prebieha spolupráca?');
  assert.equal(sk.home.ctaBandTitle, 'Začnime procesom, ktorý Vašu firmu stojí najviac času.');
  assert.deepEqual(
    sk.home.processSteps.map(({ title, description }) => ({ title, description })),
    [
      {
        title: 'Bezplatná 30-minútová konzultácia',
        description: 'Preberieme problém vo Vašom podnikaní, súčasný proces alebo softvér a posúdime, či je Assessment Sprint správnym ďalším krokom.',
      },
      {
        title: 'Assessment Sprint pre procesy a softvér',
        description: 'Zmapujem, ako práca skutočne prebieha, vrátane odovzdávania práce, výnimiek a obchádzok, a odporučím zmenu s najväčším prínosom spolu s jasnou metrikou úspechu.',
      },
      {
        title: 'Implementácia',
        description: 'Postavím a otestujem dohodnutý softvér, automatizáciu, AI agenta alebo ich kombináciu na reálnych úlohách.',
      },
      {
        title: 'Zavedenie a odovzdanie',
        description: 'Pomôžem Vášmu tímu zaviesť riešenie do každodennej práce, zmerať výsledok a prevziať ho do vlastných rúk. Ak to dáva zmysel, podpora môže pokračovať.',
      },
    ],
  );
});

test('homepage presents a free consultation as the simple first step', () => {
  assert.deepEqual(en.home.firstStepOffer, {
    eyebrow: 'A simple first step',
    title: 'Start with a Free 30-Minute Consultation',
    description: 'Tell me where work is slow, manual, or constrained by your current software. We’ll clarify the problem, determine whether I can help, and agree on the right next step. No commitment.',
    cta: 'Book a Free Consultation',
  });

  assert.deepEqual(sk.home.firstStepOffer, {
    eyebrow: 'Jednoduchý prvý krok',
    title: 'Začnime bezplatnou 30-minútovou konzultáciou',
    description: 'Povedzte mi, kde sa vo Vašej firme práca spomaľuje, zostáva manuálna alebo ju obmedzuje súčasný softvér. Spoločne si ujasníme problém, posúdime, či Vám viem pomôcť, a dohodneme sa na správnom ďalšom kroku. Bez záväzkov.',
    cta: 'Dohodnúť si bezplatnú konzultáciu',
  });
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

test('machine-readable copy mirrors the free consultation callout', () => {
  assert.match(llms, /\*\*Start with a Free 30-Minute Consultation\*\* — Tell me where work is slow/);
  assert.match(llms, /\*\*Začnime bezplatnou 30-minútovou konzultáciou\*\* — Povedzte mi, kde sa vo Vašej firme práca spomaľuje/);
  assert.match(llms, /const EN = `# Matej Lukášik — AI Systems & Software Engineering Consultant/);
  assert.match(llms, /const SK = `# Matej Lukášik — Konzultant pre AI systémy a softvérové inžinierstvo/);
  assert.match(llms, /\*\*Workflow & Software Assessment Sprint\*\*/);
  assert.match(llms, /1\. Free 30-Minute Consultation — We discuss the business problem/);
  assert.match(llms, /1\. Bezplatná 30-minútová konzultácia — Preberieme problém vo Vašom podnikaní/);
  assert.match(llms, /Maps how work actually happens, including handoffs, exceptions, workarounds, and the systems involved/);
  assert.match(llms, /Improve or connect existing systems before recommending replacement/);
  assert.match(llms, /Mapuje prácu tak, ako skutočne prebieha, vrátane používaných systémov, odovzdávania práce, výnimiek a obchádzok/);
  assert.match(llms, /Zlepšiť alebo prepojiť existujúce systémy skôr, než sa odporučí ich výmena/);
  assert.doesNotMatch(llms, /const EN = `# Matej Lukášik — AI Agent Consulting/);
  assert.doesNotMatch(llms, /AI agent konzulting|Samostatny AI agent konzultant/);
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
