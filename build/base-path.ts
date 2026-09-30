/**
 * Normalizes a deploy base path so Vite always receives `/` or `/segment/`.
 *
 * GitHub Pages serves a user site from `/` and a project site from `/<repo>/`.
 * `actions/configure-pages` reports the latter as `/<repo>` (no trailing slash)
 * and the former as an empty string, so both shapes must be accepted.
 */
export function normalizeBasePath(input: string | undefined): string {
  const trimmed = input?.trim() ?? ''
  const segments = trimmed.split('/').filter(Boolean)

  return segments.length === 0 ? '/' : `/${segments.join('/')}/`
}
