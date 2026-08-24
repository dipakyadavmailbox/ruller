import { UI, t } from '../src/i18n/ui.js'
import { LOCALE_CODES } from '../src/i18n/config.js'
const en = Object.keys(UI.en)
let bad = 0
for (const code of LOCALE_CODES) {
  if (!UI[code]) { console.log('MISSING LOCALE', code); bad++; continue }
  const keys = Object.keys(UI[code])
  const missing = en.filter(k => !keys.includes(k))
  const extra = keys.filter(k => !en.includes(k))
  if (missing.length || extra.length) { console.log(code, 'missing:', missing, 'extra:', extra); bad++ }
}
console.log(bad === 0 ? 'ALL ' + LOCALE_CODES.length + ' LOCALES COMPLETE (' + en.length + ' keys each)' : 'PROBLEMS: ' + bad)
console.log('interp:', t('de','banner.suggest',{language:'Deutsch'}))
