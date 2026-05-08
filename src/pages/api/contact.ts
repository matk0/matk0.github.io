import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request, locals }) => {
  const json = (payload: unknown, status: number) =>
    new Response(JSON.stringify(payload), {
      status,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'X-Contact-Handler': 'v2',
      },
    });

  const formData = await request.formData();

  const honeypot = formData.get('website');
  if (honeypot) {
    return json({ success: true }, 200);
  }

  const name = formData.get('name')?.toString().trim();
  const email = formData.get('email')?.toString().trim();
  const service = formData.get('service')?.toString().trim() || '';
  const message = formData.get('message')?.toString().trim();
  const lang = formData.get('lang')?.toString().trim() || 'en';

  if (!name || !email || !message) {
    return json({ error: 'Missing required fields' }, 400);
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return json({ error: 'Invalid email' }, 400);
  }

  const runtime = (locals as any).runtime;
  let RESEND_API_KEY: string | undefined;
  try {
    RESEND_API_KEY = runtime?.env?.RESEND_API_KEY || import.meta.env.RESEND_API_KEY;
  } catch (error) {
    console.error('Failed to read RESEND_API_KEY from runtime env:', error);
    RESEND_API_KEY = import.meta.env.RESEND_API_KEY;
  }

  if (RESEND_API_KEY) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Matej Lukášik <matej@matejlukasik.com>',
          to: ['matej@matejlukasik.com'],
          reply_to: email,
          subject: `New inquiry from ${name} — ${service}`,
          html: `<h2>New contact form submission</h2>
                 <p><strong>Name:</strong> ${name}</p>
                 <p><strong>Email:</strong> ${email}</p>
                 <p><strong>Service:</strong> ${service}</p>
                 <p><strong>Language:</strong> ${lang}</p>
                 <hr />
                 <p>${message.replace(/\n/g, '<br />')}</p>`,
        }),
      });

      if (!res.ok) {
        console.error('Resend API error:', await res.text());
        return json({ error: 'Failed to send email' }, 500);
      }
    } catch (error) {
      console.error('Resend API request failed:', error);
      return json({ error: 'Failed to send email' }, 500);
    }
  } else {
    console.log('Contact form submission (no RESEND_API_KEY):', {
      name, email, service, message, lang,
      timestamp: new Date().toISOString(),
    });
  }

  return json({ success: true }, 200);
};
