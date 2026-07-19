import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { test } from 'node:test';

const read = (path) => {
  const url = new URL(path, import.meta.url);
  return existsSync(url) ? readFileSync(url, 'utf8') : '';
};

const analytics = read('../src/components/Analytics.astro');
const cookieNotice = read('../src/components/CookieNotice.astro');
const layout = read('../src/layouts/Layout.astro');
const wrangler = JSON.parse(read('../wrangler.json'));
const index = read('../src/pages/index.astro');
const contact = read('../src/pages/contact.astro');
const kontakt = read('../src/pages/kontakt.astro');
const nav = read('../src/components/Nav.astro');
const footer = read('../src/components/Footer.astro');
const serviceCard = read('../src/components/ServiceCard.astro');
const serviceSection = read('../src/components/ServiceSection.astro');
const firstStepOffer = read('../src/components/FirstStepOffer.astro');
const faq = read('../src/components/FAQ.astro');
const contactForm = read('../src/components/ContactForm.astro');
const calEmbed = read('../src/components/CalEmbed.astro');
const removedProviderPattern = new RegExp(['p', 'lausible'].join(''), 'i');

test('layout wires GA4 through cookie consent and the first-party analytics helper', () => {
  assert.match(layout, /import Analytics from '\.\.\/components\/Analytics\.astro';/);
  assert.match(layout, /import CookieNotice from '\.\.\/components\/CookieNotice\.astro';/);
  assert.match(layout, /<Analytics \/>/);
  assert.match(layout, /<CookieNotice lang=\{lang\} gaMeasurementId=\{gaMeasurementId\} \/>/);
  assert.match(layout, /PUBLIC_GA_MEASUREMENT_ID/);
  assert.match(layout, /cloudflareEnv\.PUBLIC_GA_MEASUREMENT_ID/);
  assert.doesNotMatch(layout, /https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=/);
  assert.match(cookieNotice, /https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=/);
  assert.match(cookieNotice, /window\.gtag\('config', measurementId\)/);
  assert.doesNotMatch(layout, removedProviderPattern);
});

test('Cloudflare runtime vars preserve the public GA measurement ID for deploys', () => {
  assert.equal(wrangler.vars.PUBLIC_GA_MEASUREMENT_ID, 'G-25EZ859D79');
});

test('layout exposes Google site verification from Cloudflare runtime vars', () => {
  assert.match(layout, /PUBLIC_GOOGLE_SITE_VERIFICATION/);
  assert.match(layout, /cloudflareEnv\.PUBLIC_GOOGLE_SITE_VERIFICATION/);
  assert.match(layout, /<meta name="google-site-verification" content=\{googleSiteVerification\} \/>/);
  assert.equal(wrangler.vars.PUBLIC_GOOGLE_SITE_VERIFICATION, 'dLw3bqFci_Kn9iQRfvRBo28i3MJJMv1z-vgNBoA2eN8');
});

test('analytics helper tracks governed events with sanitized properties', () => {
  assert.match(analytics, /window\.trackSiteEvent =/);
  assert.match(analytics, /hasAnalyticsConsent\(\)/);
  assert.match(analytics, /localStorage\.getItem\(CONSENT_STORAGE_KEY\)/);
  assert.match(analytics, /record\.version === CONSENT_VERSION/);
  assert.match(analytics, /record\.choice === 'accepted'/);
  assert.match(analytics, /window\.gtag\('event', name, \{ \.\.\.cleanProps, \.\.\.options \}\)/);
  assert.match(analytics, /allowedEventNames = new Set/);
  assert.match(analytics, /section_viewed/);
  assert.match(analytics, /scroll_depth_reached/);
  assert.match(analytics, /marketingParams = new URLSearchParams\(window\.location\.search\)/);
  assert.match(analytics, /utm_source/);
  assert.match(analytics, /utm_medium/);
  assert.match(analytics, /utm_campaign/);
  assert.match(analytics, /utm_content/);
  assert.match(analytics, /data-analytics-event/);
  assert.match(analytics, /data-analytics-section/);
  assert.match(analytics, /interactive: false/);
  assert.doesNotMatch(analytics, /email:|message:|name:|uid:|videoCallUrl:|startTime:|endTime:/);
});

test('homepage funnel surfaces are annotated for click and section tracking', () => {
  assert.match(index, /data-analytics-section="pain_points"/);
  assert.match(index, /data-analytics-section="services"/);
  assert.match(index, /data-analytics-section="about"/);
  assert.match(index, /data-analytics-event="services_intent_clicked"/);
  assert.match(index, /data-analytics-event="booking_intent_clicked"/);
  assert.match(serviceCard, /data-analytics-event="service_card_clicked"/);
  assert.match(serviceSection, /data-analytics-section=\{id\}/);
  assert.match(serviceSection, /data-analytics-event="service_cta_clicked"/);
  assert.match(firstStepOffer, /data-analytics-event="booking_intent_clicked"/);
  assert.match(faq, /data-analytics-event="faq_opened"/);
});

test('navigation, footer, and direct contact links expose conversion intent', () => {
  assert.equal(nav.match(/data-analytics-event="booking_intent_clicked"/g)?.length, 2);
  assert.match(nav, /data-analytics-position="nav_desktop"/);
  assert.match(nav, /data-analytics-position="nav_mobile"/);
  assert.match(contact, /data-analytics-event="mailto_clicked"/);
  assert.match(footer, /data-analytics-event="mailto_clicked"/);
});

test('contact form emits lifecycle events with the selected service only', () => {
  assert.match(contactForm, /data-analytics-event-source="contact_form"/);
  assert.match(contactForm, /contact_form_started/);
  assert.match(contactForm, /contact_form_submitted/);
  assert.match(contactForm, /contact_form_succeeded/);
  assert.match(contactForm, /contact_form_failed/);
  assert.match(contactForm, /service: getSelectedService\(\)/);
  assert.doesNotMatch(contactForm, /email:|message:|name:/);
});

test('Cal embed tracks booking progress without booking identifiers', () => {
  assert.match(calEmbed, /Cal\("on", \{/);
  assert.match(calEmbed, /bookerViewed/);
  assert.match(calEmbed, /bookerReady/);
  assert.match(calEmbed, /bookingSuccessfulV2/);
  assert.match(calEmbed, /booking_successful/);
  assert.match(calEmbed, /cal_booker_viewed/);
  assert.match(calEmbed, /cal_booker_ready/);
  assert.doesNotMatch(calEmbed, /uid|videoCallUrl|startTime|endTime/);
});

test('both localized contact pages keep the same analytics-enabled form and calendar path', () => {
  assert.match(contact, /<CalEmbed title=\{strings\.contact\.bookTitle\}/);
  assert.match(contact, /<ContactForm lang=\{lang\}/);
  assert.match(kontakt, /<CalEmbed title=\{strings\.contact\.bookTitle\}/);
  assert.match(kontakt, /<ContactForm lang=\{lang\}/);
});
