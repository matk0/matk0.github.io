import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const sk = JSON.parse(readFileSync(new URL('../src/i18n/sk.json', import.meta.url), 'utf8'));
const privacy = readFileSync(new URL('../src/pages/sukromie.astro', import.meta.url), 'utf8');
const layout = readFileSync(new URL('../src/layouts/Layout.astro', import.meta.url), 'utf8');
const structuredData = readFileSync(new URL('../src/structured-data.ts', import.meta.url), 'utf8');

test('Slovak email invitations and supporting copy use Slovak diacritics', () => {
  assert.equal(sk.projects.cta, 'Napíšte mi');
  assert.equal(sk.services.notSure.cta, 'Napíšte mi');
  assert.equal(sk.about.ctaPrimary, 'Napíšte mi');
  assert.equal(sk.about.ctaSecondary, 'Napíšte mi');
  assert.equal(sk.home.ctaBandDescription, 'Napíšte mi email o Vašom projekte alebo otázke a ozvem sa Vám.');
  assert.equal(sk.contact.email, 'matej@matejlukasik.com');
  assert.equal('formTitle' in sk.contact, false);
  assert.equal('serviceOptions' in sk.contact, false);
  assert.equal(sk.contact.faqTitle, 'Často kladené otázky');
  assert.equal(sk.contact.faq[0].question, 'Nevieme, či potrebujeme nový softvér, automatizáciu alebo AI. Má zmysel sa ozvať?');
  assert.ok(sk.contact.faq.some((item) => item.question === 'Aké technológie používate?'));
  assert.ok(sk.contact.faq.some((item) => item.question === 'Čo sa stane po odovzdaní riešenia?'));
  assert.equal(sk.footer.description, 'Nahraďte časovo náročné procesy a softvér, ktorý už Vašej firme nevyhovuje.');
  assert.equal(sk.footer.navigation, 'Navigácia');
  assert.equal(sk.footer.copyright, 'Matej Lukášik. Všetky práva vyhradené.');
});

test('Slovak tools FAQ explains selection in plain business language', () => {
  const toolsFaq = sk.contact.faq.find((item) => item.question === 'Aké technológie používate?');

  assert.ok(toolsFaq);
  assert.match(toolsFaq.answer, /Technológiu vyberám až po pochopení problému/);
  assert.match(toolsFaq.answer, /prevádzkové náklady/);
  assert.doesNotMatch(toolsFaq.answer, /workflow|frontier|stack|self-hosting/i);
});

test('Slovak privacy metadata uses Slovak diacritics', () => {
  assert.match(privacy, /description="Ako táto stránka pracuje s údajmi z emailových dopytov, analytiky a hostingu\."/);
  assert.match(structuredData, /Pomáham firmám nahrádzať časovo náročné procesy/);
  assert.match(layout, /getStructuredData/);
});
