import assert from 'node:assert/strict';
import { test } from 'node:test';
import { build } from 'esbuild';

async function load(entry, replace = s => s) {
  const result = await build({ entryPoints: [entry], bundle: true, platform: 'node', format: 'esm', write: false, external: ['astro:middleware'] });
  const code = replace(result.outputFiles[0].text);
  return import(`data:text/javascript;base64,${Buffer.from(code).toString('base64')}`);
}
const middleware = await load('src/middleware.ts', s => s.replace(/import \{ defineMiddleware \} from "astro:middleware";/, 'const defineMiddleware = fn => fn;'));
const sitemap = await load('src/pages/sitemap.xml.ts');
const llms = await load('src/pages/llms.txt.ts');
async function request(url) {
  const locals = {};
  const response = await middleware.onRequest({ url: new URL(url), locals, redirect: (target, status) => new Response(null, { status, headers: { Location: target } }) }, () => Promise.resolve(new Response('ok')));
  return { response, locals };
}

test('legacy Slovak URLs redirect to matching English pages and preserve unrelated query parameters', async () => {
  const { response } = await request('https://matejlukasik.sk/projekty?ref=profile&lang=sk');
  assert.equal(response.status, 301);
  assert.equal(response.headers.get('location'), 'https://matejlukasik.com/projects?ref=profile');
  const privacy = await request('http://localhost:4321/sukromie');
  assert.equal(privacy.response.headers.get('location'), 'http://localhost:4321/privacy');
});
test('language query no longer selects Slovak', async () => {
  const { response, locals } = await request('http://localhost:4321/cv?lang=sk');
  assert.equal(response.status, 200);
  assert.equal(locals.lang, 'en');
});
test('sitemap and machine-readable content list English pages only', async () => {
  const xml = await (await sitemap.GET({ locals: { lang: 'en' } })).text();
  assert.match(xml, /https:\/\/matejlukasik\.com\/projects/);
  assert.doesNotMatch(xml, /hreflang|matejlukasik\.sk|projekty|sukromie/);
  const content = await (await llms.GET({ locals: { lang: 'en' } })).text();
  assert.doesNotMatch(content, /\[Domov \(SK\)\]|\[CV \(SK\)\]|\/projekty/);
});
