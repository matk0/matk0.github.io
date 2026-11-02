import type { APIRoute } from 'astro';
import { DOMAINS } from '../i18n';
export const GET: APIRoute = () => {
  const entries = ['/', '/cv', '/projects', '/privacy'].map(path => `  <url><loc>${DOMAINS.en}${path}</loc></url>`).join('\n');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`, { headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } });
};
