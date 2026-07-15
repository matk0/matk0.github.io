import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const sk = JSON.parse(readFileSync(new URL('../src/i18n/sk.json', import.meta.url), 'utf8'));
const kontaktPage = readFileSync(new URL('../src/pages/kontakt.astro', import.meta.url), 'utf8');
const layout = readFileSync(new URL('../src/layouts/Layout.astro', import.meta.url), 'utf8');

test('Slovak contact page copy uses Slovak diacritics', () => {
  assert.equal(sk.contact.heroTitle, 'Prineste mi rozhodnutie');
  assert.equal(sk.contact.heroDescription, 'Rezervujte si strategickú konzultáciu alebo mi napíšte o situácii, ktorá potrebuje diagnózu.');
  assert.equal(sk.contact.formTitle, 'Prediskutovať väčšiu spoluprácu');
  assert.equal(sk.contact.namePlaceholder, 'Vaše meno');
  assert.equal(sk.contact.serviceLabel, 'O čo máte záujem?');
  assert.equal(sk.contact.serviceOptions.consulting, 'Strategická konzultácia');
  assert.equal(sk.contact.serviceOptions.implementation, 'Strategická diagnóza');
  assert.equal(sk.contact.serviceOptions.training, 'Co-CEO na mesiac');
  assert.equal(sk.contact.serviceOptions.notSure, 'Iná strategická otázka');
  assert.equal(sk.contact.messageLabel, 'Správa');
  assert.equal(sk.contact.messagePlaceholder, 'Opíšte rozhodnutie, relevantný kontext a prečo je dôležité práve teraz...');
  assert.equal(sk.contact.submit, 'Odoslať správu');
  assert.equal(sk.contact.success, 'Správa odoslaná! Ozvem sa do 24 hodín.');
  assert.equal(sk.contact.error, 'Niečo sa pokazilo. Skúste to znova alebo mi napíšte priamo na matej@matejlukasik.com.');
  assert.equal(sk.contact.bookTitle, 'Rezervovať strategickú konzultáciu');
  assert.equal(sk.contact.bookDescription, '300 € za súkromnú dvojhodinovú pracovnú konzultáciu, krátky vstupný dotazník a stručné písomné zhrnutie.');
  assert.equal(sk.contact.faqTitle, 'Často kladené otázky');
  assert.equal(sk.contact.faq[0].question, 'Nevieme, kde s AI začať. Má zmysel sa ozvať?');
  assert.equal(sk.contact.faq[5].question, 'S akými nástrojmi pracujete?');
  assert.equal(sk.contact.faq[6].question, 'Čo sa stane po odovzdaní riešenia?');
  assert.equal(sk.footer.description, 'Strategické poradenstvo pre zakladateľov digitálnych firiem.');
  assert.equal(sk.footer.navigation, 'Navigácia');
  assert.equal(sk.footer.copyright, 'Matej Lukášik. Všetky práva vyhradené.');
});

test('Slovak tools FAQ names concrete categories and tools', () => {
  const toolsFaq = sk.contact.faq.find((item) => item.question === 'S akými nástrojmi pracujete?');

  assert.ok(toolsFaq);
  assert.match(toolsFaq.answer, /nástrojmi, ktoré už používate/i);
  assert.match(toolsFaq.answer, /email/);
  assert.match(toolsFaq.answer, /kalendár/);
  assert.match(toolsFaq.answer, /CRM/);
  assert.match(toolsFaq.answer, /Trello/);
  assert.match(toolsFaq.answer, /Notion/);
  assert.match(toolsFaq.answer, /automatizačné platformy/);
  assert.match(toolsFaq.answer, /AI modely/);
  assert.match(toolsFaq.answer, /ľahký vlastný kód/);
});

test('Slovak contact page metadata uses Slovak diacritics', () => {
  assert.match(kontaktPage, /Rezervujte si dvojhodinovú strategickú konzultáciu alebo prediskutujte rozsiahlejšiu spoluprácu\./);
  assert.match(layout, /Strategické poradenstvo pre zakladateľov digitálnych firiem\./);
});
