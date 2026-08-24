// DE — German content for the core translated pages. Mirrors the key shape
// of ./en.js exactly; validate.js fails the build on any drift.

export default {
  home: {
    title: 'Kostenlose Online-Tools — Lineale, Umrechner und Rechner',
    description: 'Eine Sammlung kostenloser Browser-Tools: kalibriertes Bildschirmlineal, Einheiten- und Formatumrechner, PDF-Werkzeuge und Gesundheitsrechner. Nichts wird hochgeladen.',
    keywords: 'kostenlose online tools, einheitenrechner, bildschirmlineal, pdf tools, qr code generator, kalorienrechner',
    h1: 'Kostenlose Tools, die vollständig im Browser laufen',
    intro: 'Fünfzehn Präzisionswerkzeuge für Design, Entwicklung und den Alltag. Jede Berechnung läuft auf Ihrem eigenen Gerät — ohne Konto, ohne Upload, ohne Warten auf einen Server.',
    bullets: [
      'Nichts, was Sie eingeben oder ablegen, verlässt Ihr Gerät',
      'Funktioniert offline, sobald die Seite geladen ist',
      'Keine Anmeldung, keine Wasserzeichen, keine Dateilimits',
    ],
    bodyHeading: 'Ein Werkzeugkasten statt fünfzehn Tabs',
    body: 'Die meisten kostenlosen Web-Tools laden Ihre Datei auf einen Server, versehen das Ergebnis mit einem Wasserzeichen und begrenzen die Nutzung. Diese nicht. Jedes Tool ist ein kleines clientseitiges Programm: Der Browser rechnet, die Datei bleibt, wo sie ist, und das Ergebnis erscheint sofort.',
    faq: [
      { q: 'Sind diese Tools wirklich kostenlos?', a: 'Ja. Alle Tools sind kostenlos, ohne Konto, ohne Testphase und ohne Dateilimits. Finanziert wird die Seite über Werbung, weshalb Sie klar gekennzeichnete Anzeigenflächen zwischen den Abschnitten sehen.' },
      { q: 'Werden meine Dateien irgendwohin hochgeladen?', a: 'Nein. Bildgrößen ändern, PDFs zusammenführen, Daten konvertieren und sämtliche Rechner laufen im Browser-Tab. Die Datei ist nie Teil einer Netzwerkanfrage.' },
      { q: 'Funktionieren die Tools auf dem Handy?', a: 'Ja. Alle Tools sind responsiv und touchtauglich, auch das Bildschirmlineal, das sich auf dem Handy mit einer Bankkarte kalibrieren lässt.' },
    ],
  },

  ruler: {
    title: 'Bildschirmlineal online — echte Größe, 1:1 kalibriert',
    description: 'Ein Lineal in Originalgröße am Bildschirm, mit einer Bankkarte auf Ihren Monitor kalibriert. Messen Sie Millimeter, Zentimeter und Zoll im echten 1:1-Maßstab.',
    keywords: 'lineal online, lineal echte größe, bildschirmlineal, mm lineal, cm lineal online, zoll lineal, kalibriertes lineal',
    h1: 'Messen Sie alles auf Ihrem Bildschirm',
    intro: 'Lineale am Rand des Sichtfensters im echten Millimeter- und Zollmaßstab. Einmal mit einer Bankkarte kalibrieren, und der Maßstab bleibt physisch korrekt — auch beim Zoomen.',
    bullets: [
      'Kalibriert mit einer ISO-7810-Standardkarte, 85,60 mm breit',
      'Bleibt korrekt beim Zoomen oder beim Wechsel des Bildschirms',
      'Kein Kamerazugriff, keine Bildschirmaufnahme, kein Upload',
    ],
    bodyHeading: 'Warum die meisten Bildschirmlineale falsch messen',
    body: 'Ein typisches Web-Lineal unterstellt jedem Bildschirm 96 DPI. Reale Displays liegen zwischen 96 und über 300 DPI, ein unkalibriertes Lineal kann sich also um den Faktor drei irren. Eine Karte an den Bildschirm halten und die Kontur angleichen verrät dem Tool Ihre exakte Pixeldichte.',
    faq: [
      { q: 'Wie kalibriere ich das Lineal auf die echte Größe?', a: 'Öffnen Sie das Kalibrierfeld und halten Sie eine beliebige Kredit-, EC- oder Ausweiskarte an den Bildschirm. Ziehen Sie den Regler, bis die Kontur exakt Ihrer physischen Karte entspricht.' },
      { q: 'Bleibt es beim Zoomen genau?', a: 'Ja. Das Lineal reagiert auf Änderungen von Zoomstufe und Gerätepixelverhältnis und berechnet den Strichabstand neu, sodass ein Zentimeter ein Zentimeter bleibt.' },
      { q: 'Kann ich es auf Handy oder Tablet nutzen?', a: 'Ja. Die Kalibrierung funktioniert auf iPhone, iPad und Android gleich. Einmal pro Gerät kalibrieren, die Einstellung wird lokal gespeichert.' },
    ],
  },

  aspectRatio: {
    title: 'Seitenverhältnis- und Zuschnittrechner',
    description: 'Berechnen Sie passende Breite und Höhe für jedes Seitenverhältnis — 16:9, 9:16, 4:5, 1:1, 21:9 — oder den größten zentrierten Ausschnitt für Ihr Bild.',
    keywords: 'seitenverhältnis rechner, 16:9 rechner, zuschnitt rechner, bildproportion, auflösungsrechner',
    h1: 'Seitenverhältnis- und Zuschnittrechner',
    intro: 'Geben Sie eine Kantenlänge ein und erhalten Sie die andere für jedes Verhältnis, oder fügen Sie Ihre Bildgröße ein und bekommen Sie den exakten zentrierten Ausschnitt.',
    bullets: [
      'Alle gängigen Verhältnisse für Social Media, Video und Druck eingebaut',
      'Der Zuschnittmodus liefert auch den Versatz, nicht nur die Größe',
      'Ergebnisse aktualisieren sich beim Tippen, ohne Rundungsüberraschungen',
    ],
    bodyHeading: 'Verhältnisse, die Plattformen tatsächlich verwenden',
    body: 'Hochformatvideo auf TikTok, Reels und Shorts ist 9:16 bei 1080×1920. Instagram-Feed-Beiträge sind 1:1 oder 4:5. YouTube ist 16:9, Kino 21:9, und die meisten Kameras fotografieren in 3:2. Das richtige Verhältnis vor dem Export zu wählen verhindert den automatischen Beschnitt der Plattformen.',
    faq: [
      { q: 'Was ist ein Seitenverhältnis?', a: 'Das Verhältnis von Breite zu Höhe, geschrieben als Breite:Höhe. Ein 16:9-Bild ist 16 Einheiten breit auf 9 Einheiten Höhe, unabhängig von der Pixelzahl.' },
      { q: 'Wie finde ich die fehlende Kantenlänge?', a: 'Multiplizieren Sie die bekannte Seite mit dem Verhältnisbruch. Bei 16:9 ist die Höhe gleich der Breite mal 9 geteilt durch 16.' },
      { q: 'Was ist der Unterschied zwischen Einpassen und Zuschneiden?', a: 'Einpassen skaliert das gesamte Bild und kann Balken hinzufügen. Zuschneiden entfernt Pixel, um das Verhältnis ohne jede Verzerrung zu erreichen.' },
    ],
  },

  dpi: {
    title: 'DPI-/PPI-Rechner für Druckgrößen',
    description: 'Rechnen Sie Pixel in Druckgröße um und zurück. Finden Sie den größten scharfen Druck oder die nötige Pixelzahl für eine Zielgröße bei 300 DPI.',
    keywords: 'dpi rechner, ppi rechner, druckgröße berechnen, pixel in zentimeter, 300 dpi, bildauflösung',
    h1: 'DPI-/PPI-Rechner für Druckgrößen',
    intro: 'Wechseln Sie in beide Richtungen zwischen Pixeln und physischer Druckgröße bei jeder Auflösung und sehen Sie sofort, ob ein Bild für die gewünschte Größe scharf genug ist.',
    bullets: [
      'Von Pixeln zur Druckgröße und von der Größe zur nötigen Pixelzahl',
      'Qualitätshinweise bei 72, 150, 300 und 600 DPI',
      'Funktioniert in Zoll, Zentimetern und Millimetern',
    ],
    bodyHeading: 'Wie viel Auflösung ein Druck wirklich braucht',
    body: '300 DPI ist der Standard für alles, was in der Hand gehalten wird: Fotoabzüge, Zeitschriften, Visitenkarten. Ein Poster aus einem Meter Entfernung genügt mit 150 DPI, eine Plakatwand funktioniert mit 30. Pixelbreite geteilt durch Ziel-DPI ergibt die Druckbreite in Zoll.',
    faq: [
      { q: 'Was ist der Unterschied zwischen DPI und PPI?', a: 'PPI zählt Pixel pro Zoll in einem digitalen Bild, DPI zählt Tintenpunkte pro Zoll, die ein Drucker setzt. Beim Dimensionieren von Bildern werden beide im Alltag synonym verwendet.' },
      { q: 'Sind 300 DPI immer nötig?', a: 'Nein. Das ist der Standard für Nahbetrachtung. Großformate, die aus Distanz betrachtet werden, bleiben bei deutlich geringerer Auflösung scharf.' },
      { q: 'Kann ich die DPI erhöhen, um die Qualität zu verbessern?', a: 'Nur die DPI-Zahl zu ändern verändert lediglich die Druckgröße. Echte Details erfordern mehr Pixel, was Hochskalieren nur annähern kann.' },
    ],
  },

  imageResizer: {
    title: 'Bildkompressor und Größenänderung',
    description: 'Ändern Sie Größe und Kompression von JPG-, PNG- und WebP-Bildern im Browser. Ergebnis prüfen, Dateigrößen vergleichen, herunterladen — ohne Upload.',
    keywords: 'bild verkleinern, bild komprimieren, foto größe ändern, jpg kompressor, in webp umwandeln',
    h1: 'Bildkompressor und Größenänderung',
    intro: 'Bild ablegen, Zielgröße oder Qualität festlegen, Ergebnis herunterladen. Ihr eigener Browser dekodiert und kodiert die Datei neu — sie verlässt das Gerät nie.',
    bullets: [
      'JPG, PNG und WebP ein und aus, mit Live-Größenvergleich',
      'Skalierung nach Pixeln oder Prozent, Seitenverhältnis gesperrt',
      'Stapeltauglich, ohne Limit pro Datei oder pro Tag',
    ],
    bodyHeading: 'Kleinere Dateien ohne sichtbaren Verlust',
    body: 'Die meisten Fotos tragen weit mehr Daten, als die anzeigende Seite braucht. Ein 4000 Pixel breites Foto auf die tatsächlich genutzten 1600 Pixel zu bringen und mit 80 % Qualität neu zu kodieren, entfernt regelmäßig 90 % der Dateigröße, ohne dass das Auge einen Unterschied sieht.',
    faq: [
      { q: 'Wird mein Foto auf einen Server geladen?', a: 'Nein. Das Bild wird über die Datei-API des Browsers gelesen und auf einem Canvas in der Seite verarbeitet. Keine Netzwerkanfrage transportiert Ihr Bild.' },
      { q: 'Welches Format soll ich wählen?', a: 'WebP ist bei gleicher Qualität am kleinsten und wird überall unterstützt. JPG bietet maximale Kompatibilität, PNG brauchen Sie für Transparenz oder scharfe Flächengrafiken.' },
      { q: 'Entfernt die Größenänderung EXIF-Daten?', a: 'Ja. Beim Neukodieren gehen die ursprünglichen Metadaten verloren, einschließlich GPS-Koordinaten und Kameradaten — vor der Veröffentlichung meist genau das, was man will.' },
    ],
  },

  colorTools: {
    title: 'Farbwähler und Palettengenerator',
    description: 'Wählen Sie eine Farbe und lesen Sie sie als HEX, RGB, HSL oder HSV. Erzeugen Sie komplementäre, analoge und triadische Paletten und exportieren Sie sie als CSS, Tailwind oder JSON.',
    keywords: 'farbwähler, hex zu rgb, palettengenerator, hsl umrechner, farbschema generator, tailwind farben',
    h1: 'Farbwähler und Palettengenerator',
    intro: 'Lesen Sie jede Farbe gleichzeitig in allen Notationen, bauen Sie eine harmonische Palette darum und kopieren Sie alles im Format Ihres Projekts.',
    bullets: [
      'HEX, RGB, HSL und HSV bleiben beim Ziehen synchron',
      'Komplementäre, analoge, triadische und tetradische Schemata',
      'Export per Klick als CSS-Variablen, Tailwind-Konfiguration oder JSON',
    ],
    bodyHeading: 'Paletten auf Basis der Farblehre',
    body: 'Harmonische Schemata entstehen aus festen Beziehungen im Farbkreis. Komplementärpaare liegen sich für maximalen Kontrast gegenüber, analoge Sets liegen nebeneinander und wirken ruhig, triadische Sets sind gleichmäßig verteilt und bleiben kräftig, ohne aus der Balance zu geraten.',
    faq: [
      { q: 'Was bedeutet der HEX-Code?', a: 'Drei Paare hexadezimaler Ziffern für Rot, Grün und Blau, jeweils von 00 bis FF. #FF0000 ist volles Rot ohne Grün und Blau.' },
      { q: 'Wann sollte ich HSL statt HEX nutzen?', a: 'HSL trennt Farbton, Sättigung und Helligkeit. Eine Abstufung zu bauen heißt dann, eine Zahl zu ändern, statt neue Hex-Werte zu raten.' },
      { q: 'Sind die exportierten Paletten barrierefrei?', a: 'Der Generator zeigt Kontrastverhältnisse, sodass Sie jedes Paar gegen den WCAG-AA-Schwellenwert von 4,5:1 für Fließtext prüfen können, bevor Sie es einsetzen.' },
    ],
  },

  password: {
    title: 'Passwortstärke prüfen und Passwörter erzeugen',
    description: 'Sehen Sie, wie stark ein Passwort wirklich ist und wie lange ein moderner Rechner zum Knacken bräuchte. Die Prüfung läuft vollständig im Browser.',
    keywords: 'passwortstärke prüfen, passwort generator, sicheres passwort, knackzeit, entropie',
    h1: 'Passwortstärke-Prüfer',
    intro: 'Geben Sie ein Passwort ein und erhalten Sie eine ehrliche Entropieschätzung, eine realistische Knackzeit und die konkreten Schwächen, die es erratbar machen.',
    bullets: [
      'Entropie- und Knackzeitschätzung gegen aktuelle GPU-Geschwindigkeiten',
      'Erkennt Wörterbuchwörter, Tastaturreihen und übliche Zeichenersetzungen',
      'Es wird nichts gesendet — die Prüfung läuft in der Seite',
    ],
    bodyHeading: 'Länge schlägt Komplexität',
    body: 'Ein @ statt eines a bringt fast nichts, weil Knackwerkzeuge genau diese Ersetzungen zuerst durchprobieren. Zusätzliche Zeichen dagegen vervielfachen den Suchraum. Vier zusammenhanglose Wörter sind leichter zu merken und weit schwerer zu knacken als eine kurze Zeichenfolge aus Sonderzeichen.',
    faq: [
      { q: 'Ist es sicher, hier mein echtes Passwort einzugeben?', a: 'Die Prüfung läuft vollständig im Browser und kein Tastendruck geht über das Netz. Trotzdem ist es die sicherste Gewohnheit, ein Passwort gleicher Länge und Struktur zu testen statt des echten.' },
      { q: 'Was macht ein Passwort stark?', a: 'Zuerst die Länge: mindestens 16 Zeichen. Eine Passphrase aus vier oder fünf zusammenhanglosen Wörtern schlägt eine kurze komplexe Zeichenkette sowohl in Merkbarkeit als auch in Stärke.' },
      { q: 'Wie wird die Knackzeit berechnet?', a: 'Aus der geschätzten Entropie in Bit gegen die Hash-Rate aktueller Consumer-GPUs, unter der Annahme eines Offline-Angriffs auf eine geleakte Datenbank.' },
    ],
  },

  calorie: {
    title: 'Kalorienrechner — Grundumsatz, Gesamtumsatz und Makros',
    description: 'Berechnen Sie Grund- und Gesamtumsatz mit der Mifflin-St-Jeor-Formel, erhalten Sie eine Makroverteilung für Ihr Ziel und protokollieren Sie Mahlzeiten.',
    keywords: 'kalorienrechner, grundumsatz berechnen, gesamtumsatz, makrorechner, täglicher kalorienbedarf',
    h1: 'Kalorienrechner und Ernährungstagebuch',
    intro: 'Ermitteln Sie, was Ihr Körper in Ruhe und an einem normalen Tag verbrennt, setzen Sie ein Ziel zum Abnehmen, Halten oder Zunehmen und tragen Sie Mahlzeiten dagegen ein.',
    bullets: [
      'Grundumsatz nach Mifflin-St Jeor, der klinisch verwendeten Formel',
      'Aktivitätsfaktoren von sitzend bis leistungssportlich',
      'Verteilung von Eiweiß, Kohlenhydraten und Fett passend zum Ziel',
    ],
    bodyHeading: 'Grundumsatz, Gesamtumsatz und die Lücke dazwischen',
    body: 'Der Grundumsatz ist das, was Sie verbrauchen würden, wenn Sie den ganzen Tag liegen. Der Gesamtumsatz multipliziert ihn mit einem Aktivitätsfaktor für Bewegung, Sport und Verdauung. Dauerhaft unter dem Gesamtumsatz zu essen reduziert Gewicht; ein Defizit von rund 500 kcal täglich entspricht etwa einem halben Kilo pro Woche.',
    faq: [
      { q: 'Wie genau ist die Schätzung?', a: 'Mifflin-St Jeor trifft bei den meisten Menschen auf etwa 10 % genau. Der Stoffwechsel ist individuell: Nehmen Sie den Wert als Ausgangspunkt und korrigieren Sie nach zwei Wochen echter Ergebnisse.' },
      { q: 'Wie groß darf das Defizit sein?', a: 'Üblich sind 15 bis 25 % unter dem Gesamtumsatz. Sehr aggressive Defizite kosten Muskelmasse und sind schwer durchzuhalten. Sprechen Sie vor drastischen Änderungen mit einer Ärztin oder einem Arzt.' },
      { q: 'Wird mein Ernährungstagebuch auf einem Server gespeichert?', a: 'Nein. Einträge liegen im lokalen Speicher Ihres Browsers und verlassen das Gerät nie. Das Löschen der Seitendaten löscht das Tagebuch.' },
    ],
  },

  pregnancy: {
    title: 'Schwangerschaftsrechner — Geburtstermin und Eisprung',
    description: 'Schätzen Sie den Geburtstermin aus der letzten Periode, dem Zeugungsdatum oder einem IVF-Transfer und sehen Sie Schwangerschaftswoche, Trimester und fruchtbare Tage.',
    keywords: 'geburtsterminrechner, schwangerschaftsrechner, eisprungrechner, fruchtbare tage, schwangerschaftswoche',
    h1: 'Schwangerschaftsrechner — Geburtstermin und Eisprung',
    intro: 'Geben Sie Ihre letzte Periode, ein bekanntes Zeugungsdatum oder das Datum eines IVF-Transfers ein und erhalten Sie den voraussichtlichen Geburtstermin, die aktuelle Schwangerschaftswoche und das Trimester.',
    bullets: [
      'Datierung nach Naegele ab letzter Periode, Zeugung oder IVF-Transfer',
      'Berücksichtigt Zykluslängen abseits von 28 Tagen',
      'Schätzung von Eisprung und fruchtbarem Fenster zur Planung',
    ],
    bodyHeading: 'Wie Geburtstermine berechnet werden',
    body: 'Die Standardschätzung addiert 280 Tage auf den ersten Tag der letzten Periode und unterstellt damit einen 28-Tage-Zyklus mit Eisprung an Tag 14. Längere oder kürzere Zyklen verschieben das Datum, weshalb der Rechner nach Ihrer Zykluslänge fragt, statt sie anzunehmen.',
    faq: [
      { q: 'Wie zuverlässig ist ein errechneter Geburtstermin?', a: 'Nur etwa 4 % der Kinder kommen am errechneten Tag zur Welt. Rund 80 % werden in den zwei Wochen davor oder danach geboren — deshalb heißt es Schätzung.' },
      { q: 'Was, wenn mein Zyklus nicht 28 Tage dauert?', a: 'Tragen Sie Ihre tatsächliche durchschnittliche Zykluslänge ein. Der Rechner verschiebt die Eisprungannahme entsprechend, statt das Standardmodell mit 14 Tagen zu erzwingen.' },
      { q: 'Ersetzt das eine Ultraschalluntersuchung?', a: 'Nein. Der Ultraschall im ersten Trimester ist die genaueste Datierungsmethode. Dieses Tool dient der Information und Planung, nicht als medizinischer Rat.' },
    ],
  },

  regex: {
    title: 'Regex-Tester mit Live-Hervorhebung',
    description: 'Testen Sie reguläre Ausdrücke an eigenem Text mit Live-Hervorhebung, Capture-Gruppen, Ersetzungsvorschau und eingebautem Syntax-Spickzettel.',
    keywords: 'regex tester, regulärer ausdruck testen, regex online, regex spickzettel, javascript regex',
    h1: 'Regex-Tester und Spickzettel',
    intro: 'Schreiben Sie ein Muster und sehen Sie jeden Treffer beim Tippen hervorgehoben, mit aufgeschlüsselten Capture-Gruppen und einer Ersetzungsvorschau daneben.',
    bullets: [
      'Live-Hervorhebung mit benannten und nummerierten Capture-Gruppen',
      'Alle JavaScript-Flags, einschließlich sticky und unicode',
      'Spickzettel-Panel für die Syntax, die man sich nie merkt',
    ],
    bodyHeading: 'Ein Muster bauen, das hält',
    body: 'Beginnen Sie mit einer echten Stichprobe des Texts, den Sie treffen müssen, nicht mit einer idealisierten Fassung. Fügen Sie eine Einschränkung nach der anderen hinzu und beobachten Sie, wie sich die Hervorhebung verengt. Anker und explizite Zeichenklassen schlagen fast immer ein gieriges Punkt-Stern, das beim ersten Beispiel zufällig funktioniert.',
    faq: [
      { q: 'Welcher Regex-Dialekt ist das?', a: 'JavaScript (ECMAScript), die in Ihrem Browser eingebaute Engine. Der Großteil der Syntax gilt auch für PCRE, aber Lookbehind und einige Unicode-Property-Escapes unterscheiden sich.' },
      { q: 'Was ändert das g-Flag?', a: 'Ohne es stoppt die Engine beim ersten Treffer. Mit ihm werden alle Treffer im Text gefunden — genau das zeigt die Hervorhebung.' },
      { q: 'Wird mein Testtext irgendwohin gesendet?', a: 'Nein. Ihr eigener Browser kompiliert und führt das Muster aus. Nichts wird protokolliert oder übertragen.' },
    ],
  },

  cron: {
    title: 'Cron-Ausdruck-Generator und Validator',
    description: 'Erstellen und prüfen Sie Cron-Ausdrücke mit einer Erklärung in Klartext und einer Vorschau der nächsten Ausführungszeiten. Unterstützt 5- und 6-Feld-Syntax.',
    keywords: 'cron generator, crontab generator, cron validator, cron zeitplan, nächste ausführung',
    h1: 'Cron-Ausdruck-Generator und Validator',
    intro: 'Bauen Sie einen Zeitplan Feld für Feld oder fügen Sie einen bestehenden Ausdruck ein und erhalten Sie eine lesbare Beschreibung samt der nächsten Ausführungszeiten.',
    bullets: [
      'Klartextbeschreibung jedes beliebigen Ausdrucks',
      'Vorschau der nächsten Läufe in Ihrer eigenen Zeitzone',
      'Beherrscht Bereiche, Schritte, Listen und die 6-Feld-Variante mit Sekunden',
    ],
    bodyHeading: 'Die fünf Felder lesen',
    body: 'Eine Cron-Zeile lautet Minute, Stunde, Tag des Monats, Monat, Wochentag — in dieser Reihenfolge. Ein Sternchen bedeutet jeden Wert, */5 jeden fünften und 1-5 einen Bereich. Die klassische Falle: Tag des Monats und Wochentag werden mit ODER verknüpft, nicht mit UND.',
    faq: [
      { q: 'Was bedeutet */5 * * * *?', a: 'Alle fünf Minuten, in jeder Stunde, an jedem Tag. Der Schrittoperator gilt für das Feld, in dem er steht.' },
      { q: 'Welche Zeitzone verwendet Cron?', a: 'System-Cron nutzt die Serverzeitzone. Diese Vorschau nutzt die Ihres Browsers — prüfen Sie die Servereinstellung, bevor Sie sich auf die Zeiten verlassen.' },
      { q: 'Warum lief mein Wochentagsplan am falschen Tag?', a: 'Wenn Tag des Monats und Wochentag beide eingeschränkt sind, läuft Cron bei einer der beiden Übereinstimmungen, nicht bei beiden. Lassen Sie eines als Sternchen, um das erwartete Verhalten zu bekommen.' },
    ],
  },

  dataConverter: {
    title: 'JSON-, CSV- und YAML-Konverter',
    description: 'Konvertieren Sie sofort zwischen JSON, CSV und YAML im Browser, mit Validierung, Formatierung sowie Base64- und JWT-Dekodierung.',
    keywords: 'json zu csv, csv zu json, yaml konverter, json formatter, base64 decoder, jwt decoder',
    h1: 'JSON- ⇄ CSV- ⇄ YAML-Konverter',
    intro: 'Fügen Sie Daten in einem der drei Formate ein und erhalten Sie sie in einem der anderen zurück, geprüft und formatiert, ohne dass ein einziges Byte den Browser verlässt.',
    bullets: [
      'Hin und zurück zwischen JSON, CSV und YAML mit Typerkennung',
      'Fehler zeigen auf die exakte Zeile und Spalte',
      'Base64-, URL- und JWT-Dekodierung eingebaut',
    ],
    bodyHeading: 'Worin sich die drei Formate unterscheiden',
    body: 'JSON ist streng und überall parsebar. YAML nutzt dasselbe Datenmodell mit Einrückung statt Klammern, was angenehm zu schreiben und leicht kaputtzumachen ist. CSV ist flach, verschachtelte Objekte müssen beim Export also in Spaltennamen mit Punkten aufgelöst werden.',
    faq: [
      { q: 'Werden meine Daten hochgeladen?', a: 'Nein. Parsen und Konvertieren laufen in Ihrem Browser. Nichts wird protokolliert, gespeichert oder übertragen — damit ist das Tool auch für Konfigurationsdateien mit Geheimnissen sicher.' },
      { q: 'Wie wird verschachteltes JSON in CSV behandelt?', a: 'Verschachtelte Schlüssel werden zu Spaltenüberschriften mit Punkten wie benutzer.adresse.stadt aufgelöst, sodass keine Information verloren geht.' },
      { q: 'Prüft der JWT-Decoder die Signatur?', a: 'Nein. Er dekodiert Header und Payload zur Ansicht. Die Prüfung braucht den Signaturschlüssel und gehört auf Ihren Server.' },
    ],
  },

  qr: {
    title: 'QR-Code-Generator — WLAN, vCard und URL',
    description: 'Erstellen Sie QR-Codes für Links, WLAN-Netze, vCard-Kontakte, E-Mail und Text. Farben und Fehlerkorrektur anpassen, dann als PNG oder SVG herunterladen.',
    keywords: 'qr code generator, wlan qr code, vcard qr code, qr code kostenlos, qr png svg',
    h1: 'QR-Code-Generator',
    intro: 'Erzeugen Sie einen QR-Code für einen Link, ein WLAN, eine Kontaktkarte, eine E-Mail oder reinen Text und laden Sie ihn als hochauflösendes PNG oder skalierbares SVG herunter.',
    bullets: [
      'Inhalte für WLAN, vCard, E-Mail, SMS und URL',
      'Eigene Farben und vier Stufen der Fehlerkorrektur',
      'PNG für den Druck, SVG für unbegrenzte Skalierung',
    ],
    bodyHeading: 'Codes, die auf Papier noch scannen',
    body: 'Halten Sie den Kontrast zwischen Muster und Hintergrund hoch, lassen Sie die Ruhezone frei und wählen Sie Fehlerkorrekturstufe H, wenn der Code ein Logo tragen soll oder Abnutzung ausgesetzt ist. Kürzere Inhalte ergeben dünnere Muster, die auch klein zuverlässig scannen.',
    faq: [
      { q: 'Laufen diese QR-Codes ab?', a: 'Nein. Der Code entsteht in Ihrem Browser und kodiert Ihre Daten direkt. Es gibt keinen Weiterleitungsdienst dazwischen, der abgeschaltet werden könnte.' },
      { q: 'Was ist Fehlerkorrektur?', a: 'Redundante Daten, mit denen ein beschädigter Code noch lesbar bleibt. Stufe L verträgt rund 7 % Schaden, Stufe H rund 30 % — auf Kosten eines dichteren Musters.' },
      { q: 'Ist ein WLAN-QR-Code zum Ausdrucken sicher?', a: 'Er enthält das Netzwerkpasswort im Klartext: Wer ihn abfotografiert, kommt ins WLAN. Nutzen Sie ihn für ein Gastnetz statt für das Hauptnetz.' },
    ],
  },

  pdf: {
    title: 'PDF-Tools — zusammenführen, teilen und konvertieren',
    description: 'Führen Sie mehrere PDFs zusammen, teilen Sie ein PDF in Einzelseiten oder erstellen Sie ein PDF aus Bildern. Alles läuft im Browser, ohne Upload und ohne Wasserzeichen.',
    keywords: 'pdf zusammenführen, pdf teilen, bild in pdf, pdf tools online, pdf kombinieren kostenlos',
    h1: 'PDF-Konverter, -Zusammenführung und -Teilung',
    intro: 'Dokumente kombinieren, Seiten herauslösen oder ein PDF aus Bildern bauen. Die Datei wird in Ihrem Browser gelesen und neu geschrieben — nichts wird hochgeladen, nichts gestempelt.',
    bullets: [
      'Zusammenführen mit Neuanordnung per Drag-and-drop, Teilen nach Seite oder Bereich',
      'Bilder zu PDF mit Kontrolle über Seitengröße und Ausrichtung',
      'Keine Wasserzeichen, keine Größenbegrenzung, kein Tageslimit',
    ],
    bodyHeading: 'Warum lokale PDF-Verarbeitung zählt',
    body: 'Verträge, Arztbriefe und Kontoauszüge sind genau die Dokumente, die Menschen in kostenlose Online-Konverter einfügen. Lokale Verarbeitung bedeutet: Das Dokument liegt nie auf einem fremden Server, kommt nie in eine Verarbeitungswarteschlange und unterliegt nie einer Aufbewahrungsrichtlinie, die Sie nicht gelesen haben.',
    faq: [
      { q: 'Gibt es eine Dateigrößenbegrenzung?', a: 'Nur den Arbeitsspeicher Ihres Geräts. Da es keinen Upload gibt, liegt die praktische Grenze weit über den 10 bis 20 MB, die die meisten Online-Konverter zulassen.' },
      { q: 'Bekommt das Ergebnis ein Wasserzeichen?', a: 'Nein. Das Tool schreibt ein sauberes PDF ganz ohne Branding.' },
      { q: 'Kann es ein passwortgeschütztes PDF öffnen?', a: 'Verschlüsselte PDFs müssen zuerst entsperrt werden. Entfernen Sie das Passwort in Ihrem PDF-Reader und laden Sie die Datei dann hier.' },
    ],
  },

  unitConverter: {
    title: 'Einheitenrechner — Länge, Gewicht und Temperatur',
    description: 'Rechnen Sie zwischen über 80 Einheiten aus Länge, Gewicht, Temperatur, Fläche, Volumen, Geschwindigkeit, Daten, Energie und Druck um, formatiert für Ihre Sprache.',
    keywords: 'einheitenrechner, maßeinheiten umrechnen, kg in pfund, cm in zoll, celsius in fahrenheit, umrechner',
    h1: 'Einheitenrechner',
    intro: 'Zehn Kategorien und über achtzig Einheiten, umgerechnet beim Tippen, mit Zahlen gruppiert und interpunktiert, wie Ihre Sprache sie schreibt.',
    bullets: [
      'Länge, Gewicht, Temperatur, Fläche, Volumen, Geschwindigkeit, Zeit, Daten, Energie, Druck',
      'Metrisch und imperial nebeneinander, bei voller Genauigkeit',
      'Ergebnisse im Format Ihrer Sprache, also 1.234,5 oder 1,234.5 je nach Bedarf',
    ],
    bodyHeading: 'Genauigkeit, die den Hin- und Rückweg übersteht',
    body: 'Umrechnungen laufen über exakte statt gerundete Faktoren, sodass ein Wechsel in eine andere Einheit und zurück wieder die Ausgangszahl liefert. Temperatur wird als affine Umrechnung behandelt und nicht als einfache Multiplikation — genau daran scheitern die meisten schnellen Umrechner.',
    faq: [
      { q: 'Wie viele Nachkommastellen bleiben erhalten?', a: 'Intern die volle doppelte Genauigkeit, mit sinnvoller Rundung für die Anzeige. Der exakte Wert steht zum Kopieren bereit.' },
      { q: 'Warum zeigt meine Sprache das Komma als Dezimaltrennzeichen?', a: 'Weil Ihre Sprache Zahlen so schreibt. Deutsch schreibt 1.234,5, wo Englisch 1,234.5 schreibt. Das Tool folgt der Sprache der Seite.' },
      { q: 'Sind US-Gallone und imperiale Gallone gleich?', a: 'Nein, und der Unterschied ist groß. Eine US-Gallone sind 3,785 Liter, eine imperiale 4,546. Beide sind getrennt aufgeführt.' },
    ],
  },

  about: {
    title: 'Über Rocking Tools',
    description: 'Wer Rocking Tools baut, warum jedes Werkzeug clientseitig läuft und wie eine kostenlose, werbefinanzierte Tool-Seite durch ihr Design privat bleibt.',
    keywords: 'über rocking tools, datenschutzfreundliche tools, clientseitige web tools',
    h1: 'Über Rocking Tools',
    intro: 'Eine kleine Sammlung von Browser-Werkzeugen, gebaut auf einer einzigen Regel: Die Arbeit passiert auf Ihrem Gerät, nicht auf unserem.',
    bullets: [
      'Jedes Tool ist clientseitig — es gibt keinen Upload-Endpunkt, der lecken könnte',
      'Kostenlos nutzbar, finanziert durch klar gekennzeichnete Werbung',
      'Offen darüber, was wir erheben, und das ist sehr wenig',
    ],
    bodyHeading: 'Warum clientseitig',
    body: 'Das übliche Geschäftsmodell kostenloser Tools besteht darin, Ihre Datei entgegenzunehmen, sie auf einem Server zu verarbeiten und lange genug zu behalten, um für jemanden nützlich zu sein. Dieselbe Arbeit im Browser auszuführen streicht diesen Handel vollständig. Die Seite lädt, der Code läuft lokal, und Ihre Daten haben keinen Ort, an den sie gehen könnten.',
    faq: [
      { q: 'Wie finanziert sich die Seite?', a: 'Über Werbung via Google AdSense, gezeigt in gekennzeichneten Flächen zwischen den Inhalten. Das ist das ganze Geschäftsmodell — es gibt keine Bezahlversion und nichts wird weiterverkauft.' },
      { q: 'Welche Daten erheben Sie?', a: 'Aggregierte Statistiken zu Seitenaufrufen und das, was der Werbeanbieter im Rahmen Ihrer Einwilligung erhebt. Ihre Dateien und Eingaben sind davon nie Teil.' },
      { q: 'Kann ich ein neues Tool vorschlagen?', a: 'Ja. Die Kontaktseite erreicht uns direkt, und Vorschläge beeinflussen tatsächlich, was als Nächstes gebaut wird.' },
    ],
  },

  faq: {
    title: 'Häufig gestellte Fragen',
    description: 'Antworten zu Datenschutz, Dateiverarbeitung, Genauigkeit, Offline-Nutzung, Werbung und Sprachunterstützung für alle Tools auf Rocking Tools.',
    keywords: 'rocking tools faq, datenschutz online tools, sind online tools sicher',
    h1: 'Häufig gestellte Fragen',
    intro: 'Die Fragen, die am häufigsten dazu auftauchen, wie diese Tools arbeiten, was mit Ihren Daten geschieht und was die Seite tut und was nicht.',
    bullets: [
      'Datenschutz und Dateiverarbeitung klar erklärt',
      'Wie Genauigkeit ohne Server erreicht wird',
      'Was die Anzeigen tun und wie die Einwilligung funktioniert',
    ],
    bodyHeading: 'Immer noch offen?',
    body: 'Wenn Ihre Frage unten nicht beantwortet wird, führt die Kontaktseite direkt zu einem Menschen. Fehlerberichte mit Angabe von Browser und Betriebssystem sind besonders willkommen, weil die meisten Darstellungsprobleme nur bei einer bestimmten Kombination auftreten.',
    faq: [
      { q: 'Brauche ich ein Konto?', a: 'Nein. Es gibt nirgends auf der Seite eine Anmeldung, und kein Tool ist hinter einer solchen verborgen.' },
      { q: 'Funktionieren die Tools offline?', a: 'Weitgehend ja. Sobald eine Seite geladen ist, läuft das Tool mit Code, der bereits im Browser liegt. Ein Neuladen braucht wieder das Netz.' },
      { q: 'Warum sehe ich Werbung?', a: 'Sie bezahlt Hosting und Entwicklung, damit die Tools kostenlos und ohne Limits bleiben. Anzeigenflächen sind gekennzeichnet und liegen außerhalb des Arbeitsbereichs jedes Tools.' },
      { q: 'In welchen Sprachen gibt es die Seite?', a: 'Startseite und alle Tool-Seiten erscheinen auf Englisch, Spanisch, Französisch, Deutsch, brasilianischem Portugiesisch, Hindi, Indonesisch und Japanisch. Zahlen, Währung und Datumsangaben folgen der gewählten Sprache.' },
    ],
  },
}
