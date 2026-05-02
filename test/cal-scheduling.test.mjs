import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const calEmbed = readFileSync(new URL('../src/components/CalEmbed.astro', import.meta.url), 'utf8');

test('calendar embed uses Cal.com individual scheduling', () => {
  assert.match(calEmbed, /https:\/\/app\.cal\.com\/embed\/embed\.js/);
  assert.match(calEmbed, /origin: "https:\/\/cal\.com"/);
  assert.match(calEmbed, /calLink: "matejlukasik\/30min"/);
  assert.doesNotMatch(calEmbed, /cal\.eu/);
});
