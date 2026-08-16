// ─── Regex Patterns Content Data for Programmatic SEO ─────────────────────────

export const REGEX_PAGES_DATA = [
  {
    slug: 'email-regex',
    pattern: '^[\\w.+-]+@[\\w-]+\\.[a-zA-Z]{2,}$',
    flags: ['g', 'i'],
    testString: 'Valid: user@example.com, john.doe@company.org\nInvalid: user@, @domain.com, user@domain',
    name: 'Email Validation Regex',
    title: 'Email Validation Regular Expression (Regex) Tester & Guide | Rocking Tools',
    description: 'Test and copy standard email validation regular expressions for JavaScript, Python, PHP, and Java. Matches standard RFC email formats.',
    keywords: 'email regex, regex for email, email validation regex, regex email javascript, email pattern regex, email address regular expression',
    intro: 'Test and validate standard email address format regular expressions. Matches typical username@domain.tld formats while catching malformed addresses.',
    useCases: [
      { title: 'HTML Form Validation', desc: 'Validate user-entered email addresses on signup, login, and newsletter subscription forms.' },
      { title: 'Data Cleaning & Scraping', desc: 'Extract email addresses from large text corpora, customer support logs, and raw text files.' },
    ],
    faqs: [
      { q: 'What does this email regex match?', a: 'It matches alphanumeric characters, dots, pluses, and dashes before the @ symbol, followed by a valid domain name and a minimum 2-character TLD.' },
    ],
  },
  {
    slug: 'phone-number-regex',
    pattern: '^\\+?1?\\s?\\(?[2-9][0-9]{2}\\)?[\\s.-]?[0-9]{3}[\\s.-]?[0-9]{4}$',
    flags: ['g'],
    testString: 'Valid:\n(555) 555-1234\n555-555-1234\n+1 555 555 1234\n5555551234',
    name: 'Phone Number Regex (US & International)',
    title: 'Phone Number Regular Expression (Regex) Tester | Rocking Tools',
    description: 'Validate US and international telephone numbers with regex. Supports parentheses, dashes, dots, spaces, and country codes.',
    keywords: 'phone number regex, regex for phone number, us phone regex, phone validation regex javascript, phone regex pattern',
    intro: 'Validate North American and standardized phone numbers across multiple formats (e.g. (123) 456-7890, 123-456-7890, +1 123 456 7890).',
    useCases: [
      { title: 'Checkout & Shipping Forms', desc: 'Ensure buyers enter valid contact phone numbers before processing payments.' },
      { title: 'SMS OTP Verification', desc: 'Sanitize and validate phone numbers before sending two-factor authentication SMS codes.' },
    ],
    faqs: [
      { q: 'How does it handle formatting like brackets and dashes?', a: 'The pattern makes parentheses, spaces, dots, and hyphens optional so formatted and raw numeric entries are accepted.' },
    ],
  },
  {
    slug: 'url-regex',
    pattern: '^https?:\\/\\/[\\w.-]+(:[0-9]+)?(\\/[\\w\\-./?%&=]*)?$',
    flags: ['g', 'i'],
    testString: 'Valid: https://example.com, https://sub.domain.org/path?q=123#hash\nInvalid: ftp://invalid, http://, www.example.com',
    name: 'URL & Web Address Regex',
    title: 'URL Validation Regular Expression (Regex) Tester | Rocking Tools',
    description: 'Validate HTTP and HTTPS website URLs with regular expressions. Matches domain names, ports, query strings, and paths.',
    keywords: 'url regex, regex for url, url validation regex, javascript url regex, web address regular expression',
    intro: 'Validate and extract HTTP/HTTPS website links, subdomains, port numbers, query strings, and path parameters.',
    useCases: [
      { title: 'User Profile Website Links', desc: 'Verify personal website and social media profile URLs on user registration.' },
      { title: 'Web Scraping & Link Crawlers', desc: 'Extract valid HTTP/HTTPS URLs from raw HTML responses.' },
    ],
    faqs: [
      { q: 'Does this require http:// or https://?', a: 'Yes, this pattern enforces standard http:// or https:// protocols.' },
    ],
  },
  {
    slug: 'ipv4-regex',
    pattern: '^((25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.){3}(25[0-5]|2[0-4]\\d|[01]?\\d\\d?)$',
    flags: ['g'],
    testString: 'Valid: 192.168.1.1, 10.0.0.1, 255.255.255.0\nInvalid: 256.0.0.1, 192.168.1, 1.2.3.4.5',
    name: 'IPv4 Address Regex',
    title: 'IPv4 Address Regular Expression (Regex) Validator | Rocking Tools',
    description: 'Validate IPv4 IP addresses (0.0.0.0 to 255.255.255.255) with range-checked regular expressions.',
    keywords: 'ipv4 regex, ip address regex, regex for ip, ip address validation regex, ipv4 pattern',
    intro: 'Validate four-octet IPv4 addresses with accurate octet range enforcement (0 to 255 per segment).',
    useCases: [
      { title: 'Firewall & Network Security', desc: 'Validate IP address whitelist entries and server firewall configuration rules.' },
      { title: 'Server Log Analysis', desc: 'Extract visitor IP addresses from NGINX or Apache access logs.' },
    ],
    faqs: [
      { q: 'Does this regex block numbers above 255?', a: 'Yes! It specifically validates numbers from 0 to 255 (25[0-5]|2[0-4]\\d|[01]?\\d\\d?).' },
    ],
  },
  {
    slug: 'password-regex',
    pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*]).{8,}$',
    flags: ['g'],
    testString: 'Valid: P@ssw0rd123, Strong#Pass99\nInvalid: password, PASSWORD, Pass1234, P@ssword',
    name: 'Strong Password Validation Regex',
    title: 'Strong Password Regex (Uppercase, Lowercase, Digit, Symbol) | Rocking Tools',
    description: 'Enforce strong password rules with lookahead regular expressions: min 8 characters, uppercase, lowercase, number, and special symbol.',
    keywords: 'password regex, strong password regex, regex for password validation, password policy regex javascript',
    intro: 'Enforce modern password complexity requirements using positive lookahead assertions (?=...).',
    useCases: [
      { title: 'User Registration Policies', desc: 'Enforce minimum security standards on user password input fields.' },
    ],
    faqs: [
      { q: 'How do lookaheads work in password regex?', a: 'Positive lookaheads (?=.*[A-Z]) verify that at least one uppercase letter exists anywhere in the string without consuming characters.' },
    ],
  },
  {
    slug: 'date-regex',
    pattern: '^(19|20)\\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])$',
    flags: ['g'],
    testString: 'Valid: 2024-07-25, 1999-12-31, 2026-08-16\nInvalid: 2024-13-01, 2024-00-10, 2024-02-32',
    name: 'Date (YYYY-MM-DD) Regex',
    title: 'ISO Date (YYYY-MM-DD) Regular Expression Validator | Rocking Tools',
    description: 'Validate ISO 8601 date strings (YYYY-MM-DD) with month and day boundary enforcement.',
    keywords: 'date regex, yyyy-mm-dd regex, regex for date format, date validation regex javascript, iso date regex',
    intro: 'Validate ISO-8601 calendar date format (YYYY-MM-DD) ensuring valid months (01-12) and days (01-31).',
    useCases: [
      { title: 'Date of Birth & Booking Forms', desc: 'Validate date inputs in API requests and database queries.' },
    ],
    faqs: [
      { q: 'Does this regex account for leap years?', a: 'This regex validates date string structure (01-31 days, 01-12 months). Calendar leap year logic is typically verified via Date objects.' },
    ],
  },
  {
    slug: 'uuid-regex',
    pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$',
    flags: ['g', 'i'],
    testString: 'Valid: 550e8400-e29b-41d4-a716-446655440000, 123e4567-e89b-12d3-a456-426614174000\nInvalid: 12345, not-a-uuid',
    name: 'UUID v4 Regex',
    title: 'UUID v4 Regular Expression (Regex) Validator | Rocking Tools',
    description: 'Validate 36-character UUID Version 4 strings with standard hyphen formatting.',
    keywords: 'uuid regex, uuid v4 regex, regex for uuid, guid regex, uuid validation regular expression',
    intro: 'Validate standard 128-bit universally unique identifiers (UUID v4) and GUID string formats.',
    useCases: [
      { title: 'Database Primary Keys', desc: 'Validate API route URL parameters containing record UUIDs.' },
    ],
    faqs: [
      { q: 'What is the structure of a UUID v4?', a: 'UUID v4 consists of 5 hex groups (8-4-4-4-12) where the 13th character is "4" and the 17th character is 8, 9, a, or b.' },
    ],
  },
  {
    slug: 'hex-color-regex',
    pattern: '^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$',
    flags: ['g'],
    testString: 'Valid: #FFF, #ff5733, #000000, #38BDF8\nInvalid: #FFFF, #12345, FFFFFF',
    name: 'Hex Color Code Regex',
    title: 'Hex Color Code Regular Expression (Regex) Validator | Rocking Tools',
    description: 'Validate 3-digit and 6-digit CSS hexadecimal color codes with regex.',
    keywords: 'hex color regex, regex for hex color, css hex regex, color code regex javascript',
    intro: 'Validate 3-character and 6-character hexadecimal CSS color codes with leading hash symbol.',
    useCases: [
      { title: 'Theme & Style Customizers', desc: 'Validate user-selected custom brand and theme color input strings.' },
    ],
    faqs: [
      { q: 'Does it support 8-digit hex with alpha transparency?', a: 'You can extend the pattern to ^#([0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$ for alpha channel support.' },
    ],
  },
]

export function getRegexPageBySlug(slug) {
  return REGEX_PAGES_DATA.find((r) => r.slug === slug)
}
