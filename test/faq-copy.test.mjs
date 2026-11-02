import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const en = JSON.parse(readFileSync(new URL('../src/i18n/en.json', import.meta.url), 'utf8'));

test('English FAQ addresses the client decision path', () => {
  assert.deepEqual(
    en.contact.faq.map((item) => item.question),
    [
      'We don’t know whether we need new software, automation, or AI. Is it worth getting in touch?',
      'Do we need to replace our current software?',
      'How long does an implementation take?',
      'How do we know whether the solution is creating real value?',
      'How do you handle data security?',
      'Do we need our own technical team?',
      'What technology do you use?',
      'What happens after handoff?',
    ],
  );

  assert.match(en.contact.faq[1].answer, /improve or connect/);
  assert.match(en.contact.faq[1].answer, /replacing software/);
});

test('Tools FAQ explains selection in plain business language', () => {

  const englishToolsFaq = en.contact.faq.find((item) => item.question === 'What technology do you use?');

  assert.ok(englishToolsFaq);

  assert.match(englishToolsFaq.answer, /understanding the problem/);
  assert.match(englishToolsFaq.answer, /bespoke software/);
  assert.match(englishToolsFaq.answer, /operating cost/);

  for (const answer of [englishToolsFaq.answer]) {
    assert.doesNotMatch(answer, /workflow|frontier|stack|self-hosting|LangChain|CrewAI/i);
  }
});
