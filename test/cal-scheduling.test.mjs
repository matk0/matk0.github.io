import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const calEmbed = readFileSync(new URL('../src/components/CalEmbed.astro', import.meta.url), 'utf8');
const contact = readFileSync(new URL('../src/pages/contact.astro', import.meta.url), 'utf8');
const kontakt = readFileSync(new URL('../src/pages/kontakt.astro', import.meta.url), 'utf8');
const en = JSON.parse(readFileSync(new URL('../src/i18n/en.json', import.meta.url), 'utf8'));
const sk = JSON.parse(readFileSync(new URL('../src/i18n/sk.json', import.meta.url), 'utf8'));

test('calendar embed uses the paid two-hour Strategic Consultation', () => {
  assert.match(calEmbed, /https:\/\/app\.cal\.com\/embed\/embed\.js/);
  assert.match(calEmbed, /origin: "https:\/\/cal\.com"/);
  assert.match(calEmbed, /calLink: "matejlukasik\/strategic-consultation"/);
  assert.doesNotMatch(calEmbed, /cal\.eu/);

  assert.equal(en.nav.bookCall, 'Book consultation');
  assert.equal(en.contact.bookTitle, 'Book a Strategic Consultation');
  assert.match(en.contact.bookDescription, /€300/);
  assert.match(en.contact.bookDescription, /two-hour/);
  assert.equal(sk.nav.bookCall, 'Rezervovať konzultáciu');
  assert.equal(sk.contact.bookTitle, 'Rezervovať strategickú konzultáciu');
  assert.match(sk.contact.bookDescription, /300 €/);
  assert.match(sk.contact.bookDescription, /dvojhodinovú/);

  assert.doesNotMatch(contact, /free consultation/i);
  assert.doesNotMatch(kontakt, /bezplatnú konzultáciu/i);
});
