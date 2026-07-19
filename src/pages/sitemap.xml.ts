import type { APIRoute } from 'astro';
import { DOMAINS, type Lang } from '../i18n';

const PAGE_PATHS: Array<Record<Lang, string>> = [
  { en: '/', sk: '/' },
  { en: '/contact', sk: '/kontakt' },
  { en: '/privacy', sk: '/sukromie' },
];

function urls(lang: Lang) {
  const self = DOMAINS[lang];
  const altLang = lang === 'sk' ? 'en' : 'sk';

  return PAGE_PATHS.map((paths) => ({
    loc: `${self}${paths[lang]}`,
    alternates: [
      { hreflang: lang, href: `${self}${paths[lang]}` },
      { hreflang: altLang, href: `${DOMAINS[altLang]}${paths[altLang]}` },
      { hreflang: 'x-default', href: `${DOMAINS.en}${paths.en}` },
    ],
  }));
}

export const GET: APIRoute = ({ locals }) => {
  const lang = ((locals as any).lang as Lang) || 'en';
  const entries = urls(lang);

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n` +
    entries
      .map(
        (e) =>
          `  <url>\n    <loc>${e.loc}</loc>\n` +
          e.alternates
            .map((a) => `    <xhtml:link rel="alternate" hreflang="${a.hreflang}" href="${a.href}" />\n`)
            .join('') +
          `  </url>\n`,
      )
      .join('') +
    `</urlset>\n`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
