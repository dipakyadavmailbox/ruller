// ─── Color Tools Sub-Pages Data for Programmatic SEO ─────────────────────────

export const COLOR_TOOLS_PAGES_DATA = [
  {
    slug: 'hex-to-rgb',
    tab: 'picker',
    hex: '#3B82F6',
    name: 'HEX to RGB Color Converter',
    title: 'HEX to RGB Color Converter Online — Free & Instant | Rocking Tools',
    description: 'Convert HEX color codes (#RRGGBB) to RGB (Red, Green, Blue) values with alpha transparency and CSS code snippet export.',
    keywords: 'hex to rgb, convert hex to rgb, hex to rgb converter online, hex to rgb css, color hex to rgb converter',
    intro: 'Convert 6-digit and 3-digit hexadecimal color codes into standard RGB (0-255) and RGBA CSS values with instant copy-paste.',
    useCases: [
      { title: 'CSS & Tailwind Development', desc: 'Convert brand HEX colors into RGB values for opacity-friendly rgba() background layers.' },
      { title: 'Canvas & WebGL Graphics', desc: 'Transform HEX strings into numeric RGB color components for HTML5 Canvas rendering.' },
    ],
    faqs: [
      { q: 'How do you convert HEX to RGB manually?', a: 'Split the 6-character HEX into 3 pairs: RR, GG, BB. Convert each two-digit hex number from base 16 to base 10 (e.g. #FF0000 -> FF=255, 00=0, 00=0 -> rgb(255, 0, 0)).' },
    ],
  },
  {
    slug: 'rgb-to-hex',
    tab: 'picker',
    hex: '#10B981',
    name: 'RGB to HEX Color Converter',
    title: 'RGB to HEX Color Converter Online | Rocking Tools',
    description: 'Convert RGB (Red, Green, Blue) integer values to standard 6-digit HEX color codes (#RRGGBB).',
    keywords: 'rgb to hex, convert rgb to hex, rgb to hex converter online, rgb to hex code, rgb to color hex',
    intro: 'Convert RGB decimal values (0 to 255) into standard 6-digit hexadecimal (#RRGGBB) strings.',
    useCases: [
      { title: 'Figma to Web Development', desc: 'Convert RGB color values from design tools into clean HEX color codes for CSS stylesheets.' },
    ],
    faqs: [
      { q: 'What is RGB(255, 255, 255) in HEX?', a: 'rgb(255, 255, 255) is #FFFFFF (pure white).' },
    ],
  },
  {
    slug: 'hex-to-hsl',
    tab: 'picker',
    hex: '#8B5CF6',
    name: 'HEX to HSL Color Converter',
    title: 'HEX to HSL Color Converter (Hue, Saturation, Lightness) | Rocking Tools',
    description: 'Convert HEX color codes to HSL (Hue, Saturation, Lightness) format with degree angles and percentage sliders.',
    keywords: 'hex to hsl, convert hex to hsl, hex to hsl converter, hex to hsl css, color hex to hsl',
    intro: 'Convert HEX color codes into HSL (Hue 0-360°, Saturation 0-100%, Lightness 0-100%) for intuitive color manipulation.',
    useCases: [
      { title: 'Dynamic CSS Themes', desc: 'Use HSL variables in CSS to create smooth hover states and dark mode tints by altering Lightness.' },
    ],
    faqs: [
      { q: 'Why use HSL instead of HEX in modern CSS?', a: 'HSL makes it easy to adjust brightness (lightness) or vibrancy (saturation) without altering the core hue.' },
    ],
  },
  {
    slug: 'palette-generator',
    tab: 'palette',
    name: 'Harmonious Color Palette Generator',
    title: 'Color Palette Generator — 5 Color Harmony Modes | Rocking Tools',
    description: 'Generate beautiful harmonious color palettes: complementary, analogous, triadic, split-complementary, and monochromatic.',
    keywords: 'color palette generator, color scheme generator, palette maker online, harmonious color palette, web design color palette',
    intro: 'Generate balanced, aesthetically harmonious 5-color palettes based on classical color theory principles with one-click CSS and Tailwind exports.',
    useCases: [
      { title: 'Website & App UI Design', desc: 'Create brand-aligned primary, secondary, and accent color combinations for user interfaces.' },
      { title: 'Illustration & Graphic Design', desc: 'Select harmonious background, foreground, and highlight colors for posters and digital art.' },
    ],
    faqs: [
      { q: 'What color harmony modes are available?', a: 'Our generator supports Complementary, Analogous, Triadic, Split-Complementary, and Monochromatic harmonies.' },
    ],
  },
  {
    slug: 'complementary-color',
    tab: 'palette',
    name: 'Complementary Color Calculator',
    title: 'Complementary Color Calculator & Wheel Generator | Rocking Tools',
    description: 'Find the exact opposite (complementary) color on the 360° color wheel for high-contrast, visually striking UI accents.',
    keywords: 'complementary color calculator, opposite color finder, complementary color wheel, find complementary color online',
    intro: 'Calculate the exact complementary color (180° opposite on the color wheel) for any HEX, RGB, or HSL color code to create bold, high-contrast visual accents.',
    useCases: [
      { title: 'Call-to-Action (CTA) Buttons', desc: 'Find high-converting contrasting accent colors for buttons and badges against background tones.' },
    ],
    faqs: [
      { q: 'What is a complementary color?', a: 'Complementary colors are pairs of colors located directly opposite each other on the 360° color wheel (e.g. Blue and Orange, Purple and Yellow).' },
    ],
  },
]

export function getColorToolsPageBySlug(slug) {
  return COLOR_TOOLS_PAGES_DATA.find((c) => c.slug === slug)
}
