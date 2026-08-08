import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const PUBLIC_DIR = path.resolve('./public');
const FAVICONS_DIR = path.resolve('./public/favicons');

if (!fs.existsSync(FAVICONS_DIR)) {
  fs.mkdirSync(FAVICONS_DIR, { recursive: true });
}

const toolFavicons = [
  { slug: 'ruler', color: '#06b6d4', icon: '📏' },
  { slug: 'pregnancy-calculator', color: '#f43f5e', icon: '👶' },
  { slug: 'data-converter', color: '#10b981', icon: '🔄' },
  { slug: 'dpi-calculator', color: '#8b5cf6', icon: '🖥️' },
  { slug: 'aspect-ratio-calculator', color: '#f59e0b', icon: '🖼️' },
  { slug: 'calorie-calculator', color: '#f97316', icon: '🔥' },
  { slug: 'color-tools', color: '#ec4899', icon: '🎨' },
  { slug: 'cron-expression-builder', color: '#22c55e', icon: '⏰' },
  { slug: 'image-resizer', color: '#0ea5e9', icon: '🗜️' },
  { slug: 'password-checker', color: '#10b981', icon: '🔒' },
  { slug: 'pdf-tools', color: '#ef4444', icon: '📄' },
  { slug: 'qr-code-generator', color: '#7c3aed', icon: '📱' },
  { slug: 'regex-tester', color: '#eab308', icon: '⚡' },
  { slug: 'unit-converter', color: '#3b82f6', icon: '📐' },
  { slug: 'workspace', color: '#6366f1', icon: '🚀' }
];

function createIconSvg(color, symbol) {
  return `<svg width="96" height="96" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg">
  <rect width="96" height="96" rx="24" fill="${color}" />
  <text x="48" y="60" text-anchor="middle" font-family="system-ui, sans-serif" font-size="48">${symbol}</text>
</svg>`;
}

async function main() {
  console.log('Generating page-specific favicons...');
  for (const t of toolFavicons) {
    const svgStr = createIconSvg(t.color, t.icon);
    const pngPath = path.join(FAVICONS_DIR, `${t.slug}.png`);
    await sharp(Buffer.from(svgStr)).resize(96, 96).png().toFile(pngPath);
    console.log(`✓ Created /favicons/${t.slug}.png`);
  }
  console.log('Done!');
}

main().catch(console.error);
