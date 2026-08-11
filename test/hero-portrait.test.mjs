import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { test } from 'node:test';

const index = readFileSync(new URL('../src/pages/index.astro', import.meta.url), 'utf8');
const hero = readFileSync(new URL('../src/components/Hero.astro', import.meta.url), 'utf8');
const globalStyles = readFileSync(new URL('../src/styles/global.css', import.meta.url), 'utf8');

test('homepage hero presents Matej alongside the consulting offer', () => {
  assert.match(index, /imageSrc="\/images\/hero-matej-portrait\.webp"/);
  assert.match(index, /imageAlt="Matej Lukášik"/);
  assert.ok(existsSync(new URL('../public/images/hero-matej-portrait.webp', import.meta.url)));
  assert.match(hero, /<img\s+src=\{imageSrc\}\s+alt=\{imageAlt\}/);
  assert.match(hero, /fetchpriority="high"/);
});

test('desktop portrait sits directly beside the hero copy', () => {
  assert.match(hero, /lg:gap-6/);
  assert.match(hero, /hero-portrait-wrap[^\n]*lg:ml-0/);
  assert.doesNotMatch(hero, /hero-portrait-wrap[^\n]*lg:mr-0/);
});

test('hero wave masks portrait effects at the section boundary', () => {
  const waveRule = globalStyles.match(/\.wave-divider::after\s*\{([\s\S]*?)\}/)?.[1] ?? '';

  assert.match(waveRule, /z-index:\s*20;/);
  assert.match(waveRule, /pointer-events:\s*none;/);
});
