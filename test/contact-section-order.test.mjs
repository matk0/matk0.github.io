import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const pages = [
  '../src/pages/contact.astro',
  '../src/pages/kontakt.astro',
];

test('contact pages show booking before message form in source order', () => {
  for (const page of pages) {
    const source = readFileSync(new URL(page, import.meta.url), 'utf8');

    assert.ok(source.indexOf('<CalEmbed') < source.indexOf('<ContactForm'));
  }
});

test('Slovak contact page does not include direct contact section', () => {
  const source = readFileSync(new URL('../src/pages/kontakt.astro', import.meta.url), 'utf8');

  assert.equal(source.includes('strings.contact.directTitle'), false);
});
