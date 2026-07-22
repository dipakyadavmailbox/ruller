const DAY_MS = 24 * 60 * 60 * 1000

function addDays(date, days) {
  return new Date(date.getTime() + days * DAY_MS)
}

/**
 * Naegele's rule: due date = last menstrual period (LMP) + 280 days,
 * adjusted for an atypical cycle length (280 days assumes a 28-day cycle).
 */
export function calcDueDateFromLMP(lmpDate, cycleLength = 28) {
  const cycleAdjustment = cycleLength - 28
  return addDays(lmpDate, 280 + cycleAdjustment)
}

export function calcDueDateFromConception(conceptionDate) {
  return addDays(conceptionDate, 266)
}

export function calcGestationalAge(lmpDate, today = new Date()) {
  const days = Math.floor((today.getTime() - lmpDate.getTime()) / DAY_MS)
  const weeks = Math.floor(days / 7)
  const remainderDays = days % 7
  return { weeks, days: remainderDays, totalDays: days }
}

export function calcTrimester(weeks) {
  if (weeks < 13) return 1
  if (weeks < 27) return 2
  return 3
}

/**
 * Ovulation typically occurs ~14 days before the next period, regardless of
 * total cycle length (the luteal phase is the more fixed part of the cycle).
 * The fertile window is the ~5 days before ovulation plus ovulation day.
 */
export function calcOvulation(lastPeriodStart, cycleLength = 28) {
  const nextPeriod = addDays(lastPeriodStart, cycleLength)
  const ovulationDate = addDays(nextPeriod, -14)
  const fertileWindowStart = addDays(ovulationDate, -5)
  const fertileWindowEnd = ovulationDate
  return { ovulationDate, fertileWindowStart, fertileWindowEnd, nextPeriod }
}

export function formatDate(date) {
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
}
