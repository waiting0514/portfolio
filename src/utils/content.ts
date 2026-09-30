/**
 * Whether an optional content block has anything to render.
 * `undefined`, `null`, blank strings, empty arrays and objects whose fields are all empty
 * count as "no content", so the matching section can be omitted entirely.
 */
export function hasContent<T>(value: T | null | undefined): value is T {
  if (value === null || value === undefined) return false
  if (typeof value === 'string') return value.trim() !== ''
  if (Array.isArray(value)) return value.some((item) => hasContent(item))
  if (typeof value === 'object') return Object.values(value).some((item) => hasContent(item))
  return true
}
