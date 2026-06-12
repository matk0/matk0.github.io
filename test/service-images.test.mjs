import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { test } from 'node:test';

const index = readFileSync(new URL('../src/pages/index.astro', import.meta.url), 'utf8');
const serviceCard = readFileSync(new URL('../src/components/ServiceCard.astro', import.meta.url), 'utf8');
const serviceSection = readFileSync(new URL('../src/components/ServiceSection.astro', import.meta.url), 'utf8');

test('minimal homepage does not render old service imagery sections', () => {
  const imagePaths = [
    '/images/service-strategy.webp',
    '/images/service-implementation.webp',
    '/images/service-training.webp',
  ];

  for (const imagePath of imagePaths) {
    assert.ok(existsSync(new URL(`../public${imagePath}`, import.meta.url)), `${imagePath} should exist`);
    assert.equal(index.includes(`imageSrc="${imagePath}"`), false, `${imagePath} should not be mounted on homepage`);
  }

  assert.doesNotMatch(index, /<ServiceCard/);
  assert.doesNotMatch(index, /<ServiceSection/);
});

test('service components do not expose emoji icon props', () => {
  assert.doesNotMatch(serviceCard, /icon: string/);
  assert.doesNotMatch(serviceSection, /icon: string/);
  assert.doesNotMatch(index, /<ServiceCard\s+icon=/);
  assert.doesNotMatch(index, /<ServiceSection[\s\S]*?\n\s+icon=/);
});

test('service cards stretch to equal grid height', () => {
  assert.match(serviceCard, /h-full flex flex-col/);
  assert.match(serviceCard, /relative z-10 h-full flex flex-col/);
  assert.match(serviceCard, /mt-auto/);
  assert.doesNotMatch(index, /reveal reveal-delay-1 h-full/);
  assert.doesNotMatch(index, /reveal reveal-delay-2 h-full/);
  assert.doesNotMatch(index, /reveal reveal-delay-3 h-full/);
});
