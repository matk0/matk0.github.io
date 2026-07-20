import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const en = JSON.parse(readFileSync(new URL('../src/i18n/en.json', import.meta.url), 'utf8'));
const sk = JSON.parse(readFileSync(new URL('../src/i18n/sk.json', import.meta.url), 'utf8'));

test('Slovak FAQ addresses the full client decision path', () => {
  assert.deepEqual(
    sk.contact.faq.map((item) => item.question),
    [
      'Nevieme, kde s AI začať. Má zmysel sa ozvať?',
      'Ako dlho trvá prvé nasadenie?',
      'Ako zistíme, či AI naozaj prináša hodnotu?',
      'Ako riešite bezpečnosť dát?',
      'Potrebujeme vlastný technický tím?',
      'S akými nástrojmi pracujete?',
      'Čo sa stane po odovzdaní riešenia?',
    ],
  );

  assert.match(sk.contact.faq[0].answer, /prvý proces, ktorý sa oplatí riešiť/);
  assert.match(sk.contact.faq[2].answer, /ušetrený čas/);
  assert.match(sk.contact.faq[3].answer, /oprávnenia/);
  assert.match(sk.contact.faq[6].answer, /Váš tím/);
});

test('English FAQ mirrors the Slovak FAQ scope', () => {
  assert.deepEqual(
    en.contact.faq.map((item) => item.question),
    [
      "We don't know where to start with AI. Is it worth getting in touch?",
      'How long does the first deployment take?',
      'How do we know whether AI is creating real value?',
      'How do you handle data security?',
      'Do we need our own technical team?',
      'What tools do you work with?',
      'What happens after handoff?',
    ],
  );
});

test('Tools FAQ explains selection in plain business language in both languages', () => {
  const slovakToolsFaq = sk.contact.faq.find((item) => item.question === 'S akými nástrojmi pracujete?');
  const englishToolsFaq = en.contact.faq.find((item) => item.question === 'What tools do you work with?');

  assert.ok(slovakToolsFaq);
  assert.ok(englishToolsFaq);

  assert.match(slovakToolsFaq.answer, /pochopení procesu/);
  assert.match(slovakToolsFaq.answer, /jednoduchá automatizácia/);
  assert.match(slovakToolsFaq.answer, /prevádzkové náklady/);
  assert.match(englishToolsFaq.answer, /understanding the process/);
  assert.match(englishToolsFaq.answer, /simple automation/);
  assert.match(englishToolsFaq.answer, /operating cost/);

  for (const answer of [slovakToolsFaq.answer, englishToolsFaq.answer]) {
    assert.doesNotMatch(answer, /workflow|frontier|stack|self-hosting|LangChain|CrewAI/i);
  }
});
