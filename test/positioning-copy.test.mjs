import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const en = JSON.parse(readFileSync(new URL('../src/i18n/en.json', import.meta.url), 'utf8'));

const llms = readFileSync(new URL('../src/pages/llms.txt.ts', import.meta.url), 'utf8');
const llmsFull = readFileSync(new URL('../src/pages/llms-full.txt.ts', import.meta.url), 'utf8');
const homepage = readFileSync(new URL('../src/pages/index.astro', import.meta.url), 'utf8');
const structuredData = readFileSync(new URL('../src/structured-data.ts', import.meta.url), 'utf8');

test('public positioning remains neutral about company size', () => {
  const publicPositioning = [JSON.stringify(en), llms, structuredData].join('\n');

  assert.doesNotMatch(publicPositioning, /\bSMBs?\b|small and medium-sized businesses/i);
  assert.doesNotMatch(
    publicPositioning,
    /mal(?:ým|é|ých)\s+a\s+stredn(?:ým|é|ých)\s+firm(?:ám|y|ách)/iu,
  );
});

test('english homepage positions Matej as an AI systems and software consultant', () => {
  assert.equal(en.home.pageTitle, 'Matej Lukášik — Senior Product Engineer');
  assert.equal(en.home.heroTitle, 'Senior Product Engineer');
  assert.equal(
    en.home.heroDescription,
    'I turn loosely defined problems into simple, reliable software products. I take ownership from understanding the customer’s problem and shaping scope through design, implementation, release and improvement.',
  );
  assert.equal(en.home.heroExperience, '10+ years building software · Former Product Engineer at Doconomy · Former CTO at Zeilenwerk');
  assert.equal(en.home.ctaBandTitle, "Let's start with the process that costs your business the most time.");
  assert.equal(
    en.home.ctaBandDescription,
    'Email me about your project or question, and I’ll get back to you.',
  );
  assert.equal(
    en.home.processSteps[0].description,
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
  assert.equal(en.about.bioTitle, 'Senior Product Engineer');
  assert.equal(
    en.about.bioText.replace(/\*\*/g, ''),
    'My strength is asking the questions that bring clarity to complex, loosely defined problems. When people come to me with competing ideas, requirements, feedback and constraints, I listen and help define what matters: the problem to solve, what is worth building, what would add complexity without value and what we still need to understand.\n\nI take responsibility for a feature or product from that first conversation through design, implementation, release and improvement. I get to know the customers, business and existing systems, make the necessary decisions and tradeoffs, and stay involved after launch to understand what works and what needs improving.\n\nI’ve spent the past ten years working remotely with small and medium-sized companies. I value autonomy, trust and clear asynchronous communication. I take initiative, communicate decisions and keep the people I work with informed.\n\nI live in Trnava, Slovakia, and love spending time with my family—walking in nature, solving escape rooms, or going out for tea and cookies. I’m fascinated by ancient Greece, philosophy, and questions of conviction, ambition and free will. Steven Pressfield’s Gates of Fire and Tides of War are particular favourites. I believe in being the author of your own story and enjoying the ride with the people you love.',
  );
});

test('service copy presents the assessment, implementation, and adoption lifecycle', () => {
  assert.deepEqual(
    [en.home.consultingTitle, en.services.consulting.title],
    ['Workflow & Software Assessment Sprint', 'Workflow & Software Assessment Sprint'],
  );
  assert.deepEqual(
    [en.home.implementationTitle, en.services.implementation.title],
    ['Bespoke Software, Automation & AI Agents', 'Bespoke Software, Automation & AI Agents'],
  );
  assert.deepEqual(
    [en.home.trainingTitle, en.services.training.title],
    ['Adoption, Handoff & Improvement', 'Adoption, Handoff & Improvement'],
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

  assert.equal(en.services.consulting.cta, 'Discuss an Assessment Sprint');
  assert.equal(en.services.implementation.cta, 'Discuss an Implementation');
  assert.equal(en.services.training.cta, 'Discuss Adoption & Support');

});

test('pain copy names recognizable recurring work and measurable outcomes', () => {

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

test('contact invitations use direct email without form or booking copy', () => {
  for (const copy of [en]) {
    assert.equal('bookCall' in copy.nav, false);
    assert.equal('ctaPrimary' in copy.home, false);
    assert.equal('firstStepOffer' in copy.home, false);
    assert.equal('bookTitle' in copy.contact, false);
    assert.equal('bookDescription' in copy.contact, false);
    assert.equal('bookingPrivacyNotice' in copy.contact, false);
    assert.equal('formTitle' in copy.contact, false);
    assert.equal('serviceOptions' in copy.contact, false);
    assert.equal(copy.contact.email, 'matej@matejlukasik.com');
  }
  assert.equal(en.services.notSure.cta, 'Email me');

  assert.equal(en.projects.cta, 'Email me');

  assert.equal('heroDescription' in en.contact, false);

});

test('process copy follows assessment, implementation, and handoff', () => {
  assert.equal(en.home.processTitle, 'How We Work Together');
  assert.deepEqual(
    en.home.processSteps.map(({ title, description }) => ({ title, description })),
    [
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

});

test('service pages avoid premature architecture promises', () => {
  const combinedCopy = `${JSON.stringify({ en })}\n${llms}`;
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

test('machine-readable copy preserves principles without removed sales sections', () => {
  assert.match(llms, /const EN = `# Matej Lukášik — AI Systems & Software Engineering Consultant/);
  assert.match(llms, /Improve or connect existing systems before recommending replacement/);

  assert.doesNotMatch(llms, /const EN = `# Matej Lukášik — AI Agent Consulting/);
  assert.doesNotMatch(llms, /AI agent konzulting|Samostatny AI agent konzultant/);
  assert.doesNotMatch(llms, /1–2 weeks|1–2 tyzdne|free.*consultation|bezplatn.*konzultáci/iu);
  assert.doesNotMatch(llms, /## (?:Services|Služby|Process|Proces|Research)\n|FAQ/);
  assert.match(llms, /\[Email Matej\]\(\$\{CONTACT_HREF\}\)/);
  assert.doesNotMatch(llms, /https:\/\/matejlukasik\.(?:com|sk)\/(?:contact|kontakt)/);

});

test('full machine-readable copy mirrors only sections rendered on the current site', () => {
  assert.doesNotMatch(homepage, /ProcessTimeline|<FAQ/);
  assert.doesNotMatch(llmsFull, /s\.home\.consultingTitle/);
  assert.doesNotMatch(llmsFull, /s\.home\.trustTitle/);
  assert.doesNotMatch(llmsFull, /s\.about\.approachTitle/);
  assert.doesNotMatch(llmsFull, /s\.about\.techTitle/);
  assert.doesNotMatch(llmsFull, /s\.home\.ctaBandTitle/);
  assert.doesNotMatch(llmsFull, /s\.home\.firstStepOffer/);
  assert.doesNotMatch(llmsFull, /s\.services\.|Services — detail|Služby — detail/);
  assert.doesNotMatch(llmsFull, /s\.home\.processTitle|s\.home\.processSteps|s\.contact\.faq/);
  assert.doesNotMatch(llmsFull, /s\.contact\.hero|contactPath/);
  assert.match(llmsFull, /\[\$\{CONTACT_EMAIL\}\]\(\$\{CONTACT_HREF\}\)/);
});
