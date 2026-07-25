const DAY_MS = 24 * 60 * 60 * 1000

function addDays(date, days) {
  return new Date(date.getTime() + days * DAY_MS)
}

export function calcDueDateFromLMP(lmpDate, cycleLength = 28) {
  const cycleAdjustment = cycleLength - 28
  return addDays(lmpDate, 280 + cycleAdjustment)
}

export function calcDueDateFromConception(conceptionDate) {
  return addDays(conceptionDate, 266)
}

export function calcDueDateFromIVF(transferDate, embryoAgeDays = 5) {
  const lmpEquivalent = addDays(transferDate, -(embryoAgeDays + 14))
  return addDays(lmpEquivalent, 280)
}

export function calcDueDateFromUltrasound(scanDate, scanWeeks, scanDays) {
  const totalScanDays = scanWeeks * 7 + scanDays
  const lmpEquivalent = addDays(scanDate, -totalScanDays)
  return addDays(lmpEquivalent, 280)
}

export function calcGestationalAge(lmpEquivalent, today = new Date()) {
  const totalDays = Math.floor((today.getTime() - lmpEquivalent.getTime()) / DAY_MS)
  const weeks = Math.floor(totalDays / 7)
  const remainderDays = totalDays % 7
  return { weeks, days: remainderDays, totalDays }
}

export function calcTrimester(weeks) {
  if (weeks < 13) return 1
  if (weeks < 27) return 2
  return 3
}

export function calcDaysRemaining(dueDate, today = new Date()) {
  const ms = dueDate.getTime() - today.getTime()
  return Math.max(0, Math.ceil(ms / DAY_MS))
}

export function getPregnancyMilestones(lmpEquivalent) {
  return [
    { week: 4, name: 'Implantation & Positive Test', date: addDays(lmpEquivalent, 4 * 7) },
    { week: 6, name: 'Heartbeat Detectable', date: addDays(lmpEquivalent, 6 * 7) },
    { week: 10, name: 'First Prenatal Visit', date: addDays(lmpEquivalent, 10 * 7) },
    { week: 12, name: 'End of 1st Trimester', date: addDays(lmpEquivalent, 12 * 7) },
    { week: 16, name: 'Prenatal Screening (Quad Test)', date: addDays(lmpEquivalent, 16 * 7) },
    { week: 18, name: 'Anatomy Scan & First Kicks', date: addDays(lmpEquivalent, 18 * 7) },
    { week: 24, name: 'Age of Viability', date: addDays(lmpEquivalent, 24 * 7) },
    { week: 27, name: 'End of 2nd Trimester', date: addDays(lmpEquivalent, 27 * 7) },
    { week: 28, name: 'Glucose Tolerance Test', date: addDays(lmpEquivalent, 28 * 7) },
    { week: 32, name: 'Growth Ultrasound', date: addDays(lmpEquivalent, 32 * 7) },
    { week: 36, name: 'Group B Strep Test', date: addDays(lmpEquivalent, 36 * 7) },
    { week: 37, name: 'Early Full Term', date: addDays(lmpEquivalent, 37 * 7) },
    { week: 40, name: 'Estimated Due Date', date: addDays(lmpEquivalent, 40 * 7) },
  ]
}

export function calcOvulation(lastPeriodStart, cycleLength = 28) {
  const nextPeriod = addDays(lastPeriodStart, cycleLength)
  const ovulationDate = addDays(nextPeriod, -14)
  const fertileWindowStart = addDays(ovulationDate, -5)
  const fertileWindowEnd = ovulationDate
  return { ovulationDate, fertileWindowStart, fertileWindowEnd, nextPeriod }
}

export function formatDate(date) {
  if (!date || isNaN(date.getTime())) return '—'
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
}

// Week-by-week development data
// size: a fruit/veggie comparison, weightG: approximate fetal weight in grams
export const WEEKLY_DEVELOPMENT = {
  4:  { size: 'Poppy seed', weightG: 0.001, highlight: 'Neural tube forming. Heart begins to beat.' },
  5:  { size: 'Sesame seed', weightG: 0.004, highlight: 'Brain and spinal cord developing. Heart now has 4 chambers.' },
  6:  { size: 'Lentil', weightG: 0.02, highlight: 'Heartbeat detectable via ultrasound. Arm and leg buds forming.' },
  7:  { size: 'Blueberry', weightG: 0.8, highlight: 'Brain growing rapidly. Hands and feet have paddle-like shapes.' },
  8:  { size: 'Raspberry', weightG: 1, highlight: 'Fingers are forming. Eyes becoming visible.' },
  9:  { size: 'Cherry', weightG: 2, highlight: 'All essential organs have begun to form. Ears are forming.' },
  10: { size: 'Strawberry', weightG: 4, highlight: 'Teeth are starting to form. Baby can swallow.' },
  11: { size: 'Lime', weightG: 7, highlight: 'Baby can make a fist. Reflexes are developing.' },
  12: { size: 'Plum', weightG: 14, highlight: 'End of 1st trimester! Organs are functional. Nails developing.' },
  13: { size: 'Peach', weightG: 23, highlight: 'Baby can suck its thumb. Vocal cords forming.' },
  14: { size: 'Lemon', weightG: 43, highlight: 'Baby can grasp, squint, frown. Kidneys producing urine.' },
  15: { size: 'Apple', weightG: 70, highlight: 'Baby can sense light. Taste buds forming.' },
  16: { size: 'Avocado', weightG: 100, highlight: 'Limbs are fully formed. Baby practices breathing movements.' },
  17: { size: 'Pear', weightG: 140, highlight: 'Sweat glands developing. Baby can hear sounds.' },
  18: { size: 'Bell pepper', weightG: 190, highlight: 'Baby is active! Kicks, rolls, and flips. Hearing is developed.' },
  19: { size: 'Mango', weightG: 240, highlight: 'Baby is covered in vernix (protective coating). Senses rapidly developing.' },
  20: { size: 'Banana', weightG: 300, highlight: 'Halfway point! Baby can swallow and may suck its thumb.' },
  21: { size: 'Carrot', weightG: 360, highlight: 'Baby sleeps and wakes on a regular schedule.' },
  22: { size: 'Papaya', weightG: 430, highlight: 'Lips and eyebrows visible. Baby may respond to your voice.' },
  23: { size: 'Grapefruit', weightG: 500, highlight: 'Lungs developing with branching bronchioles.' },
  24: { size: 'Ear of corn', weightG: 600, highlight: 'Age of viability — baby could survive with specialist care.' },
  25: { size: 'Cauliflower', weightG: 660, highlight: 'Baby develops more fat stores. Hair is growing.' },
  26: { size: 'Scallion', weightG: 760, highlight: 'Eyes can open and close. Baby starts practicing breathing.' },
  27: { size: 'Head of lettuce', weightG: 875, highlight: 'End of 2nd trimester. Brain is very active.' },
  28: { size: 'Eggplant', weightG: 1000, highlight: '3rd trimester! Baby can blink. REM sleep is occurring.' },
  29: { size: 'Butternut squash', weightG: 1150, highlight: 'Muscles and lungs continue maturing. Baby gains more fat.' },
  30: { size: 'Cabbage', weightG: 1300, highlight: 'Baby can see and detect light changes from outside the womb.' },
  31: { size: 'Coconut', weightG: 1500, highlight: 'Major growth phase. Brain connections are being made.' },
  32: { size: 'Jicama', weightG: 1700, highlight: 'Baby practices breathing about 40 minutes per hour.' },
  33: { size: 'Pineapple', weightG: 1900, highlight: 'Bones are hardening except the skull. Antibodies being transferred.' },
  34: { size: 'Cantaloupe', weightG: 2100, highlight: 'Fingernails reach fingertips. Baby is getting into birth position.' },
  35: { size: 'Honeydew melon', weightG: 2400, highlight: 'Kidneys are fully developed. Liver processes some waste products.' },
  36: { size: 'Papaya', weightG: 2600, highlight: 'Baby drops into pelvis in preparation for birth.' },
  37: { size: 'Winter melon', weightG: 2900, highlight: 'Early full term! Lungs and brain continue developing.' },
  38: { size: 'Pumpkin (small)', weightG: 3100, highlight: 'Baby is practicing grasping movements for after birth.' },
  39: { size: 'Watermelon (small)', weightG: 3300, highlight: 'Full term! Baby is ready to meet the world.' },
  40: { size: 'Small watermelon', weightG: 3400, highlight: 'Estimated due date! Average length ~50cm, weight ~3.4kg.' },
}

export function getBabyInfo(weeks) {
  if (weeks < 4) return null
  const clamped = Math.min(40, Math.max(4, weeks))
  return WEEKLY_DEVELOPMENT[clamped] ?? WEEKLY_DEVELOPMENT[40]
}

// IOM recommended weight gain by pre-pregnancy BMI
export function getWeightGainRecommendation(bmi) {
  if (!bmi || bmi <= 0) return null
  if (bmi < 18.5) return { category: 'Underweight', minKg: 12.5, maxKg: 18, minLb: 28, maxLb: 40 }
  if (bmi < 25) return { category: 'Normal weight', minKg: 11.5, maxKg: 16, minLb: 25, maxLb: 35 }
  if (bmi < 30) return { category: 'Overweight', minKg: 7, maxKg: 11.5, minLb: 15, maxLb: 25 }
  return { category: 'Obese', minKg: 5, maxKg: 9, minLb: 11, maxLb: 20 }
}
