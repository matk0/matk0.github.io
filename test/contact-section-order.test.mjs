import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { runInNewContext } from 'node:vm';

const pages = [
  '../src/pages/contact.astro',
  '../src/pages/kontakt.astro',
];

test('legacy contact routes permanently return to the homepage', () => {
  for (const page of pages) {
    const source = readFileSync(new URL(page, import.meta.url), 'utf8');
    const frontmatter = source.match(/^---\s*\n([\s\S]*?)\n---/)?.[1];
    assert.ok(frontmatter, page + ' must retain a legacy redirect');
    const redirects = [];
    const result = runInNewContext('(function () { ' + frontmatter + ' })()', {
      Astro: {
        redirect(location, status) {
          redirects.push({ location, status });
          return 'redirect';
        },
      },
    });

    assert.equal(result, 'redirect');
    assert.deepEqual(redirects, [{ location: '/', status: 301 }]);
    assert.doesNotMatch(source, /ContactForm|CalEmbed|<form\b|contact-form|http-equiv/i);
  }
});
