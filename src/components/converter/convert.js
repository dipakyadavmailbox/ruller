import Papa from 'papaparse'
import yaml from 'js-yaml'

export const FORMATS = ['JSON', 'CSV', 'YAML']

function parseInput(text, format) {
  if (format === 'JSON') return JSON.parse(text)
  if (format === 'YAML') return yaml.load(text)
  if (format === 'CSV') {
    const result = Papa.parse(text.trim(), { header: true, dynamicTyping: true, skipEmptyLines: true })
    if (result.errors.length) throw new Error(result.errors[0].message)
    return result.data
  }
  throw new Error(`Unsupported input format: ${format}`)
}

function stringifyOutput(data, format) {
  if (format === 'JSON') return JSON.stringify(data, null, 2)
  if (format === 'YAML') return yaml.dump(data)
  if (format === 'CSV') {
    const rows = Array.isArray(data) ? data : [data]
    return Papa.unparse(rows)
  }
  throw new Error(`Unsupported output format: ${format}`)
}

export function convert(text, fromFormat, toFormat) {
  const data = parseInput(text, fromFormat)
  return stringifyOutput(data, toFormat)
}

export const SAMPLE_JSON = JSON.stringify(
  [
    { name: 'Alice', role: 'Engineer', years: 4 },
    { name: 'Bob', role: 'Designer', years: 2 },
  ],
  null,
  2
)
