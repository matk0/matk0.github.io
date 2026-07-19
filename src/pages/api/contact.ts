import type { APIRoute } from 'astro';

const MAX_REQUEST_BYTES = 16_384;
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 5_000;
const ALLOWED_SERVICES = new Set(['consulting', 'implementation', 'training', 'notSure']);
const ALLOWED_LANGUAGES = new Set(['en', 'sk']);

type RateLimiter = {
  limit: (options: { key: string }) => Promise<{ success: boolean }>;
};

const escapeHtml = (value: string) =>
  value.replace(/[&<>'"]/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;',
  })[character] ?? character);

const singleLine = (value: string) => value.replace(/[\r\n]+/g, ' ').trim();

const getClientKey = (request: Request) =>
  request.headers.get('CF-Connecting-IP') ||
  request.headers.get('X-Forwarded-For')?.split(',')[0]?.trim() ||
  'unknown';

export const POST: APIRoute = async ({ request, locals }) => {
  const json = (payload: unknown, status: number, extraHeaders: HeadersInit = {}) =>
    new Response(JSON.stringify(payload), {
      status,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-store',
        'X-Contact-Handler': 'v3',
        ...extraHeaders,
      },
    });

  const requestOrigin = new URL(request.url).origin;
  const origin = request.headers.get('Origin');
  if (origin && origin !== requestOrigin) {
    return json({ error: 'Invalid request origin' }, 403);
  }

  const contentLength = Number(request.headers.get('Content-Length') || 0);
  if (contentLength > MAX_REQUEST_BYTES) {
    return json({ error: 'Request is too large' }, 413);
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return json({ error: 'Invalid form data' }, 400);
  }

  const honeypot = formData.get('website');
  if (honeypot) {
    return json({ success: true }, 200);
  }

  const name = formData.get('name')?.toString().trim() || '';
  const email = formData.get('email')?.toString().trim() || '';
  const service = formData.get('service')?.toString().trim() || 'notSure';
  const message = formData.get('message')?.toString().trim() || '';
  const lang = formData.get('lang')?.toString().trim() || 'en';

  if (!name || !email || !message) {
    return json({ error: 'Missing required fields' }, 400);
  }

  if (
    name.length > MAX_NAME_LENGTH ||
    email.length > MAX_EMAIL_LENGTH ||
    message.length > MAX_MESSAGE_LENGTH ||
    !ALLOWED_SERVICES.has(service) ||
    !ALLOWED_LANGUAGES.has(lang)
  ) {
    return json({ error: 'Invalid form data' }, 400);
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return json({ error: 'Invalid email' }, 400);
  }

  const runtime = (locals as any).runtime;
  const env = runtime?.env;
  const resendApiKey: string | undefined =
    env?.RESEND_API_KEY || import.meta.env?.RESEND_API_KEY;
  const rateLimiter: RateLimiter | undefined = env?.CONTACT_RATE_LIMITER;

  if (!rateLimiter) {
    console.error({ event: 'contact_configuration_error', component: 'rate_limiter' });
    return json({ error: 'Contact form is temporarily unavailable' }, 503);
  }

  const rateLimit = await rateLimiter.limit({ key: getClientKey(request) });
  if (!rateLimit.success) {
    return json({ error: 'Too many requests' }, 429, { 'Retry-After': '60' });
  }

  if (!resendApiKey) {
    console.error({ event: 'contact_configuration_error', component: 'email_delivery' });
    return json({ error: 'Contact form is temporarily unavailable' }, 503);
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeService = escapeHtml(service);
  const safeLang = escapeHtml(lang);
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br />');
  const subjectName = singleLine(name);
  const idempotencyKey = `contact/${crypto.randomUUID()}`;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
        'Idempotency-Key': idempotencyKey,
      },
      body: JSON.stringify({
        from: 'Matej Lukášik <matej@matejlukasik.com>',
        to: ['matej@matejlukasik.com'],
        reply_to: email,
        subject: `New inquiry from ${subjectName} — ${service}`,
        text: [
          'New contact form submission',
          '',
          `Name: ${name}`,
          `Email: ${email}`,
          `Service: ${service}`,
          `Language: ${lang}`,
          '',
          message,
        ].join('\n'),
        html: `<h2>New contact form submission</h2>
               <p><strong>Name:</strong> ${safeName}</p>
               <p><strong>Email:</strong> ${safeEmail}</p>
               <p><strong>Service:</strong> ${safeService}</p>
               <p><strong>Language:</strong> ${safeLang}</p>
               <hr />
               <p>${safeMessage}</p>`,
      }),
    });

    if (!response.ok) {
      console.error({
        event: 'contact_delivery_failed',
        provider: 'resend',
        status: response.status,
        requestId: response.headers.get('X-Resend-Id') || undefined,
      });
      return json({ error: 'Failed to send email' }, 502);
    }
  } catch {
    console.error({ event: 'contact_delivery_failed', provider: 'resend', status: 'network_error' });
    return json({ error: 'Failed to send email' }, 502);
  }

  return json({ success: true }, 200);
};
