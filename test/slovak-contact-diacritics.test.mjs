import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const sk = JSON.parse(readFileSync(new URL('../src/i18n/sk.json', import.meta.url), 'utf8'));
const kontaktPage = readFileSync(new URL('../src/pages/kontakt.astro', import.meta.url), 'utf8');
const layout = readFileSync(new URL('../src/layouts/Layout.astro', import.meta.url), 'utf8');
const structuredData = readFileSync(new URL('../src/structured-data.ts', import.meta.url), 'utf8');

test('Slovak contact page copy uses Slovak diacritics', () => {
  assert.equal(sk.contact.heroDescription, 'Máte konkrétny projekt alebo chcete zistiť, kde začať? Dohodnite si bezplatnú konzultáciu alebo mi napíšte.');
  assert.equal(sk.contact.formTitle, 'Napíšte mi');
  assert.equal(sk.contact.namePlaceholder, 'Vaše meno');
  assert.equal(sk.contact.serviceLabel, 'O čo máte záujem?');
  assert.equal(sk.contact.serviceOptions.consulting, 'Assessment Sprint pre procesy a softvér');
  assert.equal(sk.contact.serviceOptions.implementation, 'Softvér na mieru, automatizácie a AI agenti');
  assert.equal(sk.contact.serviceOptions.training, 'Zavedenie do praxe, odovzdanie a zlepšovanie');
  assert.equal(sk.contact.serviceOptions.notSure, 'Zatiaľ neviem');
  assert.equal(sk.contact.messageLabel, 'Správa');
  assert.equal(sk.contact.messagePlaceholder, 'Povedzte mi o Vašom projekte alebo otázke...');
  assert.equal(sk.contact.submit, 'Odoslať správu');
  assert.equal(sk.contact.success, 'Správa odoslaná! Ozvem sa do 24 hodín.');
  assert.equal(sk.contact.error, 'Niečo sa pokazilo. Skúste to znova alebo mi napíšte priamo na matej@matejlukasik.com.');
  assert.equal(sk.contact.bookTitle, 'Bezplatná 30-minútová konzultácia');
  assert.equal(sk.contact.bookDescription, 'Povedzte mi, kde sa vo Vašej firme práca spomaľuje, zostáva manuálna alebo ju obmedzuje súčasný softvér. Spoločne si ujasníme problém, posúdime, či Vám viem pomôcť, a dohodneme sa na správnom ďalšom kroku. Bez záväzkov.');
  assert.equal(sk.contact.faqTitle, 'Často kladené otázky');
  assert.equal(sk.contact.faq[0].question, 'Nevieme, či potrebujeme nový softvér, automatizáciu alebo AI. Má zmysel sa ozvať?');
  assert.equal(sk.contact.faq[5].question, 'Aké technológie používate?');
  assert.equal(sk.contact.faq[6].question, 'Čo sa stane po odovzdaní riešenia?');
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

test('Slovak contact page metadata uses Slovak diacritics', () => {
  assert.match(kontaktPage, /Dohodnite si bezplatnú 30-minútovú konzultáciu alebo mi napíšte správu\./);
  assert.match(structuredData, /Pomáham malým a stredným firmám nahrádzať časovo náročné procesy/);
  assert.match(layout, /getStructuredData/);
});
