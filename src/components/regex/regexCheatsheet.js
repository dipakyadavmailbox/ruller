export const CHEATSHEET_GROUPS = [
  {
    heading: 'Common patterns',
    items: [
      { name: 'Email address', pattern: '^[\\w.+-]+@[\\w-]+\\.[a-zA-Z]{2,}$' },
      { name: 'URL', pattern: '^https?:\\/\\/[\\w.-]+\\.[a-zA-Z]{2,}(\\/\\S*)?$' },
      { name: 'US phone number', pattern: '^\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}$' },
      { name: 'IPv4 address', pattern: '^(\\d{1,3}\\.){3}\\d{1,3}$' },
      { name: 'Hex color', pattern: '^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$' },
      { name: 'Date (YYYY-MM-DD)', pattern: '^\\d{4}-\\d{2}-\\d{2}$' },
      { name: 'Slug (kebab-case)', pattern: '^[a-z0-9]+(-[a-z0-9]+)*$' },
      { name: 'Whitespace only', pattern: '^\\s*$' },
    ],
  },
  {
    heading: 'Syntax reference',
    items: [
      { name: '. any character', pattern: '.' },
      { name: '\\d digit, \\D not digit', pattern: '\\d' },
      { name: '\\w word char, \\W not word char', pattern: '\\w' },
      { name: '\\s whitespace, \\S not whitespace', pattern: '\\s' },
      { name: '^ start, $ end of string', pattern: '^...$' },
      { name: '* 0+, + 1+, ? 0 or 1', pattern: 'a*b+c?' },
      { name: '{n,m} between n and m times', pattern: 'a{2,4}' },
      { name: '(...) capture group, (?:...) non-capturing', pattern: '(abc)(?:def)' },
      { name: '| alternation (or)', pattern: 'cat|dog' },
      { name: '[abc] character class, [^abc] negated', pattern: '[abc]' },
      { name: '(?=...) lookahead, (?!...) negative lookahead', pattern: 'foo(?=bar)' },
    ],
  },
]
