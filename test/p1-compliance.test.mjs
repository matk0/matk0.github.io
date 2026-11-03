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
    getCanonicalProductionUrl(new URL('http://www.matejlukasik.com/projects?lang=en')).href,
    'https://matejlukasik.com/projects?lang=en',
  );
  assert.equal(
    getCanonicalProductionUrl(new URL('http://matejlukasik.sk/projekty')).href,
    'https://matejlukasik.sk/projekty',
  );
  assert.equal(getCanonicalProductionUrl(new URL('https://matejlukasik.com/')), null);
  assert.equal(getCanonicalProductionUrl(new URL('http://localhost:4321/')), null);

  const secured = applyProductionSecurityHeaders(
    new Response('ok'),
    new URL('https://matejlukasik.com/'),
  );
  assert.equal(secured.headers.get('strict-transport-security'), 'max-age=31536000');
});

test('footer keeps contact and privacy links without the retired business details block', () => {
  const footer = read('../src/components/Footer.astro');
  assert.doesNotMatch(footer, /strings\.footer\.(?:businessDetails|tradeSupervision|consumerSupervision)|<address/);
  assert.match(footer, /href=\{CONTACT_HREF\}/);
  assert.match(footer, /href=\{paths\.privacy\}/);
  assert.match(footer, /data-cookie-settings/);
});

test('privacy notices publish concrete controller, retention, cookie, transfer, and complaint information', () => {
  const privacy = read('../src/pages/privacy.astro');

  for (const source of [privacy]) {
    assert.match(source, /50113801/);
    assert.match(source, /Ulica Hlboká 5943\/14/);
    assert.match(source, /\+421 944 302 185/);
    assert.match(source, /14 months|14 mesiacov/);
    assert.match(source, /30 days|30 dní/);
    assert.match(source, /_ga/);
    assert.match(source, /two years|dva roky/);
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
