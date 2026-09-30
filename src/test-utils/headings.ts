/**
 * Heading levels found in a container, in document order, e.g. `[1, 2, 3, 3, 2]`.
 */
export function headingLevels(root: Element): number[] {
  return [...root.querySelectorAll('h1, h2, h3, h4, h5, h6')].map((heading) =>
    Number(heading.tagName.slice(1)),
  )
}

/** True when no heading skips a level on the way down (h1 → h3 is a skip; h3 → h2 is fine). */
export function hasNoSkippedLevels(levels: number[]): boolean {
  return levels.every((level, index) => index === 0 || level <= (levels[index - 1] ?? 0) + 1)
}
