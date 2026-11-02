import sharp from 'sharp';
import { readFile } from 'node:fs/promises';

const publicDir = new URL('../public/', import.meta.url);
const pixelLogo = new URL('images/matej-pixel-logo.png', publicDir);
const portrait = new URL('images/hero-matej-portrait.webp', publicDir);

// Trim the transparent margin so the face remains recognizable at favicon sizes.
const trimmedLogo = await sharp(await readFile(pixelLogo)).trim().png().toBuffer();
for (const [filename, size] of [
  ['favicon-pixel-16.png', 16], ['favicon-pixel-32.png', 32],
  ['favicon-pixel-48.png', 48], ['favicon-pixel-512.png', 512],
  ['apple-touch-pixel.png', 180],
]) {
  await sharp(trimmedLogo).resize(size, size, {
    fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 }, kernel: 'nearest',
  }).png().toFile(new URL(filename, publicDir).pathname);
}

const photo = await sharp(await readFile(portrait))
  .resize(460, 630, { fit: 'cover', position: 'top' }).png().toBuffer();

for (const [lang, title] of [['en', 'Senior Product Engineer'], ['sk', 'Senior produktový inžinier']]) {
  const layout = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <rect width="1200" height="630" fill="#242424"/>
    <rect x="76" y="220" width="54" height="5" fill="#c6bafc"/>
    <text x="76" y="315" fill="#ffffff" font-family="sans-serif" font-size="65" font-weight="700">Matej Lukášik</text>
    <text x="76" y="380" fill="#ded9f7" font-family="sans-serif" font-size="34" font-weight="500">${title}</text>
    <text x="76" y="542" fill="#bcbcbc" font-family="sans-serif" font-size="24">${lang === 'sk' ? 'matejlukasik.sk' : 'matejlukasik.com'}</text>
  </svg>`);
  await sharp(layout).composite([{ input: photo, left: 740, top: 0 }])
    .png().toFile(new URL(`og-${lang}-portrait.png`, publicDir).pathname);
}
