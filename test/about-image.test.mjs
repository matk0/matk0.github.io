import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { test } from 'node:test';

const index = readFileSync(new URL('../src/pages/index.astro', import.meta.url), 'utf8');

test('homepage uses the supplied profile portrait', () => {
  assert.match(index, /src="\/images\/matej-lukasik-profile\.jpg"/);
  assert.match(index, /alt="Matej Lukášik"/);
  assert.match(index, /rounded-lg/);
  assert.ok(existsSync(new URL('../public/images/matej-lukasik-profile.jpg', import.meta.url)));
});

test('homepage keeps the portrait and text as the only two primary columns', () => {
  assert.match(index, /grid min-h-\[calc\(100vh-8rem\)\] max-w-6xl grid-cols-1/);
  assert.match(index, /lg:grid-cols-2/);
  assert.match(index, /max-w-\[540px\]/);
  assert.match(index, /max-w-xl/);
});

test('homepage does not render a separate about section', () => {
  assert.doesNotMatch(index, /<section id="about"/);
  assert.doesNotMatch(index, /strings\.about/);
});
