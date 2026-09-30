/**
 * Resolves a file in `public/` against the deploy base path,
 * e.g. `images/a.svg` → `/portfolio/images/a.svg` on a GitHub Pages project site.
 */
export function assetUrl(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`
}
