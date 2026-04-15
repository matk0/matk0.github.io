import { defineMiddleware } from 'astro:middleware';
import type { Lang } from './i18n';
import { getExpectedPath } from './i18n';

function getLangFromHost(hostname: string): Lang {
  if (hostname.endsWith('.sk')) return 'sk';
  return 'en';
}

export const onRequest = defineMiddleware(async ({ url, locals, redirect }, next) => {
  if (url.pathname.startsWith('/api/')) return next();

  const lang = getLangFromHost(url.hostname);
  (locals as any).lang = lang;

  const expected = getExpectedPath(lang, url.pathname);
  if (expected !== null && expected !== url.pathname) {
    return redirect(expected, 301);
  }

  return next();
});
