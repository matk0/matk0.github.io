import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request, locals }) => {
  const formData = await request.formData();

  const honeypot = formData.get('website');
  if (honeypot) {
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  }

  const name = formData.get('name')?.toString().trim();
  const email = formData.get('email')?.toString().trim();
  const company = formData.get('company')?.toString().trim() || '';
  const service = formData.get('service')?.toString().trim() || '';
  const message = formData.get('message')?.toString().trim();
  const lang = formData.get('lang')?.toString().trim() || 'en';

  if (!name || !email || !message) {
    return new Response(
      JSON.stringify({ error: 'Missing required fields' }),
      { status: 400 }
    );
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return new Response(
      JSON.stringify({ error: 'Invalid email' }),
      { status: 400 }
    );
  }

  const runtime = (locals as any).runtime;
  const RESEND_API_KEY = runtime?.env?.RESEND_API_KEY || import.meta.env.RESEND_API_KEY;

  if (RESEND_API_KEY) {
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
               <p><strong>Company:</strong> ${company || 'N/A'}</p>
               <p><strong>Service:</strong> ${service}</p>
               <p><strong>Language:</strong> ${lang}</p>
               <hr />
               <p>${message.replace(/\n/g, '<br />')}</p>`,
      }),
    });

    if (!res.ok) {
      console.error('Resend API error:', await res.text());
      return new Response(
        JSON.stringify({ error: 'Failed to send email' }),
        { status: 500 }
      );
    }
  } else {
    console.log('Contact form submission (no RESEND_API_KEY):', {
      name, email, company, service, message, lang,
      timestamp: new Date().toISOString(),
    });
  }

  return new Response(JSON.stringify({ success: true }), { status: 200 });
};
