// ─── Data Converter Sub-Pages Data for Programmatic SEO ──────────────────────

export const DATA_CONVERTER_PAGES_DATA = [
  {
    slug: 'json-to-csv',
    tab: 'structure',
    fromFormat: 'JSON',
    toFormat: 'CSV',
    name: 'JSON to CSV Converter',
    title: 'JSON to CSV Converter Online — Free, Fast & Private | Rocking Tools',
    description: 'Convert JSON data or nested objects into clean CSV spreadsheets instantly. 100% browser-based with PapaParse, zero upload.',
    keywords: 'json to csv, convert json to csv, json to csv online, export json as csv, json table converter, json to excel csv',
    intro: 'Convert JSON arrays and objects into comma-separated CSV spreadsheet files. Copy to clipboard or download as .csv for Excel and Google Sheets.',
    useCases: [
      { title: 'API Response to Excel', desc: 'Paste raw JSON from REST APIs or database queries directly into Excel or Google Sheets.' },
      { title: 'Data Analysis & BI', desc: 'Import web application data into Tableau, Power BI, or Python Pandas.' },
      { title: 'E-commerce Product Feeds', desc: 'Transform JSON product catalogs into CSV format for Shopify, WooCommerce, or Google Merchant Center.' },
    ],
    faqs: [
      { q: 'Can this tool handle nested JSON objects?', a: 'Yes! Nested objects and arrays are flattened into clean dot-notated column headers (e.g. user.address.city).' },
      { q: 'Is my data uploaded to any remote server?', a: 'No. Parsing is handled locally in your browser with PapaParse. Your proprietary dataset remains 100% private.' },
    ],
  },
  {
    slug: 'csv-to-json',
    tab: 'structure',
    fromFormat: 'CSV',
    toFormat: 'JSON',
    name: 'CSV to JSON Converter',
    title: 'CSV to JSON Converter Online — Fast & Accurate | Rocking Tools',
    description: 'Convert CSV spreadsheets and table data into clean formatted JSON arrays. 100% in-browser, auto type detection, zero upload.',
    keywords: 'csv to json, convert csv to json, csv to json online, spreadsheet to json, csv parser to json, excel csv to json',
    intro: 'Transform CSV spreadsheets and table exports into clean, indented JSON arrays ready for web apps, APIs, and databases.',
    useCases: [
      { title: 'Seed Database Records', desc: 'Convert spreadsheet customer lists, inventory, or seed data into JSON for MongoDB, PostgreSQL, or Firebase.' },
      { title: 'Frontend Mock Data', desc: 'Turn Excel rows into JSON fixture files for React, Vue, or Next.js components.' },
      { title: 'Config & Localization', desc: 'Convert translated CSV tables into i18n JSON translation dictionaries.' },
    ],
    faqs: [
      { q: 'Does it automatically detect numbers and booleans?', a: 'Yes, numeric values and boolean strings (true/false) are automatically typed properly in the JSON output.' },
    ],
  },
  {
    slug: 'json-to-yaml',
    tab: 'structure',
    fromFormat: 'JSON',
    toFormat: 'YAML',
    name: 'JSON to YAML Converter',
    title: 'JSON to YAML Converter Online — Clean Syntax | Rocking Tools',
    description: 'Convert JSON configurations into clean, human-readable YAML. Perfect for Kubernetes, Docker Compose, GitHub Actions, and Ansible.',
    keywords: 'json to yaml, convert json to yaml, json to yml online, k8s json to yaml, docker json to yaml',
    intro: 'Convert JSON objects into readable, indentation-formatted YAML documents for DevOps, Kubernetes, and CI/CD pipelines.',
    useCases: [
      { title: 'Kubernetes & Docker Manifests', desc: 'Convert JSON specs into clean Kubernetes Pod definitions and docker-compose.yml files.' },
      { title: 'CI/CD Configurations', desc: 'Translate JSON build parameters into GitHub Actions workflows or GitLab CI configs.' },
      { title: 'Swagger / OpenAPI Specs', desc: 'Convert OpenAPI JSON documentation into clean YAML schemas.' },
    ],
    faqs: [
      { q: 'Is the YAML output standard-compliant?', a: 'Yes, it uses the official js-yaml engine to produce strictly valid YAML 1.2 syntax.' },
    ],
  },
  {
    slug: 'yaml-to-json',
    tab: 'structure',
    fromFormat: 'YAML',
    toFormat: 'JSON',
    name: 'YAML to JSON Converter',
    title: 'YAML to JSON Converter Online — Valid JSON Output | Rocking Tools',
    description: 'Convert YAML configuration files into valid JSON format instantly. 100% in-browser with syntax validation.',
    keywords: 'yaml to json, convert yaml to json, yml to json, parse yaml to json, yaml to json online',
    intro: 'Convert YAML files, Kubernetes manifests, and Helm chart values into standard JSON for programmatic consumption.',
    useCases: [
      { title: 'API Integration', desc: 'Convert YAML config files into JSON payloads for REST API calls.' },
      { title: 'Log & Metrics Processing', desc: 'Transform YAML log definitions into indexable JSON documents.' },
    ],
    faqs: [
      { q: 'How does it handle multiline strings in YAML?', a: 'Multiline strings and folded blocks are properly formatted and escaped in the resulting JSON strings.' },
    ],
  },
  {
    slug: 'csv-to-yaml',
    tab: 'structure',
    fromFormat: 'CSV',
    toFormat: 'YAML',
    name: 'CSV to YAML Converter',
    title: 'CSV to YAML Converter Online — Free & Fast | Rocking Tools',
    description: 'Convert CSV table rows directly into structured YAML document lists. 100% client-side.',
    keywords: 'csv to yaml, convert csv to yaml, csv to yml online, spreadsheet to yaml',
    intro: 'Convert spreadsheet data rows into clean, structured YAML lists suitable for configuration and data pipelines.',
    useCases: [
      { title: 'DevOps Inventory Lists', desc: 'Convert server IP spreadsheets into Ansible host inventory YAML files.' },
    ],
    faqs: [
      { q: 'What structure does the YAML output use?', a: 'Each CSV row is converted into a structured YAML list item with field names as keys.' },
    ],
  },
  {
    slug: 'yaml-to-csv',
    tab: 'structure',
    fromFormat: 'YAML',
    toFormat: 'CSV',
    name: 'YAML to CSV Converter',
    title: 'YAML to CSV Converter Online — Export to Spreadsheet | Rocking Tools',
    description: 'Convert YAML lists and documents into CSV format for spreadsheet analysis. Zero upload.',
    keywords: 'yaml to csv, convert yaml to csv, yml to csv, yaml to excel',
    intro: 'Convert structured YAML records into comma-delimited CSV files ready to open in Excel or Google Sheets.',
    useCases: [
      { title: 'Config Auditing', desc: 'Export Kubernetes deployment lists or infrastructure specs into spreadsheets for compliance review.' },
    ],
    faqs: [
      { q: 'Can it convert lists of objects?', a: 'Yes, arrays of YAML objects are transformed directly into spreadsheet rows and columns.' },
    ],
  },
  {
    slug: 'base64-encode',
    tab: 'encoding',
    encodingMode: 'base64-enc',
    name: 'Base64 Encoder',
    title: 'Base64 Encoder Online — Convert Text to Base64 | Rocking Tools',
    description: 'Encode plain text strings, authorization tokens, and data into Base64 format instantly. 100% private in-browser.',
    keywords: 'base64 encode, text to base64, base64 encoder online, encode string to base64, base64 string generator',
    intro: 'Encode UTF-8 plain text, basic auth credentials, and data strings into Base64 format instantly.',
    useCases: [
      { title: 'HTTP Basic Authentication', desc: 'Encode "username:password" into the standard Base64 Authorization header string.' },
      { title: 'Embedding Data in HTML/CSS', desc: 'Encode small SVG icons or snippets directly into Data URLs.' },
      { title: 'Safe URL Parameter Passing', desc: 'Ensure special characters and symbols survive query string transmission.' },
    ],
    faqs: [
      { q: 'Does this support UTF-8 and emoji characters?', a: 'Yes, UTF-8 byte encoding ensures international characters and emojis encode accurately.' },
    ],
  },
  {
    slug: 'base64-decode',
    tab: 'encoding',
    encodingMode: 'base64-dec',
    name: 'Base64 Decoder',
    title: 'Base64 Decoder Online — Decode Base64 to Text | Rocking Tools',
    description: 'Decode Base64 strings back into readable plain text. Fast, secure, and 100% client-side in your browser.',
    keywords: 'base64 decode, base64 to text, base64 decoder online, decode base64 string, unbase64',
    intro: 'Decode Base64 encoded strings back into clean, readable text and JSON payloads with instant copy-paste.',
    useCases: [
      { title: 'Inspect Auth Headers', desc: 'Decode Basic Auth headers or base64 token payloads to inspect credentials.' },
      { title: 'Read Encoded API Responses', desc: 'Quickly decode webhook payloads or email MIME attachments.' },
    ],
    faqs: [
      { q: 'Is it safe to decode private tokens here?', a: 'Yes. Decoding happens exclusively in your browser via JavaScript. Nothing is sent to any server.' },
    ],
  },
  {
    slug: 'jwt-decoder',
    tab: 'jwt',
    name: 'JWT Decoder & Token Inspector',
    title: 'JWT Decoder Online — Inspect JSON Web Tokens Safely | Rocking Tools',
    description: 'Decode and inspect JWT (JSON Web Token) header, payload claims, and expiration timestamps. 100% client-side, zero network calls.',
    keywords: 'jwt decoder, decode jwt, jwt token inspector, json web token decoder, jwt payload viewer, check jwt expiry',
    intro: 'Decode JSON Web Tokens (JWT) into readable header, payload claims, and human-readable expiration dates — without transmitting your secret keys over the web.',
    useCases: [
      { title: 'Debug Authentication Tokens', desc: 'Check user roles, scopes, email claims, and permissions stored in OAuth/OpenID Connect tokens.' },
      { title: 'Verify Expiration Timestamps', desc: 'Inspect "exp", "iat", and "nbf" unix timestamps converted to your local timezone.' },
    ],
    faqs: [
      { q: 'Is it safe to paste production JWTs here?', a: 'Yes, decoding is 100% client-side. The token string is never transmitted across the network.' },
      { q: 'Does this verify the cryptographic signature?', a: 'This tool inspects and decodes the token payload. Signature verification requires your private/public key on your backend.' },
    ],
  },
  {
    slug: 'hex-to-text',
    tab: 'encoding',
    encodingMode: 'hex-dec',
    name: 'Hex to Text Converter',
    title: 'Hex to Text String Converter Online — Free & Fast | Rocking Tools',
    description: 'Convert hexadecimal (hex) byte strings into readable ASCII and UTF-8 text. 100% client-side.',
    keywords: 'hex to text, hexadecimal to string, hex to ascii converter, decode hex to text, hex decoder online',
    intro: 'Convert hexadecimal byte strings (e.g. "48 65 6c 6c 6f") into human-readable ASCII and UTF-8 plain text.',
    useCases: [
      { title: 'Inspect Network Packets', desc: 'Decode raw hexadecimal network packet dumps and memory hex dumps.' },
      { title: 'Cryptography & Hashing Debugging', desc: 'Convert hex encoded hashes and ciphertexts into strings.' },
    ],
    faqs: [
      { q: 'Does it support hex strings with or without spaces?', a: 'Yes! You can paste hex strings with spaces, colons, or continuous hex characters.' },
    ],
  },
  {
    slug: 'text-to-hex',
    tab: 'encoding',
    encodingMode: 'hex-enc',
    name: 'Text to Hex Converter',
    title: 'Text to Hex Converter Online — Convert String to Hexadecimal | Rocking Tools',
    description: 'Convert plain text strings into hexadecimal (hex) byte representation instantly. 100% in-browser.',
    keywords: 'text to hex, string to hex, ascii to hex converter, encode text to hex, hex encoder',
    intro: 'Convert plain text and ASCII characters into hexadecimal byte sequences.',
    useCases: [
      { title: 'Low-Level Programming', desc: 'Prepare hex string constants for C/C++, Rust, or assembly programs.' },
    ],
    faqs: [
      { q: 'What format is the hex output in?', a: 'The output is formatted as standard space-separated hex bytes (e.g., 48 65 6c 6c 6f).' },
    ],
  },
  {
    slug: 'binary-to-text',
    tab: 'encoding',
    encodingMode: 'bin-dec',
    name: 'Binary to Text Converter',
    title: 'Binary to Text Converter — Decode 010101 into English | Rocking Tools',
    description: 'Convert binary code (8-bit bytes of 1s and 0s) into readable text and letters. 100% free online.',
    keywords: 'binary to text, binary to english, binary code translator, 0101 to text, binary decoder',
    intro: 'Translate 8-bit binary numbers (sequences of 0s and 1s) into readable letters, words, and sentences.',
    useCases: [
      { title: 'Computer Science & Education', desc: 'Decode binary assignments and understand computer data representation.' },
    ],
    faqs: [
      { q: 'How does binary convert to text?', a: 'Each 8-bit binary byte represents one ASCII character code (e.g. 01000001 = 65 = letter "A").' },
    ],
  },
  {
    slug: 'text-to-binary',
    tab: 'encoding',
    encodingMode: 'bin-enc',
    name: 'Text to Binary Converter',
    title: 'Text to Binary Code Converter — Convert English to 010101 | Rocking Tools',
    description: 'Convert plain text strings and letters into 8-bit binary code (0s and 1s) instantly.',
    keywords: 'text to binary, english to binary, convert text to 0101, binary encoder, string to binary code',
    intro: 'Encode any English word, sentence, or string into 8-bit binary byte sequences.',
    useCases: [
      { title: 'Coding Challenges & Secret Messages', desc: 'Convert secret messages or coding puzzles into binary notation.' },
    ],
    faqs: [
      { q: 'How many binary digits per character?', a: 'Standard ASCII uses 8 binary digits (1 byte) per character with leading zero padding.' },
    ],
  },
]

export function getDataConverterPageBySlug(slug) {
  return DATA_CONVERTER_PAGES_DATA.find((p) => p.slug === slug)
}
