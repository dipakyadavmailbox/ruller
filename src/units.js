// All physical math funnels through pixels-per-inch (PPI).
// 1 inch = 25.4 mm = 2.54 cm, by definition.

export const MM_PER_INCH = 25.4
export const CM_PER_INCH = 2.54

export function pxPerUnit(ppi, unit) {
  if (unit === 'in') return ppi
  if (unit === 'cm') return ppi / CM_PER_INCH
  return ppi / MM_PER_INCH // mm
}

// Reference objects used for the "match an object" calibration method.
// Widths are physical, in millimetres, along the dimension being matched.
export const REFERENCE_OBJECTS = [
  { id: 'card', label: 'Bank card / ID card (ISO ID-1)', mm: 85.6 },
  { id: 'a4', label: 'A4 sheet, short edge', mm: 210 },
  { id: 'letter', label: 'US Letter, short edge', mm: 215.9 },
  { id: 'dollar', label: 'US dollar bill, long edge', mm: 156.0 },
]

export const DEFAULT_PPI = 96
