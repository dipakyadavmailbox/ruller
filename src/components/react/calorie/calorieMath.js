export const ACTIVITY_LEVELS = [
  { id: 'sedentary', label: 'Sedentary (little/no exercise)', factor: 1.2 },
  { id: 'light', label: 'Light exercise (1-3 days/week)', factor: 1.375 },
  { id: 'moderate', label: 'Moderate exercise (3-5 days/week)', factor: 1.55 },
  { id: 'active', label: 'Heavy exercise (6-7 days/week)', factor: 1.725 },
  { id: 'athlete', label: 'Athlete (2x/day training)', factor: 1.9 },
]

export const GOALS = [
  { id: 'lose_fast', label: 'Lose weight (faster, ~1 lb/week)', delta: -500 },
  { id: 'lose_slow', label: 'Lose weight (gradual, ~0.5 lb/week)', delta: -250 },
  { id: 'maintain', label: 'Maintain weight', delta: 0 },
  { id: 'gain_slow', label: 'Gain weight (gradual)', delta: 250 },
  { id: 'gain_fast', label: 'Gain weight (faster)', delta: 500 },
]

export function lbToKg(lb) {
  return lb * 0.45359237
}
export function ftInToCm(ft, inches) {
  return (ft * 12 + inches) * 2.54
}

/**
 * Mifflin-St Jeor equation — the modern standard, generally more accurate
 * than the older Harris-Benedict formula.
 */
export function calcBMR({ sex, weightKg, heightCm, age }) {
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age
  return sex === 'male' ? base + 5 : base - 161
}

export function calcResult({ sex, weightKg, heightCm, age, activityFactor, goalDelta }) {
  const bmr = calcBMR({ sex, weightKg, heightCm, age })
  const tdee = bmr * activityFactor
  const targetCalories = Math.max(1000, tdee + goalDelta)

  // Macro split: protein prioritized for body-composition goals, fat at a
  // sane minimum, carbs fill the remainder.
  const proteinG = weightKg * 1.8
  const fatG = (targetCalories * 0.25) / 9
  const proteinCals = proteinG * 4
  const fatCals = fatG * 9
  const carbsCals = Math.max(0, targetCalories - proteinCals - fatCals)
  const carbsG = carbsCals / 4

  return {
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    targetCalories: Math.round(targetCalories),
    macros: {
      proteinG: Math.round(proteinG),
      fatG: Math.round(fatG),
      carbsG: Math.round(carbsG),
    },
  }
}
