// ─── Pregnancy Cluster Data (YMYL Health Compliance) ─────────────────────────

export const PREGNANCY_CLUSTER_DATA = [
  {
    slug: 'due-date-calculator',
    name: 'Estimated Due Date (EDD)',
    title: 'Due Date Calculator — Naegele’s Rule & Obstetric Science | Rocking Tools',
    description: 'Calculate your estimated due date (EDD) using Naegele’s Rule, LMP date, conception date, or IVF transfer. ACOG guidelines & trimester breakdown.',
    keywords: 'due date calculator, pregnancy due date calculator, naegele rule, edd calculator, pregnancy calendar, gestational age',
    intro: 'An Estimated Due Date (EDD) calculates the approximate 40-week (280-day) mark of pregnancy measured from the first day of your last menstrual period (LMP).',
    formulaName: 'Naegele’s Rule (Standard Obstetric Method)',
    formulaMath: 'EDD = LMP + 1 Year - 3 Months + 7 Days\n(For standard 28-day menstrual cycle)',
    formulaExplanation: 'First described by German obstetrician Franz Karl Naegele, this clinical rule assumes a 28-day cycle with ovulation occurring on day 14.',
    references: [
      { citation: 'ACOG Committee Opinion No. 700 (2017). "Methods for Estimating the Due Date." Obstetrics & Gynecology, 129(5), e150-e154.', link: '#' },
      { citation: 'Mongelli, M., et al. (1996). "Estimating the date of delivery: ultrasonographic versus menstrual date calculation." Lancet, 348(9033), 978.', link: '#' },
    ],
    limitations: 'Only 4% of babies are born on their exact estimated due date. Full-term delivery normally occurs anywhere between 37 weeks (early term) and 41 weeks + 6 days. First-trimester ultrasound dating (CRL measurement) supersedes LMP dating if there is a discrepancy of >5 days.',
    faqs: [
      { q: 'How accurate is a due date calculator?', a: 'LMP-based calculators provide an accurate baseline estimate. Obstetricians confirm or adjust your official EDD during your first prenatal crown-rump length (CRL) ultrasound scan.' },
      { q: 'How many weeks is a full-term pregnancy?', a: 'Full-term pregnancy is defined as 39 weeks 0 days through 40 weeks 6 days by the American College of Obstetricians and Gynecologists (ACOG).' },
    ],
    relatedSlugs: ['ovulation-calculator', 'conception-date-calculator', 'pregnancy-week-calculator', 'pregnancy-weight-gain-calculator'],
  },
  {
    slug: 'ovulation-calculator',
    name: 'Ovulation & Fertile Window',
    title: 'Ovulation Calculator & Fertile Window Finder | Rocking Tools',
    description: 'Calculate your upcoming ovulation date and 6-day fertile window based on cycle length. Maximize conception chances with medical timing guidance.',
    keywords: 'ovulation calculator, fertile window calculator, ovulation predictor, best days to conceive, luteal phase calculator',
    intro: 'Ovulation is the release of a mature egg from the ovary. Your fertile window comprises the 5 days before ovulation plus ovulation day itself.',
    formulaName: 'Luteal Phase Back-Calculation Method',
    formulaMath: 'Estimated Ovulation Day = Next Expected Period Date - Luteal Phase Length (~14 Days)\nFertile Window = Ovulation Day - 5 Days through Ovulation Day',
    formulaExplanation: 'While the follicular phase (before ovulation) varies between women, the luteal phase (after ovulation) is consistently 12–16 days (averaging 14 days) in healthy cycles.',
    references: [
      { citation: 'Wilcox, A. J., et al. (2000). "The timing of the fertile window in the menstrual cycle: day specific estimates from a prospective study." BMJ, 321(7271), 1259-1262.', link: '#' },
      { citation: 'Practice Committee of the American Society for Reproductive Medicine (2017). "Optimizing natural fertility: a committee opinion." Fertility and Sterility, 107(1), 52-58.', link: '#' },
    ],
    limitations: 'Calendar ovulation calculators provide mathematical estimates based on average cycle lengths. Stress, illness, hormonal imbalances, and PCOS can delay or prevent predictable ovulation. Confirming ovulation with LH urine test strips or basal body temperature (BBT) tracking is recommended.',
    faqs: [
      { q: 'How long does an egg survive after ovulation?', a: 'A released egg survives in the reproductive tract for approximately 12 to 24 hours. However, sperm can survive inside fertile cervical mucus for up to 5 days.' },
    ],
    relatedSlugs: ['due-date-calculator', 'conception-date-calculator', 'pregnancy-week-calculator', 'pregnancy-weight-gain-calculator'],
  },
  {
    slug: 'conception-date-calculator',
    name: 'Estimated Conception Date',
    title: 'Conception Date Calculator — Find Estimated Date of Conception | Rocking Tools',
    description: 'Calculate your likely conception date based on your estimated due date (EDD) or last menstrual period (LMP). Medical timing breakdown.',
    keywords: 'conception date calculator, when did i conceive, date of conception calculator, pregnancy conception timing',
    intro: 'Conception occurs when a sperm fertilizes an egg, typically within 24 hours following ovulation. This calculator estimates your probable conception window.',
    formulaName: 'Reverse Gestational Dating Formula',
    formulaMath: 'Estimated Conception Date = EDD - 266 Days (38 Weeks)\nAlternatively: Conception Date = LMP + 14 Days (for standard 28-day cycle)',
    formulaExplanation: 'Gestational age is calculated as 40 weeks (280 days) from LMP, but actual embryonic age (time since conception) is approximately 38 weeks (266 days).',
    references: [
      { citation: 'American College of Obstetricians and Gynecologists (ACOG). "How Your Fetus Grows During Pregnancy." Patient Education Frequently Asked Questions.', link: '#' },
    ],
    limitations: 'Because sperm can survive up to 5 days prior to ovulation, the exact intercourse date that resulted in pregnancy may differ slightly from the actual biological conception date.',
    faqs: [
      { q: 'Is conception date the same as the day of intercourse?', a: 'Not necessarily. Intercourse up to 5 days before ovulation can lead to fertilization, as sperm can live inside the female reproductive tract for several days awaiting egg release.' },
    ],
    relatedSlugs: ['due-date-calculator', 'ovulation-calculator', 'pregnancy-week-calculator', 'pregnancy-weight-gain-calculator'],
  },
  {
    slug: 'pregnancy-week-calculator',
    name: 'Pregnancy Week-by-Week',
    title: 'Pregnancy Week Calculator — Track Current Week & Trimester | Rocking Tools',
    description: 'Find your exact current week and day of pregnancy, trimester status, remaining days, and fetal development milestone benchmarks.',
    keywords: 'pregnancy week calculator, what week of pregnancy am i, pregnancy week by week, current pregnancy week, trimester calculator',
    intro: 'Track your exact gestational progress day by day, identify current trimester status, and understand upcoming prenatal milestones.',
    formulaName: 'Gestational Age Calculation',
    formulaMath: 'Gestational Age (Days) = Today’s Date - Last Menstrual Period Date\nWeeks = Gestational Age ÷ 7   |   Days = Gestational Age mod 7',
    formulaExplanation: 'Medical obstetrics counts pregnancy in completed weeks and days (e.g. 12 weeks + 4 days) starting from day 1 of the last menstrual cycle.',
    references: [
      { citation: 'Spong, C. Y. (2013). "Defining "term" pregnancy." JAMA, 309(23), 2445-2446.', link: '#' },
    ],
    limitations: 'Gestational week counts assume a standard 280-day timeline. Ultrasound measurements during prenatal appointments provide clinical validation.',
    faqs: [
      { q: 'What weeks define the three trimesters?', a: 'First Trimester: Weeks 1 through 12. Second Trimester: Weeks 13 through 27. Third Trimester: Week 28 through delivery.' },
    ],
    relatedSlugs: ['due-date-calculator', 'ovulation-calculator', 'conception-date-calculator', 'pregnancy-weight-gain-calculator'],
  },
  {
    slug: 'pregnancy-weight-gain-calculator',
    name: 'Pregnancy Weight Gain Range',
    title: 'Pregnancy Weight Gain Calculator — IOM Healthy Weight Range | Rocking Tools',
    description: 'Calculate healthy target pregnancy weight gain ranges based on pre-pregnancy BMI according to Institute of Medicine (IOM) clinical guidelines.',
    keywords: 'pregnancy weight gain calculator, healthy pregnancy weight gain, iom weight gain guidelines, pregnancy bmi weight gain',
    intro: 'Healthy weight gain during pregnancy supports fetal growth, placental development, and maternal energy reserves.',
    formulaName: 'Institute of Medicine (IOM 2009) Pregnancy Guidelines',
    formulaMath: '• Underweight (BMI < 18.5): Gain 28 - 40 lbs (12.5 - 18 kg)\n• Normal Weight (BMI 18.5 - 24.9): Gain 25 - 35 lbs (11.5 - 16 kg)\n• Overweight (BMI 25 - 29.9): Gain 15 - 25 lbs (7 - 11.5 kg)\n• Obese (BMI ≥ 30): Gain 11 - 20 lbs (5 - 9 kg)',
    formulaExplanation: 'The 2009 IOM Guidelines provide clinical target ranges tailored to pre-pregnancy Body Mass Index (BMI) to reduce risks of gestational diabetes, preeclampsia, and macrosomia.',
    references: [
      { citation: 'Institute of Medicine (IOM) & National Research Council (NRC) (2009). "Weight Gain During Pregnancy: Reexamining the Guidelines." National Academies Press.', link: '#' },
      { citation: 'ACOG Committee Opinion No. 548 (2013). "Weight Gain During Pregnancy." Obstetrics & Gynecology, 121(1), 210-212.', link: '#' },
    ],
    limitations: 'Weight gain rates vary significantly throughout pregnancy. Women carrying twins or multiples require higher target weight gain ranges managed directly by an OB-GYN.',
    faqs: [
      { q: 'How much weight should I gain in the first trimester?', a: 'In the first trimester, total expected weight gain is typically minimal (approx. 1 to 5 pounds total) due to morning sickness and early fetal size.' },
    ],
    relatedSlugs: ['due-date-calculator', 'pregnancy-week-calculator', 'ovulation-calculator', 'conception-date-calculator'],
  },
]

export function getPregnancyToolBySlug(slug) {
  return PREGNANCY_CLUSTER_DATA.find((p) => p.slug === slug)
}
