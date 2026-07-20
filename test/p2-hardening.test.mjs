import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { test } from 'node:test';
import { build, transformSync } from 'esbuild';

const read = (path) => readFileSync(new URL(path, import.meta.url), 'utf8');

const loadTypeScriptModule = async (path) => {
  const { code } = transformSync(read(path), {
    format: 'esm',
    loader: 'ts',
  });
  const moduleUrl = `data:text/javascript;base64,${Buffer.from(code).toString('base64')}`;
  return import(moduleUrl);
};

const loadContactModule = async () => {
  const result = await build({
    stdin: {
      contents: read('../src/pages/api/contact.ts'),
      loader: 'ts',
      sourcefile: 'src/pages/api/contact.ts',
    },
    bundle: true,
    format: 'esm',
    platform: 'node',
    target: 'node22',
    write: false,
    plugins: [
      {
        name: 'cloudflare-workers-test-env',
        setup(buildContext) {
          buildContext.onResolve({ filter: /^cloudflare:workers$/ }, () => ({
            path: 'cloudflare:workers',
            namespace: 'contact-test',
          }));
          buildContext.onLoad({ filter: /.*/, namespace: 'contact-test' }, () => ({
            contents: `export const env = new Proxy({}, {
              get: (_target, key) => globalThis.__contactTestEnv?.[key],
            });`,
            loader: 'js',
          }));
        },
      },
    ],
  });
  const moduleUrl = `data:text/javascript;base64,${Buffer.from(result.outputFiles[0].text).toString('base64')}`;
  return import(moduleUrl);
};

const makeContactRequest = (overrides = {}) => {
  const formData = new FormData();
  formData.set('name', 'Matej <script>alert(1)</script>');
  formData.set('email', 'lead@example.com');
  formData.set('service', 'consulting');
  formData.set('message', 'Hello <img src=x onerror=alert(1)>\nSecond line');
  formData.set('lang', 'sk');

  for (const [key, value] of Object.entries(overrides)) {
    formData.set(key, value);
  }

  return new Request('https://matejlukasik.sk/api/contact', {
    method: 'POST',
    headers: { Origin: 'https://matejlukasik.sk' },
    body: formData,
  });
};

test('contact delivery fails closed and sends a bounded, escaped multipart email', async () => {
  const { POST } = await loadContactModule();
  const originalFetch = globalThis.fetch;
  const calls = [];
  globalThis.fetch = async (url, options) => {
    calls.push({ url, options });
    return new Response(JSON.stringify({ id: 'email_test' }), { status: 200 });
  };

  try {
    globalThis.__contactTestEnv = {
      RESEND_API_KEY: 're_test',
      CONTACT_RATE_LIMITER: { limit: async () => ({ success: true }) },
    };
    const success = await POST({
      request: makeContactRequest(),
      locals: {},
    });

    assert.equal(success.status, 200);
    assert.equal(calls.length, 1);
    assert.equal(calls[0].url, 'https://api.resend.com/emails');
    assert.match(calls[0].options.headers['Idempotency-Key'], /^contact\/[0-9a-f-]+$/);

    const email = JSON.parse(calls[0].options.body);
    assert.equal(email.from, 'Matej Lukášik <matej@matejlukasik.com>');
    assert.deepEqual(email.to, ['matej@matejlukasik.com']);
    assert.match(email.text, /Hello <img src=x onerror=alert\(1\)>/);
    assert.doesNotMatch(email.html, /<script>|<img src=x/);
    assert.match(email.html, /&lt;script&gt;|&lt;img/);

    globalThis.__contactTestEnv = {
      CONTACT_RATE_LIMITER: { limit: async () => ({ success: true }) },
    };
    const missingSecret = await POST({ request: makeContactRequest(), locals: {} });
    assert.equal(missingSecret.status, 503);
    assert.equal(calls.length, 1, 'a missing secret must not pretend delivery succeeded');

    globalThis.__contactTestEnv = {
      RESEND_API_KEY: 're_test',
      CONTACT_RATE_LIMITER: { limit: async () => ({ success: false }) },
    };
    const limited = await POST({ request: makeContactRequest(), locals: {} });
    assert.equal(limited.status, 429);

    globalThis.__contactTestEnv = {
      RESEND_API_KEY: 're_test',
      CONTACT_RATE_LIMITER: { limit: async () => ({ success: true }) },
    };
    const oversized = await POST({
      request: makeContactRequest({ message: 'x'.repeat(5001) }),
      locals: {},
    });
    assert.equal(oversized.status, 400);
  } finally {
    globalThis.fetch = originalFetch;
    delete globalThis.__contactTestEnv;
  }
});

test('contact delivery does not access the removed Astro locals runtime', async () => {
  const { POST } = await loadContactModule();
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () =>
    new Response(JSON.stringify({ id: 'email_test' }), { status: 200 });
  globalThis.__contactTestEnv = {
    RESEND_API_KEY: 're_test',
    CONTACT_RATE_LIMITER: { limit: async () => ({ success: true }) },
  };

  const locals = {};
  Object.defineProperty(locals, 'runtime', {
    get() {
      throw new Error(
        'Astro.locals.runtime.env has been removed in Astro v6. Use cloudflare:workers instead.',
      );
    },
  });

  try {
    const response = await POST({
      request: makeContactRequest(),
      locals,
    });

    assert.equal(response.status, 200);
  } finally {
    globalThis.fetch = originalFetch;
    delete globalThis.__contactTestEnv;
  }
});

test('contact form and navigation expose keyboard and assistive-technology state', () => {
  const form = read('../src/components/ContactForm.astro');
  const nav = read('../src/components/Nav.astro');
  const layout = read('../src/layouts/Layout.astro');
  const en = JSON.parse(read('../src/i18n/en.json'));
  const sk = JSON.parse(read('../src/i18n/sk.json'));

  assert.match(form, /name="name"[\s\S]*maxlength="100"/);
  assert.match(form, /name="email"[\s\S]*maxlength="254"/);
  assert.match(form, /name="message"[\s\S]*maxlength="5000"/);
  assert.match(form, /id="form-success"[\s\S]*role="status"[\s\S]*aria-live="polite"/);
  assert.match(form, /id="form-error"[\s\S]*role="alert"[\s\S]*aria-live="assertive"/);
  assert.match(form, /setAttribute\('aria-busy', 'true'\)/);
  assert.match(form, /\.focus\(\)/);

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

test('localized logo-based social previews exist at the required dimensions', () => {
  const layout = read('../src/layouts/Layout.astro');
  assert.match(layout, /lang === 'sk' \? '\/og-sk\.png' : '\/og-en\.png'/);
  assert.match(layout, /property="og:image:width" content="1200"/);
  assert.match(layout, /property="og:image:height" content="630"/);
  assert.match(layout, /property="og:image:alt"/);
  assert.match(layout, /name="twitter:image:alt"/);
  assert.match(layout, /Matej Lukášik — konzultant pre užitočnú AI/);
  assert.match(layout, /Matej Lukášik — consultant for actually useful AI/);

  for (const path of ['../public/og-en.png', '../public/og-sk.png']) {
    const url = new URL(path, import.meta.url);
    assert.equal(existsSync(url), true, `${path} must exist`);
    const png = readFileSync(url);
    assert.equal(png.subarray(1, 4).toString(), 'PNG');
    assert.equal(png.readUInt32BE(16), 1200);
    assert.equal(png.readUInt32BE(20), 630);
  }

  const socialPreviews = [
    ['../public/og-sk.svg', 'Konzultant pre užitočnú AI'],
    ['../public/og-en.svg', 'Consultant for actually useful AI'],
  ];

  for (const [path, title] of socialPreviews) {
    const svg = read(path);
    assert.match(svg, /<text x="440" y="220"[^>]*font-size="64"[^>]*>Matej Lukášik<\/text>/);
    assert.match(svg, new RegExp(`<text x="440" y="285"[^>]*font-size="36"[^>]*>${title}<\\/text>`));
  }
});

test('Cal.com uses a language-specific event type', () => {
  const calEmbed = read('../src/components/CalEmbed.astro');

  assert.match(calEmbed, /lang === 'sk' \? 'matejlukasik\/bezplatna-konzultacia'/);
  assert.match(calEmbed, /calLink,/);
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
  assert.match(secured.headers.get('content-security-policy'), /frame-src https:\/\/cal\.com https:\/\/app\.cal\.com/);

  const wrangler = JSON.parse(read('../wrangler.json'));
  assert.deepEqual(wrangler.ratelimits[0].name, 'CONTACT_RATE_LIMITER');
  assert.equal(wrangler.ratelimits[0].simple.period, 60);
});
