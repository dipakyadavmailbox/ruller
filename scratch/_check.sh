set -e
for f in dist/pdf-tools/index.html dist/ruler/index.html dist/ja/ruler/index.html dist/kg-to-lbs/index.html dist/es/index.html; do
  alt=$(grep -o 'rel="alternate"' "$f" | wc -l)
  ads=$(grep -o 'adsbygoogle.js' "$f" | wc -l)
  ins=$(grep -o 'class="adsbygoogle"' "$f" | wc -l)
  con=$(grep -o "consent', 'default'" "$f" | wc -l)
  can=$(grep -o 'rel="canonical" href="[^"]*"' "$f")
  printf '%-32s hreflang=%-3s adsScript=%-2s ins=%-2s consent=%-2s %s\n' "$f" "$alt" "$ads" "$ins" "$con" "$can"
done
