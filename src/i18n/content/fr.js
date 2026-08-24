// FR — French content for the core translated pages. Mirrors the key shape
// of ./en.js exactly; validate.js fails the build on any drift.

export default {
  home: {
    title: 'Outils en ligne gratuits — règles, convertisseurs et calculateurs',
    description: 'Une collection d’outils gratuits qui tournent dans le navigateur : règle d’écran calibrée, convertisseurs d’unités et de formats, utilitaires PDF et calculateurs de santé. Aucun envoi de fichier.',
    keywords: 'outils en ligne gratuits, convertisseur d’unités, règle à l’écran, outils pdf, générateur qr, calculateur de calories',
    h1: 'Des outils gratuits qui tournent entièrement dans votre navigateur',
    intro: 'Quinze utilitaires de précision pour les designers, les développeurs et les problèmes du quotidien. Tous les calculs se font sur votre appareil : pas de compte, pas d’envoi, pas d’attente serveur.',
    bullets: [
      'Rien de ce que vous saisissez ou déposez ne quitte votre machine',
      'Fonctionne hors ligne une fois la page chargée',
      'Sans inscription, sans filigrane, sans limite par fichier',
    ],
    bodyHeading: 'Une seule boîte à outils au lieu de quinze onglets',
    body: 'La plupart des outils web gratuits envoient votre fichier sur un serveur, apposent un filigrane sur le résultat et comptent le nombre d’utilisations. Pas ceux-ci. Chaque outil est un petit programme côté client : le navigateur travaille, le fichier reste où il est, et le résultat apparaît immédiatement.',
    faq: [
      { q: 'Ces outils sont-ils vraiment gratuits ?', a: 'Oui. Tous sont gratuits, sans compte, sans période d’essai et sans limite de fichiers. Le site est financé par la publicité, d’où les emplacements publicitaires clairement identifiés entre les sections.' },
      { q: 'Mes fichiers sont-ils envoyés quelque part ?', a: 'Non. Le redimensionnement d’images, la fusion de PDF, la conversion de données et tous les calculateurs s’exécutent dans l’onglet de votre navigateur. Le fichier ne fait jamais l’objet d’une requête réseau.' },
      { q: 'Les outils fonctionnent-ils sur téléphone ?', a: 'Oui. Tous sont adaptatifs et tactiles, y compris la règle d’écran, qui se calibre sur mobile avec une carte bancaire.' },
    ],
  },

  ruler: {
    title: 'Règle en ligne à l’écran — taille réelle, calibrée 1:1',
    description: 'Une règle à l’écran en taille réelle, calibrée sur votre moniteur avec une carte bancaire. Mesurez en millimètres, centimètres et pouces à l’échelle 1:1 sur n’importe quel écran.',
    keywords: 'règle en ligne, règle taille réelle, règle à l’écran, règle mm, règle cm en ligne, règle pouces, règle calibrée',
    h1: 'Mesurez n’importe quoi sur votre écran',
    intro: 'Des règles fixées au bord de la fenêtre à l’échelle réelle en millimètres et en pouces. Calibrez une fois avec une carte bancaire et l’échelle reste physiquement exacte, même en zoomant.',
    bullets: [
      'Calibrée avec une carte bancaire ISO 7810 standard de 85,60 mm de large',
      'Reste exacte au zoom ou en changeant d’écran',
      'Aucun accès caméra, aucun enregistrement d’écran, aucun envoi',
    ],
    bodyHeading: 'Pourquoi la plupart des règles à l’écran sont fausses',
    body: 'Une règle web classique suppose que chaque écran fait 96 DPI. Les écrans réels vont de 96 à plus de 300 DPI : une règle non calibrée peut donc se tromper d’un facteur trois. Poser une carte contre l’écran et ajuster le contour donne à l’outil votre densité de pixels exacte.',
    faq: [
      { q: 'Comment calibrer la règle à la taille réelle ?', a: 'Ouvrez le panneau de calibrage et posez une carte bancaire, une carte de crédit ou une pièce d’identité sur l’écran. Déplacez le curseur jusqu’à ce que le contour affiché corresponde exactement à votre carte physique.' },
      { q: 'Reste-t-elle exacte quand je zoome ?', a: 'Oui. La règle surveille les changements d’échelle de la fenêtre et de densité de pixels et recalcule l’espacement des graduations : un centimètre reste un centimètre.' },
      { q: 'Puis-je l’utiliser sur téléphone ou tablette ?', a: 'Oui. Le calibrage fonctionne de la même façon sur iPhone, iPad et Android. Calibrez une fois par appareil et le réglage est mémorisé localement.' },
    ],
  },

  aspectRatio: {
    title: 'Calculateur de rapport d’aspect et de recadrage',
    description: 'Trouvez la largeur et la hauteur correspondant à n’importe quel rapport d’aspect — 16:9, 9:16, 4:5, 1:1, 21:9 — ou le plus grand recadrage centré qui tient dans votre image.',
    keywords: 'calculateur rapport d’aspect, calculateur 16:9, calculateur de recadrage, proportion d’image, résolution vidéo',
    h1: 'Calculateur de rapport d’aspect et de recadrage',
    intro: 'Saisissez une dimension et obtenez l’autre pour n’importe quel rapport, ou collez la taille de votre image pour obtenir la zone de recadrage centrée exacte.',
    bullets: [
      'Tous les rapports courants des réseaux sociaux, de la vidéo et de l’impression',
      'Le mode recadrage renvoie aussi le décalage, pas seulement la taille',
      'Les résultats se mettent à jour à la frappe, sans arrondi surprise',
    ],
    bodyHeading: 'Les rapports réellement utilisés par les plateformes',
    body: 'La vidéo verticale sur TikTok, Reels et Shorts est en 9:16 à 1080×1920. Les publications du fil Instagram sont en 1:1 ou 4:5. YouTube est en 16:9, le cinéma en 21:9 et la plupart des appareils photo shootent en 3:2. Choisir le bon rapport avant l’export évite le recadrage automatique appliqué par les plateformes.',
    faq: [
      { q: 'Qu’est-ce qu’un rapport d’aspect ?', a: 'C’est la proportion entre la largeur et la hauteur, notée largeur:hauteur. Une image 16:9 fait 16 unités de large pour 9 de haut, quel que soit le nombre de pixels.' },
      { q: 'Comment trouver la dimension manquante ?', a: 'Multipliez le côté connu par la fraction du rapport. Pour du 16:9, la hauteur vaut la largeur multipliée par 9 puis divisée par 16.' },
      { q: 'Quelle différence entre ajuster et recadrer ?', a: 'Ajuster redimensionne toute l’image et peut ajouter des bandes noires. Recadrer supprime des pixels pour atteindre le rapport sans rien déformer.' },
    ],
  },

  dpi: {
    title: 'Calculateur DPI / PPP et taille d’impression',
    description: 'Convertissez les pixels en taille d’impression et inversement. Trouvez le plus grand tirage net possible ou les pixels nécessaires pour une taille donnée à 300 DPI.',
    keywords: 'calculateur dpi, calculateur ppp, taille d’impression, pixels en centimètres, 300 dpi, résolution d’image',
    h1: 'Calculateur DPI / PPP et taille d’impression',
    intro: 'Passez dans les deux sens entre pixels et taille physique d’impression à n’importe quelle résolution, et voyez immédiatement si une image est assez nette pour la taille voulue.',
    bullets: [
      'Des pixels vers la taille d’impression, et de la taille vers les pixels requis',
      'Repères de qualité à 72, 150, 300 et 600 DPI',
      'Fonctionne en pouces, centimètres et millimètres',
    ],
    bodyHeading: 'La résolution dont une impression a réellement besoin',
    body: '300 DPI est la norme pour tout ce qui se tient en main : tirages photo, magazines, cartes de visite. Une affiche regardée à un mètre passe très bien à 150 DPI, et un panneau publicitaire fonctionne à 30. Diviser la largeur en pixels par les DPI visés donne la largeur imprimée en pouces.',
    faq: [
      { q: 'Quelle différence entre DPI et PPI ?', a: 'Le PPI compte les pixels par pouce d’une image numérique ; le DPI compte les points d’encre par pouce déposés par l’imprimante. Au quotidien, pour dimensionner une image, les deux sont employés indifféremment.' },
      { q: '300 DPI sont-ils toujours nécessaires ?', a: 'Non. C’est la norme pour une vision rapprochée. Les grands formats regardés de loin restent nets à des résolutions bien plus faibles.' },
      { q: 'Puis-je augmenter les DPI pour améliorer la qualité ?', a: 'Changer uniquement la valeur DPI ne change que la taille d’impression. Ajouter du détail réel exige plus de pixels, ce que l’agrandissement ne peut qu’approcher.' },
    ],
  },

  imageResizer: {
    title: 'Compresseur et redimensionneur d’images',
    description: 'Redimensionnez et compressez des images JPG, PNG et WebP dans votre navigateur. Prévisualisez, comparez les tailles et téléchargez — sans aucun envoi.',
    keywords: 'redimensionner image, compresser image, réduire taille photo, compresseur jpg, convertir en webp',
    h1: 'Compresseur et redimensionneur d’images',
    intro: 'Déposez une image, fixez une taille ou une qualité cible et téléchargez le résultat. Votre navigateur décode et réencode le fichier lui-même : il ne quitte jamais l’appareil.',
    bullets: [
      'JPG, PNG et WebP en entrée comme en sortie, avec comparaison de taille en direct',
      'Redimensionnement en pixels ou en pourcentage, proportions verrouillées',
      'Adapté au traitement en série, sans limite par fichier ni par jour',
    ],
    bodyHeading: 'Des fichiers plus légers sans perte visible',
    body: 'La plupart des photos contiennent bien plus de données que la page qui les affiche n’en a besoin. Réduire une photo de 4000 pixels de large aux 1600 réellement utilisés par la mise en page, puis réencoder à 80 % de qualité, retire couramment 90 % du poids sans différence visible à l’œil.',
    faq: [
      { q: 'Ma photo est-elle envoyée sur un serveur ?', a: 'Non. L’image est lue via l’API fichiers du navigateur et traitée dans un canvas de la page. Aucune requête réseau ne transporte votre image.' },
      { q: 'Quel format choisir ?', a: 'Le WebP est le plus léger à qualité égale et il est désormais pris en charge partout. Utilisez le JPG pour une compatibilité maximale et le PNG s’il vous faut de la transparence ou des aplats nets.' },
      { q: 'Le redimensionnement supprime-t-il les données EXIF ?', a: 'Oui. Le réencodage supprime les métadonnées d’origine, y compris les coordonnées GPS et les informations d’appareil, ce qui est généralement souhaitable avant publication.' },
    ],
  },

  colorTools: {
    title: 'Sélecteur de couleur et générateur de palettes',
    description: 'Choisissez une couleur et lisez-la en HEX, RGB, HSL ou HSV. Générez des palettes complémentaires, analogues et triadiques et exportez-les en CSS, Tailwind ou JSON.',
    keywords: 'sélecteur de couleur, hex vers rgb, générateur de palette, convertisseur hsl, nuancier, couleurs tailwind',
    h1: 'Sélecteur de couleur et générateur de palettes',
    intro: 'Lisez n’importe quelle couleur dans toutes les notations à la fois, construisez une palette harmonieuse autour d’elle et copiez l’ensemble au format utilisé par votre projet.',
    bullets: [
      'HEX, RGB, HSL et HSV synchronisés pendant que vous faites glisser',
      'Schémas complémentaires, analogues, triadiques et tétradiques',
      'Export en un clic vers des variables CSS, une config Tailwind ou du JSON',
    ],
    bodyHeading: 'Des palettes fondées sur la théorie des couleurs',
    body: 'Les schémas harmonieux découlent de relations fixes sur le cercle chromatique. Les paires complémentaires se font face pour un contraste maximal ; les ensembles analogues sont voisins et paraissent apaisés ; les triades sont réparties à intervalles égaux et restent vives tout en demeurant équilibrées.',
    faq: [
      { q: 'Que signifie le code HEX ?', a: 'Ce sont trois paires de chiffres hexadécimaux pour le rouge, le vert et le bleu, chacune de 00 à FF. #FF0000 est un rouge pur sans vert ni bleu.' },
      { q: 'Quand utiliser HSL plutôt que HEX ?', a: 'HSL sépare teinte, saturation et luminosité : créer une gamme de nuances revient à changer un seul nombre au lieu de deviner de nouvelles valeurs hexadécimales.' },
      { q: 'Les palettes exportées sont-elles accessibles ?', a: 'Le générateur affiche les rapports de contraste pour vérifier chaque paire face au seuil WCAG AA de 4,5:1 pour le texte courant avant de la publier.' },
    ],
  },

  password: {
    title: 'Testeur de robustesse et générateur de mots de passe',
    description: 'Découvrez la vraie robustesse d’un mot de passe et le temps qu’une machine moderne mettrait à le casser. Analyse entièrement locale, sans aucune transmission.',
    keywords: 'robustesse mot de passe, générateur de mot de passe, mot de passe sécurisé, temps de cassage, entropie',
    h1: 'Testeur de robustesse des mots de passe',
    intro: 'Saisissez un mot de passe et obtenez une estimation honnête de son entropie, un temps de cassage réaliste et les faiblesses précises qui le rendent devinable.',
    bullets: [
      'Estimations d’entropie et de temps de cassage face aux GPU actuels',
      'Signale les mots du dictionnaire, les suites de clavier et les substitutions courantes',
      'Rien n’est envoyé : l’analyse se fait dans la page',
    ],
    bodyHeading: 'La longueur l’emporte sur la complexité',
    body: 'Remplacer un « a » par un « @ » n’apporte presque rien, car les outils de cassage testent ces substitutions en premier. Ajouter des caractères, en revanche, multiplie l’espace de recherche. Quatre mots sans rapport sont à la fois plus faciles à retenir et bien plus durs à casser qu’une courte suite de symboles.',
    faq: [
      { q: 'Est-il prudent de saisir ici mon vrai mot de passe ?', a: 'L’analyse s’exécute entièrement dans votre navigateur et aucune frappe n’est envoyée sur le réseau. Le réflexe le plus sûr reste néanmoins de tester un mot de passe de même longueur et de même structure plutôt que celui que vous utilisez.' },
      { q: 'Qu’est-ce qui rend un mot de passe robuste ?', a: 'La longueur avant tout : visez au moins 16 caractères. Une phrase de passe de quatre ou cinq mots sans rapport bat une courte chaîne complexe, à la fois en mémorisation et en robustesse.' },
      { q: 'Comment le temps de cassage est-il calculé ?', a: 'À partir de l’entropie estimée en bits, face au débit de hachage des GPU grand public actuels, en supposant une attaque hors ligne sur une base de données fuitée.' },
    ],
  },

  calorie: {
    title: 'Calculateur de calories — métabolisme de base, DEJ et macros',
    description: 'Calculez votre métabolisme de base et votre dépense énergétique journalière avec l’équation de Mifflin-St Jeor, obtenez une répartition de macros et suivez vos repas.',
    keywords: 'calculateur de calories, calcul métabolisme de base, dépense énergétique journalière, calculateur de macros, besoins caloriques',
    h1: 'Calculateur de calories et journal alimentaire',
    intro: 'Déterminez ce que votre corps brûle au repos puis sur une journée normale, fixez un objectif de perte, de maintien ou de prise de poids et suivez vos repas.',
    bullets: [
      'Métabolisme de base selon Mifflin-St Jeor, l’équation employée en clinique',
      'Coefficients d’activité du sédentaire au sportif',
      'Répartition protéines, glucides et lipides ajustée à votre objectif',
    ],
    bodyHeading: 'Métabolisme de base, dépense totale et l’écart entre les deux',
    body: 'Le métabolisme de base correspond à ce que vous brûleriez allongé toute la journée. La dépense journalière le multiplie par un coefficient d’activité couvrant les déplacements, le sport et la digestion. Manger durablement en dessous de cette dépense fait perdre du poids ; un déficit d’environ 500 kcal par jour représente à peu près un demi-kilo par semaine.',
    faq: [
      { q: 'Quelle est la précision de l’estimation ?', a: 'Mifflin-St Jeor tombe à environ 10 % près pour la plupart des gens. Le métabolisme varie d’un individu à l’autre : prenez le chiffre comme point de départ et ajustez après deux semaines de résultats réels.' },
      { q: 'Quel déficit est raisonnable ?', a: 'Un déficit de 15 à 25 % sous la dépense journalière est la recommandation habituelle. Les déficits très agressifs coûtent du muscle et sont difficiles à tenir. Consultez un médecin avant tout changement radical.' },
      { q: 'Mon journal alimentaire est-il stocké sur un serveur ?', a: 'Non. Les entrées sont enregistrées dans le stockage local de votre navigateur et ne quittent jamais l’appareil. Effacer les données du site efface le journal.' },
    ],
  },

  pregnancy: {
    title: 'Calculateur de grossesse, date d’accouchement et ovulation',
    description: 'Estimez votre date d’accouchement à partir de vos dernières règles, de la conception ou d’un transfert FIV, et consultez votre semaine, trimestre et fenêtre fertile.',
    keywords: 'calcul date d’accouchement, calculateur de grossesse, calculateur d’ovulation, fenêtre fertile, âge gestationnel',
    h1: 'Calculateur de grossesse, date d’accouchement et ovulation',
    intro: 'Indiquez vos dernières règles, une date de conception connue ou la date d’un transfert FIV pour obtenir votre date prévue d’accouchement, l’âge gestationnel actuel et le trimestre.',
    bullets: [
      'Datation par la règle de Naegele depuis les dernières règles, la conception ou la FIV',
      'S’adapte aux cycles différents de 28 jours',
      'Estimation de l’ovulation et de la fenêtre fertile pour planifier',
    ],
    bodyHeading: 'Comment se calcule une date d’accouchement',
    body: 'L’estimation standard ajoute 280 jours au premier jour des dernières règles, ce qui suppose un cycle de 28 jours avec ovulation au 14e jour. Un cycle plus long ou plus court décale la date, et c’est pourquoi le calculateur demande la durée de votre cycle au lieu de la supposer.',
    faq: [
      { q: 'Quelle est la fiabilité d’une date prévue ?', a: 'Environ 4 % seulement des bébés naissent à la date estimée. Près de 80 % arrivent dans les deux semaines qui l’entourent, d’où le mot estimation.' },
      { q: 'Et si mon cycle ne dure pas 28 jours ?', a: 'Saisissez la durée moyenne réelle de votre cycle. Le calculateur décale l’hypothèse d’ovulation en conséquence au lieu d’imposer le modèle standard de 14 jours.' },
      { q: 'Cela remplace-t-il une échographie ?', a: 'Non. L’échographie du premier trimestre est la méthode de datation la plus précise. Cet outil sert à s’informer et à planifier, il ne constitue pas un avis médical.' },
    ],
  },

  regex: {
    title: 'Testeur d’expressions régulières avec surlignage en direct',
    description: 'Testez vos expressions régulières sur votre propre texte, avec surlignage en direct, groupes de capture, aperçu du remplacement et aide-mémoire de syntaxe.',
    keywords: 'testeur regex, test expression régulière, regex en ligne, aide-mémoire regex, regex javascript',
    h1: 'Testeur de regex et aide-mémoire',
    intro: 'Écrivez un motif et voyez chaque correspondance surlignée à la frappe, avec les groupes de capture détaillés et un aperçu du remplacement à côté.',
    bullets: [
      'Surlignage en direct avec groupes de capture nommés et numérotés',
      'Tous les drapeaux JavaScript, y compris sticky et unicode',
      'Panneau aide-mémoire pour la syntaxe qu’on n’arrive jamais à retenir',
    ],
    bodyHeading: 'Construire un motif qui tient la route',
    body: 'Partez d’un échantillon réel du texte à traiter, pas d’une version idéalisée. Ajoutez une contrainte à la fois et regardez le surlignage se resserrer. Les ancres et les classes de caractères explicites l’emportent presque toujours sur un point-astérisque gourmand qui marche par hasard sur le premier exemple.',
    faq: [
      { q: 'De quelle variante de regex s’agit-il ?', a: 'JavaScript (ECMAScript), le moteur intégré à votre navigateur. La majeure partie de la syntaxe vaut aussi pour PCRE, mais le lookbehind et certains échappements de propriétés Unicode diffèrent.' },
      { q: 'Que change le drapeau g ?', a: 'Sans lui, le moteur s’arrête à la première correspondance. Avec lui, toutes les correspondances du texte sont trouvées, ce que montre le surlignage.' },
      { q: 'Mon texte de test est-il envoyé quelque part ?', a: 'Non. Votre propre navigateur compile et exécute le motif. Rien n’est journalisé ni transmis.' },
    ],
  },

  cron: {
    title: 'Générateur et validateur d’expressions cron',
    description: 'Composez et validez des expressions cron avec une explication en langage clair et un aperçu des prochaines exécutions. Syntaxe à 5 et 6 champs prise en charge.',
    keywords: 'générateur cron, crontab en ligne, validateur cron, planification cron, prochaines exécutions',
    h1: 'Générateur et validateur d’expressions cron',
    intro: 'Composez une planification champ par champ ou collez une expression existante, et obtenez une description lisible ainsi que les prochaines exécutions.',
    bullets: [
      'Description en langage clair de n’importe quelle expression',
      'Aperçu des prochaines exécutions dans votre fuseau horaire',
      'Gère les plages, les pas, les listes et la variante à 6 champs avec secondes',
    ],
    bodyHeading: 'Lire les cinq champs',
    body: 'Une ligne cron se lit minute, heure, jour du mois, mois, jour de la semaine, dans cet ordre. L’astérisque signifie toutes les valeurs, */5 signifie une fois sur cinq et 1-5 est une plage. Le piège classique : le jour du mois et le jour de la semaine se combinent par OU, pas par ET.',
    faq: [
      { q: 'Que signifie */5 * * * * ?', a: 'Toutes les cinq minutes, de chaque heure, tous les jours. L’opérateur de pas s’applique au champ où il apparaît.' },
      { q: 'Quel fuseau horaire cron utilise-t-il ?', a: 'Le cron système utilise le fuseau du serveur. Cet aperçu utilise celui de votre navigateur : vérifiez le réglage du serveur avant de vous fier aux horaires.' },
      { q: 'Pourquoi ma planification par jour de semaine s’est-elle déclenchée le mauvais jour ?', a: 'Quand le jour du mois et le jour de la semaine sont tous deux restreints, cron s’exécute si l’un ou l’autre correspond, pas les deux. Laissez l’un des deux en astérisque pour obtenir le comportement attendu.' },
    ],
  },

  dataConverter: {
    title: 'Convertisseur JSON, CSV et YAML',
    description: 'Convertissez entre JSON, CSV et YAML instantanément dans votre navigateur, avec validation, mise en forme et décodage Base64 et JWT intégrés.',
    keywords: 'json vers csv, csv vers json, convertisseur yaml, formateur json, décodeur base64, décodeur jwt',
    h1: 'Convertisseur JSON ⇄ CSV ⇄ YAML',
    intro: 'Collez des données dans l’un des trois formats et récupérez-les dans l’un des deux autres, validées et mises en forme, sans qu’un seul octet quitte votre navigateur.',
    bullets: [
      'Aller-retour entre JSON, CSV et YAML avec détection des types',
      'Les erreurs pointent la ligne et la colonne exactes',
      'Décodage Base64, URL et JWT intégré',
    ],
    bodyHeading: 'Ce qui distingue les trois formats',
    body: 'JSON est strict et analysable partout. YAML reprend le même modèle de données avec de l’indentation à la place des accolades, ce qui est agréable à écrire et facile à casser. CSV est plat : les objets imbriqués doivent donc être aplatis en noms de colonnes pointés à la sortie.',
    faq: [
      { q: 'Mes données sont-elles envoyées ?', a: 'Non. L’analyse et la conversion s’exécutent dans votre navigateur. Rien n’est journalisé, stocké ni transmis, ce qui rend l’outil sûr pour des fichiers de configuration contenant des secrets.' },
      { q: 'Comment le JSON imbriqué est-il traité en CSV ?', a: 'Les clés imbriquées sont aplaties en en-têtes de colonnes pointés, du type utilisateur.adresse.ville, si bien qu’aucune information n’est perdue.' },
      { q: 'Le décodeur JWT vérifie-t-il la signature ?', a: 'Non. Il décode l’en-tête et la charge utile pour inspection. La vérification exige la clé de signature et relève de votre serveur.' },
    ],
  },

  qr: {
    title: 'Générateur de QR code — Wi-Fi, vCard et URL',
    description: 'Créez des QR codes pour des liens, des réseaux Wi-Fi, des contacts vCard, des e-mails et du texte. Personnalisez couleurs et correction d’erreurs, puis téléchargez en PNG ou SVG.',
    keywords: 'générateur qr code, qr code wifi, qr code vcard, qr code gratuit, qr png svg',
    h1: 'Générateur de QR code',
    intro: 'Générez un QR code pour un lien, un réseau Wi-Fi, une carte de visite, un e-mail ou du texte simple, puis téléchargez-le en PNG haute résolution ou en SVG vectoriel.',
    bullets: [
      'Contenus Wi-Fi, vCard, e-mail, SMS et URL',
      'Couleurs personnalisées et quatre niveaux de correction d’erreurs',
      'PNG pour l’impression et SVG pour un agrandissement illimité',
    ],
    bodyHeading: 'Des codes qui se scannent encore sur papier',
    body: 'Conservez un fort contraste entre le motif et le fond, laissez la zone de silence dégagée et choisissez le niveau de correction H si le code doit porter un logo ou risque d’être abîmé. Un contenu plus court produit un motif moins dense, qui se scanne de façon fiable en petite taille.',
    faq: [
      { q: 'Ces QR codes expirent-ils ?', a: 'Non. Le code est généré dans votre navigateur et encode directement vos données. Aucun service de redirection intermédiaire ne peut être coupé.' },
      { q: 'Qu’est-ce que la correction d’erreurs ?', a: 'Des données redondantes qui permettent de lire un code abîmé. Le niveau L tolère environ 7 % de dégâts, le niveau H environ 30 %, au prix d’un motif plus dense.' },
      { q: 'Est-il prudent d’imprimer un QR code Wi-Fi ?', a: 'Il contient le mot de passe du réseau en clair : quiconque le photographie accède à votre Wi-Fi. Réservez-le à un réseau invité plutôt qu’au réseau principal.' },
    ],
  },

  pdf: {
    title: 'Outils PDF — fusionner, diviser et convertir',
    description: 'Fusionnez plusieurs PDF, découpez un PDF en pages ou transformez des images en PDF. Tout se fait dans votre navigateur, sans envoi et sans filigrane.',
    keywords: 'fusionner pdf, diviser pdf, image en pdf, outils pdf en ligne, combiner pdf gratuit',
    h1: 'Convertisseur, fusionneur et diviseur de PDF',
    intro: 'Combinez des documents, extrayez des pages ou construisez un PDF à partir d’images. Le fichier est analysé et réécrit dans votre navigateur : rien n’est envoyé, rien n’est tamponné.',
    bullets: [
      'Fusion avec réorganisation par glisser-déposer, découpe par page ou par plage',
      'Images vers PDF avec contrôle du format et de l’orientation',
      'Sans filigrane, sans limite de taille, sans quota quotidien',
    ],
    bodyHeading: 'Pourquoi traiter les PDF en local',
    body: 'Contrats, courriers médicaux et relevés bancaires sont précisément les documents que l’on colle dans des convertisseurs en ligne gratuits. Travailler en local signifie que le document n’est jamais stocké sur le serveur d’un tiers, jamais mis en file de traitement et jamais soumis à une politique de conservation que vous n’avez pas lue.',
    faq: [
      { q: 'Y a-t-il une limite de taille ?', a: 'Seulement la mémoire de votre appareil. Comme il n’y a pas d’envoi, le plafond pratique dépasse largement les 10 à 20 Mo qu’autorisent la plupart des convertisseurs en ligne.' },
      { q: 'Le résultat portera-t-il un filigrane ?', a: 'Non. L’outil écrit un PDF propre, sans marque d’aucune sorte.' },
      { q: 'Peut-il ouvrir un PDF protégé par mot de passe ?', a: 'Les PDF chiffrés doivent d’abord être déverrouillés. Retirez le mot de passe dans votre lecteur PDF, puis passez le fichier ici.' },
    ],
  },

  unitConverter: {
    title: 'Convertisseur d’unités — longueur, poids et température',
    description: 'Convertissez plus de 80 unités de longueur, poids, température, surface, volume, vitesse, données, énergie et pression, avec un formatage adapté à votre langue.',
    keywords: 'convertisseur d’unités, convertisseur métrique, kg en livres, cm en pouces, celsius en fahrenheit, convertisseur de mesures',
    h1: 'Convertisseur d’unités',
    intro: 'Dix catégories et plus de quatre-vingts unités, converties à la frappe, avec des nombres groupés et ponctués comme votre langue les écrit.',
    bullets: [
      'Longueur, poids, température, surface, volume, vitesse, temps, données, énergie, pression',
      'Système métrique et impérial côte à côte, toute la précision conservée',
      'Résultats au format de votre langue : 1 234,5 ou 1,234.5 selon le cas',
    ],
    bodyHeading: 'Une précision qui survit à l’aller-retour',
    body: 'Les conversions s’appuient sur des facteurs exacts plutôt qu’arrondis : convertir vers une autre unité puis revenir redonne le nombre de départ. La température est traitée comme une conversion affine et non comme une simple multiplication, ce qui est l’erreur de la plupart des convertisseurs rapides.',
    faq: [
      { q: 'Combien de décimales sont conservées ?', a: 'Toute la précision en double interne, avec un arrondi raisonnable à l’affichage. La valeur exacte reste disponible si vous devez la copier.' },
      { q: 'Pourquoi ma langue affiche-t-elle la virgule comme séparateur décimal ?', a: 'Parce que c’est ainsi que votre langue écrit les nombres. L’allemand écrit 1.234,5 là où l’anglais écrit 1,234.5. L’outil suit la langue de la page.' },
      { q: 'Le gallon américain et le gallon impérial sont-ils identiques ?', a: 'Non, et l’écart est important. Le gallon américain vaut 3,785 litres, l’impérial 4,546. Les deux sont listés séparément.' },
    ],
  },

  about: {
    title: 'À propos de Rocking Tools',
    description: 'Qui construit Rocking Tools, pourquoi chaque utilitaire tourne côté client, et comment un site d’outils gratuit financé par la publicité reste privé par conception.',
    keywords: 'à propos rocking tools, outils respectueux de la vie privée, outils web côté client',
    h1: 'À propos de Rocking Tools',
    intro: 'Une petite collection d’utilitaires de navigateur bâtie sur une seule règle : le travail se fait sur votre appareil, pas sur le nôtre.',
    bullets: [
      'Tous les outils sont côté client : aucun point d’envoi ne peut fuiter',
      'Gratuits, financés par une publicité clairement identifiée',
      'Transparents sur ce que nous collectons, c’est-à-dire très peu',
    ],
    bodyHeading: 'Pourquoi côté client',
    body: 'Le modèle économique habituel des outils gratuits consiste à prendre votre fichier, le traiter sur un serveur et le garder assez longtemps pour être utile à quelqu’un. Faire le même travail dans le navigateur supprime complètement ce marché. La page se charge, le code s’exécute localement, et vos données n’ont nulle part où aller.',
    faq: [
      { q: 'Comment le site est-il financé ?', a: 'Par la publicité via Google AdSense, affichée dans des emplacements identifiés entre les contenus. C’est tout le modèle économique : pas d’offre payante et rien n’est revendu.' },
      { q: 'Quelles données collectez-vous ?', a: 'Des statistiques agrégées de visites, et ce que le fournisseur publicitaire collecte selon le consentement que vous donnez. Vos fichiers et vos saisies n’en font jamais partie.' },
      { q: 'Puis-je demander un nouvel outil ?', a: 'Oui. La page de contact nous parvient directement, et les demandes orientent réellement ce qui est développé ensuite.' },
    ],
  },

  faq: {
    title: 'Questions fréquentes',
    description: 'Réponses sur la confidentialité, le traitement des fichiers, la précision, l’usage hors ligne, la publicité et les langues disponibles sur Rocking Tools.',
    keywords: 'faq rocking tools, confidentialité outils en ligne, les outils en ligne sont-ils sûrs',
    h1: 'Questions fréquentes',
    intro: 'Les questions qui reviennent le plus souvent sur le fonctionnement de ces outils, le sort de vos données et ce que le site fait — ou ne fait pas.',
    bullets: [
      'Confidentialité et traitement des fichiers expliqués simplement',
      'Comment la précision est atteinte sans serveur',
      'À quoi servent les publicités et comment fonctionne le consentement',
    ],
    bodyHeading: 'Toujours bloqué ?',
    body: 'Si votre question n’a pas de réponse ci-dessous, la page de contact aboutit directement à une personne. Les rapports de bug précisant le navigateur et le système d’exploitation utilisés sont particulièrement bienvenus, car la plupart des problèmes d’affichage sont propres à une combinaison précise.',
    faq: [
      { q: 'Faut-il un compte ?', a: 'Non. Il n’y a aucune inscription sur le site et aucun outil n’est réservé aux inscrits.' },
      { q: 'Les outils fonctionnent-ils hors ligne ?', a: 'En grande partie oui. Une fois la page chargée, l’outil s’exécute avec du code déjà présent dans le navigateur. Un rechargement nécessitera à nouveau le réseau.' },
      { q: 'Pourquoi vois-je des publicités ?', a: 'Elles paient l’hébergement et le développement pour que les outils restent gratuits et sans limite. Les emplacements sont identifiés et tenus à l’écart de la zone de travail de chaque outil.' },
      { q: 'Dans quelles langues le site est-il disponible ?', a: 'La page d’accueil et toutes les pages d’outils sont publiées en anglais, espagnol, français, allemand, portugais du Brésil, hindi, indonésien et japonais. Les nombres, la monnaie et les dates suivent la langue choisie.' },
    ],
  },
}
