import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { test } from 'node:test';

const root = new URL('../', import.meta.url);
const read = (path) => readFileSync(new URL(path, root), 'utf8');
const en = JSON.parse(read('src/i18n/en.json'));
const sk = JSON.parse(read('src/i18n/sk.json'));

test('the Projects page remains available without appearing in the top navigation', () => {
  const nav = read('src/components/Nav.astro');

  assert.equal(en.nav.projects, 'Projects');
  assert.equal(sk.nav.projects, 'Projekty');
  assert.doesNotMatch(nav, /strings\.nav\.faq/);
  assert.doesNotMatch(nav, /strings\.nav\.projects/);
  assert.doesNotMatch(nav, /href=\{paths\.projects\}/);
});

test('English and Slovak project routes present the same two public projects', () => {
  assert.ok(existsSync(new URL('src/pages/projects.astro', root)));
  assert.ok(existsSync(new URL('src/pages/projekty.astro', root)));

  const englishPage = read('src/pages/projects.astro');
  const slovakPage = read('src/pages/projekty.astro');

  for (const source of [englishPage, slovakPage]) {
    assert.match(source, /<ProjectCard/);
    assert.match(source, /POSTWORK_URL/);
    assert.match(source, /ATLAS_URL/);
    assert.match(source, /<CTABand/);
    assert.doesNotMatch(source, /strings\.projects\.section(?:Eyebrow|Title|Description)/);
  }

  assert.match(englishPage, /currentPath="\/projects"/);
  assert.match(slovakPage, /currentPath="\/projekty"/);
  assert.deepEqual(en.projects.items.map((project) => project.title), ['post.work', 'Agent Threat Atlas']);
  assert.deepEqual(sk.projects.items.map((project) => project.title), ['post.work', 'Agent Threat Atlas']);
});

test('project routes participate in localization, discovery, and the footer', () => {
  const i18n = read('src/i18n/index.ts');
  const sitemap = read('src/pages/sitemap.xml.ts');
  const footer = read('src/components/Footer.astro');
  const llms = read('src/pages/llms.txt.ts');

  assert.match(i18n, /'\/projects': \{ en: '\/projects', sk: '\/projekty' \}/);
  assert.match(i18n, /projects: lang === 'sk' \? '\/projekty' : '\/projects'/);
  assert.match(sitemap, /\{ en: '\/projects', sk: '\/projekty' \}/);
  assert.match(footer, /href=\{paths\.projects\}/);
  assert.match(llms, /https:\/\/matejlukasik\.com\/projects/);
  assert.match(llms, /https:\/\/matejlukasik\.sk\/projekty/);
});
