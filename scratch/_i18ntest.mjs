import * as f from '../src/i18n/format.js'
import { localizePath, parsePath, buildAlternates } from '../src/i18n/routing.js'
for (const l of ['en','de','ja','hi','pt-BR','id','fr','es']) {
  console.log(l.padEnd(6), f.formatCurrency(1234.5,l).padEnd(16), f.formatDate('2026-01-05',l).padEnd(18), f.datePattern(l).padEnd(12), f.formatUnit(12.5,'centimeter',l).padEnd(10), f.formatNumber(1234567.89,l))
}
console.log('rel es:', f.formatRelative(Date.now()+3*86400000,'es'))
console.log('list de:', f.formatList(['A','B','C'],'de'))
console.log('path:', localizePath('/ruler','ja'), '|', localizePath('/','pt-BR'), '|', localizePath('/ruler','en'))
console.log('parse:', JSON.stringify(parsePath('/pt-br/ruler')), JSON.stringify(parsePath('/kg-to-lbs')))
console.log('alt:', buildAlternates('/ruler','https://x.com',['en','es']).map(a=>a.hreflang+'='+a.href).join(' '))
