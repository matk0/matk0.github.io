import { defineMiddleware } from 'astro:middleware';
import { applyProductionSecurityHeaders, getCanonicalProductionUrl } from './http-policy';

const legacyPaths: Record<string, string> = { '/projekty': '/projects', '/sukromie': '/privacy', '/kontakt': '/', '/sluzby': '/', '/o-mne': '/' };
export const onRequest = defineMiddleware(async ({ url, locals, redirect }, next) => {
  const canonicalUrl = getCanonicalProductionUrl(url);
  if (canonicalUrl) return applyProductionSecurityHeaders(redirect(canonicalUrl.href, 308), url);
  const oldHost = url.hostname.replace(/^www\./, '') === 'matejlukasik.sk';
  const legacyPath = legacyPaths[url.pathname];
  if (oldHost || legacyPath) {
    const target = new URL(legacyPath || url.pathname, oldHost ? 'https://matejlukasik.com' : url.origin);
    target.search = url.search;
    target.searchParams.delete('lang');
    return applyProductionSecurityHeaders(redirect(target.href, 301), url);
  }
  (locals as any).lang = 'en';
  return applyProductionSecurityHeaders(await next(), url);
});
