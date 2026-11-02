import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const index = readFileSync(new URL('../src/pages/index.astro', import.meta.url), 'utf8');
const painCard = readFileSync(new URL('../src/components/PainCard.astro', import.meta.url), 'utf8');

test('the removed pain card section is not rendered on the homepage', () => {
  assert.doesNotMatch(index, /<PainCard|pain-clarity-consulting|pain-value-automation|pain-security-agent/);
});

test('pain card keeps image rendering and emoji fallback', () => {
  assert.match(painCard, /imageSrc\?: string/);
  assert.match(painCard, /<img\s+src=\{imageSrc\}/);
  assert.match(painCard, /\{icon\}/);
});
