import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { transformSync } from 'esbuild';

const read = (path) => readFileSync(new URL(path, import.meta.url), 'utf8');

const loadTypeScriptModule = async (path) => {
  const { code } = transformSync(read(path), { format: 'esm', loader: 'ts' });
  const moduleUrl = `data:text/javascript;base64,${Buffer.from(code).toString('base64')}`;
  return import(moduleUrl);
};

test('browser-cacheable static assets receive durable cache headers', () => {
  const headers = read('../public/_headers');

  assert.match(headers, /\/_astro\/\*[\s\S]*max-age=31536000[\s\S]*immutable/);
  assert.match(headers, /\/images\/\*[\s\S]*max-age=604800/);
  assert.match(headers, /\/og-\*\.png[\s\S]*max-age=604800/);
});

test('each sitemap publishes home, contact, and privacy with bilingual alternates', async () => {
  const source = read('../src/pages/sitemap.xml.ts')
    .replace("import type { APIRoute } from 'astro';", '')
    .replace(
      "import { DOMAINS, type Lang } from '../i18n';",
      "const DOMAINS = { en: 'https://matejlukasik.com', sk: 'https://matejlukasik.sk' };",
    );
  const { code } = transformSync(source, { format: 'esm', loader: 'ts' });
  const moduleUrl = `data:text/javascript;base64,${Buffer.from(code).toString('base64')}`;
  const { GET } = await import(moduleUrl);

  const skXml = await (await GET({ locals: { lang: 'sk' } })).text();
  assert.match(skXml, /<loc>https:\/\/matejlukasik\.sk\/sukromie<\/loc>/);
  assert.match(skXml, /hreflang="en" href="https:\/\/matejlukasik\.com\/privacy"/);
  assert.match(skXml, /hreflang="x-default" href="https:\/\/matejlukasik\.com\//);

  const enXml = await (await GET({ locals: { lang: 'en' } })).text();
  assert.match(enXml, /<loc>https:\/\/matejlukasik\.com\/privacy<\/loc>/);
  assert.match(enXml, /hreflang="sk" href="https:\/\/matejlukasik\.sk\/sukromie"/);
});

test('structured data uses the active language origin and verified business identity', async () => {
  const { getStructuredData } = await loadTypeScriptModule('../src/structured-data.ts');
  const sk = getStructuredData('sk', 'https://matejlukasik.sk');
  const [person, business] = sk['@graph'];

  assert.equal(person.url, 'https://matejlukasik.sk');
  assert.equal(person.image, 'https://matejlukasik.sk/avatar.png');
  assert.equal(business.url, 'https://matejlukasik.sk');
  assert.equal(business.telephone, '+421944302185');
  assert.equal(business.email, 'matej@matejlukasik.com');
  assert.deepEqual(
    business.identifier.map(({ propertyID, value }) => [propertyID, value]),
    [['IČO', '50113801'], ['Živnostenský register SR', '250-37148']],
  );

  assert.match(read('../src/layouts/Layout.astro'), /getStructuredData\(lang, siteOrigin\)/);
});
