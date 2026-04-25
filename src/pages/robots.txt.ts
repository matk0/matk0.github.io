import type { APIRoute } from 'astro';
import { DOMAINS, type Lang } from '../i18n';

const AI_BOTS = [
  'GPTBot',
  'ChatGPT-User',
  'OAI-SearchBot',
  'ClaudeBot',
  'Claude-Web',
  'anthropic-ai',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'Bytespider',
  'CCBot',
  'cohere-ai',
  'Meta-ExternalAgent',
  'Meta-ExternalFetcher',
  'DuckAssistBot',
  'MistralAI-User',
  'Amazonbot',
  'YouBot',
  'Diffbot',
];

export const GET: APIRoute = ({ locals }) => {
  const lang = ((locals as any).lang as Lang) || 'en';
  const domain = DOMAINS[lang];

  const lines = [
    'User-agent: *',
    'Allow: /',
    'Disallow: /api/',
    '',
    '# AI assistants and LLM crawlers are welcome.',
    ...AI_BOTS.flatMap((bot) => [`User-agent: ${bot}`, 'Allow: /', '']),
    `Sitemap: ${domain}/sitemap.xml`,
    `Host: ${domain.replace(/^https?:\/\//, '')}`,
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
