import sharp from 'sharp';
import fs from 'fs';

const testSvg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#090d16"/>
  <circle cx="200" cy="150" r="300" fill="#6366f1" opacity="0.25" filter="blur(60px)"/>
  <text x="100" y="300" font-family="sans-serif" font-size="64" font-weight="bold" fill="#ffffff">Test OG Image</text>
</svg>`;

async function run() {
  if (!fs.existsSync('./public/og')) {
    fs.mkdirSync('./public/og', { recursive: true });
  }
  await sharp(Buffer.from(testSvg)).png().toFile('./public/og/test.png');
  console.log('Successfully created ./public/og/test.png');
}

run().catch(console.error);
