import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const sk = JSON.parse(readFileSync(new URL('../src/i18n/sk.json', import.meta.url), 'utf8'));
const kontaktPage = readFileSync(new URL('../src/pages/kontakt.astro', import.meta.url), 'utf8');
const layout = readFileSync(new URL('../src/layouts/Layout.astro', import.meta.url), 'utf8');

test('Slovak contact page copy uses Slovak diacritics', () => {
  assert.equal(sk.contact.heroDescription, 'Či už máte jasný projekt, alebo len otázky — som tu.');
  assert.equal(sk.contact.formTitle, 'Napíšte mi');
  assert.equal(sk.contact.namePlaceholder, 'Vaše meno');
  assert.equal(sk.contact.serviceLabel, 'O čo máte záujem?');
  assert.equal(sk.contact.serviceOptions.implementation, 'Postaviť AI workflow v praxi');
  assert.equal(sk.contact.serviceOptions.training, 'Zaučiť tím do nového workflowu');
  assert.equal(sk.contact.serviceOptions.notSure, 'Zatiaľ neviem');
  assert.equal(sk.contact.messageLabel, 'Správa');
  assert.equal(sk.contact.messagePlaceholder, 'Povedzte mi o Vašom projekte alebo otázke...');
  assert.equal(sk.contact.submit, 'Odoslať správu');
  assert.equal(sk.contact.success, 'Správa odoslaná! Ozvem sa do 24 hodín.');
  assert.equal(sk.contact.error, 'Niečo sa pokazilo. Skúste to znova alebo mi napíšte priamo na matej@matejlukasik.com.');
  assert.equal(sk.contact.bookTitle, 'Dohodnúť hovor');
  assert.equal(sk.contact.bookDescription, 'Vyberte si čas, ktorý Vám vyhovuje.');
  assert.equal(sk.contact.faqTitle, 'Často kladené otázky');
  assert.equal(sk.contact.faq[0].question, 'Nevieme, kde s AI začať. Má zmysel sa ozvať?');
  assert.equal(sk.contact.faq[5].question, 'S akými nástrojmi pracujete?');
  assert.equal(sk.contact.faq[6].question, 'Čo sa stane po odovzdaní riešenia?');
  assert.equal(sk.footer.description, 'AI workflowy pre zakladateľov a malé tímy, ktoré chcú používať AI prakticky a pod kontrolou.');
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
  assert.match(kontaktPage, /Spojte sa so mnou\. Napíšte správu alebo si dohodnite bezplatnú konzultáciu\./);
  assert.match(layout, /Technická, UX a SEO práca pre zakladateľské e-shopy, ktoré chcú predávať viac\./);
});
