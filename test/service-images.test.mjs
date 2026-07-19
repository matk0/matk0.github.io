import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { test } from 'node:test';

const index = readFileSync(new URL('../src/pages/index.astro', import.meta.url), 'utf8');
const serviceCard = readFileSync(new URL('../src/components/ServiceCard.astro', import.meta.url), 'utf8');
const serviceSection = readFileSync(new URL('../src/components/ServiceSection.astro', import.meta.url), 'utf8');

test('service cards and sections use schematic images', () => {
  const imagePaths = [
    '/images/service-strategy.webp',
    '/images/service-implementation.webp',
    '/images/service-training.webp',
  ];

  for (const imagePath of imagePaths) {
    assert.ok(index.includes(`imageSrc="${imagePath}"`), `${imagePath} should be referenced`);
    assert.ok(existsSync(new URL(`../public${imagePath}`, import.meta.url)), `${imagePath} should exist`);
  }
});

test('service components do not expose emoji icon props', () => {
  assert.doesNotMatch(serviceCard, /icon: string/);
  assert.doesNotMatch(serviceSection, /icon: string/);
  assert.doesNotMatch(index, /<ServiceCard\s+icon=/);
  assert.doesNotMatch(index, /<ServiceSection[\s\S]*?\n\s+icon=/);
});

test('service card component stretches its content to equal height', () => {
  assert.match(serviceCard, /h-full flex flex-col/);
  assert.match(serviceCard, /relative z-10 h-full flex flex-col/);
  assert.match(serviceCard, /mt-auto/);
});

test('nested service sections render as white panels', () => {
  assert.match(serviceSection, /nested\?: boolean/);
  assert.match(serviceSection, /rounded-2xl bg-surface border border-border\/60 shadow-sm/);
});
