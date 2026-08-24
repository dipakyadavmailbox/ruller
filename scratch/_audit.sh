fail=0
check() {
  desc="$1"; expected="$2"; actual="$3"
  if [ "$expected" = "$actual" ]; then printf '  ok   %-52s %s\n' "$desc" "$actual"
  else printf '  FAIL %-52s expected=%s actual=%s\n' "$desc" "$expected" "$actual"; fail=1; fi
}
count() { grep -o "$2" "$1" 2>/dev/null | wc -l | tr -d ' '; }

echo "== page counts =="
printf '  total html pages: %s\n' "$(find dist -name '*.html' | wc -l | tr -d ' ')"
printf '  localized pages:  %s\n' "$(find dist -name '*.html' | grep -cE '^dist/(es|fr|de|pt-br|hi|id|ja)/')"

echo "== hreflang =="
check "core EN page alternates"      9 "$(count dist/pdf-tools/index.html 'rel=\"alternate\"')"
check "core JA page alternates"      9 "$(count dist/ja/pdf-tools/index.html 'rel=\"alternate\"')"
check "long-tail page alternates"    0 "$(count dist/kg-to-lbs/index.html 'rel=\"alternate\"')"
check "x-default present"            1 "$(count dist/es/ruler/index.html 'hreflang=\"x-default\"')"

echo "== html lang/dir =="
check "de html lang"  '<html lang="de" dir="ltr">' "$(grep -o '<html[^>]*>' dist/de/index.html)"
check "hi html lang"  '<html lang="hi" dir="ltr">' "$(grep -o '<html[^>]*>' dist/hi/faq/index.html)"

echo "== adsense =="
check "ads loader on tool page"      1 "$(count dist/pdf-tools/index.html 'adsbygoogle.js')"
check "ads loader on ruler"          1 "$(count dist/ruler/index.html 'adsbygoogle.js')"
check "ads loader on localized"      1 "$(count dist/ja/pdf-tools/index.html 'adsbygoogle.js')"
check "no invalid slot=auto"         0 "$(count dist/pdf-tools/index.html 'data-ad-slot=\"auto\"')"
check "no ins while slots unset"     0 "$(count dist/pdf-tools/index.html 'class=\"adsbygoogle\"')"

echo "== consent =="
check "consent default calls"        2 "$(count dist/pdf-tools/index.html "consent', 'default'")"
check "ads_data_redaction"           1 "$(count dist/ja/index.html 'ads_data_redaction')"

echo "== indexability =="
check "privacy indexable"            0 "$(count dist/privacy/index.html 'noindex')"
check "terms indexable"              0 "$(count dist/terms/index.html 'noindex')"
check "contact indexable"            0 "$(count dist/contact/index.html 'noindex')"
check "404 still noindex"            1 "$(count dist/404.html 'noindex')"

echo "== robots / headers =="
check "robots allows privacy"        0 "$(count dist/robots.txt 'Disallow: /privacy')"
check "robots has Mediapartners"     1 "$(count dist/robots.txt 'Mediapartners-Google')"
check "_headers no global noindex"   0 "$(count dist/_headers 'X-Robots-Tag')"

echo "== language switcher =="
check "switcher links on es page"    8 "$(count dist/es/pdf-tools/index.html 'class=\"lang-item')"

exit $fail
