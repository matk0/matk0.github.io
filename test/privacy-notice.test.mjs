import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const read = (path) => readFileSync(new URL(path, import.meta.url), 'utf8');

const privacy = read('../src/pages/privacy.astro');
const sukromie = read('../src/pages/sukromie.astro');
const contact = read('../src/pages/contact.astro');
const kontakt = read('../src/pages/kontakt.astro');
const contactForm = read('../src/components/ContactForm.astro');
const calEmbed = read('../src/components/CalEmbed.astro');
const en = JSON.parse(read('../src/i18n/en.json'));
const sk = JSON.parse(read('../src/i18n/sk.json'));

test('English privacy page contains the Article 13 notice essentials for contact, booking, analytics, and hosting', () => {
  [
    'Controller',
    'Matej Lukášik',
    'matej@matejlukasik.com',
    'What I collect',
    'Legal basis',
    'Retention',
    'Who receives data',
    'International transfers',
    'Your rights',
    'Úrad na ochranu osobných údajov Slovenskej republiky',
    'No automated decision-making',
    'Cal.com',
    'Resend',
    'Cloudflare',
    'Google Analytics',
  ].forEach((text) => assert.match(privacy, new RegExp(text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))));
});

test('Slovak privacy page mirrors the Article 13 notice essentials', () => {
  [
    'Prevádzkovateľ',
    'Matej Lukášik',
    'matej@matejlukasik.com',
    'Aké údaje spracúvam',
    'Právny základ',
    'Ako dlho údaje uchovávam',
    'Kto údaje prijíma',
    'Prenosy mimo EÚ',
    'Vaše práva',
    'Úrad na ochranu osobných údajov Slovenskej republiky',
    'Nepoužívam automatizované rozhodovanie',
    'Cal.com',
    'Resend',
    'Cloudflare',
    'Google Analytics',
  ].forEach((text) => assert.match(sukromie, new RegExp(text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))));
});

test('contact form provides privacy information at the point of collection', () => {
  assert.match(contactForm, /getLocalizedPaths/);
  assert.match(contactForm, /strings\.contact\.privacyNotice/);
  assert.match(contactForm, /strings\.contact\.privacyLink/);
  assert.match(contactForm, /href=\{paths\.privacy\}/);
  assert.equal(
    en.contact.privacyNotice,
    'I use these details only to respond to your inquiry.'
  );
  assert.equal(
    sk.contact.privacyNotice,
    'Tieto údaje použijem iba na odpoveď na Vašu správu.'
  );
});

test('booking embed discloses Cal.com processing and links to localized privacy details', () => {
  assert.match(contact, /<CalEmbed title=\{strings\.contact\.bookTitle\} description=\{strings\.contact\.bookDescription\} lang=\{lang\} \/>/);
  assert.match(kontakt, /<CalEmbed title=\{strings\.contact\.bookTitle\} description=\{strings\.contact\.bookDescription\} lang=\{lang\} \/>/);
  assert.match(calEmbed, /getLocalizedPaths/);
  assert.match(calEmbed, /strings\.contact\.bookingPrivacyNotice/);
  assert.match(calEmbed, /strings\.contact\.privacyLink/);
  assert.match(calEmbed, /href=\{paths\.privacy\}/);
  assert.equal(
    en.contact.bookingPrivacyNotice,
    'When you open the Contact page, Cal.com receives the technical data needed to display and protect the booking calendar. If you make a booking, it also processes the details you enter.'
  );
  assert.equal(
    sk.contact.bookingPrivacyNotice,
    'Pri otvorení stránky Kontakt dostane Cal.com technické údaje potrebné na zobrazenie a ochranu rezervačného kalendára. Ak vytvoríte rezerváciu, spracúva aj údaje, ktoré zadáte.'
  );
});

test('privacy pages disclose that Cal.com loads when the contact page opens', () => {
  assert.match(privacy, /when you open the Contact page, Cal\.com receives the technical data/);
  assert.match(sukromie, /pri otvorení stránky Kontakt dostane Cal\.com technické údaje/);
  assert.doesNotMatch(privacy, /after you request the booking calendar/);
  assert.doesNotMatch(sukromie, /po vyžiadaní rezervačného kalendára/);
});

test('English analytics notice excludes all form content from analytics', () => {
  assert.equal(
    en.cookieNotice.description,
    'I use optional analytics cookies to understand aggregate page views and conversion events. No form content or booking identifiers are sent.',
  );
});
