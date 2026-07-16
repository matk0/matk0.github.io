import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { test } from 'node:test';

const index = readFileSync(new URL('../src/pages/index.astro', import.meta.url), 'utf8');
const painCard = readFileSync(new URL('../src/components/PainCard.astro', import.meta.url), 'utf8');

test('homepage pain cards use generated illustrations', () => {
  const imagePaths = [
    '/images/pain-clarity.webp',
    '/images/pain-value.webp',
    '/images/pain-security.webp',
  ];

  for (const imagePath of imagePaths) {
    assert.match(index, new RegExp(`imageSrc="${imagePath}"`));
    assert.ok(existsSync(new URL(`../public${imagePath}`, import.meta.url)), `${imagePath} should exist`);
  }
});

test('pain card keeps image rendering and emoji fallback', () => {
  assert.match(painCard, /imageSrc\?: string/);
  assert.match(painCard, /<img\s+src=\{imageSrc\}/);
  assert.match(painCard, /\{icon\}/);
});
