// ─────────────────────────────────────────────────────────────────────────
// EN — reference content for the core translated pages.
//
// Every other locale file mirrors these keys exactly; validate.js fails the
// build if one drifts. The brand suffix is appended by the page template, so
// `title` here is the page title only.
//
// Shape per page:
//   title        <title> without the brand suffix
//   description  meta description, 140-160 chars
//   keywords     comma separated, locale-native search phrasing
//   h1           on-page heading (may differ from title)
//   intro        1-2 sentences directly under the h1
//   bullets      3 short value propositions
//   bodyHeading  h2 above the guide paragraph
//   body         one explanatory paragraph, ~50 words
//   faq          3 question/answer pairs, also emitted as FAQPage schema
// ─────────────────────────────────────────────────────────────────────────

export default {
  home: {
    title: 'Free Online Tools — Rulers, Converters & Calculators',
    description: 'A studio-grade collection of free browser tools: a calibrated screen ruler, unit and format converters, PDF utilities, and health calculators. Nothing is uploaded.',
    keywords: 'free online tools, browser tools, unit converter, screen ruler, pdf tools, qr code generator, calorie calculator',
    h1: 'Free tools that run entirely in your browser',
    intro: 'Fifteen precision utilities for designers, developers, and everyday problems. Every calculation happens on your own device — no accounts, no uploads, no waiting on a server.',
    bullets: [
      'Nothing you type or drop in ever leaves your machine',
      'Works offline once the page has loaded',
      'No sign-up, no watermarks, no per-file limits',
    ],
    bodyHeading: 'One toolkit instead of fifteen tabs',
    body: 'Most free web tools upload your file to a server, wrap the result in a watermark, and meter how often you can use it. These do not. Each tool is a small client-side program: the browser does the work, the file stays where it is, and the result appears instantly.',
    faq: [
      { q: 'Are these tools really free?', a: 'Yes. Every tool is free with no account, no trial, and no file limits. The site is funded by advertising, which is why you will see clearly labelled ad slots between sections.' },
      { q: 'Do my files get uploaded anywhere?', a: 'No. Image resizing, PDF merging, data conversion, and every calculator run inside your browser tab. The file never touches a network request.' },
      { q: 'Do the tools work on a phone?', a: 'Yes. Every tool is responsive and touch-friendly, including the screen ruler, which can be calibrated on a phone using a bank card.' },
    ],
  },

  ruler: {
    title: 'Online Screen Ruler — Actual Size, Calibrated 1:1',
    description: 'A real-size on-screen ruler calibrated to your monitor with a credit card. Measure in millimetres, centimetres, and inches at true 1:1 scale on any display.',
    keywords: 'online ruler, actual size ruler, screen ruler, mm ruler, cm ruler online, inch ruler, calibrated ruler',
    h1: 'Measure anything on your screen',
    intro: 'Rulers pinned to the edge of the viewport at true millimetre and inch scale. Calibrate once with any bank card and the scale stays physically accurate, even when you zoom the browser.',
    bullets: [
      'Calibrated with a standard ISO 7810 bank card, 85.60 mm wide',
      'Stays true when you zoom or move to a different display',
      'No camera access, no screen recording, no uploads',
    ],
    bodyHeading: 'Why most on-screen rulers are wrong',
    body: 'A typical web ruler assumes every screen is 96 DPI. Real displays run anywhere from 96 to 300+ DPI, so an uncalibrated ruler can be off by a factor of three. Holding a card against the screen and matching the outline gives the tool your exact pixel density.',
    faq: [
      { q: 'How do I calibrate the ruler to real size?', a: 'Open the calibration panel and hold any standard credit card, debit card, or ID against your screen. Drag the slider until the on-screen outline matches your physical card exactly.' },
      { q: 'Does it stay accurate when I zoom?', a: 'Yes. The ruler listens for viewport scale and device pixel ratio changes and recalculates the tick spacing, so a centimetre stays a centimetre.' },
      { q: 'Can I use it on a phone or tablet?', a: 'Yes. Calibration works the same way on iPhone, iPad, and Android. Calibrate once per device and the setting is remembered locally.' },
    ],
  },

  aspectRatio: {
    title: 'Aspect Ratio & Crop Calculator',
    description: 'Work out matching width and height for any aspect ratio — 16:9, 9:16, 4:5, 1:1, 21:9 — or find the largest centre crop that fits your image.',
    keywords: 'aspect ratio calculator, 16:9 calculator, crop calculator, image ratio, video resolution calculator',
    h1: 'Aspect Ratio & Crop Calculator',
    intro: 'Enter one dimension and get the other for any ratio, or paste your image size and get the exact centre-crop box for the ratio you need.',
    bullets: [
      'Every common social, video, and print ratio built in',
      'Crop mode returns the offset as well as the size',
      'Results update as you type, with no rounding surprises',
    ],
    bodyHeading: 'Ratios that platforms actually use',
    body: 'Vertical video on TikTok, Reels, and Shorts is 9:16 at 1080×1920. Instagram feed posts are 1:1 or 4:5. YouTube is 16:9, cinema is 21:9, and most cameras shoot 3:2. Picking the right ratio before export avoids the automatic crop that platforms apply.',
    faq: [
      { q: 'What is an aspect ratio?', a: 'It is the proportion between width and height, written width:height. A 16:9 image is 16 units wide for every 9 units tall, whatever the pixel count.' },
      { q: 'How do I find a missing dimension?', a: 'Multiply the known side by the ratio fraction. For 16:9, height equals width times 9 divided by 16.' },
      { q: 'What is the difference between fitting and cropping?', a: 'Fitting scales the whole image and may add letterboxing. Cropping cuts pixels away to reach the ratio without distorting anything.' },
    ],
  },

  dpi: {
    title: 'DPI / PPI Print Size Calculator',
    description: 'Convert pixels to print size and back. Find the largest sharp print your image supports, or the pixel dimensions you need for a target size at 300 DPI.',
    keywords: 'dpi calculator, ppi calculator, print size calculator, pixels to inches, 300 dpi, image resolution',
    h1: 'DPI / PPI Print Size Calculator',
    intro: 'Go both ways between pixels and physical print size at any resolution, and see immediately whether an image is sharp enough for the size you want.',
    bullets: [
      'Pixels to print size, and print size to required pixels',
      'Quality guidance at 72, 150, 300, and 600 DPI',
      'Works in inches, centimetres, and millimetres',
    ],
    bodyHeading: 'How much resolution a print really needs',
    body: '300 DPI is the standard for anything held in the hand — photo prints, magazines, business cards. Posters viewed from a metre away are fine at 150 DPI, and billboards work at 30. Dividing pixel width by target DPI gives print width in inches.',
    faq: [
      { q: 'What is the difference between DPI and PPI?', a: 'PPI counts pixels per inch in a digital image; DPI counts ink dots per inch a printer lays down. In everyday use for sizing images the two are used interchangeably.' },
      { q: 'Is 300 DPI always necessary?', a: 'No. It is the standard for close viewing. Large-format work viewed from a distance stays sharp at much lower resolutions.' },
      { q: 'Can I increase DPI to improve quality?', a: 'Changing the DPI number alone only changes the print size. Adding real detail requires more pixels, which upscaling can only approximate.' },
    ],
  },

  imageResizer: {
    title: 'Image Compressor & Resizer',
    description: 'Resize and compress JPG, PNG, and WebP images in your browser. Preview the result, compare file sizes, and download — nothing is ever uploaded.',
    keywords: 'image resizer, compress image, resize photo online, reduce image size, jpg compressor, webp converter',
    h1: 'Image Compressor & Resizer',
    intro: 'Drop an image in, set a size or quality target, and download the result. The file is decoded and re-encoded by your own browser, so it never leaves the device.',
    bullets: [
      'JPG, PNG, and WebP in and out, with live size comparison',
      'Resize by pixels or percentage, with the ratio locked',
      'Batch-friendly, with no per-file or per-day limits',
    ],
    bodyHeading: 'Smaller files without visible loss',
    body: 'Most photos carry far more data than the page showing them needs. Cutting a 4000-pixel-wide photo to the 1600 pixels a layout actually uses, then re-encoding at 80% quality, routinely removes 90% of the file size with no difference the eye can see.',
    faq: [
      { q: 'Is my photo uploaded to a server?', a: 'No. The image is read with the browser file API and processed on a canvas in the page. No network request carries your image.' },
      { q: 'Which format should I choose?', a: 'WebP is smallest for the same quality and is supported everywhere. Use JPG for maximum compatibility and PNG when you need transparency or crisp flat graphics.' },
      { q: 'Does resizing remove EXIF data?', a: 'Yes. Re-encoding drops the original metadata, including GPS coordinates and camera details, which is usually what you want before publishing.' },
    ],
  },

  colorTools: {
    title: 'Color Picker & Palette Generator',
    description: 'Pick a colour and read it as HEX, RGB, HSL, or HSV. Generate complementary, analogous, and triadic palettes and export them as CSS, Tailwind, or JSON.',
    keywords: 'color picker, hex to rgb, palette generator, hsl converter, color scheme generator, tailwind colors',
    h1: 'Color Picker & Palette Generator',
    intro: 'Read any colour in every notation at once, then build a harmonious palette around it and copy the whole thing out in the format your project uses.',
    bullets: [
      'HEX, RGB, HSL, and HSV kept in sync as you drag',
      'Complementary, analogous, triadic, and tetradic schemes',
      'One-click export to CSS variables, Tailwind config, or JSON',
    ],
    bodyHeading: 'Palettes built on colour theory',
    body: 'Harmonious schemes come from fixed relationships on the colour wheel. Complementary pairs sit opposite each other for maximum contrast; analogous sets sit next to each other and feel calm; triadic sets are evenly spaced and stay vivid while remaining balanced.',
    faq: [
      { q: 'What does the HEX code mean?', a: 'It is three pairs of hexadecimal digits for red, green, and blue, each from 00 to FF. #FF0000 is full red with no green or blue.' },
      { q: 'When should I use HSL instead of HEX?', a: 'HSL separates hue, saturation, and lightness, so building a tint or shade scale is a matter of changing one number rather than guessing at new hex values.' },
      { q: 'Are the exported palettes accessible?', a: 'The generator shows contrast ratios so you can check any pair against the WCAG AA threshold of 4.5:1 for body text before shipping it.' },
    ],
  },

  password: {
    title: 'Password Strength Checker & Generator',
    description: 'See how strong a password really is and how long a modern cracking rig would need to break it. Checked entirely in your browser — nothing is transmitted.',
    keywords: 'password strength checker, password generator, secure password, crack time, password entropy',
    h1: 'Password Strength Checker',
    intro: 'Type a password and get an honest entropy estimate plus a realistic crack time, along with the specific weaknesses that make it guessable.',
    bullets: [
      'Entropy and crack-time estimates against modern GPU speeds',
      'Flags dictionary words, keyboard runs, and common substitutions',
      'Nothing is sent anywhere — the check runs in the page',
    ],
    bodyHeading: 'Length beats complexity',
    body: 'Substituting an @ for an a adds almost nothing, because cracking tools try those substitutions first. Adding characters multiplies the search space instead. Four unrelated words are both easier to remember and far harder to crack than a short string of symbols.',
    faq: [
      { q: 'Is it safe to type my real password here?', a: 'The check runs entirely in your browser and no keystroke is sent over the network. Even so, the safest habit is to test a password of the same length and pattern rather than the live one.' },
      { q: 'What makes a strong password?', a: 'Length first: aim for at least 16 characters. A passphrase of four or five unrelated words beats a short complex string on both memorability and strength.' },
      { q: 'How is the crack time calculated?', a: 'From the estimated entropy in bits against the hash rate of current consumer GPUs, assuming an offline attack on a leaked database.' },
    ],
  },

  calorie: {
    title: 'Calorie Calculator — BMR, TDEE & Macros',
    description: 'Calculate your BMR and TDEE with the Mifflin-St Jeor equation, get a macro split for your goal, and log meals against your daily target.',
    keywords: 'calorie calculator, tdee calculator, bmr calculator, macro calculator, daily calorie needs',
    h1: 'Calorie Calculator & Food Log',
    intro: 'Work out what your body burns at rest and in a normal day, then set a target for losing, holding, or gaining weight and track meals against it.',
    bullets: [
      'Mifflin-St Jeor BMR, the equation clinicians use',
      'Activity multipliers from sedentary to athlete',
      'Protein, carb, and fat split tuned to your goal',
    ],
    bodyHeading: 'BMR, TDEE, and the gap between them',
    body: 'BMR is what you would burn lying still all day. TDEE multiplies that by an activity factor to cover movement, exercise, and digestion. Eating consistently below TDEE loses weight; a deficit of about 500 kcal a day works out to roughly half a kilo a week.',
    faq: [
      { q: 'How accurate is the estimate?', a: 'Mifflin-St Jeor lands within about 10% for most people. Individual metabolism varies, so treat the number as a starting point and adjust after two weeks of real results.' },
      { q: 'How large a deficit is safe?', a: 'A deficit of 15-25% below TDEE is the usual guidance. Very aggressive deficits cost muscle and are hard to sustain. Speak to a doctor before any drastic change.' },
      { q: 'Is my food log stored on a server?', a: 'No. Entries are saved in your browser local storage and never leave the device. Clearing site data clears the log.' },
    ],
  },

  pregnancy: {
    title: 'Pregnancy Due Date & Ovulation Calculator',
    description: 'Estimate your due date from your last period, conception date, or an IVF transfer, and see your current week, trimester, and fertile window.',
    keywords: 'due date calculator, pregnancy calculator, ovulation calculator, fertile window, gestational age',
    h1: 'Pregnancy Due Date & Ovulation Calculator',
    intro: 'Enter your last menstrual period, a known conception date, or an IVF transfer date to get your estimated due date, current gestational age, and trimester.',
    bullets: [
      'Naegele rule dating from LMP, conception, or IVF transfer',
      'Adjusts for cycle lengths other than 28 days',
      'Fertile window and ovulation estimate for planning',
    ],
    bodyHeading: 'How due dates are calculated',
    body: 'The standard estimate adds 280 days to the first day of your last period, which assumes a 28-day cycle with ovulation on day 14. Longer or shorter cycles shift the date, which is why the calculator asks for your cycle length rather than assuming.',
    faq: [
      { q: 'How accurate is an estimated due date?', a: 'Only about 4% of babies arrive on the estimated date. Roughly 80% are born within the two weeks either side of it, which is why it is called an estimate.' },
      { q: 'What if my cycle is not 28 days?', a: 'Enter your real average cycle length. The calculator shifts the ovulation assumption accordingly instead of forcing the standard 14-day model.' },
      { q: 'Does this replace a medical scan?', a: 'No. A first-trimester ultrasound is the most accurate dating method. This tool is for planning and information, not medical advice.' },
    ],
  },

  regex: {
    title: 'Regex Tester with Live Highlighting',
    description: 'Test regular expressions against your own text with live match highlighting, capture groups, replace preview, and a built-in syntax cheatsheet.',
    keywords: 'regex tester, regular expression tester, regex online, regex cheatsheet, javascript regex',
    h1: 'Regex Tester & Cheatsheet',
    intro: 'Write a pattern and see every match highlighted as you type, with capture groups broken out and a replace preview alongside.',
    bullets: [
      'Live highlighting with named and numbered capture groups',
      'All JavaScript flags, including sticky and unicode',
      'Cheatsheet panel for the syntax you can never remember',
    ],
    bodyHeading: 'Building a pattern that holds up',
    body: 'Start from a real sample of the text you need to match, not an idealised version. Add one constraint at a time and watch the highlighting narrow. Anchors and explicit character classes almost always beat a greedy dot-star that happens to work on the first example.',
    faq: [
      { q: 'Which regex flavour is this?', a: 'JavaScript (ECMAScript), the engine built into your browser. Most syntax carries over to PCRE, but lookbehind and some Unicode property escapes differ.' },
      { q: 'What does the g flag change?', a: 'Without it the engine stops at the first match. With it, every match in the text is found, which is what the highlighting shows.' },
      { q: 'Is my test text sent anywhere?', a: 'No. The pattern is compiled and run by your own browser. Nothing is logged or transmitted.' },
    ],
  },

  cron: {
    title: 'Cron Expression Builder & Validator',
    description: 'Build and validate cron expressions with a plain-English explanation and a preview of the next scheduled run times. Supports 5- and 6-field syntax.',
    keywords: 'cron expression builder, crontab generator, cron validator, cron schedule, next run times',
    h1: 'Cron Expression Builder & Validator',
    intro: 'Assemble a schedule field by field or paste an existing expression, and get a readable description plus the next several run times.',
    bullets: [
      'Plain-English description of any expression',
      'Preview of the next runs, in your own time zone',
      'Handles ranges, steps, lists, and the 6-field seconds variant',
    ],
    bodyHeading: 'Reading the five fields',
    body: 'A cron line is minute, hour, day of month, month, and day of week, in that order. An asterisk means every value, */5 means every fifth, and 1-5 means a range. The classic trap is that day-of-month and day-of-week are ORed together, not ANDed.',
    faq: [
      { q: 'What does */5 * * * * mean?', a: 'Every five minutes, of every hour, every day. The step operator applies to the field it appears in.' },
      { q: 'Which time zone does cron use?', a: 'System cron uses the server time zone. The preview here uses your browser time zone, so check the server setting before relying on the times.' },
      { q: 'Why did my day-of-week schedule fire on the wrong day?', a: 'When both day-of-month and day-of-week are restricted, cron runs on either match, not both. Leave one as an asterisk to get the behaviour most people expect.' },
    ],
  },

  dataConverter: {
    title: 'JSON, CSV & YAML Converter',
    description: 'Convert between JSON, CSV, and YAML instantly in your browser, with validation, pretty-printing, and Base64 and JWT decoding alongside.',
    keywords: 'json to csv, csv to json, yaml converter, json formatter, base64 decoder, jwt decoder',
    h1: 'JSON ⇄ CSV ⇄ YAML Converter',
    intro: 'Paste data in any of the three formats and get it back in either of the others, validated and formatted, without a single byte leaving your browser.',
    bullets: [
      'Round-trips between JSON, CSV, and YAML with type detection',
      'Errors point at the exact line and column',
      'Base64, URL, and JWT decoding built in',
    ],
    bodyHeading: 'Where the three formats differ',
    body: 'JSON is strict and universally parseable. YAML is the same data model with indentation instead of braces, which makes it pleasant to write and easy to break. CSV is flat, so nested objects have to be flattened into dotted column names on the way out.',
    faq: [
      { q: 'Is my data uploaded?', a: 'No. Parsing and conversion run in your browser. Nothing is logged, stored, or transmitted, which makes this safe for configuration files containing secrets.' },
      { q: 'How is nested JSON handled in CSV?', a: 'Nested keys are flattened into dotted column headers such as user.address.city, so no information is lost on the way out.' },
      { q: 'Does the JWT decoder verify signatures?', a: 'No. It decodes the header and payload for inspection. Verification needs the signing key and belongs on your server.' },
    ],
  },

  qr: {
    title: 'QR Code Generator — Wi-Fi, vCard & URL',
    description: 'Create QR codes for links, Wi-Fi networks, vCard contacts, email, and plain text. Customise colours and error correction, then download PNG or SVG.',
    keywords: 'qr code generator, wifi qr code, vcard qr code, free qr code, qr code png svg',
    h1: 'QR Code Generator',
    intro: 'Generate a QR code for a link, a Wi-Fi network, a contact card, an email, or plain text, then download it as a high-resolution PNG or a scalable SVG.',
    bullets: [
      'Wi-Fi, vCard, email, SMS, and URL payloads',
      'Custom colours and four error-correction levels',
      'PNG for print and SVG for infinite scaling',
    ],
    bodyHeading: 'Codes that still scan on paper',
    body: 'Keep strong contrast between the pattern and the background, leave the quiet zone clear, and pick error correction level H if the code will carry a logo or get scuffed. Shorter payloads produce sparser patterns, which scan reliably at smaller sizes.',
    faq: [
      { q: 'Do these QR codes expire?', a: 'No. The code is generated in your browser and encodes your data directly. There is no redirect service in the middle that could be shut off.' },
      { q: 'What is error correction?', a: 'Redundant data that lets a damaged code still scan. Level L tolerates about 7% damage, level H about 30%, at the cost of a denser pattern.' },
      { q: 'Is a Wi-Fi QR code safe to print?', a: 'It contains the network password in plain text, so anyone who can photograph it gets your Wi-Fi. Use it for a guest network rather than your main one.' },
    ],
  },

  pdf: {
    title: 'PDF Tools — Merge, Split & Convert',
    description: 'Merge several PDFs into one, split a PDF into single pages, or turn images into a PDF. Everything runs in your browser with no upload and no watermark.',
    keywords: 'merge pdf, split pdf, image to pdf, pdf tools online, combine pdf free',
    h1: 'PDF Converter, Merger & Splitter',
    intro: 'Combine documents, pull pages out, or build a PDF from images. The file is parsed and rewritten inside your browser, so nothing is uploaded and nothing is stamped.',
    bullets: [
      'Merge with drag-to-reorder, split by page or range',
      'Images to PDF with page size and orientation control',
      'No watermarks, no file size cap, no daily limit',
    ],
    bodyHeading: 'Why local PDF handling matters',
    body: 'Contracts, medical letters, and bank statements are exactly the documents people paste into free online converters. Doing the work locally means the document is never stored on someone else server, never queued for processing, and never subject to a retention policy you did not read.',
    faq: [
      { q: 'Is there a file size limit?', a: 'Only your device memory. Because there is no upload, the practical ceiling is far higher than the 10-20 MB most online converters allow.' },
      { q: 'Will the output have a watermark?', a: 'No. The tool writes a clean PDF with no branding of any kind.' },
      { q: 'Can it open a password-protected PDF?', a: 'Encrypted PDFs must be unlocked first. Remove the password in your PDF reader, then run the file through here.' },
    ],
  },

  unitConverter: {
    title: 'Unit Converter — Length, Weight & Temperature',
    description: 'Convert between 80+ units across length, weight, temperature, area, volume, speed, data, energy, and pressure, with results formatted for your locale.',
    keywords: 'unit converter, metric converter, kg to lbs, cm to inches, celsius to fahrenheit, measurement converter',
    h1: 'Unit Converter',
    intro: 'Ten categories and more than eighty units, converted as you type, with numbers grouped and punctuated the way your language writes them.',
    bullets: [
      'Length, weight, temperature, area, volume, speed, time, data, energy, pressure',
      'Metric and imperial side by side, with full precision retained',
      'Results formatted for your locale, so 1,234.5 or 1.234,5 as appropriate',
    ],
    bodyHeading: 'Precision that survives the round trip',
    body: 'Conversions run against exact factors rather than rounded ones, so converting from and back to the original unit returns the number you started with. Temperature is handled as an affine conversion, not a simple multiplication, which is where most quick converters go wrong.',
    faq: [
      { q: 'How many decimal places are kept?', a: 'Full double precision internally, with sensible rounding for display. The exact value is available if you need to copy it.' },
      { q: 'Why does my locale show a comma as the decimal mark?', a: 'Because that is how your language writes numbers. German writes 1.234,5 where English writes 1,234.5. The tool follows your page language.' },
      { q: 'Are US and imperial gallons the same?', a: 'No, and the difference is large. A US gallon is 3.785 litres, an imperial gallon is 4.546. Both are listed separately.' },
    ],
  },

  about: {
    title: 'About Rocking Tools',
    description: 'Who builds Rocking Tools, why every utility runs client-side, and how a free ad-supported tool site stays private by design.',
    keywords: 'about rocking tools, privacy first tools, client side web tools',
    h1: 'About Rocking Tools',
    intro: 'A small collection of browser utilities built on one rule: the work happens on your device, not ours.',
    bullets: [
      'Every tool is client-side — there is no upload endpoint to leak',
      'Free to use, funded by clearly labelled advertising',
      'Open about what we collect, which is very little',
    ],
    bodyHeading: 'Why client-side',
    body: 'The usual free-tool business model is to take your file, process it on a server, and keep it long enough to be useful to someone. Running the same work in the browser removes that trade entirely. The page loads, the code runs locally, and your data has nowhere to go.',
    faq: [
      { q: 'How is the site funded?', a: 'Advertising through Google AdSense, shown in labelled slots between content. That is the whole business model — there is no paid tier and nothing is sold on.' },
      { q: 'What data do you collect?', a: 'Aggregate analytics about page visits, and whatever the advertising provider collects under the consent you give. Your files and inputs are never part of that.' },
      { q: 'Can I request a new tool?', a: 'Yes. The contact page reaches us directly, and requests genuinely do shape what gets built next.' },
    ],
  },

  faq: {
    title: 'Frequently Asked Questions',
    description: 'Answers about privacy, file handling, accuracy, offline use, advertising, and language support across all the tools on Rocking Tools.',
    keywords: 'rocking tools faq, online tools privacy, are online tools safe',
    h1: 'Frequently Asked Questions',
    intro: 'The questions that come up most often about how these tools work, what happens to your data, and what the site does and does not do.',
    bullets: [
      'Privacy and file handling explained plainly',
      'How accuracy is achieved without a server',
      'What the ads do and how consent works',
    ],
    bodyHeading: 'Still stuck?',
    body: 'If your question is not answered below, the contact page goes straight to a person. Bug reports with the browser and operating system you were using are especially welcome, because most rendering problems are specific to one combination.',
    faq: [
      { q: 'Do I need an account?', a: 'No. There is no sign-up anywhere on the site and no tool is gated behind one.' },
      { q: 'Do the tools work offline?', a: 'Largely yes. Once a page has loaded, the tool runs from code already in the browser. A refresh will need the network again.' },
      { q: 'Why do I see ads?', a: 'They pay for hosting and development so the tools can stay free with no limits. Ad slots are labelled and kept out of the working area of each tool.' },
      { q: 'Which languages is the site available in?', a: 'The home page and every tool page are published in English, Spanish, French, German, Brazilian Portuguese, Hindi, Indonesian, and Japanese. Numbers, currency, and dates follow your chosen language.' },
    ],
  },
}
