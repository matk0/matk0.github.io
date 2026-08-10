import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const calEmbed = readFileSync(new URL('../src/components/CalEmbed.astro', import.meta.url), 'utf8');
const llms = readFileSync(new URL('../src/pages/llms.txt.ts', import.meta.url), 'utf8');
const en = JSON.parse(readFileSync(new URL('../src/i18n/en.json', import.meta.url), 'utf8'));
const sk = JSON.parse(readFileSync(new URL('../src/i18n/sk.json', import.meta.url), 'utf8'));

test('calendar embed books the free 30-minute consultation', () => {
  assert.match(calEmbed, /https:\/\/app\.cal\.com\/embed\/embed\.js/);
  assert.match(calEmbed, /origin: "https:\/\/cal\.com"/);
  assert.match(calEmbed, /lang === 'sk' \? 'matejlukasik\/bezplatna-konzultacia'/);
  assert.match(calEmbed, /: 'matejlukasik\/free-consultation'/);
  assert.doesNotMatch(calEmbed, /cal\.eu/);
});

test('booking journey consistently promises a 30-minute call', () => {
  const consultationCopy = [
    en.home.processSteps[0].title,
    en.home.ctaBandDescription,
    en.services.notSure.description,
    sk.home.processSteps[0].title,
    sk.home.ctaBandDescription,
    sk.services.notSure.description,
  ];

  for (const copy of consultationCopy) {
    assert.match(copy, /30/);
    assert.doesNotMatch(copy, /45/);
  }

  assert.match(llms, /Free 30-Minute Consultation/);
  assert.doesNotMatch(llms, /free 45-minute/);
  assert.match(llms, /Bezplatná 30-minútová konzultácia/);
  assert.doesNotMatch(llms, /bezplatna 45-minutova/);
  assert.doesNotMatch(JSON.stringify({ en, sk }), /AI opportunity diagnostic|diagnostik[aouy] možností AI/i);
});
