import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { test } from 'node:test';
import { transformSync } from 'esbuild';

const read = (path) => readFileSync(new URL(path, import.meta.url), 'utf8');

const loadTypeScriptModule = async (path) => {
  const { code } = transformSync(read(path), {
    format: 'esm',
    loader: 'ts',
  });
  const moduleUrl = `data:text/javascript;base64,${Buffer.from(code).toString('base64')}`;
  return import(moduleUrl);
};

test('navigation and layout expose keyboard and assistive-technology state', () => {
  const nav = read('../src/components/Nav.astro');
  const layout = read('../src/layouts/Layout.astro');
  const en = JSON.parse(read('../src/i18n/en.json'));
  const sk = JSON.parse(read('../src/i18n/sk.json'));

  assert.match(nav, /aria-expanded="false"/);
  assert.match(nav, /aria-controls="mobile-menu"/);
  assert.match(nav, /event\.key === 'Escape'/);
  assert.match(nav, /btn\?\.focus\(\)/);

  assert.match(layout, /class="skip-link"/);
  assert.match(layout, /<main id="main-content" tabindex="-1"/);
  assert.equal(en.accessibility.skipToContent, 'Skip to content');
  assert.equal(sk.accessibility.skipToContent, 'Preskočiť na obsah');
});

test('motion-heavy effects respect the reduced-motion preference', () => {
  const styles = read('../src/styles/global.css');
  const layout = read('../src/layouts/Layout.astro');

  assert.match(styles, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(styles, /scroll-behavior:\s*auto\s*!important/);
  assert.match(styles, /\.reveal[\s\S]*opacity:\s*1/);
  assert.match(layout, /matchMedia\('\(prefers-reduced-motion: reduce\)'\)/);
});

test('localized photo-based social previews exist at the required dimensions', () => {
  const layout = read('../src/layouts/Layout.astro');
  assert.match(layout, /lang === 'sk' \? '\/og-sk-portrait\.png' : '\/og-en-portrait\.png'/);
  assert.match(layout, /property="og:image:width" content="1200"/);
  assert.match(layout, /property="og:image:height" content="630"/);
  assert.match(layout, /property="og:image:alt"/);
  assert.match(layout, /name="twitter:image:alt"/);
  assert.match(layout, /Portrét Mateja Lukášika — senior produktový inžinier/);
  assert.match(layout, /Portrait of Matej Lukášik — Senior Product Engineer/);

  for (const path of ['../public/og-en-portrait.png', '../public/og-sk-portrait.png']) {
    const url = new URL(path, import.meta.url);
    assert.equal(existsSync(url), true, `${path} must exist`);
    const png = readFileSync(url);
    assert.equal(png.subarray(1, 4).toString(), 'PNG');
    assert.equal(png.readUInt32BE(16), 1200);
    assert.equal(png.readUInt32BE(20), 630);
  }

});

test('production responses receive a complete baseline of security headers', async () => {
  const { applyProductionSecurityHeaders } = await loadTypeScriptModule('../src/http-policy.ts');
  const secured = applyProductionSecurityHeaders(
    new Response('ok'),
    new URL('https://matejlukasik.com/'),
  );

  assert.equal(secured.headers.get('x-content-type-options'), 'nosniff');
  assert.equal(secured.headers.get('x-frame-options'), 'DENY');
  assert.equal(secured.headers.get('referrer-policy'), 'strict-origin-when-cross-origin');
  assert.match(secured.headers.get('permissions-policy'), /camera=\(\)/);
  assert.match(secured.headers.get('content-security-policy'), /default-src 'self'/);
  assert.match(secured.headers.get('content-security-policy'), /frame-src 'none'/);
  assert.doesNotMatch(secured.headers.get('content-security-policy'), /cal\.com/);

  const wrangler = JSON.parse(read('../wrangler.json'));
  assert.equal((wrangler.ratelimits ?? []).some((binding) => binding.name === 'CONTACT_RATE_LIMITER'), false);
});
