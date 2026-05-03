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

  assert.match(sk.contact.faq[0].answer, /jasný prvý use case/);
  assert.match(sk.contact.faq[2].answer, /ušetrený čas/);
  assert.match(sk.contact.faq[3].answer, /oprávnenia/);
  assert.match(sk.contact.faq[6].answer, /Váš tím/);
});

test('English FAQ mirrors the Slovak FAQ scope', () => {
  assert.deepEqual(
    en.contact.faq.map((item) => item.question),
    [
      'We do not know where to start with AI. Is it worth getting in touch?',
      'How long does the first rollout take?',
      'How do we know whether AI is creating real value?',
      'How do you handle data safety?',
      'Do we need our own technical team?',
      'What tools do you work with?',
      'What happens after handoff?',
    ],
  );
});

test('Tools FAQ names concrete categories and tools in both languages', () => {
  const slovakToolsFaq = sk.contact.faq.find((item) => item.question === 'S akými nástrojmi pracujete?');
  const englishToolsFaq = en.contact.faq.find((item) => item.question === 'What tools do you work with?');

  assert.ok(slovakToolsFaq);
  assert.ok(englishToolsFaq);

  for (const answer of [slovakToolsFaq.answer, englishToolsFaq.answer]) {
    assert.match(answer, /n8n/);
    assert.match(answer, /CrewAI/);
    assert.match(answer, /LangChain\/LangGraph/);
    assert.match(answer, /OpenAI/);
    assert.match(answer, /Anthropic/);
    assert.match(answer, /Mistral/);
    assert.match(answer, /Llama/);
    assert.match(answer, /Codex/);
    assert.match(answer, /Claude Code/);
    assert.match(answer, /OpenClaw/);
    assert.match(answer, /Hermes Agent/);
  }
});
