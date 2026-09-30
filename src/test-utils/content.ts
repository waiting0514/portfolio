/**
 * Returns the paths of every blank string inside a nested value, e.g. `['nav.home']`.
 * Used to assert that translated content has no empty entries.
 */
export function findBlankStrings(value: unknown, path = ''): string[] {
  if (typeof value === 'string') {
    return value.trim() === '' ? [path] : []
  }

  if (Array.isArray(value)) {
    return value.flatMap((item, index) => findBlankStrings(item, `${path}[${index}]`))
  }

  if (value !== null && typeof value === 'object') {
    return Object.entries(value).flatMap(([key, child]) =>
      findBlankStrings(child, path ? `${path}.${key}` : key),
    )
  }

  return []
}
