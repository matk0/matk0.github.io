import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const homepage = readFileSync(new URL('../src/pages/index.astro', import.meta.url), 'utf8');

test('about section links to the selected public profiles', () => {
  assert.match(homepage, /https:\/\/www\.linkedin\.com\/in\/matej-lukasik/);
  assert.match(homepage, /https:\/\/x\.com\/matejlukasik/);
  assert.match(homepage, /https:\/\/github\.com\/matk0/);
  assert.match(homepage, /https:\/\/youtube\.com\/@matejlukasik/);
  assert.match(homepage, /data-analytics-position="about_socials"/);
  assert.match(homepage, /aria-label=\{profile\.label\}/);
  assert.match(homepage, /d=\{profile\.iconPath\}/);
  assert.doesNotMatch(homepage, />\s*\{profile\.label\}\s*<\/a>/);
});
