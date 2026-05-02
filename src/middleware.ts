import { defineMiddleware } from 'astro:middleware';
import { getExpectedPath, getLangFromUrl, isLang, isProductionHost, LOCAL_LANG_COOKIE } from './i18n';

export const onRequest = defineMiddleware(async ({ url, locals, redirect, cookies }, next) => {
  if (url.pathname.startsWith('/api/')) return next();

  const lang = getLangFromUrl(url, cookies.get(LOCAL_LANG_COOKIE)?.value);
  (locals as any).lang = lang;

  const requestedLang = url.searchParams.get('lang');
  if (!isProductionHost(url.hostname) && isLang(requestedLang)) {
    cookies.set(LOCAL_LANG_COOKIE, requestedLang, {
      path: '/',
      sameSite: 'lax',
    });
  }

  const expected = getExpectedPath(lang, url.pathname);
  if (isProductionHost(url.hostname) && expected !== null && expected !== url.pathname) {
    return redirect(expected, 301);
  }

  return next();
});
