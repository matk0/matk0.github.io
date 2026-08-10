import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { test } from 'node:test';

const index = readFileSync(new URL('../src/pages/index.astro', import.meta.url), 'utf8');
const hero = readFileSync(new URL('../src/components/Hero.astro', import.meta.url), 'utf8');

test('homepage hero presents Matej alongside the consulting offer', () => {
  assert.match(index, /imageSrc="\/images\/hero-matej-portrait\.webp"/);
  assert.match(index, /imageAlt="Matej Lukášik"/);
  assert.ok(existsSync(new URL('../public/images/hero-matej-portrait.webp', import.meta.url)));
  assert.match(hero, /<img\s+src=\{imageSrc\}\s+alt=\{imageAlt\}/);
  assert.match(hero, /fetchpriority="high"/);
});
