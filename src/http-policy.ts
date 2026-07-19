const CANONICAL_HOSTS = new Set([
  'matejlukasik.com',
  'matejlukasik.sk',
]);

const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://app.cal.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' data: https://fonts.gstatic.com",
  "img-src 'self' data: https://www.google-analytics.com https://*.google-analytics.com https://www.googletagmanager.com",
  "connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://www.google.com https://*.google.com",
  'frame-src https://cal.com https://app.cal.com',
  "worker-src 'self' blob:",
  "manifest-src 'self'",
  'upgrade-insecure-requests',
].join('; ');

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
  if (!CANONICAL_HOSTS.has(canonicalHostname)) return response;

  const headers = new Headers(response.headers);
  if (url.protocol === 'https:') {
    headers.set('Strict-Transport-Security', 'max-age=31536000');
  }
  headers.set('Content-Security-Policy', CONTENT_SECURITY_POLICY);
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('X-Frame-Options', 'DENY');
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
  );

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
