// ─────────────────────────────────────────────────────────────────────────
// SITE CONFIG — edit this file to configure contact info, legal page dates,
// and donation methods. Nothing else in the codebase needs to change when
// you fill these in.
// ─────────────────────────────────────────────────────────────────────────

export const SITE_CONFIG = {
  siteName: 'Rocking Tools',
  domain: 'https://YOUR-DOMAIN.com',

  contactEmail: 'hello@your-domain.com',

  legal: {
    // Bump this whenever you edit the Terms or Privacy page content.
    lastUpdated: 'July 25, 2026',
    // Shown in Terms as the governing jurisdiction — replace with your
    // actual state (matters for US arbitration/venue clauses).
    jurisdiction: 'the State of Delaware, USA',
    // Used on /privacy for the CCPA/DMCA/accessibility contact points.
    // Defaults to contactEmail below if left blank.
    privacyEmail: '',
    dmcaEmail: '',
    accessibilityEmail: '',
  },

  donation: {
    // Manually update these two numbers whenever you check your accounts —
    // there's no backend here to pull them automatically.
    monthlyGoal: 200,
    currentRaised: 0,

    // Sum of this list drives the "monthly expenses" figure shown in the
    // transparency section — edit the list, not a separate total.
    expenses: [
      { label: 'Hosting (Vercel)', amount: 20 },
      { label: 'Domain name', amount: 2 },
      { label: 'Misc. tools/services', amount: 8 },
    ],

    // Each entry becomes one card on the Donate page. Set `enabled: true`
    // and fill in `href` (or `upiId`/`qrImage` for UPI) once you actually
    // have that account set up — until then it renders as "coming soon"
    // so the page still looks complete but doesn't link anywhere broken.
    methods: [
      { id: 'upi', label: 'UPI', enabled: false, upiId: '', qrImage: '' },
      { id: 'paypal', label: 'PayPal', enabled: false, href: '' },
      { id: 'buymeacoffee', label: 'Buy Me a Coffee', enabled: false, href: '' },
      { id: 'githubsponsors', label: 'GitHub Sponsors', enabled: false, href: '' },
      { id: 'stripe', label: 'Card (Stripe)', enabled: false, href: '' },
      { id: 'razorpay', label: 'Razorpay', enabled: false, href: '' },
    ],
  },
}
