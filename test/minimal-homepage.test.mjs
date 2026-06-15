import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { test } from 'node:test';

const index = readFileSync(new URL('../src/pages/index.astro', import.meta.url), 'utf8');
const layout = readFileSync(new URL('../src/layouts/Layout.astro', import.meta.url), 'utf8');

test('homepage is a minimal personal page pointing to post.work', () => {
  assert.match(index, /minimal/);
  assert.match(index, /src="\/images\/matej-lukasik-profile\.jpg"/);
  assert.match(index, /AUTHENTIC CREATION/);
  assert.match(index, /clear the machinery of e-commerce from your path/);
  assert.match(index, /fully focus on your creation while enjoying material abundance/);
  assert.match(index, /mailto:matej@post\.work/);
  assert.match(index, /POST_WORK_URL = 'https:\/\/post\.work\/'/);
  assert.match(index, /https:\/\/x\.com\/matejlukasik/);
  assert.match(index, /https:\/\/www\.linkedin\.com\/in\/matej-lukasik/);
  assert.doesNotMatch(index, /https:\/\/github\.com\/matk0/);
});

test('post.work is linked inline instead of in the profile link row', () => {
  assert.match(index, /linkText: 'post\.work'/);
  assert.match(index, /href: POST_WORK_URL/);
  assert.match(index, /href=\{paragraph\.href\}/);
  assert.doesNotMatch(index, /\{ label: 'post\.work', href: POST_WORK_URL \}/);
  assert.doesNotMatch(index, /\{ label: 'post\.work', href: 'https:\/\/post\.work\/' \}/);
  assert.doesNotMatch(index, /\{ label: 'GitHub'/);
});

test('profile links render as accessible social icons', () => {
  assert.match(index, /icon: 'email'/);
  assert.match(index, /icon: 'x'/);
  assert.match(index, /icon: 'linkedin'/);
  assert.match(index, /aria-label=\{link\.label\}/);
  assert.match(index, /<svg/);
  assert.match(index, /<span class="sr-only">\{link\.label\}<\/span>/);
});

test('homepage headline is localized greeting copy', () => {
  assert.match(index, /greeting:\s*'Hi,'/);
  assert.match(index, /greeting:\s*'Ahoj,'/);
  assert.match(index, /<h1 class="text-4xl font-bold text-heading sm:text-5xl">\{profile\.greeting\}<\/h1>/);
  assert.doesNotMatch(index, /<h1 class="text-4xl font-bold text-heading sm:text-5xl">Matej Lukášik<\/h1>/);
});

test('homepage body copy is rendered as short localized paragraphs', () => {
  assert.match(index, /paragraphs: \[/);
  assert.match(index, /My name is Matej Lukášik and when it comes to work, I believe/);
  assert.match(index, /Volám sa Matej Lukášik a verím/);
  assert.match(index, /AUTENTICKÚ TVORBU/);
  assert.match(index, /profile\.paragraphs\.map/);
  assert.doesNotMatch(index, /UX, SEO, checkout/);
});

test('homepage removes the old marketing funnel surface', () => {
  assert.doesNotMatch(index, /<Hero/);
  assert.doesNotMatch(index, /<Service/);
  assert.doesNotMatch(index, /<FAQ/);
  assert.doesNotMatch(index, /<CTABand/);
  assert.doesNotMatch(index, /bookingHref/);
  assert.doesNotMatch(index, /data-analytics-event="booking_intent_clicked"/);
});

test('homepage has a compact domain language selector', () => {
  assert.match(index, /aria-label="Language"/);
  assert.match(index, /href=\{DOMAINS\.en\}/);
  assert.match(index, /href=\{DOMAINS\.sk\}/);
  assert.match(index, />\s*EN\s*</);
  assert.match(index, />\s*SK\s*</);
  assert.match(index, /mb-8 flex justify-end/);
  assert.doesNotMatch(index, /absolute right-5 top-5/);
  assert.doesNotMatch(index, /\?lang=/);
});

test('minimal layout mode removes navigation, footer, cookie, and analytics chrome', () => {
  assert.match(layout, /minimal/);
  assert.match(layout, /!minimal && <Nav/);
  assert.match(layout, /!minimal && <Footer/);
  assert.match(layout, /!minimal && <CookieNotice/);
  assert.match(layout, /!minimal && <Analytics/);
});

test('profile portrait asset exists in public images', () => {
  assert.ok(existsSync(new URL('../public/images/matej-lukasik-profile.jpg', import.meta.url)));
});
