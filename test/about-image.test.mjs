import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { test } from 'node:test';

const index = readFileSync(new URL('../src/pages/index.astro', import.meta.url), 'utf8');
const sk = JSON.parse(readFileSync(new URL('../src/i18n/sk.json', import.meta.url), 'utf8'));

test('about section uses the clay-style Matej image', () => {
  assert.match(index, /src="\/images\/about-matej\.webp"/);
  assert.ok(existsSync(new URL('../public/images/about-matej.webp', import.meta.url)));
});

test('about section gives the portrait half-width presence', () => {
  assert.match(index, /grid grid-cols-1 lg:grid-cols-2/);
  assert.match(index, /aspect-\[4\/5\].*max-h-\[680px\]/);
});

test('about section centers the portrait and title within the left column', () => {
  const aboutStart = index.indexOf('<section id="about"');
  const aboutEnd = index.indexOf('<FAQ ', aboutStart);
  const aboutSection = index.slice(aboutStart, aboutEnd);

  assert.match(aboutSection, /<div class="w-full max-w-\[560px\] mx-auto">/);
  assert.match(aboutSection, /<div class="mt-6 lg:mt-8 text-center">/);
  assert.doesNotMatch(aboutSection, /lg:mx-0/);
  assert.doesNotMatch(aboutSection, /lg:text-left/);
});

test('slovak about title uses agentic AI wording', () => {
  assert.equal(sk.about.bioTitle, 'Konzultant pre agentickú AI');
});

test('slovak about bio builds trust without repeating the AI urgency hook', () => {
  assert.match(sk.about.bioText, /konzultant pre agentické AI/);
  assert.match(sk.about.bioText, /10 rokov praxe/);
  assert.doesNotMatch(sk.about.bioText, /tlak okolo AI/);
});

test('homepage does not render a separate about approach section', () => {
  assert.doesNotMatch(index, /strings\.about\.approachTitle/);
  assert.doesNotMatch(index, /strings\.about\.principle[123]Title/);
});
