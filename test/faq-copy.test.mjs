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
      'Musíme rozumieť AI agentom?',
      'Ako dlho trvá prvý workflow?',
      'Ako riešite bezpečnosť dát?',
      'Potrebujeme vlastný technický tím?',
      'S akými nástrojmi pracujete?',
      'Čo sa stane po odovzdaní riešenia?',
    ],
  );

  assert.match(sk.contact.faq[0].answer, /jasný prvý workflow/);
  assert.match(sk.contact.faq[1].answer, /Technické rozhodnutia/);
  assert.match(sk.contact.faq[2].answer, /10 pracovných dní/);
  assert.match(sk.contact.faq[3].answer, /oprávnenia/);
  assert.match(sk.contact.faq[6].answer, /ďalšie workflowy/);
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

test('Tools FAQ names concrete categories and tools in both languages', () => {
  const slovakToolsFaq = sk.contact.faq.find((item) => item.question === 'S akými nástrojmi pracujete?');
  const englishToolsFaq = en.contact.faq.find((item) => item.question === 'What tools do you work with?');

  assert.ok(slovakToolsFaq);
  assert.ok(englishToolsFaq);

  assert.match(slovakToolsFaq.answer, /email/);
  assert.match(slovakToolsFaq.answer, /kalendár/);
  assert.match(slovakToolsFaq.answer, /CRM/);
  assert.match(slovakToolsFaq.answer, /Trello/);
  assert.match(slovakToolsFaq.answer, /Notion/);
  assert.match(slovakToolsFaq.answer, /automatizačné platformy/);
  assert.match(slovakToolsFaq.answer, /AI modely/);
  assert.match(slovakToolsFaq.answer, /ľahký vlastný kód/);

  assert.match(englishToolsFaq.answer, /n8n/);
  assert.match(englishToolsFaq.answer, /CrewAI/);
  assert.match(englishToolsFaq.answer, /LangChain\/LangGraph/);
  assert.match(englishToolsFaq.answer, /OpenAI/);
  assert.match(englishToolsFaq.answer, /Anthropic/);
  assert.match(englishToolsFaq.answer, /Mistral/);
  assert.match(englishToolsFaq.answer, /Llama/);
  assert.match(englishToolsFaq.answer, /Codex/);
  assert.match(englishToolsFaq.answer, /Claude Code/);
  assert.match(englishToolsFaq.answer, /OpenClaw/);
  assert.match(englishToolsFaq.answer, /Hermes Agent/);
});
