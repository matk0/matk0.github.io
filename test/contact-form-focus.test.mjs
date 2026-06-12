import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const index = readFileSync(new URL('../src/pages/index.astro', import.meta.url), 'utf8');
const nav = readFileSync(new URL('../src/components/Nav.astro', import.meta.url), 'utf8');
const calEmbed = readFileSync(new URL('../src/components/CalEmbed.astro', import.meta.url), 'utf8');
const contactForm = readFileSync(new URL('../src/components/ContactForm.astro', import.meta.url), 'utf8');
const contactApi = readFileSync(new URL('../src/pages/api/contact.ts', import.meta.url), 'utf8');
const styles = readFileSync(new URL('../src/styles/global.css', import.meta.url), 'utf8');

test('minimal homepage does not link into the old service contact funnel', () => {
  assert.doesNotMatch(index, /service=consulting/);
  assert.doesNotMatch(index, /service=implementation/);
  assert.doesNotMatch(index, /service=training/);
  assert.doesNotMatch(index, /focus=contact-form/);
  assert.doesNotMatch(index, /#contact-form`/);
});

test('targeted contact form flashes and focuses the name field', () => {
  assert.match(contactForm, /id="contact-form"/);
  assert.match(contactForm, /id="name"/);
  assert.match(contactForm, /<script is:inline>/);
  assert.match(contactForm, /window\.location\.hash === '#contact-form'/);
  assert.match(contactForm, /history\.replaceState\(null, '', `\$\{window\.location\.pathname\}\$\{window\.location\.search\}`\)/);
  assert.match(contactForm, /get\('focus'\) === 'contact-form'/);
  assert.match(contactForm, /history\.scrollRestoration = 'manual'/);
  assert.match(contactForm, /window\.scrollTo\(0, 0\)/);
  assert.match(contactForm, /setTimeout\(focusContactForm, 0\)/);
  assert.match(contactForm, /window\.addEventListener\('hashchange'/);
  assert.match(contactForm, /classList\.add\('contact-form-flash'\)/);
  assert.match(contactForm, /\.focus\(\{ preventScroll: true \}\)/);
  assert.match(styles, /@keyframes contactFormFlash/);
  assert.match(styles, /\.contact-form-flash/);
});

test('navigation booking CTAs target the calendar booking form', () => {
  assert.match(nav, /const bookingHref = `\$\{paths\.contact\}\?focus=calendar`;/);
  assert.equal(nav.match(/href=\{bookingHref\}/g)?.length, 2);
  assert.doesNotMatch(index, /bookingHref/);
  assert.doesNotMatch(index, /focus=calendar/);
});

test('targeted calendar booking form flashes without an anchor jump', () => {
  assert.match(calEmbed, /id="booking-calendar"/);
  assert.match(calEmbed, /get\('focus'\) === 'calendar'/);
  assert.match(calEmbed, /classList\.add\('booking-calendar-flash'\)/);
  assert.match(styles, /@keyframes bookingCalendarFlash/);
  assert.match(styles, /\.booking-calendar-flash/);
});

test('contact form does not ask for company details', () => {
  assert.doesNotMatch(contactForm, /id="company"/);
  assert.doesNotMatch(contactForm, /name="company"/);
  assert.doesNotMatch(contactForm, /companyLabel/);
  assert.doesNotMatch(contactForm, /companyPlaceholder/);
  assert.doesNotMatch(contactApi, /formData\.get\('company'\)/);
  assert.doesNotMatch(contactApi, /<strong>Company:<\/strong>/);
});
