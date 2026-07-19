import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const calEmbed = readFileSync(new URL('../src/components/CalEmbed.astro', import.meta.url), 'utf8');
const llms = readFileSync(new URL('../src/pages/llms.txt.ts', import.meta.url), 'utf8');
const en = JSON.parse(readFileSync(new URL('../src/i18n/en.json', import.meta.url), 'utf8'));
const sk = JSON.parse(readFileSync(new URL('../src/i18n/sk.json', import.meta.url), 'utf8'));

test('calendar embed books the free 45-minute consultation', () => {
  assert.match(calEmbed, /https:\/\/app\.cal\.com\/embed\/embed\.js/);
  assert.match(calEmbed, /origin: "https:\/\/cal\.com"/);
  assert.match(calEmbed, /lang === 'sk' \? 'matejlukasik\/bezplatna-konzultacia'/);
  assert.match(calEmbed, /: 'matejlukasik\/free-consultation'/);
  assert.doesNotMatch(calEmbed, /cal\.eu/);
});

test('consultation copy consistently promises a 45-minute call', () => {
  const consultationCopy = [
    en.home.processSteps[0].description,
    en.home.ctaBandDescription,
    en.services.notSure.description,
    sk.home.processSteps[0].description,
    sk.home.ctaBandDescription,
    sk.services.notSure.description,
  ];

  for (const copy of consultationCopy) {
    assert.match(copy, /45/);
    assert.doesNotMatch(copy, /30/);
  }

  assert.match(llms, /free 45-minute/);
  assert.doesNotMatch(llms, /free 30-minute/);
  assert.match(llms, /bezplatnych 45 minut/);
  assert.doesNotMatch(llms, /bezplatnych 30 minut/);
});
