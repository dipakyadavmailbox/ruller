export const CATEGORIES = [
  {
    heading: 'Design & Photography',
    tools: [
      {
        slug: '/ruler',
        icon: '📏',
        name: 'Screen Ruler',
        navLabel: 'Screen Ruler',
        description: 'Measure real-world objects on your screen at true mm/cm/inch scale — stays accurate even when you zoom.',
      },
      {
        slug: '/aspect-ratio-calculator',
        icon: '🖼️',
        name: 'Aspect Ratio & Crop Calculator',
        navLabel: 'Aspect Ratio',
        description: 'Get matching dimensions for any ratio (1:1, 4:5, 9:16...) or calculate a center-crop for your image.',
      },
      {
        slug: '/dpi-calculator',
        icon: '🖨️',
        name: 'DPI / PPI Print Size Calculator',
        navLabel: 'DPI Calculator',
        description: 'Find the max print size your image supports, or how many pixels you need for a target size and quality.',
      },
      {
        slug: '/image-resizer',
        icon: '🗜️',
        name: 'Image Compressor & Resizer',
        navLabel: 'Image Resizer',
        description: 'Resize and compress an image right in your browser, preview the result, and download it — nothing is uploaded.',
      },
    ],
  },
  {
    heading: 'Security & Health',
    tools: [
      {
        slug: '/password-checker',
        icon: '🔒',
        name: 'Password Strength Checker',
        navLabel: 'Password Checker',
        description: 'See how strong a password is and how long it would take to crack — checked 100% in your browser.',
      },
      {
        slug: '/calorie-calculator',
        icon: '🍽️',
        name: 'Calorie Calculator & Food Log',
        navLabel: 'Calorie Calculator',
        description: 'Find your daily calorie needs (TDEE) and a suggested macro split, then log what you eat against it.',
      },
      {
        slug: '/pregnancy-calculator',
        icon: '🤰',
        name: 'Pregnancy Due Date & Ovulation Calculator',
        navLabel: 'Pregnancy Calculator',
        description: 'Estimate your due date, current week of pregnancy, or your next ovulation and fertile window.',
      },
    ],
  },
  {
    heading: 'Developer Tools',
    tools: [
      {
        slug: '/regex-tester',
        icon: '⚡',
        name: 'Regex Tester & Cheatsheet',
        navLabel: 'Regex Tester',
        description: 'Test regular expressions live with match highlighting, capture groups, and a quick-reference cheatsheet.',
      },
      {
        slug: '/cron-expression-builder',
        icon: '⏰',
        name: 'Cron Expression Builder & Validator',
        navLabel: 'Cron Builder',
        description: 'Build, validate, and parse cron expressions with human-readable explanations and execution previews.',
      },
      {
        slug: '/data-converter',
        icon: '🔁',
        name: 'JSON ⇄ CSV ⇄ YAML Converter',
        navLabel: 'Data Converter',
        description: 'Convert between the three formats instantly — nothing is uploaded, it all runs in your browser.',
      },
      {
        slug: '/qr-code-generator',
        icon: '📱',
        name: 'QR Code Generator',
        navLabel: 'QR Code Generator',
        description: 'Create customizable QR codes for links, Wi-Fi, vCard contacts, email & text with high-res PNG & SVG downloads.',
      },
    ],
  },
]

export const ALL_TOOLS = CATEGORIES.flatMap((c) => c.tools.map((t) => ({ ...t, category: c.heading })))

export function findTool(slug) {
  return ALL_TOOLS.find((t) => t.slug === slug)
}

export function relatedTools(slug, count = 2) {
  const current = findTool(slug)
  if (!current) return []
  return ALL_TOOLS.filter((t) => t.category === current.category && t.slug !== slug).slice(0, count)
}
