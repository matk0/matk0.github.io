import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { test } from 'node:test';
import { buildSync } from 'esbuild';

const root = new URL('../', import.meta.url);
const read = (path) => readFileSync(new URL(path, root), 'utf8');
const en = JSON.parse(read('src/i18n/en.json'));
const sk = JSON.parse(read('src/i18n/sk.json'));

test('Projects appears in both desktop and mobile navigation', () => {
  const nav = read('src/components/Nav.astro');

  assert.equal(en.nav.projects, 'Projects');
  assert.equal(sk.nav.projects, 'Projekty');
  assert.doesNotMatch(nav, /strings\.nav\.faq/);
  assert.equal(nav.match(/strings\.nav\.projects/g)?.length, 2);
  assert.equal(nav.match(/href=\{paths\.projects\}/g)?.length, 2);
});

test('English and Slovak project routes show Vozokany, post.work and Viki in the same order', () => {
  assert.ok(existsSync(new URL('src/pages/projects.astro', root)));
  assert.ok(existsSync(new URL('src/pages/projekty.astro', root)));

  const englishPage = read('src/pages/projects.astro');
  const slovakPage = read('src/pages/projekty.astro');

  for (const source of [englishPage, slovakPage]) {
    assert.match(source, /<ProjectShowcase/);
    assert.match(source, /projects=\{strings\.projects\.items\}/);
    assert.doesNotMatch(source, /<ProjectCard/);
  }

  assert.match(englishPage, /currentPath="\/projects"/);
  assert.match(slovakPage, /currentPath="\/projekty"/);
  for (const copy of [en, sk]) {
    assert.deepEqual(copy.projects.items.map((project) => project.id), ['vozokany', 'postwork', 'viki']);
    assert.deepEqual(copy.projects.items.map((project) => project.title), ['Vozokany', 'post.work', 'Viki']);
    for (const project of copy.projects.items) {
      assert.ok(project.description.trim(), `${project.id} needs a description`);
    }
  }
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

test('every listed project has its own local screenshot with localized alternative text', async () => {
  const { outputFiles } = buildSync({
    entryPoints: [new URL('src/data/projects.ts', root).pathname],
    bundle: true,
    format: 'esm',
    platform: 'node',
    write: false,
  });
  const { projectMedia } = await import(`data:text/javascript;base64,${Buffer.from(outputFiles[0].text).toString('base64')}`);
  const screenshots = [];

  for (const project of en.projects.items) {
    const media = projectMedia[project.id];
    assert.ok(media, `${project.id} needs screenshot metadata`);
    assert.match(media.image, /^\/images\/projects\/.+\.(?:png|jpe?g|webp)$/);
    assert.ok(existsSync(new URL(`public${media.image}`, root)), `${project.id} screenshot must exist`);
    assert.ok(Number.isInteger(media.width) && media.width > 0);
    assert.ok(Number.isInteger(media.height) && media.height > 0);
    assert.ok(media.alt.en.trim(), `${project.id} needs English alternative text`);
    assert.ok(media.alt.sk.trim(), `${project.id} needs Slovak alternative text`);
    screenshots.push(media.image);
  }

  assert.equal(new Set(screenshots).size, 3);
});
