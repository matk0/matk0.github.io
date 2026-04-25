import type { APIRoute } from 'astro';
import { DOMAINS, type Lang } from '../i18n';

function urls(lang: Lang) {
  const self = DOMAINS[lang];
  const other = DOMAINS[lang === 'sk' ? 'en' : 'sk'];
  const home = '/';
  const contact = lang === 'sk' ? '/kontakt' : '/contact';
  const altContact = lang === 'sk' ? '/contact' : '/kontakt';
  const altLang = lang === 'sk' ? 'en' : 'sk';

  return [
    {
      loc: `${self}${home}`,
      alternates: [
        { hreflang: lang, href: `${self}${home}` },
        { hreflang: altLang, href: `${other}${home}` },
      ],
    },
    {
      loc: `${self}${contact}`,
      alternates: [
        { hreflang: lang, href: `${self}${contact}` },
        { hreflang: altLang, href: `${other}${altContact}` },
      ],
    },
  ];
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
