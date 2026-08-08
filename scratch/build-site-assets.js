import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const PUBLIC_DIR = path.resolve('./public');
const OG_DIR = path.resolve('./public/og');

if (!fs.existsSync(OG_DIR)) {
  fs.mkdirSync(OG_DIR, { recursive: true });
}

// -------------------------------------------------------------------
// 1. Generate Favicons (48x48, 96x96, 180x180, 192x192, 512x512)
// -------------------------------------------------------------------
const logoSvgPath = path.join(PUBLIC_DIR, 'logo.svg');

async function generateFavicons() {
  console.log('Generating site favicons and app icons...');
  const logoBuffer = fs.readFileSync(logoSvgPath);

  // Favicon 48x48 (Google Search Favicon standard requirement)
  await sharp(logoBuffer)
    .resize(48, 48)
    .png()
    .toFile(path.join(PUBLIC_DIR, 'favicon-48x48.png'));

  // Favicon 96x96
  await sharp(logoBuffer)
    .resize(96, 96)
    .png()
    .toFile(path.join(PUBLIC_DIR, 'favicon-96x96.png'));

  // Apple Touch Icon 180x180
  await sharp(logoBuffer)
    .resize(180, 180)
    .png()
    .toFile(path.join(PUBLIC_DIR, 'apple-touch-icon.png'));

  // Icon 192x192 (PWA / Webmanifest)
  await sharp(logoBuffer)
    .resize(192, 192)
    .png()
    .toFile(path.join(PUBLIC_DIR, 'icon-192.png'));

  // Icon 512x512 (PWA / Webmanifest)
  await sharp(logoBuffer)
    .resize(512, 512)
    .png()
    .toFile(path.join(PUBLIC_DIR, 'icon-512.png'));

  // Favicon ICO (32x32)
  await sharp(logoBuffer)
    .resize(32, 32)
    .png()
    .toFile(path.join(PUBLIC_DIR, 'favicon-32x32.png'));

  console.log('Favicons generated successfully.');
}

// -------------------------------------------------------------------
// 2. Generate Tool OG Images (1200x630 PNGs)
// -------------------------------------------------------------------

function createOgSvg({ category, title, subtitle, color1, color2, graphicSvg }) {
  const safeCategory = category.replace(/&/g, 'and');
  const safeTitle = title.replace(/&/g, 'and');
  const safeSubtitle = subtitle.replace(/&/g, 'and');

  return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#090d16" />
      <stop offset="50%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#090d16" />
    </linearGradient>
    <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${color1}" />
      <stop offset="100%" stop-color="${color2}" />
    </linearGradient>
    <linearGradient id="textGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="100%" stop-color="#cbd5e1" />
    </linearGradient>
    <radialGradient id="glow" cx="80%" cy="30%" r="60%">
      <stop offset="0%" stop-color="${color1}" stop-opacity="0.25" />
      <stop offset="100%" stop-color="#090d16" stop-opacity="0" />
    </radialGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#000000" flood-opacity="0.5" />
    </filter>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bgGrad)" />
  <rect width="1200" height="630" fill="url(#glow)" />

  <!-- Grid overlay -->
  <g stroke="#ffffff" stroke-opacity="0.03" stroke-width="1">
    <path d="M0 100 H1200 M0 200 H1200 M0 300 H1200 M0 400 H1200 M0 500 H1200 M0 600 H1200" />
    <path d="M100 0 V630 M200 0 V630 M300 0 V630 M400 0 V630 M500 0 V630 M600 0 V630 M700 0 V630 M800 0 V630 M900 0 V630 M1000 0 V630 M1100 0 V630" />
  </g>

  <!-- Top Header / Logo -->
  <g transform="translate(80, 70)">
    <!-- Brand Icon -->
    <rect width="44" height="44" rx="12" fill="url(#accentGrad)" />
    <path d="M14 15 L22 30 L30 15" stroke="#ffffff" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" fill="none" />
    <circle cx="22" cy="15" r="3" fill="#ffffff" />
    
    <text x="60" y="28" font-family="system-ui, -apple-system, sans-serif" font-weight="800" font-size="22" fill="#ffffff" letter-spacing="1">ROCKING TOOLS</text>
    <text x="60" y="44" font-family="system-ui, -apple-system, sans-serif" font-weight="500" font-size="13" fill="#94a3b8">rockingtools.com · 100% Client-Side Private Utilities</text>
  </g>

  <!-- Main Left Content Block -->
  <g transform="translate(80, 200)">
    <!-- Category Badge -->
    <rect x="0" y="0" width="${safeCategory.length * 9.5 + 28}" height="32" rx="16" fill="url(#accentGrad)" fill-opacity="0.15" stroke="${color1}" stroke-opacity="0.4" stroke-width="1.5" />
    <text x="14" y="21" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="12" fill="${color1}" letter-spacing="1.5">${safeCategory.toUpperCase()}</text>

    <!-- Main Title -->
    <text x="0" y="90" font-family="system-ui, -apple-system, sans-serif" font-weight="800" font-size="50" fill="url(#textGrad)" letter-spacing="-0.5">${safeTitle}</text>

    <!-- Subtitle -->
    <text x="0" y="145" font-family="system-ui, -apple-system, sans-serif" font-weight="400" font-size="22" fill="#94a3b8" width="560">${safeSubtitle}</text>

    <!-- Bottom Features Chips -->
    <g transform="translate(0, 220)">
      <rect x="0" y="0" width="140" height="34" rx="8" fill="#1e293b" fill-opacity="0.8" stroke="#334155" stroke-width="1" />
      <text x="16" y="22" font-family="system-ui, -apple-system, sans-serif" font-weight="600" font-size="13" fill="#cbd5e1">⚡ Instant Speed</text>

      <rect x="152" y="0" width="140" height="34" rx="8" fill="#1e293b" fill-opacity="0.8" stroke="#334155" stroke-width="1" />
      <text x="168" y="22" font-family="system-ui, -apple-system, sans-serif" font-weight="600" font-size="13" fill="#cbd5e1">🔒 100% Private</text>

      <rect x="304" y="0" width="130" height="34" rx="8" fill="#1e293b" fill-opacity="0.8" stroke="#334155" stroke-width="1" />
      <text x="320" y="22" font-family="system-ui, -apple-system, sans-serif" font-weight="600" font-size="13" fill="#cbd5e1">✨ No Sign-up</text>
    </g>
  </g>

  <!-- Right Visual Card Container -->
  <g transform="translate(680, 130)" filter="url(#shadow)">
    <!-- Glassmorphic Card Frame -->
    <rect width="440" height="420" rx="24" fill="#0f172a" fill-opacity="0.85" stroke="#334155" stroke-width="2" />
    <!-- Header of Mock Card -->
    <rect width="440" height="48" rx="24" fill="#1e293b" fill-opacity="0.9" />
    <circle cx="28" cy="24" r="6" fill="#ef4444" />
    <circle cx="48" cy="24" r="6" fill="#f59e0b" />
    <circle cx="68" cy="24" r="6" fill="#10b981" />
    <text x="220" y="29" text-anchor="middle" font-family="monospace" font-size="13" fill="#64748b">rockingtools.com</text>

    <!-- Custom Tool Graphic SVG -->
    <g transform="translate(20, 68)">
      ${graphicSvg.replace(/&(?![a-zA-Z0-9#]+;)/g, 'and')}
    </g>
  </g>
</svg>`;
}

// Tool definitions with specific visual graphics
const tools = [
  {
    name: 'ruler',
    category: 'SCREEN RULER · 100% ACCURATE',
    title: 'Online Screen Ruler',
    subtitle: 'Calibrated on-screen ruler for actual physical size (mm, cm, in).',
    color1: '#06b6d4',
    color2: '#6366f1',
    graphicSvg: `
      <rect x="10" y="20" width="380" height="140" rx="12" fill="#1e293b" stroke="#06b6d4" stroke-width="2"/>
      <path d="M 20 20 V 60 M 35 20 V 40 M 50 20 V 45 M 65 20 V 40 M 80 20 V 60 M 95 20 V 40 M 110 20 V 45 M 125 20 V 40 M 140 20 V 60 M 155 20 V 40 M 170 20 V 45 M 185 20 V 40 M 200 20 V 60 M 215 20 V 40 M 230 20 V 45 M 245 20 V 40 M 260 20 V 60 M 275 20 V 40 M 290 20 V 45 M 305 20 V 40 M 320 20 V 60 M 335 20 V 40 M 350 20 V 45 M 365 20 V 40 M 380 20 V 60" stroke="#06b6d4" stroke-width="2"/>
      <text x="20" y="80" font-family="monospace" font-size="14" fill="#06b6d4">0 cm</text>
      <text x="80" y="80" font-family="monospace" font-size="14" fill="#06b6d4">1</text>
      <text x="140" y="80" font-family="monospace" font-size="14" fill="#06b6d4">2</text>
      <text x="200" y="80" font-family="monospace" font-size="14" fill="#06b6d4">3</text>
      <text x="260" y="80" font-family="monospace" font-size="14" fill="#06b6d4">4</text>
      <text x="320" y="80" font-family="monospace" font-size="14" fill="#06b6d4">5 cm</text>
      <rect x="20" y="105" width="360" height="40" rx="8" fill="#06b6d4" fill-opacity="0.15" stroke="#06b6d4" stroke-width="1"/>
      <text x="200" y="130" text-anchor="middle" font-family="sans-serif" font-weight="700" font-size="14" fill="#38bdf8">CREDIT CARD CALIBRATED · 96 DPI</text>

      <rect x="10" y="180" width="180" height="120" rx="12" fill="#1e293b" stroke="#334155" stroke-width="1.5"/>
      <text x="25" y="210" font-family="sans-serif" font-size="14" font-weight="600" fill="#94a3b8">Selected Unit</text>
      <text x="25" y="245" font-family="sans-serif" font-size="28" font-weight="800" fill="#ffffff">Millimetres</text>
      <text x="25" y="275" font-family="monospace" font-size="13" fill="#06b6d4">Scale: 1:1 True Size</text>

      <rect x="210" y="180" width="180" height="120" rx="12" fill="#1e293b" stroke="#334155" stroke-width="1.5"/>
      <text x="225" y="210" font-family="sans-serif" font-size="14" font-weight="600" fill="#94a3b8">Precision Ratio</text>
      <text x="225" y="245" font-family="sans-serif" font-size="28" font-weight="800" fill="#38bdf8">100%</text>
      <text x="225" y="275" font-family="sans-serif" font-size="13" fill="#10b981">Calibrated</text>
    `
  },
  {
    name: 'pregnancy-calculator',
    category: 'PREGNANCY AND HEALTH CALCULATOR',
    title: 'Pregnancy Due Date Calculator',
    subtitle: 'Track due date, conception date, trimesters and fertile window.',
    color1: '#f43f5e',
    color2: '#ec4899',
    graphicSvg: `
      <rect x="10" y="10" width="380" height="150" rx="16" fill="#1e293b" stroke="#f43f5e" stroke-width="2"/>
      <text x="30" y="45" font-family="sans-serif" font-size="14" font-weight="600" fill="#fda4af">ESTIMATED DUE DATE</text>
      <text x="30" y="90" font-family="sans-serif" font-size="34" font-weight="800" fill="#ffffff">October 24, 2026</text>
      <text x="30" y="130" font-family="sans-serif" font-size="15" fill="#f43f5e" font-weight="700">14 Weeks and 3 Days Pregnant</text>

      <g transform="translate(10, 180)">
        <rect x="0" y="0" width="115" height="120" rx="12" fill="#1e293b" stroke="#f43f5e" stroke-width="1.5"/>
        <text x="15" y="30" font-family="sans-serif" font-size="12" font-weight="700" fill="#f43f5e">TRIMESTER 1</text>
        <text x="15" y="60" font-family="sans-serif" font-size="20" font-weight="800" fill="#ffffff">W1 - W12</text>
        <text x="15" y="95" font-family="sans-serif" font-size="12" fill="#10b981">Completed</text>

        <rect x="132" y="0" width="115" height="120" rx="12" fill="#1e293b" stroke="#ec4899" stroke-width="2"/>
        <text x="147" y="30" font-family="sans-serif" font-size="12" font-weight="700" fill="#ec4899">TRIMESTER 2</text>
        <text x="147" y="60" font-family="sans-serif" font-size="20" font-weight="800" fill="#ffffff">W13 - W27</text>
        <text x="147" y="95" font-family="sans-serif" font-size="12" fill="#f43f5e" font-weight="700">In Progress</text>

        <rect x="264" y="0" width="115" height="120" rx="12" fill="#1e293b" stroke="#334155" stroke-width="1.5"/>
        <text x="279" y="30" font-family="sans-serif" font-size="12" font-weight="700" fill="#94a3b8">TRIMESTER 3</text>
        <text x="279" y="60" font-family="sans-serif" font-size="20" font-weight="800" fill="#94a3b8">W28 - W40</text>
        <text x="279" y="95" font-family="sans-serif" font-size="12" fill="#64748b">Upcoming</text>
      </g>
    `
  },
  {
    name: 'data-converter',
    category: 'DATA CONVERTER · JSON / CSV / YAML',
    title: 'JSON, CSV and YAML Converter',
    subtitle: 'Convert multi-format data instantly in your browser thread.',
    color1: '#10b981',
    color2: '#14b8a6',
    graphicSvg: `
      <rect x="10" y="10" width="380" height="290" rx="16" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
      <rect x="25" y="25" width="100" height="32" rx="8" fill="#10b981" fill-opacity="0.2" stroke="#10b981" stroke-width="1.5"/>
      <text x="75" y="46" text-anchor="middle" font-family="monospace" font-size="14" font-weight="700" fill="#34d399">JSON</text>

      <text x="155" y="46" font-family="sans-serif" font-size="18" fill="#64748b">⇄</text>

      <rect x="180" y="25" width="90" height="32" rx="8" fill="#334155" stroke="#475569" stroke-width="1"/>
      <text x="225" y="46" text-anchor="middle" font-family="monospace" font-size="14" font-weight="600" fill="#94a3b8">CSV</text>

      <rect x="280" y="25" width="90" height="32" rx="8" fill="#334155" stroke="#475569" stroke-width="1"/>
      <text x="325" y="46" text-anchor="middle" font-family="monospace" font-size="14" font-weight="600" fill="#94a3b8">YAML</text>

      <!-- Code snippet preview -->
      <rect x="25" y="75" width="350" height="205" rx="8" fill="#0f172a"/>
      <text x="40" y="105" font-family="monospace" font-size="13" fill="#64748b">[</text>
      <text x="55" y="130" font-family="monospace" font-size="13" fill="#38bdf8">  { "id": 1, "name": "Screen Ruler" },</text>
      <text x="55" y="155" font-family="monospace" font-size="13" fill="#38bdf8">  { "id": 2, "name": "DPI Calculator" },</text>
      <text x="55" y="180" font-family="monospace" font-size="13" fill="#38bdf8">  { "id": 3, "name": "QR Code" }</text>
      <text x="40" y="205" font-family="monospace" font-size="13" fill="#64748b">]</text>
      <text x="40" y="240" font-family="sans-serif" font-size="13" font-weight="700" fill="#10b981">Valid JSON Format · 0.2ms Conversion</text>
    `
  },
  {
    name: 'dpi-calculator',
    category: 'DISPLAY AND PRINT DPI CALCULATOR',
    title: 'DPI / PPI Print Calculator',
    subtitle: 'Calculate screen pixel density and high-res print dimensions.',
    color1: '#8b5cf6',
    color2: '#a855f7',
    graphicSvg: `
      <rect x="10" y="10" width="380" height="130" rx="16" fill="#1e293b" stroke="#8b5cf6" stroke-width="2"/>
      <text x="30" y="40" font-family="sans-serif" font-size="13" font-weight="700" fill="#c084fc">PIXEL DENSITY</text>
      <text x="30" y="85" font-family="sans-serif" font-size="38" font-weight="800" fill="#ffffff">326 PPI</text>
      <text x="30" y="118" font-family="sans-serif" font-size="13" font-weight="600" fill="#a855f7">Retina Display Scale (2560 x 1600)</text>

      <rect x="10" y="160" width="180" height="140" rx="14" fill="#1e293b" stroke="#334155" stroke-width="1.5"/>
      <text x="25" y="190" font-family="sans-serif" font-size="12" font-weight="700" fill="#94a3b8">MAX PRINT SIZE</text>
      <text x="25" y="225" font-family="sans-serif" font-size="24" font-weight="800" fill="#ffffff">12" × 8"</text>
      <text x="25" y="255" font-family="sans-serif" font-size="12" fill="#8b5cf6">@ 300 DPI Print</text>

      <rect x="210" y="160" width="180" height="140" rx="14" fill="#1e293b" stroke="#334155" stroke-width="1.5"/>
      <text x="225" y="190" font-family="sans-serif" font-size="12" font-weight="700" fill="#94a3b8">DIAGONAL INCHES</text>
      <text x="225" y="225" font-family="sans-serif" font-size="24" font-weight="800" fill="#ffffff">13.3 Inch</text>
      <text x="225" y="255" font-family="sans-serif" font-size="12" fill="#10b981">Standard Display</text>
    `
  },
  {
    name: 'aspect-ratio-calculator',
    category: 'ASPECT RATIO AND DISPLAY CALCULATOR',
    title: 'Aspect Ratio Calculator',
    subtitle: 'Calculate screen proportions and resizer dimensions (16:9, 4:3).',
    color1: '#f59e0b',
    color2: '#ea580c',
    graphicSvg: `
      <rect x="10" y="10" width="380" height="160" rx="16" fill="#1e293b" stroke="#f59e0b" stroke-width="2"/>
      <rect x="30" y="30" width="160" height="90" rx="8" fill="#0f172a" stroke="#f59e0b" stroke-width="2"/>
      <text x="110" y="80" text-anchor="middle" font-family="sans-serif" font-size="22" font-weight="800" fill="#fbbf24">16 : 9</text>
      
      <text x="215" y="55" font-family="sans-serif" font-size="13" font-weight="700" fill="#94a3b8">WIDTH: 1920 px</text>
      <text x="215" y="85" font-family="sans-serif" font-size="13" font-weight="700" fill="#94a3b8">HEIGHT: 1080 px</text>
      <text x="215" y="115" font-family="sans-serif" font-size="13" font-weight="700" fill="#10b981">Full HD Preset</text>

      <g transform="translate(10, 190)">
        <rect x="0" y="0" width="115" height="100" rx="12" fill="#1e293b" stroke="#f59e0b" stroke-width="2"/>
        <text x="57" y="45" text-anchor="middle" font-family="sans-serif" font-size="18" font-weight="800" fill="#ffffff">16 : 9</text>
        <text x="57" y="75" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#f59e0b">Widescreen</text>

        <rect x="132" y="0" width="115" height="100" rx="12" fill="#1e293b" stroke="#334155" stroke-width="1"/>
        <text x="189" y="45" text-anchor="middle" font-family="sans-serif" font-size="18" font-weight="800" fill="#94a3b8">4 : 3</text>
        <text x="189" y="75" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#64748b">Standard</text>

        <rect x="264" y="0" width="115" height="100" rx="12" fill="#1e293b" stroke="#334155" stroke-width="1"/>
        <text x="321" y="45" text-anchor="middle" font-family="sans-serif" font-size="18" font-weight="800" fill="#94a3b8">21 : 9</text>
        <text x="321" y="75" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#64748b">Ultrawide</text>
      </g>
    `
  },
  {
    name: 'calorie-calculator',
    category: 'HEALTH AND NUTRITION CALCULATOR',
    title: 'TDEE and Calorie Calculator',
    subtitle: 'Calculate daily calories, BMR, weight goals and macro split.',
    color1: '#f97316',
    color2: '#ef4444',
    graphicSvg: `
      <rect x="10" y="10" width="380" height="140" rx="16" fill="#1e293b" stroke="#f97316" stroke-width="2"/>
      <text x="30" y="40" font-family="sans-serif" font-size="13" font-weight="700" fill="#fdba74">DAILY TDEE EXPENDITURE</text>
      <text x="30" y="85" font-family="sans-serif" font-size="38" font-weight="800" fill="#ffffff">2,350 <tspan font-size="20" fill="#f97316">kcal/day</tspan></text>
      <text x="30" y="120" font-family="sans-serif" font-size="13" fill="#10b981" font-weight="600">Maintenance Level Calculated</text>

      <g transform="translate(10, 170)">
        <rect x="0" y="0" width="115" height="130" rx="12" fill="#1e293b" stroke="#ef4444" stroke-width="1.5"/>
        <text x="15" y="30" font-family="sans-serif" font-size="12" font-weight="700" fill="#ef4444">PROTEIN</text>
        <text x="15" y="65" font-family="sans-serif" font-size="24" font-weight="800" fill="#ffffff">160g</text>
        <text x="15" y="95" font-family="sans-serif" font-size="12" fill="#94a3b8">30% Macros</text>

        <rect x="132" y="0" width="115" height="130" rx="12" fill="#1e293b" stroke="#f97316" stroke-width="1.5"/>
        <text x="147" y="30" font-family="sans-serif" font-size="12" font-weight="700" fill="#f97316">CARBS</text>
        <text x="147" y="65" font-family="sans-serif" font-size="24" font-weight="800" fill="#ffffff">235g</text>
        <text x="147" y="95" font-family="sans-serif" font-size="12" fill="#94a3b8">40% Macros</text>

        <rect x="264" y="0" width="115" height="130" rx="12" fill="#1e293b" stroke="#eab308" stroke-width="1.5"/>
        <text x="279" y="30" font-family="sans-serif" font-size="12" font-weight="700" fill="#eab308">FATS</text>
        <text x="279" y="65" font-family="sans-serif" font-size="24" font-weight="800" fill="#ffffff">78g</text>
        <text x="279" y="95" font-family="sans-serif" font-size="12" fill="#94a3b8">30% Macros</text>
      </g>
    `
  },
  {
    name: 'color-tools',
    category: 'DESIGN AND COLOR PALETTE UTILITIES',
    title: 'Color Palette and Contrast Checker',
    subtitle: 'HEX, RGB, HSL converter, palette generator and WCAG contrast.',
    color1: '#ec4899',
    color2: '#8b5cf6',
    graphicSvg: `
      <rect x="10" y="10" width="380" height="130" rx="16" fill="#1e293b" stroke="#ec4899" stroke-width="2"/>
      <g transform="translate(25, 25)">
        <rect x="0" y="0" width="70" height="60" rx="8" fill="#6366f1"/>
        <text x="35" y="80" text-anchor="middle" font-family="monospace" font-size="11" fill="#cbd5e1">#6366F1</text>

        <rect x="85" y="0" width="70" height="60" rx="8" fill="#ec4899"/>
        <text x="120" y="80" text-anchor="middle" font-family="monospace" font-size="11" fill="#cbd5e1">#EC4899</text>

        <rect x="170" y="0" width="70" height="60" rx="8" fill="#10b981"/>
        <text x="205" y="80" text-anchor="middle" font-family="monospace" font-size="11" fill="#cbd5e1">#10B981</text>

        <rect x="255" y="0" width="75" height="60" rx="8" fill="#f59e0b"/>
        <text x="292" y="80" text-anchor="middle" font-family="monospace" font-size="11" fill="#cbd5e1">#F59E0B</text>
      </g>

      <g transform="translate(10, 160)">
        <rect x="0" y="0" width="380" height="130" rx="14" fill="#1e293b" stroke="#334155" stroke-width="1.5"/>
        <text x="20" y="35" font-family="sans-serif" font-size="13" font-weight="700" fill="#a855f7">WCAG CONTRAST RATIO</text>
        <text x="20" y="75" font-family="sans-serif" font-size="32" font-weight="800" fill="#ffffff">14.8 : 1</text>
        <rect x="230" y="45" width="130" height="32" rx="8" fill="#10b981" fill-opacity="0.2" stroke="#10b981" stroke-width="1"/>
        <text x="295" y="66" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="700" fill="#34d399">PASS (AAA)</text>
      </g>
    `
  },
  {
    name: 'cron-expression-builder',
    category: 'DEVELOPER CRON SCHEDULER',
    title: 'Cron Expression Builder',
    subtitle: 'Generate, test and explain cron syntax schedules into text.',
    color1: '#22c55e',
    color2: '#10b981',
    graphicSvg: `
      <rect x="10" y="10" width="380" height="140" rx="16" fill="#1e293b" stroke="#22c55e" stroke-width="2"/>
      <text x="30" y="40" font-family="sans-serif" font-size="13" font-weight="700" fill="#86efac">CRON EXPRESSION</text>
      <rect x="30" y="55" width="320" height="45" rx="8" fill="#0f172a"/>
      <text x="45" y="85" font-family="monospace" font-size="22" font-weight="800" fill="#22c55e">*/5 * * * *</text>
      <text x="30" y="125" font-family="sans-serif" font-size="14" fill="#ffffff" font-weight="600">"Every 5 minutes, every hour"</text>

      <g transform="translate(10, 170)">
        <rect x="0" y="0" width="380" height="120" rx="14" fill="#1e293b" stroke="#334155" stroke-width="1.5"/>
        <text x="20" y="30" font-family="sans-serif" font-size="12" font-weight="700" fill="#94a3b8">NEXT EXECUTION TIMES</text>
        <text x="20" y="60" font-family="monospace" font-size="13" fill="#86efac">● 2026-08-08 11:00:00 UTC</text>
        <text x="20" y="85" font-family="monospace" font-size="13" fill="#94a3b8">● 2026-08-08 11:05:00 UTC</text>
      </g>
    `
  },
  {
    name: 'image-resizer',
    category: 'MEDIA UTILITIES · PNG / JPG / WEBP',
    title: 'Image Resizer and Compressor',
    subtitle: 'Batch resize, crop and compress images offline in browser.',
    color1: '#0ea5e9',
    color2: '#0284c7',
    graphicSvg: `
      <rect x="10" y="10" width="380" height="150" rx="16" fill="#1e293b" stroke="#0ea5e9" stroke-width="2"/>
      <rect x="30" y="30" width="120" height="85" rx="8" fill="#0f172a" stroke="#0ea5e9" stroke-width="1.5"/>
      <path d="M 50 85 L 75 55 L 105 85 L 125 70 L 140 85" stroke="#38bdf8" stroke-width="2" fill="none"/>
      <circle cx="65" cy="50" r="6" fill="#f59e0b"/>

      <text x="170" y="55" font-family="sans-serif" font-size="14" font-weight="700" fill="#38bdf8">TARGET DIMENSIONS</text>
      <text x="170" y="85" font-family="sans-serif" font-size="22" font-weight="800" fill="#ffffff">1920 × 1080</text>
      <text x="170" y="115" font-family="sans-serif" font-size="13" fill="#10b981">75% File Size Reduction</text>

      <g transform="translate(10, 180)">
        <rect x="0" y="0" width="115" height="100" rx="12" fill="#1e293b" stroke="#0ea5e9" stroke-width="2"/>
        <text x="57" y="45" text-anchor="middle" font-family="sans-serif" font-size="16" font-weight="800" fill="#ffffff">WebP</text>
        <text x="57" y="75" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#38bdf8">Recommended</text>

        <rect x="132" y="0" width="115" height="100" rx="12" fill="#1e293b" stroke="#334155" stroke-width="1"/>
        <text x="189" y="45" text-anchor="middle" font-family="sans-serif" font-size="16" font-weight="800" fill="#94a3b8">PNG</text>
        <text x="189" y="75" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#64748b">Lossless</text>

        <rect x="264" y="0" width="115" height="100" rx="12" fill="#1e293b" stroke="#334155" stroke-width="1"/>
        <text x="321" y="45" text-anchor="middle" font-family="sans-serif" font-size="16" font-weight="800" fill="#94a3b8">JPG</text>
        <text x="321" y="75" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#64748b">Standard</text>
      </g>
    `
  },
  {
    name: 'password-checker',
    category: 'SECURITY UTILITIES · PRIVACY FIRST',
    title: 'Password Strength Analyzer',
    subtitle: 'Check password security, crack time and generate keys.',
    color1: '#10b981',
    color2: '#06b6d4',
    graphicSvg: `
      <rect x="10" y="10" width="380" height="150" rx="16" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
      <text x="30" y="40" font-family="sans-serif" font-size="13" font-weight="700" fill="#34d399">SECURITY STRENGTH</text>
      <text x="30" y="85" font-family="sans-serif" font-size="34" font-weight="800" fill="#ffffff">VERY STRONG</text>
      <rect x="30" y="105" width="320" height="10" rx="5" fill="#334155"/>
      <rect x="30" y="105" width="300" height="10" rx="5" fill="#10b981"/>

      <g transform="translate(10, 180)">
        <rect x="0" y="0" width="180" height="110" rx="12" fill="#1e293b" stroke="#334155" stroke-width="1.5"/>
        <text x="20" y="35" font-family="sans-serif" font-size="12" font-weight="700" fill="#94a3b8">ESTIMATED CRACK TIME</text>
        <text x="20" y="75" font-family="sans-serif" font-size="22" font-weight="800" fill="#34d399">12 Billion Yrs</text>

        <rect x="200" y="0" width="180" height="110" rx="12" fill="#1e293b" stroke="#334155" stroke-width="1.5"/>
        <text x="220" y="35" font-family="sans-serif" font-size="12" font-weight="700" fill="#94a3b8">ENTROPY SCORE</text>
        <text x="220" y="75" font-family="sans-serif" font-size="22" font-weight="800" fill="#ffffff">98.5 Bits</text>
      </g>
    `
  },
  {
    name: 'pdf-tools',
    category: 'DOCUMENT UTILITIES · 100% PRIVATE',
    title: 'PDF Tools — Merge and Split',
    subtitle: 'Merge, split and edit PDF documents completely client-side.',
    color1: '#ef4444',
    color2: '#dc2626',
    graphicSvg: `
      <rect x="10" y="10" width="380" height="150" rx="16" fill="#1e293b" stroke="#ef4444" stroke-width="2"/>
      <g transform="translate(30, 30)">
        <rect x="0" y="0" width="60" height="80" rx="6" fill="#ef4444" fill-opacity="0.2" stroke="#ef4444" stroke-width="1.5"/>
        <text x="30" y="45" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="800" fill="#fca5a5">PDF 1</text>

        <text x="80" y="45" font-family="sans-serif" font-size="22" fill="#ffffff">+</text>

        <rect x="105" y="0" width="60" height="80" rx="6" fill="#ef4444" fill-opacity="0.2" stroke="#ef4444" stroke-width="1.5"/>
        <text x="135" y="45" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="800" fill="#fca5a5">PDF 2</text>

        <text x="180" y="45" font-family="sans-serif" font-size="22" fill="#ffffff">=</text>

        <rect x="205" y="-5" width="70" height="90" rx="8" fill="#ef4444"/>
        <text x="240" y="50" text-anchor="middle" font-family="sans-serif" font-size="15" font-weight="800" fill="#ffffff">MERGED</text>
      </g>

      <g transform="translate(10, 180)">
        <rect x="0" y="0" width="380" height="110" rx="12" fill="#1e293b" stroke="#334155" stroke-width="1.5"/>
        <text x="20" y="35" font-family="sans-serif" font-size="13" font-weight="700" fill="#fca5a5">SECURITY AND PRIVACY GUARANTEE</text>
        <text x="20" y="70" font-family="sans-serif" font-size="14" fill="#ffffff">PDF files stay on your device. Zero server upload.</text>
      </g>
    `
  },
  {
    name: 'qr-code-generator',
    category: 'MARKETING UTILITIES · SVG / PNG',
    title: 'Custom QR Code Generator',
    subtitle: 'Generate high-res QR codes with custom colors and logos.',
    color1: '#7c3aed',
    color2: '#4f46e5',
    graphicSvg: `
      <rect x="10" y="10" width="380" height="290" rx="16" fill="#1e293b" stroke="#7c3aed" stroke-width="2"/>
      <g transform="translate(30, 25)">
        <rect x="0" y="0" width="180" height="180" rx="12" fill="#ffffff"/>
        <rect x="15" y="15" width="45" height="45" fill="#7c3aed"/>
        <rect x="25" y="25" width="25" height="25" fill="#ffffff"/>
        <rect x="120" y="15" width="45" height="45" fill="#7c3aed"/>
        <rect x="130" y="25" width="25" height="25" fill="#ffffff"/>
        <rect x="15" y="120" width="45" height="45" fill="#7c3aed"/>
        <rect x="25" y="130" width="25" height="25" fill="#ffffff"/>

        <rect x="75" y="20" width="15" height="15" fill="#7c3aed"/>
        <rect x="95" y="40" width="15" height="15" fill="#7c3aed"/>
        <rect x="75" y="75" width="30" height="30" fill="#7c3aed"/>
        <rect x="120" y="80" width="20" height="20" fill="#7c3aed"/>
        <rect x="80" y="120" width="25" height="25" fill="#7c3aed"/>
        <rect x="125" y="125" width="40" height="40" fill="#7c3aed"/>

        <text x="205" y="45" font-family="sans-serif" font-size="14" font-weight="700" fill="#a78bfa">EXPORT FORMATS</text>
        <text x="205" y="80" font-family="sans-serif" font-size="18" font-weight="800" fill="#ffffff">SVG Vector</text>
        <text x="205" y="110" font-family="sans-serif" font-size="18" font-weight="800" fill="#ffffff">PNG High-Res</text>
        <text x="205" y="145" font-family="sans-serif" font-size="13" fill="#10b981">Scan Ready</text>
      </g>
      <text x="200" y="250" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="700" fill="#a78bfa">Custom Colors · Margins · High Resolution</text>
    `
  },
  {
    name: 'regex-tester',
    category: 'DEVELOPER UTILITIES · REGEX',
    title: 'Online Regex Tester',
    subtitle: 'Test regular expressions with real-time match highlights.',
    color1: '#eab308',
    color2: '#d97706',
    graphicSvg: `
      <rect x="10" y="10" width="380" height="140" rx="16" fill="#1e293b" stroke="#eab308" stroke-width="2"/>
      <text x="30" y="40" font-family="sans-serif" font-size="13" font-weight="700" fill="#fde047">REGULAR EXPRESSION</text>
      <rect x="30" y="55" width="320" height="45" rx="8" fill="#0f172a"/>
      <text x="45" y="85" font-family="monospace" font-size="18" font-weight="800" fill="#f59e0b">/^([a-z0-9_\\.-]+)@/gi</text>
      <text x="30" y="125" font-family="sans-serif" font-size="13" fill="#10b981" font-weight="600">Valid Pattern · 3 Matches Found</text>

      <g transform="translate(10, 170)">
        <rect x="0" y="0" width="380" height="120" rx="14" fill="#1e293b" stroke="#334155" stroke-width="1.5"/>
        <text x="20" y="30" font-family="sans-serif" font-size="12" font-weight="700" fill="#94a3b8">MATCHED HIGHLIGHT PREVIEW</text>
        <text x="20" y="65" font-family="monospace" font-size="14" fill="#ffffff"><tspan fill="#eab308" font-weight="bold">info@</tspan>rockingtools.com</text>
        <text x="20" y="90" font-family="monospace" font-size="14" fill="#ffffff"><tspan fill="#eab308" font-weight="bold">support@</tspan>domain.org</text>
      </g>
    `
  },
  {
    name: 'unit-converter',
    category: 'UNIVERSAL UNIT CONVERTER',
    title: 'Universal Unit Converter',
    subtitle: 'Convert length, mass, temperature, speed and volume.',
    color1: '#3b82f6',
    color2: '#6366f1',
    graphicSvg: `
      <rect x="10" y="10" width="380" height="140" rx="16" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
      <text x="30" y="45" font-family="sans-serif" font-size="28" font-weight="800" fill="#ffffff">100 Kilometres</text>
      <text x="30" y="80" font-family="sans-serif" font-size="20" font-weight="700" fill="#38bdf8">= 62.1371 Miles</text>
      <text x="30" y="118" font-family="sans-serif" font-size="13" fill="#10b981" font-weight="600">Precision Floating Calculation</text>

      <g transform="translate(10, 170)">
        <rect x="0" y="0" width="115" height="120" rx="12" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
        <text x="57" y="45" text-anchor="middle" font-family="sans-serif" font-size="16" font-weight="800" fill="#ffffff">Length</text>
        <text x="57" y="80" text-anchor="middle" font-family="monospace" font-size="12" fill="#38bdf8">m / km / mi</text>

        <rect x="132" y="0" width="115" height="120" rx="12" fill="#1e293b" stroke="#334155" stroke-width="1"/>
        <text x="189" y="45" text-anchor="middle" font-family="sans-serif" font-size="16" font-weight="800" fill="#94a3b8">Weight</text>
        <text x="189" y="80" text-anchor="middle" font-family="monospace" font-size="12" fill="#64748b">kg / lbs / oz</text>

        <rect x="264" y="0" width="115" height="120" rx="12" fill="#1e293b" stroke="#334155" stroke-width="1"/>
        <text x="321" y="45" text-anchor="middle" font-family="sans-serif" font-size="16" font-weight="800" fill="#94a3b8">Temp</text>
        <text x="321" y="80" text-anchor="middle" font-family="monospace" font-size="12" fill="#64748b">°C / °F / K</text>
      </g>
    `
  },
  {
    name: 'workspace',
    category: 'MULTI-TOOL WORKSPACE',
    title: 'Rocking Tools Workspace',
    subtitle: 'Run multiple utilities side-by-side in a fast tabbed view.',
    color1: '#6366f1',
    color2: '#8b5cf6',
    graphicSvg: `
      <rect x="10" y="10" width="380" height="290" rx="16" fill="#1e293b" stroke="#6366f1" stroke-width="2"/>
      <rect x="25" y="25" width="160" height="115" rx="10" fill="#0f172a" stroke="#6366f1" stroke-width="1.5"/>
      <text x="35" y="55" font-family="sans-serif" font-size="13" font-weight="700" fill="#818cf8">Ruler Tool</text>
      <text x="35" y="90" font-family="monospace" font-size="12" fill="#94a3b8">Calibrated 96DPI</text>

      <rect x="200" y="25" width="160" height="115" rx="10" fill="#0f172a" stroke="#10b981" stroke-width="1.5"/>
      <text x="210" y="55" font-family="sans-serif" font-size="13" font-weight="700" fill="#34d399">Converter</text>
      <text x="210" y="90" font-family="monospace" font-size="12" fill="#94a3b8">JSON ⇄ CSV</text>

      <rect x="25" y="155" width="335" height="115" rx="10" fill="#0f172a" stroke="#ec4899" stroke-width="1.5"/>
      <text x="40" y="185" font-family="sans-serif" font-size="13" font-weight="700" fill="#f472b6">DPI and Resolution Workspace</text>
      <text x="40" y="220" font-family="sans-serif" font-size="13" fill="#ffffff">Side-by-Side Multi-Pane Developer Desktop</text>
    `
  },
  {
    name: 'home',
    category: 'FREE AND PRIVATE BROWSER UTILITIES',
    title: 'Rocking Tools Suite',
    subtitle: 'Single-purpose utilities engineered for extreme speed and precision.',
    color1: '#6366f1',
    color2: '#a855f7',
    graphicSvg: `
      <rect x="10" y="10" width="380" height="290" rx="16" fill="#1e293b" stroke="#6366f1" stroke-width="2"/>
      <g transform="translate(25, 25)">
        <rect x="0" y="0" width="100" height="75" rx="10" fill="#0f172a" stroke="#6366f1" stroke-width="1.5"/>
        <text x="50" y="45" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#6366f1" font-weight="700">RULER</text>

        <rect x="115" y="0" width="100" height="75" rx="10" fill="#0f172a" stroke="#f43f5e" stroke-width="1.5"/>
        <text x="165" y="45" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#f43f5e" font-weight="700">BABY</text>

        <rect x="230" y="0" width="100" height="75" rx="10" fill="#0f172a" stroke="#10b981" stroke-width="1.5"/>
        <text x="280" y="45" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#10b981" font-weight="700">DATA</text>

        <rect x="0" y="90" width="100" height="75" rx="10" fill="#0f172a" stroke="#8b5cf6" stroke-width="1.5"/>
        <text x="50" y="135" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#8b5cf6" font-weight="700">DPI</text>

        <rect x="115" y="90" width="100" height="75" rx="10" fill="#0f172a" stroke="#0ea5e9" stroke-width="1.5"/>
        <text x="165" y="135" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#0ea5e9" font-weight="700">IMAGE</text>

        <rect x="230" y="90" width="100" height="75" rx="10" fill="#0f172a" stroke="#7c3aed" stroke-width="1.5"/>
        <text x="280" y="135" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#7c3aed" font-weight="700">QR</text>

        <rect x="0" y="180" width="330" height="55" rx="10" fill="#0f172a" stroke="#334155" stroke-width="1"/>
        <text x="165" y="213" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="700" fill="#818cf8">100% Client-Side · Zero Data Collection</text>
      </g>
    `
  },
  {
    name: 'about',
    category: 'ABOUT ROCKING TOOLS',
    title: 'About Rocking Tools',
    subtitle: 'Zero backend, 100% private browser-first developer tools.',
    color1: '#6366f1',
    color2: '#3b82f6',
    graphicSvg: `
      <rect x="10" y="10" width="380" height="290" rx="16" fill="#1e293b" stroke="#6366f1" stroke-width="2"/>
      <text x="30" y="50" font-family="sans-serif" font-size="18" font-weight="800" fill="#ffffff">Why Rocking Tools?</text>
      <text x="30" y="90" font-family="sans-serif" font-size="14" fill="#94a3b8">● 100% Client-side execution</text>
      <text x="30" y="125" font-family="sans-serif" font-size="14" fill="#94a3b8">● Zero analytics tracking or ads</text>
      <text x="30" y="160" font-family="sans-serif" font-size="14" fill="#94a3b8">● Sub-millisecond performance</text>
      <text x="30" y="195" font-family="sans-serif" font-size="14" fill="#94a3b8">● Open-source and developer first</text>
    `
  },
  {
    name: 'faq',
    category: 'FREQUENTLY ASKED QUESTIONS',
    title: 'Rocking Tools FAQ',
    subtitle: 'Learn how our tools maintain 100% client-side privacy.',
    color1: '#6366f1',
    color2: '#10b981',
    graphicSvg: `
      <rect x="10" y="10" width="380" height="290" rx="16" fill="#1e293b" stroke="#6366f1" stroke-width="2"/>
      <text x="30" y="50" font-family="sans-serif" font-size="16" font-weight="800" fill="#818cf8">Q: Is my data uploaded to servers?</text>
      <text x="30" y="85" font-family="sans-serif" font-size="14" fill="#ffffff">A: No. All processing runs in JS/CSS.</text>
      <text x="30" y="135" font-family="sans-serif" font-size="16" font-weight="800" fill="#34d399">Q: How accurate is screen ruler?</text>
      <text x="30" y="170" font-family="sans-serif" font-size="14" fill="#ffffff">A: 100% true size via card calibration.</text>
    `
  },
  {
    name: 'donate',
    category: 'SUPPORT ROCKING TOOLS',
    title: 'Support Rocking Tools',
    subtitle: 'Help keep browser utilities 100% free, private and ad-free.',
    color1: '#ec4899',
    color2: '#f43f5e',
    graphicSvg: `
      <rect x="10" y="10" width="380" height="290" rx="16" fill="#1e293b" stroke="#ec4899" stroke-width="2"/>
      <text x="30" y="50" font-family="sans-serif" font-size="20" font-weight="800" fill="#ffffff">Keep Us Independent</text>
      <text x="30" y="90" font-family="sans-serif" font-size="14" fill="#fda4af">Your donations cover web hosting and domains.</text>
      <rect x="30" y="120" width="320" height="50" rx="10" fill="#ec4899"/>
      <text x="190" y="152" text-anchor="middle" font-family="sans-serif" font-size="16" font-weight="800" fill="#ffffff">Donate and Support Project</text>
    `
  }
];

async function generateOgImages() {
  console.log('Generating tool-specific OpenGraph PNG images...');
  for (const tool of tools) {
    const svgStr = createOgSvg(tool);
    const destPng = path.join(OG_DIR, `${tool.name}.png`);
    await sharp(Buffer.from(svgStr)).png().toFile(destPng);
    console.log(`✓ Generated ${tool.name}.png`);
  }

  // Also build default rocking-tools-default.png as site fallback
  const defaultTool = tools.find(t => t.name === 'home');
  if (defaultTool) {
    const defaultSvg = createOgSvg({ ...defaultTool, title: 'Rocking Tools', subtitle: 'Free and Private Online Browser Utilities' });
    await sharp(Buffer.from(defaultSvg)).png().toFile(path.join(PUBLIC_DIR, 'og-image.png'));
    await sharp(Buffer.from(defaultSvg)).png().toFile(path.join(OG_DIR, 'rocking-tools-default.png'));
    console.log('✓ Generated default og-image.png');
  }
}

async function main() {
  try {
    await generateFavicons();
    await generateOgImages();
    console.log('ALL SITE ASSETS GENERATED SUCCESSFULLY!');
  } catch (err) {
    console.error('Error generating assets:', err);
    process.exit(1);
  }
}

main();
