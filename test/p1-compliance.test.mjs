import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { test } from 'node:test';
import { transformSync } from 'esbuild';

const read = (path) => readFileSync(new URL(path, import.meta.url), 'utf8');

test('production requests canonicalize to the HTTPS apex and receive HSTS', async () => {
  const policyUrl = new URL('../src/http-policy.ts', import.meta.url);
  assert.equal(existsSync(policyUrl), true, 'expected a production HTTP policy module');

  const { code } = transformSync(read('../src/http-policy.ts'), {
    format: 'esm',
    loader: 'ts',
  });
  const moduleUrl = `data:text/javascript;base64,${Buffer.from(code).toString('base64')}`;
  const { applyProductionSecurityHeaders, getCanonicalProductionUrl } = await import(moduleUrl);

  assert.equal(
    getCanonicalProductionUrl(new URL('http://www.matejlukasik.com/contact?focus=calendar')).href,
    'https://matejlukasik.com/contact?focus=calendar',
  );
  assert.equal(
    getCanonicalProductionUrl(new URL('http://matejlukasik.sk/kontakt')).href,
    'https://matejlukasik.sk/kontakt',
  );
  assert.equal(getCanonicalProductionUrl(new URL('https://matejlukasik.com/')), null);
  assert.equal(getCanonicalProductionUrl(new URL('http://localhost:4321/')), null);

  const secured = applyProductionSecurityHeaders(
    new Response('ok'),
    new URL('https://matejlukasik.com/'),
  );
  assert.equal(secured.headers.get('strict-transport-security'), 'max-age=31536000');
});

test('footer publishes the registered provider and supervisory details in both languages', () => {
  const footer = read('../src/components/Footer.astro');
  const en = JSON.parse(read('../src/i18n/en.json'));
  const sk = JSON.parse(read('../src/i18n/sk.json'));

  assert.match(footer, /strings\.footer\.businessDetails/);
  assert.match(footer, /tel:\+421944302185/);
  assert.match(footer, /strings\.footer\.tradeSupervision/);
  assert.equal(sk.footer.businessName, 'Matej Lukášik');
  assert.equal(sk.footer.businessId, '50113801');
  assert.equal(sk.footer.businessAddress, 'Ulica Hlboká 5943/14, 917 01 Trnava, Slovensko');
  assert.equal(sk.footer.tradeRegister, 'Živnostenský register SR č. 250-37148');
  assert.equal(en.footer.businessId, '50113801');
});

test('privacy notices publish concrete controller, retention, cookie, transfer, and complaint information', () => {
  const privacy = read('../src/pages/privacy.astro');
  const sukromie = read('../src/pages/sukromie.astro');

  for (const source of [privacy, sukromie]) {
    assert.match(source, /50113801/);
    assert.match(source, /Ulica Hlboká 5943\/14/);
    assert.match(source, /\+421 944 302 185/);
    assert.match(source, /14 months|14 mesiacov/);
    assert.match(source, /30 days|30 dní/);
    assert.match(source, /_ga/);
    assert.match(source, /__cf_bm/);
    assert.match(source, /two years|dva roky/);
    assert.match(source, /30 minutes|30 minút/);
    assert.match(source, /Data Privacy Framework|rámca ochrany osobných údajov/);
    assert.match(source, /dataprotection\.gov\.sk/);
  }
});

test('consent is versioned, expires after one year, and the privacy link is spaced correctly', () => {
  const cookieNotice = read('../src/components/CookieNotice.astro');
  const analytics = read('../src/components/Analytics.astro');

  assert.match(cookieNotice, /CONSENT_VERSION/);
  assert.match(cookieNotice, /expiresAt/);
  assert.match(cookieNotice, /365 \* 24 \* 60 \* 60 \* 1000/);
  assert.match(cookieNotice, /JSON\.stringify/);
  assert.match(cookieNotice, /\{' '\}\s*<a/);
  assert.match(analytics, /CONSENT_VERSION/);
  assert.match(analytics, /JSON\.parse/);
});

test('Cal.com loads only after a direct booking request', () => {
  const calEmbed = read('../src/components/CalEmbed.astro');

  assert.match(calEmbed, /data-cal-load/);
  assert.match(calEmbed, /loadCalEmbed/);
  assert.match(calEmbed, /shouldLoadCalendarImmediately/);
  assert.match(calEmbed, /focus.*calendar/);
});
