import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { test } from 'node:test';

const read = (path) => {
  const url = new URL(path, import.meta.url);
  return existsSync(url) ? readFileSync(url, 'utf8') : '';
};

const layout = read('../src/layouts/Layout.astro');
const cookieNotice = read('../src/components/CookieNotice.astro');
const footer = read('../src/components/Footer.astro');
const privacy = read('../src/pages/privacy.astro');
const sukromie = read('../src/pages/sukromie.astro');
const en = JSON.parse(read('../src/i18n/en.json'));
const sk = JSON.parse(read('../src/i18n/sk.json'));

test('layout gates GA4 behind the cookie notice instead of loading it before consent', () => {
  assert.match(layout, /import CookieNotice from '\.\.\/components\/CookieNotice\.astro';/);
  assert.match(layout, /<CookieNotice lang=\{lang\} gaMeasurementId=\{gaMeasurementId\} \/>/);
  assert.doesNotMatch(layout, /<script async src=\{gaScriptSrc\}>/);
  assert.doesNotMatch(layout, /gtag\('config', gaMeasurementId\)/);
  assert.match(cookieNotice, /googletagmanager\.com\/gtag\/js\?id=/);
  assert.match(cookieNotice, /window\.gtag\('config', measurementId\)/);
});

test('cookie notice gives immediate localized analytics choices and a policy link', () => {
  assert.match(cookieNotice, /data-cookie-notice/);
  assert.match(cookieNotice, /data-cookie-accept/);
  assert.match(cookieNotice, /data-cookie-reject/);
  assert.match(cookieNotice, /localStorage\.setItem\(CONSENT_STORAGE_KEY, JSON\.stringify/);
  assert.match(cookieNotice, /updateAnalyticsConsent\('granted'\)/);
  assert.match(cookieNotice, /paths\.privacy/);
  assert.equal(en.cookieNotice.title, 'Analytics cookies');
  assert.equal(en.cookieNotice.accept, 'Allow analytics');
  assert.equal(en.cookieNotice.reject, 'Reject analytics');
  assert.equal(sk.cookieNotice.title, 'Analytické cookies');
  assert.equal(sk.cookieNotice.accept, 'Povoliť analytiku');
  assert.equal(sk.cookieNotice.reject, 'Odmietnuť analytiku');
});

test('footer lets visitors reopen cookie settings', () => {
  assert.match(footer, /data-cookie-settings/);
  assert.equal(en.footer.cookieSettings, 'Cookie settings');
  assert.equal(sk.footer.cookieSettings, 'Nastavenia cookies');
});

test('privacy pages explain analytics consent and cookie settings', () => {
  assert.match(privacy, /Analytics cookies are optional/);
  assert.match(privacy, /Cookie settings/);
  assert.match(sukromie, /Analytické cookies sú voliteľné/);
  assert.match(sukromie, /Nastavenia cookies/);
});
