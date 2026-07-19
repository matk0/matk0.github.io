import { defineMiddleware } from 'astro:middleware';
import { getExpectedPath, getLangFromUrl, isLang, isProductionHost, LOCAL_LANG_COOKIE } from './i18n';
import { applyProductionSecurityHeaders, getCanonicalProductionUrl } from './http-policy';

export const onRequest = defineMiddleware(async ({ url, locals, redirect, cookies }, next) => {
  const canonicalUrl = getCanonicalProductionUrl(url);
  if (canonicalUrl) {
    return applyProductionSecurityHeaders(redirect(canonicalUrl.href, 308), url);
  }

  if (url.pathname.startsWith('/api/')) {
    return applyProductionSecurityHeaders(await next(), url);
  }

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
    return applyProductionSecurityHeaders(redirect(expected, 301), url);
  }

  return applyProductionSecurityHeaders(await next(), url);
});
