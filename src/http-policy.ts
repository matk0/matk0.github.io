const CANONICAL_HOSTS = new Set([
  'matejlukasik.com',
  'matejlukasik.sk',
]);

export function getCanonicalProductionUrl(url: URL): URL | null {
  const canonicalHostname = url.hostname.replace(/^www\./, '');
  if (!CANONICAL_HOSTS.has(canonicalHostname)) return null;
  if (url.protocol === 'https:' && url.hostname === canonicalHostname) return null;

  const canonicalUrl = new URL(url);
  canonicalUrl.protocol = 'https:';
  canonicalUrl.hostname = canonicalHostname;
  canonicalUrl.port = '';
  return canonicalUrl;
}

export function applyProductionSecurityHeaders(response: Response, url: URL): Response {
  const canonicalHostname = url.hostname.replace(/^www\./, '');
  if (url.protocol !== 'https:' || !CANONICAL_HOSTS.has(canonicalHostname)) return response;

  const headers = new Headers(response.headers);
  headers.set('Strict-Transport-Security', 'max-age=31536000');

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
