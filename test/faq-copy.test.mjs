import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const en = JSON.parse(readFileSync(new URL('../src/i18n/en.json', import.meta.url), 'utf8'));
const sk = JSON.parse(readFileSync(new URL('../src/i18n/sk.json', import.meta.url), 'utf8'));

test('Slovak FAQ addresses the full client decision path', () => {
  assert.deepEqual(
    sk.contact.faq.map((item) => item.question),
    [
      'Nevieme, či potrebujeme nový softvér, automatizáciu alebo AI. Má zmysel sa ozvať?',
      'Ako dlho trvá implementácia?',
      'Ako zistíme, či riešenie skutočne prináša hodnotu?',
      'Ako riešite bezpečnosť dát?',
      'Potrebujeme vlastný technický tím?',
      'Aké technológie používate?',
      'Čo sa stane po odovzdaní riešenia?',
    ],
  );

  assert.match(sk.contact.faq[0].answer, /Assessment Sprint/);
  assert.match(sk.contact.faq[1].answer, /realistický plán implementácie/);
  assert.match(sk.contact.faq[2].answer, /ušetrený čas/);
  assert.match(sk.contact.faq[3].answer, /oprávnenia/);
  assert.match(sk.contact.faq[6].answer, /Váš tím/);
});

test('English FAQ mirrors the Slovak FAQ scope', () => {
  assert.deepEqual(
    en.contact.faq.map((item) => item.question),
    [
      'We don’t know whether we need new software, automation, or AI. Is it worth getting in touch?',
      'How long does an implementation take?',
      'How do we know whether the solution is creating real value?',
      'How do you handle data security?',
      'Do we need our own technical team?',
      'What technology do you use?',
      'What happens after handoff?',
    ],
  );
});

test('Tools FAQ explains selection in plain business language in both languages', () => {
  const slovakToolsFaq = sk.contact.faq.find((item) => item.question === 'Aké technológie používate?');
  const englishToolsFaq = en.contact.faq.find((item) => item.question === 'What technology do you use?');

  assert.ok(slovakToolsFaq);
  assert.ok(englishToolsFaq);

  assert.match(slovakToolsFaq.answer, /pochopení problému/);
  assert.match(slovakToolsFaq.answer, /softvér na mieru/);
  assert.match(slovakToolsFaq.answer, /prevádzkové náklady/);
  assert.match(englishToolsFaq.answer, /understanding the problem/);
  assert.match(englishToolsFaq.answer, /bespoke software/);
  assert.match(englishToolsFaq.answer, /operating cost/);

  for (const answer of [slovakToolsFaq.answer, englishToolsFaq.answer]) {
    assert.doesNotMatch(answer, /workflow|frontier|stack|self-hosting|LangChain|CrewAI/i);
  }
});
