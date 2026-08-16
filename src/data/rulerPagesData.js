// ─── Ruler Sub-Pages Data for Programmatic SEO ───────────────────────────────

export const RULER_PAGES_DATA = [
  {
    slug: 'cm-ruler',
    unit: 'cm',
    name: 'Online Centimeter (cm) Ruler — Actual Physical Size',
    title: 'Actual Size Centimeter (cm) Ruler on Screen | Rocking Tools',
    description: 'Accurate online centimeter ruler calibrated to your screen size. Measure real physical objects in cm and mm on your phone, tablet, or monitor.',
    keywords: 'cm ruler online, actual size cm ruler, centimeter ruler on screen, online ruler cm, measure cm on screen, real size cm ruler',
    intro: 'Use your smartphone, tablet, or computer monitor as an accurate physical centimeter ruler. Calibrated to true 1:1 real-world scale.',
    useCases: [
      { title: 'Measure Small Physical Objects', desc: 'Measure jewelry, screws, coins, stamps, or craft materials directly against your screen.' },
      { title: 'School & Homework Projects', desc: 'Handy virtual ruler when you don\'t have a physical plastic ruler nearby.' },
    ],
    faqs: [
      { q: 'Is this centimeter ruler accurate to actual size?', a: 'Yes! The ruler detects your screen\'s physical DPI and allows 1-click calibration with any standard credit card or gift card to guarantee exact 1:1 scale.' },
    ],
  },
  {
    slug: 'inch-ruler',
    unit: 'in',
    name: 'Online Inch (in) Ruler — Actual Physical Size',
    title: 'Actual Size Inch Ruler on Screen (1:1 Real Scale) | Rocking Tools',
    description: 'Accurate online inch ruler displayed at true 1:1 physical scale on any display. Includes 1/16th inch precision markings.',
    keywords: 'inch ruler online, actual size inch ruler, online ruler inches, measure inches on screen, real scale inch ruler, 12 inch ruler online',
    intro: 'Display an actual size 1:1 scale inch ruler with 1/8th and 1/16th inch fraction subdivisions on your screen.',
    useCases: [
      { title: 'DIY & Woodworking Quick Checks', desc: 'Quickly check bolt lengths, drill bit diameters, or paper dimensions in inches.' },
      { title: 'Package & Mail Sizing', desc: 'Measure small parcels and envelopes to check postal service dimension tiers.' },
    ],
    faqs: [
      { q: 'What fractions of an inch are shown on this ruler?', a: 'The ruler shows standard 1/2, 1/4, 1/8, and 1/16-inch subdivision tick marks.' },
    ],
  },
  {
    slug: 'mm-ruler',
    unit: 'mm',
    name: 'Online Millimeter (mm) Ruler — High Precision',
    title: 'Actual Size Millimeter (mm) Ruler on Screen | Rocking Tools',
    description: 'High-precision millimeter ruler on screen with sub-millimeter tick marks for fine measurement and engineering checks.',
    keywords: 'mm ruler online, actual size mm ruler, millimeter ruler on screen, precision mm ruler online, measure mm on screen',
    intro: 'High-precision millimeter measurement tool rendered with crisp, calibrated pixel markings on your display.',
    useCases: [
      { title: 'Electronics & Component Sizing', desc: 'Measure SMD components, resistor lengths, and PCB spacing directly on screen.' },
      { title: 'Watch Straps & Jewelry', desc: 'Measure watch band lug widths (18mm, 20mm, 22mm) and ring diameters accurately.' },
    ],
    faqs: [
      { q: 'How can I ensure millimeter accuracy on my monitor?', a: 'Click the "Calibrate" button and align any standard credit card (85.6mm) to the guide box.' },
    ],
  },
  {
    slug: 'credit-card-calibration',
    unit: 'cm',
    calibrationOpen: true,
    name: 'Screen Ruler Calibration Guide (Credit Card Method)',
    title: 'How to Calibrate an Online Screen Ruler to Actual Size | Rocking Tools',
    description: 'Calibrate any screen ruler to 100% accurate physical dimensions using a standard credit card (ISO/IEC 7810 ID-1 standard).',
    keywords: 'calibrate screen ruler, credit card ruler calibration, accurate screen ruler, monitor dpi calibration, how to calibrate online ruler',
    intro: 'Every standard credit card, debit card, driver\'s license, and gift card is manufactured to the exact ISO/IEC 7810 ID-1 standard (85.60 mm × 53.98 mm / 3.370 in × 2.125 in). Use yours to calibrate this ruler to 100% true physical size.',
    useCases: [
      { title: 'Screen DPI Calibration', desc: 'Match your operating system\'s visual scaling with real-world physical dimensions.' },
    ],
    faqs: [
      { q: 'What size is a standard credit card?', a: 'All standard bank credit cards and ID cards measure exactly 85.60 mm wide by 53.98 mm high (3.370 × 2.125 inches).' },
    ],
  },
]

export function getRulerPageBySlug(slug) {
  return RULER_PAGES_DATA.find((r) => r.slug === slug)
}
