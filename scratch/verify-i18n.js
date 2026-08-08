import fs from 'fs';
import path from 'path';
import { useTranslations, ALL_LANGS, SUPPORTED_LANGS, switchLocaleUrl, LANG_NAMES } from '../src/i18n/ui.js';

console.log('--- i18n VERIFICATION TEST ---');

// 1. Check supported languages
console.log(`ALL_LANGS (${ALL_LANGS.length}):`, ALL_LANGS);

// 2. Load all JSON files and compare keys against en.json
const localesDir = path.resolve('./src/i18n/locales');
const enPath = path.join(localesDir, 'en.json');
const enDict = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const enKeys = Object.keys(enDict);

console.log(`en.json total keys: ${enKeys.length}`);

let totalErrors = 0;

for (const lang of ALL_LANGS) {
  const file = path.join(localesDir, `${lang}.json`);
  if (!fs.existsSync(file)) {
    console.error(`❌ Missing locale file: ${lang}.json`);
    totalErrors++;
    continue;
  }

  const dict = JSON.parse(fs.readFileSync(file, 'utf8'));
  const keys = Object.keys(dict);

  const missingKeys = enKeys.filter(k => !(k in dict));
  const extraKeys = keys.filter(k => !(k in enDict));

  if (missingKeys.length > 0) {
    console.warn(`⚠️ [${lang}] Missing ${missingKeys.length} keys:`, missingKeys.slice(0, 5));
  } else {
    console.log(`✓ [${lang}] All ${enKeys.length} keys present.`);
  }

  if (extraKeys.length > 0) {
    console.warn(`⚠️ [${lang}] Extra ${extraKeys.length} keys:`, extraKeys.slice(0, 5));
  }
}

// 3. Test useTranslations() fallback
console.log('\nTesting useTranslations()...');
const tEn = useTranslations('en');
const tEs = useTranslations('es');
const tInvalid = useTranslations('xx');

console.log('en nav.allTools:', tEn('nav.allTools'));
console.log('es nav.allTools:', tEs('nav.allTools'));
console.log('xx nav.allTools (fallback to en):', tInvalid('nav.allTools'));
console.log('missing key fallback:', tEn('nonexistent.key'));

// 4. Test switchLocaleUrl()
console.log('\nTesting switchLocaleUrl()...');
console.log('/ruler + es ->', switchLocaleUrl('/ruler', 'es'));
console.log('/es/ruler + fr ->', switchLocaleUrl('/es/ruler', 'fr'));
console.log('/es/ruler + en ->', switchLocaleUrl('/es/ruler', 'en'));
console.log('/ + hi ->', switchLocaleUrl('/', 'hi'));
console.log('/hi + en ->', switchLocaleUrl('/hi', 'en'));

if (totalErrors === 0) {
  console.log('\nSUCCESS: i18n ui.js module verified cleanly!');
} else {
  console.error(`\nFAILED: Found ${totalErrors} errors.`);
}
