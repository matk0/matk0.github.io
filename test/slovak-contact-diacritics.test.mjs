import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const sk = JSON.parse(readFileSync(new URL('../src/i18n/sk.json', import.meta.url), 'utf8'));
const kontaktPage = readFileSync(new URL('../src/pages/kontakt.astro', import.meta.url), 'utf8');
const layout = readFileSync(new URL('../src/layouts/Layout.astro', import.meta.url), 'utf8');
const structuredData = readFileSync(new URL('../src/structured-data.ts', import.meta.url), 'utf8');

test('Slovak contact page copy uses Slovak diacritics', () => {
  assert.equal(sk.contact.heroDescription, 'Či už máte jasný projekt, alebo len otázky — som tu.');
  assert.equal(sk.contact.formTitle, 'Napíšte mi');
  assert.equal(sk.contact.namePlaceholder, 'Vaše meno');
  assert.equal(sk.contact.serviceLabel, 'O čo máte záujem?');
  assert.equal(sk.contact.serviceOptions.consulting, 'Audit procesov a AI príležitostí');
  assert.equal(sk.contact.serviceOptions.implementation, 'Automatizácia jedného konkrétneho procesu');
  assert.equal(sk.contact.serviceOptions.training, 'AI v každodennej práci tímu');
  assert.equal(sk.contact.serviceOptions.notSure, 'Zatiaľ neviem');
  assert.equal(sk.contact.messageLabel, 'Správa');
  assert.equal(sk.contact.messagePlaceholder, 'Povedzte mi o Vašom projekte alebo otázke...');
  assert.equal(sk.contact.submit, 'Odoslať správu');
  assert.equal(sk.contact.success, 'Správa odoslaná! Ozvem sa do 24 hodín.');
  assert.equal(sk.contact.error, 'Niečo sa pokazilo. Skúste to znova alebo mi napíšte priamo na matej@matejlukasik.com.');
  assert.equal(sk.contact.bookTitle, '45-minútová diagnostika možností AI');
  assert.equal(sk.contact.bookDescription, 'Za 45 minút zmapujeme jeden opakujúci sa proces a posúdime, či sa ho oplatí automatizovať. Ak nie, poviem Vám to priamo. Diagnostika je bezplatná a bez záväzkov.');
  assert.equal(sk.contact.faqTitle, 'Často kladené otázky');
  assert.equal(sk.contact.faq[0].question, 'Nevieme, kde s AI začať. Má zmysel sa ozvať?');
  assert.equal(sk.contact.faq[5].question, 'S akými nástrojmi pracujete?');
  assert.equal(sk.contact.faq[6].question, 'Čo sa stane po odovzdaní riešenia?');
  assert.equal(sk.footer.description, 'Prestaňte robiť prácu, ktorú má za Vás robiť AI.');
  assert.equal(sk.footer.navigation, 'Navigácia');
  assert.equal(sk.footer.copyright, 'Matej Lukášik. Všetky práva vyhradené.');
});

test('Slovak tools FAQ explains selection in plain business language', () => {
  const toolsFaq = sk.contact.faq.find((item) => item.question === 'S akými nástrojmi pracujete?');

  assert.ok(toolsFaq);
  assert.match(toolsFaq.answer, /Nástroj vyberám až po pochopení procesu/);
  assert.match(toolsFaq.answer, /prevádzkové náklady/);
  assert.doesNotMatch(toolsFaq.answer, /workflow|frontier|stack|self-hosting/i);
});

test('Slovak contact page metadata uses Slovak diacritics', () => {
  assert.match(kontaktPage, /Dohodnite si 45-minútovú diagnostiku možností AI alebo mi napíšte správu\./);
  assert.match(structuredData, /Pomáham firmám nájsť opakujúcu sa prácu, ktorá im berie najviac času, zjednodušiť ju, zautomatizovať a zmerať výsledok\./);
  assert.match(layout, /getStructuredData/);
});
