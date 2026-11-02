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

test('sitemap publishes the English pages without retired contact pages or language alternates', async () => {
  const source = read('../src/pages/sitemap.xml.ts')
    .replace("import type { APIRoute } from 'astro';", '')
    .replace("import { DOMAINS } from '../i18n';", "const DOMAINS = { en: 'https://matejlukasik.com' };");
  const { code } = transformSync(source, { format: 'esm', loader: 'ts' });
  const { GET } = await import(`data:text/javascript;base64,${Buffer.from(code).toString('base64')}`);
  const xml = await (await GET()).text();
  for (const path of ['/', '/cv', '/projects', '/privacy']) {
    assert.ok(xml.includes(`<loc>https://matejlukasik.com${path}</loc>`));
  }
  assert.doesNotMatch(xml, /hreflang|matejlukasik\.sk|\/(?:contact|kontakt)(?:<|")/);
});

test('structured data uses the English origin and verified business identity', async () => {
  const { getStructuredData } = await loadTypeScriptModule('../src/structured-data.ts');
  const [person, business] = getStructuredData('en', 'https://matejlukasik.com')['@graph'];
  assert.equal(person.url, 'https://matejlukasik.com');
  assert.equal(person.image, 'https://matejlukasik.com/avatar.png');
  assert.equal(business.url, 'https://matejlukasik.com');
  assert.equal(business.telephone, '+421944302185');
  assert.equal(business.email, 'matej@matejlukasik.com');
  assert.equal(person.jobTitle, 'AI Systems & Software Engineering Consultant');
  assert.equal(business.name, 'Matej Lukášik — AI Systems & Software Engineering Consultant');
  assert.deepEqual(business.areaServed, ['Europe', 'United States']);
  assert.deepEqual(business.identifier.map(({ propertyID, value }) => [propertyID, value]), [['IČO', '50113801'], ['Živnostenský register SR', '250-37148']]);
  assert.match(read('../src/layouts/Layout.astro'), /getStructuredData\(lang, siteOrigin\)/);
});
