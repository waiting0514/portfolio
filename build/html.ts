/**
 * Path and markup helpers shared by the static-routes plugin and the prerender step.
 *
 * `build/prerender.ts` runs directly in Node (type stripping), so this module must only use
 * relative `.ts` imports and must not import app code from `src/`.
 */

/** The empty mount point in the built `index.html`. */
export const APP_CONTAINER = '<div id="app"></div>'

/** `/` → `index.html`, `/en/projects/x` → `en/projects/x/index.html`. */
export function outputFileName(path: string): string {
  const relative = path.replace(/^\/+|\/+$/g, '')
  return relative ? `${relative}/index.html` : 'index.html'
}

/**
 * The path the browser is on when it loads a page's static HTML. GitHub Pages serves
 * `about/index.html` at `/about/` (and redirects `/about` there), so prerendering at the same
 * path keeps every route-derived link identical between the HTML and the hydrated app.
 */
export function routePath(path: string): string {
  const relative = path.replace(/^\/+|\/+$/g, '')
  return relative ? `/${relative}/` : '/'
}

/**
 * Puts server-rendered app markup inside the empty mount point, recording the path it was
 * rendered for so the client only hydrates it at that URL (see `src/main.ts`).
 */
export function injectAppHtml(html: string, appHtml: string, path: string): string {
  if (!html.includes(APP_CONTAINER)) {
    throw new Error(`prerender: ${APP_CONTAINER} was not found in the page HTML`)
  }
  return html.replace(
    APP_CONTAINER,
    () => `<div id="app" data-prerendered-path="${path}">${appHtml}</div>`,
  )
}
