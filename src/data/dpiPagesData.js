// ─── DPI & Print Resolution Sub-Pages Data for Programmatic SEO ───────────────

export const DPI_PAGES_DATA = [
  {
    slug: '300-dpi',
    mode: 'size-from-pixels',
    dpi: 300,
    pixelWidth: 3000,
    pixelHeight: 2400,
    name: '300 DPI Print Size Calculator',
    title: '300 DPI Print Size & Resolution Calculator | Rocking Tools',
    description: 'Calculate max high-quality print dimensions at 300 DPI (dots per inch). Convert pixel dimensions to physical print inches and centimeters.',
    keywords: '300 dpi calculator, 300 dpi print size, pixels to 300 dpi, 300 dpi resolution calculator, high quality photo print dpi',
    intro: '300 DPI is the industry standard print resolution for sharp, gallery-quality photography, magazine publishing, and photo prints.',
    useCases: [
      { title: 'Fine Art & Photo Printing', desc: 'Ensure your digital photos have enough pixels to print at 300 DPI without pixelation.' },
      { title: 'Commercial Brochures & Flyers', desc: 'Prepare graphics at the exact resolution commercial offset printers require.' },
    ],
    faqs: [
      { q: 'Why is 300 DPI considered the standard print resolution?', a: 'Human eyes cannot distinguish individual printer dots at normal reading distances (10-12 inches) when printed at 300 DPI.' },
      { q: 'How many pixels do I need for an 8x10 print at 300 DPI?', a: 'You need 2400 × 3000 pixels (8 × 300 = 2400, 10 × 300 = 3000).' },
    ],
  },
  {
    slug: '150-dpi',
    mode: 'size-from-pixels',
    dpi: 150,
    pixelWidth: 3600,
    pixelHeight: 5400,
    name: '150 DPI Large Format Poster Calculator',
    title: '150 DPI Large Format Poster Size Calculator | Rocking Tools',
    description: 'Calculate large-format print sizes at 150 DPI for posters, trade show banners, and canvas art.',
    keywords: '150 dpi calculator, 150 dpi print size, poster dpi calculator, large format print resolution',
    intro: '150 DPI is the ideal resolution for large-format posters, canvas wall art, and banners viewed from 3 to 6 feet away.',
    useCases: [
      { title: 'Movie & Event Posters', desc: 'Calculate the required pixel resolution for 24×36 inch large format posters.' },
      { title: 'Trade Show Banners & Displays', desc: 'Prepare vinyl banners and backdrop graphics without generating unmanageable gigabyte files.' },
    ],
    faqs: [
      { q: 'Is 150 DPI enough for a poster?', a: 'Yes! Because posters are viewed from several feet away rather than held in your hand, 150 DPI looks crisp and sharp.' },
    ],
  },
  {
    slug: '4x6-print',
    mode: 'pixels-from-size',
    dpi: 300,
    printWidth: 6,
    printHeight: 4,
    unit: 'in',
    name: '4×6 Photo Print Pixel Size Calculator',
    title: '4×6 Photo Print Size (Pixels & Resolution at 300 DPI) | Rocking Tools',
    description: 'Find the exact pixel dimensions needed for a 4×6 inch photo print at 300 DPI (1200×1800 px). Free online calculator.',
    keywords: '4x6 photo size in pixels, 4x6 print resolution, 4x6 photo pixels 300 dpi, 4x6 print dimensions, 4 by 6 photo pixels',
    intro: 'For a crisp 4×6 inch photo print at 300 DPI, your image needs to be exactly 1200 × 1800 pixels (or 1800 × 1200 pixels for landscape).',
    useCases: [
      { title: 'Standard Photo Album Prints', desc: 'Prepare family vacation photos and snapshots for printing at Walgreens, CVS, or home photo printers.' },
      { title: 'Postcards & Invitations', desc: 'Design 4×6 postcards and greeting cards with exact pixel dimensions.' },
    ],
    faqs: [
      { q: 'What is the exact pixel resolution for a 4x6 print at 300 DPI?', a: 'Exactly 1800 × 1200 pixels (2.16 megapixels).' },
    ],
  },
  {
    slug: '5x7-print',
    mode: 'pixels-from-size',
    dpi: 300,
    printWidth: 7,
    printHeight: 5,
    unit: 'in',
    name: '5×7 Photo Print Pixel Size Calculator',
    title: '5×7 Photo Print Size in Pixels (300 DPI Resolution) | Rocking Tools',
    description: 'Calculate pixel dimensions for a 5×7 inch photo print at 300 DPI (1500×2100 pixels).',
    keywords: '5x7 photo size in pixels, 5x7 print resolution, 5x7 pixels 300 dpi, 5 by 7 photo dimensions',
    intro: 'A standard 5×7 inch framed photo print requires 1500 × 2100 pixels at 300 DPI print quality.',
    useCases: [
      { title: 'Framed Portrait Prints', desc: 'Prepare senior portraits, wedding photos, and framed prints for 5×7 frames.' },
      { title: 'Wedding & Event Invitations', desc: 'Size formal invitation stationery for crisp physical printing.' },
    ],
    faqs: [
      { q: 'How many megapixels is a 5x7 print at 300 DPI?', a: '1500 × 2100 = 3.15 megapixels.' },
    ],
  },
  {
    slug: '8x10-print',
    mode: 'pixels-from-size',
    dpi: 300,
    printWidth: 10,
    printHeight: 8,
    unit: 'in',
    name: '8×10 Photo Print Pixel Size Calculator',
    title: '8×10 Photo Print Size in Pixels (300 DPI Resolution) | Rocking Tools',
    description: 'Calculate pixel dimensions for an 8×10 inch photo print at 300 DPI (2400×3000 pixels).',
    keywords: '8x10 photo size in pixels, 8x10 print resolution, 8x10 photo pixels 300 dpi, 8 by 10 dimensions',
    intro: 'For an 8×10 inch photo print at 300 DPI, your image file needs to be 2400 × 3000 pixels (7.2 megapixels).',
    useCases: [
      { title: 'Wall Art & Gallery Frames', desc: 'Size headshots, family portraits, and art prints for standard 8×10 frames.' },
    ],
    faqs: [
      { q: 'What aspect ratio is an 8x10 print?', a: '8×10 uses a 4:5 aspect ratio (same as Instagram portrait posts).' },
    ],
  },
  {
    slug: 'a4-print',
    mode: 'pixels-from-size',
    dpi: 300,
    printWidth: 29.7,
    printHeight: 21.0,
    unit: 'cm',
    name: 'A4 Paper Size in Pixels Calculator (300 DPI)',
    title: 'A4 Paper Size in Pixels (300 DPI, 150 DPI, 72 DPI) | Rocking Tools',
    description: 'Find exact A4 paper dimensions in pixels at 300 DPI (2480×3508 px), 150 DPI, and 72 DPI. International standard sheet size.',
    keywords: 'a4 size in pixels, a4 pixels 300 dpi, a4 dimensions pixels, a4 paper pixel size, 2480x3508 a4',
    intro: 'Standard ISO 216 A4 paper (210 × 297 mm / 8.27 × 11.69 inches) requires exactly 2480 × 3508 pixels at 300 DPI print resolution.',
    useCases: [
      { title: 'International Documents & Flyers', desc: 'Design flyers, brochures, and PDF letterheads formatted to global standard A4 paper.' },
    ],
    faqs: [
      { q: 'What is A4 size in pixels at 300 DPI?', a: '2480 × 3508 pixels (8.7 megapixels).' },
    ],
  },
  {
    slug: 'poster-size',
    mode: 'pixels-from-size',
    dpi: 150,
    printWidth: 36,
    printHeight: 24,
    unit: 'in',
    name: '24×36 Poster Size in Pixels Calculator',
    title: '24×36 Poster Size in Pixels (150 & 300 DPI) | Rocking Tools',
    description: 'Calculate pixel resolution needed for standard 24×36 inch full-size architectural and movie posters.',
    keywords: '24x36 poster size pixels, poster dimensions pixels, 24 by 36 poster resolution, 24x36 150 dpi',
    intro: 'A standard full-size 24×36 inch poster requires 3600 × 5400 pixels at 150 DPI (optimal for poster viewing distance) or 7200 × 10800 pixels at 300 DPI.',
    useCases: [
      { title: 'Theatrical & Concert Posters', desc: 'Size movie and gig posters for commercial printing.' },
    ],
    faqs: [
      { q: 'Should posters be 150 DPI or 300 DPI?', a: '150 DPI is standard for 24×36 posters viewed from 3+ feet away. 300 DPI is only needed for up-close inspection.' },
    ],
  },
]

export function getDpiPageBySlug(slug) {
  return DPI_PAGES_DATA.find((d) => d.slug === slug)
}
