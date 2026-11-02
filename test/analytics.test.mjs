import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { test } from 'node:test';
import { runInNewContext } from 'node:vm';

const read = (path) => {
  const url = new URL(path, import.meta.url);
  return existsSync(url) ? readFileSync(url, 'utf8') : '';
};

const analytics = read('../src/components/Analytics.astro');
const cookieNotice = read('../src/components/CookieNotice.astro');
const layout = read('../src/layouts/Layout.astro');
const wrangler = JSON.parse(read('../wrangler.json'));
const index = read('../src/pages/index.astro');
const nav = read('../src/components/Nav.astro');
const footer = read('../src/components/Footer.astro');
const serviceCard = read('../src/components/ServiceCard.astro');
const serviceSection = read('../src/components/ServiceSection.astro');
const faq = read('../src/components/FAQ.astro');
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

test('layout exposes both Google site verification tokens from Cloudflare runtime vars', () => {
  assert.match(layout, /PUBLIC_GOOGLE_SITE_VERIFICATION/);
  assert.match(layout, /cloudflareEnv\.PUBLIC_GOOGLE_SITE_VERIFICATION/);
  assert.match(layout, /<meta name="google-site-verification" content=\{googleSiteVerification\} \/>/);
  assert.equal(wrangler.vars.PUBLIC_GOOGLE_SITE_VERIFICATION, 'dLw3bqFci_Kn9iQRfvRBo28i3MJJMv1z-vgNBoA2eN8');
  assert.match(layout, /PUBLIC_GOOGLE_SITE_VERIFICATION_SK/);
  assert.match(layout, /cloudflareEnv\.PUBLIC_GOOGLE_SITE_VERIFICATION_SK/);
  assert.match(layout, /lang === 'sk' && googleSiteVerificationSk/);
  assert.match(layout, /<meta name="google-site-verification" content=\{googleSiteVerificationSk\} \/>/);
  assert.equal(wrangler.vars.PUBLIC_GOOGLE_SITE_VERIFICATION_SK, 'JFrmiyTfscF0PhSKuFTaj4OMwWzJDF9Ww8MgXm0jZ20');
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
  assert.doesNotMatch(index, /data-analytics-section="pain_points"/);
  assert.doesNotMatch(index, /data-analytics-section="services"/);
  assert.match(index, /data-analytics-section="about"/);
  assert.doesNotMatch(index, /data-analytics-event="services_intent_clicked"/);
  assert.doesNotMatch(index, /data-analytics-event="booking_intent_clicked"/);
  assert.match(serviceCard, /data-analytics-event="service_card_clicked"/);
  assert.match(serviceSection, /data-analytics-section=\{id\}/);
  assert.match(serviceSection, /data-analytics-event="service_cta_clicked"/);
  assert.match(faq, /data-analytics-event="faq_opened"/);
});

test('navigation uses direct email and footer preserves email intent tracking', () => {
  assert.doesNotMatch(nav, /data-analytics-event="booking_intent_clicked"/);
  assert.equal(nav.match(/href=\{CONTACT_HREF\}/g)?.length, 2);
  assert.match(footer, /data-analytics-event="mailto_clicked"/);
});

test('analytics rejects retired funnel and form events while keeping consent-gated email clicks', () => {
  const calls = [];
  const window = {
    location: { pathname: '/', search: '' },
    siteAnalyticsConsent: 'accepted',
    gtag: (...args) => calls.push(args),
    addEventListener() {},
  };
  const script = analytics.match(/<script is:inline>([\s\S]*?)<\/script>/)?.[1];
  assert.ok(script, 'analytics inline helper must exist');
  runInNewContext(script, {
    window,
    document: {
      documentElement: { lang: 'en' },
      addEventListener() {},
      querySelectorAll: () => [],
    },
    localStorage: { getItem: () => null },
    URLSearchParams,
    requestAnimationFrame() {},
  });

  for (const event of [
    'services_intent_clicked', 'booking_intent_clicked', 'cal_booker_viewed',
    'cal_booker_ready', 'booking_successful', 'contact_form_started',
    'contact_form_submitted', 'contact_form_succeeded', 'contact_form_failed',
  ]) {
    assert.equal(window.trackSiteEvent(event), false, `${event} must no longer be tracked`);
  }
  assert.equal(calls.length, 0);
  assert.equal(window.trackSiteEvent('mailto_clicked', { position: 'nav_desktop', email: 'private@example.test' }), true);
  assert.equal(calls.length, 1);
  assert.equal(calls[0][0], 'event');
  assert.equal(calls[0][1], 'mailto_clicked');
  assert.equal(calls[0][2].position, 'nav_desktop');
  assert.equal(Object.hasOwn(calls[0][2], 'email'), false);

  window.siteAnalyticsConsent = 'rejected';
  assert.equal(window.trackSiteEvent('mailto_clicked'), false);
  assert.equal(calls.length, 1);
});
