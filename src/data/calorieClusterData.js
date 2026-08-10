// ─── Calorie Cluster Data (YMYL Health Compliance) ───────────────────────────

export const CALORIE_CLUSTER_DATA = [
  {
    slug: 'bmr-calculator',
    name: 'BMR (Basal Metabolic Rate)',
    title: 'BMR Calculator — Basal Metabolic Rate Formula & Science | Rocking Tools',
    description: 'Calculate your Basal Metabolic Rate (BMR) using the Mifflin-St Jeor equation. Learn how many calories your body burns strictly at rest.',
    keywords: 'bmr calculator, basal metabolic rate calculator, mifflin st jeor formula, bmr formula, resting metabolic rate',
    intro: 'Your Basal Metabolic Rate (BMR) is the baseline number of calories your body burns per day to sustain vital life functions (heartbeat, respiration, cellular repair) at complete rest.',
    formulaName: 'Mifflin-St Jeor Equation (Gold Standard)',
    formulaMath: 'BMR (Men) = (10 × W_kg) + (6.25 × H_cm) - (5 × Age) + 5\nBMR (Women) = (10 × W_kg) + (6.25 × H_cm) - (5 × Age) - 161',
    formulaExplanation: 'Published in 1990 by Mifflin et al., the Mifflin-St Jeor equation is clinically recognized as the most accurate non-laboratory method for estimating BMR in healthy adults.',
    references: [
      { citation: 'Mifflin, M. D., et al. (1990). "A new predictive equation for resting energy expenditure in healthy individuals." The American Journal of Clinical Nutrition, 51(2), 241-247.', link: '#' },
      { citation: 'Frankenfield, D., et al. (2005). "Comparison of predictive equations for resting metabolic rate in healthy nonobese and obese adults." Journal of the American Dietetic Association, 105(5), 775-789.', link: '#' },
    ],
    limitations: 'BMR formulas estimate energy expenditure for average body compositions. Highly muscular athletes may burn significantly more calories at rest, while individuals with low muscle mass or thyroid disorders may have a lower actual BMR than predicted.',
    faqs: [
      { q: 'What is the difference between BMR and RMR?', a: 'BMR (Basal Metabolic Rate) is measured under strict laboratory conditions immediately upon waking after 8 hours of sleep and 12 hours of fasting. RMR (Resting Metabolic Rate) is less restrictive but typically yields values within 5-10% of BMR.' },
      { q: 'Can you eat below your BMR?', a: 'Eating significantly below your BMR for extended periods is generally discouraged by dietitians because it can trigger muscle wasting, hormonal disruption, and extreme lethargy. Weight loss plans should target a deficit relative to TDEE, not BMR.' },
    ],
    relatedSlugs: ['tdee-calculator', 'macro-calculator', 'protein-calculator', 'calorie-deficit-calculator'],
  },
  {
    slug: 'tdee-calculator',
    name: 'TDEE (Total Daily Energy Expenditure)',
    title: 'TDEE Calculator — Total Daily Energy Expenditure | Rocking Tools',
    description: 'Calculate your TDEE (Total Daily Energy Expenditure) based on your activity level. Learn your maintenance calories for weight loss, maintenance, or muscle gain.',
    keywords: 'tdee calculator, total daily energy expenditure, maintenance calories calculator, how to calculate tdee, activity multiplier tdee',
    intro: 'Total Daily Energy Expenditure (TDEE) is the total number of calories you burn each day, combining your Basal Metabolic Rate (BMR) with non-exercise activity thermogenesis (NEAT), exercise thermogenesis (EAT), and the thermic effect of food (TEF).',
    formulaName: 'TDEE Physical Activity Level (PAL) Multiplier',
    formulaMath: 'TDEE = BMR × Activity Factor\n• Sedentary (1.2)\n• Lightly Active (1.375)\n• Moderately Active (1.55)\n• Very Active (1.725)\n• Extra Active (1.9)',
    formulaExplanation: 'TDEE multiplies your baseline BMR by a validated activity multiplier to reflect daily movement and exercise energy expenditure.',
    references: [
      { citation: 'FAO/WHO/UNU Expert Consultation (2004). "Human energy requirements." WHO Technical Report Series, No. 1.', link: '#' },
      { citation: 'Westerterp, K. R. (2013). "Physical activity and physical activity induced energy expenditure in humans." Current Opinion in Clinical Nutrition & Metabolic Care, 16(6), 635-642.', link: '#' },
    ],
    limitations: 'Activity multipliers rely on self-reported activity levels, which humans frequently overestimate. Fitness trackers and heart-rate monitors also carry an error margin of 10-20%. Track body weight over 2-3 weeks to confirm your true empirical maintenance baseline.',
    faqs: [
      { q: 'How accurate is a TDEE calculator?', a: 'TDEE calculators provide a reliable scientific estimate within ±10% for most individuals. Tracking daily food intake and average weekly scale weight allows you to fine-tune your actual empirical maintenance TDEE.' },
      { q: 'What is the difference between BMR and TDEE?', a: 'BMR is the energy burned if you stay in bed all day doing nothing. TDEE includes all daily walking, working, chores, digesting food, and exercise workouts.' },
    ],
    relatedSlugs: ['bmr-calculator', 'calorie-deficit-calculator', 'macro-calculator', 'protein-calculator'],
  },
  {
    slug: 'macro-calculator',
    name: 'Macro Split & Ratio',
    title: 'Macro Calculator — Macronutrient Split (Protein, Carbs, Fats) | Rocking Tools',
    description: 'Calculate your target macronutrient ratio (protein, carbohydrates, and fats in grams) customized for weight loss, bodybuilding, keto, or balanced health.',
    keywords: 'macro calculator, macronutrient calculator, protein carbs fat split, macro ratio calculator, bodybuilding macro calculator',
    intro: 'Macronutrients (protein, carbohydrates, and dietary fats) make up all calorie intake. Optimizing your macro split helps preserve lean body mass, regulate energy, and optimize athletic performance.',
    formulaName: 'Caloric Equivalent Macro Standard',
    formulaMath: 'Protein = 4 kcal/gram   |   Carbohydrates = 4 kcal/gram   |   Fats = 9 kcal/gram\nBalanced Split: 30% Protein / 40% Carbs / 30% Fat\nLow Carb / Cut: 40% Protein / 30% Carbs / 30% Fat',
    formulaExplanation: 'Every gram of protein and carbohydrate provides 4 calories, while dietary fat provides 9 calories per gram. The calculator converts percentage target splits into precise daily gram recommendations.',
    references: [
      { citation: 'Jäger, R., et al. (2017). "International Society of Sports Nutrition Position Stand: protein and exercise." Journal of the International Society of Sports Nutrition, 14(1), 20.', link: '#' },
      { citation: 'Institute of Medicine (2005). "Dietary Reference Intakes for Energy, Carbohydrate, Fiber, Fat, Fatty Acids, Cholesterol, Protein, and Amino Acids." National Academies Press.', link: '#' },
    ],
    limitations: 'Macro needs vary according to sport, metabolic health, and personal tolerance. Individuals with insulin resistance may benefit from lower carbohydrate ratios, while endurance athletes require higher carbohydrate availability.',
    faqs: [
      { q: 'What is a balanced macro ratio for beginners?', a: 'A standard balanced split is 30% protein, 40% carbohydrates, and 30% healthy fats, providing sufficient protein for recovery while supporting energy for daily exercise.' },
    ],
    relatedSlugs: ['tdee-calculator', 'protein-calculator', 'calorie-deficit-calculator', 'bmr-calculator'],
  },
  {
    slug: 'protein-calculator',
    name: 'Daily Protein Intake',
    title: 'Protein Calculator — Optimal Daily Protein Intake | Rocking Tools',
    description: 'Calculate your daily protein requirements based on body weight, fitness goals, and training intensity (1.6g to 2.2g per kg for muscle building).',
    keywords: 'protein calculator, daily protein intake, how much protein per day, protein requirement calculator, protein for muscle growth',
    intro: 'Protein is essential for muscle tissue repair, enzyme synthesis, immune function, and satiety during weight loss.',
    formulaName: 'ISSN & ACSM Body-Weight Protein Standards',
    formulaMath: 'General Health: 0.8g per kg body weight\nActive / Endurance: 1.2g - 1.4g per kg body weight\nMuscle Gain / Strength: 1.6g - 2.2g per kg body weight (0.7g - 1.0g per lb)',
    formulaExplanation: 'Scientific consensus from the International Society of Sports Nutrition (ISSN) recommends 1.4–2.2 grams of protein per kilogram of body weight for active and resistance-trained individuals.',
    references: [
      { citation: 'Morton, R. W., et al. (2018). "A systematic review, meta-analysis and meta-regression of the effect of protein supplementation on resistance training-induced gains in muscle mass and strength in healthy adults." British Journal of Sports Medicine, 52(6), 376-384.', link: '#' },
    ],
    limitations: 'Individuals with pre-existing kidney disease or renal impairment should consult their nephrologist before increasing dietary protein intake.',
    faqs: [
      { q: 'How much protein do I need to build muscle?', a: 'Research shows optimal muscle protein synthesis is achieved with 1.6 to 2.2 grams of protein per kilogram of body weight (0.7 to 1.0 g/lb) per day when combined with progressive resistance training.' },
    ],
    relatedSlugs: ['macro-calculator', 'tdee-calculator', 'calorie-deficit-calculator', 'bmr-calculator'],
  },
  {
    slug: 'calorie-deficit-calculator',
    name: 'Calorie Deficit & Weight Loss',
    title: 'Calorie Deficit Calculator — Safe Weight Loss & Fat Loss Target | Rocking Tools',
    description: 'Calculate your daily calorie deficit target for sustainable, safe fat loss (300-500 kcal deficit per day) while preserving muscle mass.',
    keywords: 'calorie deficit calculator, weight loss calorie calculator, fat loss deficit, safe calorie deficit, how many calories to lose weight',
    intro: 'A calorie deficit occurs when you consume fewer calories than your TDEE burns. Creating a structured, moderate deficit encourages your body to utilize stored body fat for energy.',
    formulaName: '3,500 Calorie Rule / Energy Balance Dynamics',
    formulaMath: 'Daily Target = TDEE - Deficit\nMild Deficit (10-15%): ~300-400 kcal/day (Safe ~0.5 lb/week loss)\nStandard Deficit (20%): ~500 kcal/day (Safe ~1.0 lb/week loss)',
    formulaExplanation: 'While 1 pound of adipose tissue contains approximately 3,500 calories of stored energy, body weight loss is dynamic and slows as total mass decreases.',
    references: [
      { citation: 'Hall, K. D., et al. (2011). "Quantification of the effect of energy imbalance on bodyweight." The Lancet, 378(9793), 826-837.', link: '#' },
    ],
    limitations: 'Extreme deficits (greater than 1,000 kcal/day or eating under 1,200 kcal/day without medical supervision) risk muscle loss, nutrient deficiencies, thyroid adaptation, and rebound weight gain.',
    faqs: [
      { q: 'What is a safe daily calorie deficit?', a: 'A moderate deficit of 300 to 500 calories below your TDEE is widely recommended for safe, sustainable fat loss of 0.5 to 1.0 pound per week.' },
    ],
    relatedSlugs: ['tdee-calculator', 'bmr-calculator', 'macro-calculator', 'protein-calculator'],
  },
]

export function getCalorieToolBySlug(slug) {
  return CALORIE_CLUSTER_DATA.find((c) => c.slug === slug)
}
