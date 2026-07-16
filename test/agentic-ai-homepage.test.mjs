import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const index = readFileSync(new URL('../src/pages/index.astro', import.meta.url), 'utf8');
const en = JSON.parse(readFileSync(new URL('../src/i18n/en.json', import.meta.url), 'utf8'));
const sk = JSON.parse(readFileSync(new URL('../src/i18n/sk.json', import.meta.url), 'utf8'));

test('the public homepage is the Agentic AI consulting site', () => {
  assert.equal(en.home.heroTitle, 'AI agents for your team.');
  assert.equal(sk.home.heroTitle, 'AI agenti pre Váš tím.');
  assert.equal(sk.home.firstStepOffer.title, 'Audit AI príležitostí a rizík');
  assert.match(index, /<Hero\s/);
  assert.match(index, /title=\{strings\.home\.heroTitle\}/);
  assert.match(index, /<ServiceCard/);
  assert.match(index, /<FirstStepOffer/);
  assert.doesNotMatch(index, /Strategický poradca/);
});
