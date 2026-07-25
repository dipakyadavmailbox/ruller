// All physical math funnels through pixels-per-inch (PPI).
// 1 inch = 25.4 mm = 2.54 cm, by definition.

export const MM_PER_INCH = 25.4
export const CM_PER_INCH = 2.54

export function pxPerUnit(ppi, unit) {
  if (unit === 'in') return ppi
  if (unit === 'cm') return ppi / CM_PER_INCH
  if (unit === 'px') return 1 // 1 CSS pixel per px — no scaling
  return ppi / MM_PER_INCH // mm
}

export const UNITS = ['mm', 'cm', 'in', 'px']

// Reference objects used for the "match an object" calibration method.
// Widths are physical, in millimetres, along the dimension being matched.
export const REFERENCE_OBJECTS = [
  { id: 'card', label: 'Bank card / ID card (ISO ID-1)', mm: 85.6 },
  { id: 'a4', label: 'A4 sheet, short edge', mm: 210 },
  { id: 'letter', label: 'US Letter, short edge', mm: 215.9 },
  { id: 'dollar', label: 'US dollar bill, long edge', mm: 156.0 },
  { id: 'coin_quarter', label: 'US Quarter (diameter)', mm: 24.26 },
  { id: 'coin_euro', label: 'Euro coin (diameter)', mm: 23.25 },
]

export const DEFAULT_PPI = 96
