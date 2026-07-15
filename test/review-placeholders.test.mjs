import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const index = readFileSync(new URL('../src/pages/index.astro', import.meta.url), 'utf8');

test('dummy reviews are unmistakable development placeholders and never render in production', () => {
  assert.match(index, /const showReviewPlaceholders = import\.meta\.env\.DEV;/);
  assert.match(index, /\{showReviewPlaceholders && \(/);
  assert.match(index, /Development placeholders · Not published on the live site/);
  assert.match(index, /Vývojové zástupné texty · Na živej stránke sa nezobrazia/);
  assert.equal(index.match(/data-placeholder-review="true"/g)?.length, 1);
  assert.match(index, /\[Replace with a verified client quote/);
  assert.match(index, /\[Nahraďte overeným vyjadrením klienta/);
});
