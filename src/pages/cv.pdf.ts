import type { APIRoute } from 'astro';
import { cv } from '../data/cv';
import { createCVPdf } from '../lib/cv-pdf';

export const prerender = true;

export const GET: APIRoute = async () => new Response(await createCVPdf(cv.en), {
  headers: {
    'Content-Type': 'application/pdf',
    'Content-Disposition': 'attachment; filename="Matej-Lukasik-CV.pdf"',
  },
});
