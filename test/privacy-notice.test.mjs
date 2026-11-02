import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const read = (path) => readFileSync(new URL(path, import.meta.url), 'utf8');

const privacy = read('../src/pages/privacy.astro');

const en = JSON.parse(read('../src/i18n/en.json'));

test('English privacy page contains the notice essentials for email, analytics, and hosting', () => {
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
    'Email correspondence',
    'Cloudflare',
    'Google Analytics',
  ].forEach((text) => assert.match(privacy, new RegExp(text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))));
});

test('privacy notices describe email-client handoff instead of website message collection', () => {
  assert.match(privacy, /Contact links open your email application; this website does not collect or submit a message/);

  for (const source of [privacy]) {
    assert.match(source, /mailto:matej@matejlukasik\.com/);
    assert.doesNotMatch(source, /Resend|resend\.com|contact form|kontaktného formulára|Kontaktný formulár/i);
  }
});

test('privacy notices no longer describe the removed booking flow', () => {
  for (const source of [privacy]) {
    assert.doesNotMatch(source, /CalEmbed|cal\.com|booking-calendar|__cf_bm/);
  }
  assert.doesNotMatch(privacy, /booking|calendar|consultation/i);

});

test('analytics notices exclude email content from analytics', () => {
  assert.equal(
    en.cookieNotice.description,
    'I use optional analytics cookies to understand aggregate page views and conversion events. Email content is not sent to analytics.',
  );

});
