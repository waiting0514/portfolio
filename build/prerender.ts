/**
 * Last build step: fills every public route's static HTML with its server-rendered content.
 *
 * Runs after `vite build` (which wrote each route's `dist/<path>/index.html` with the page head) and
 * `vite build --ssr src/entry-server.ts` (which wrote the render function to `dist-ssr/`).
 * Executed directly by Node, so it only imports Node built-ins, `./html.ts` and the SSR bundle.
 */
import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { injectAppHtml, outputFileName, routePath } from './html.ts'

interface ServerEntry {
  render(path: string): Promise<string>
  getStaticPages(): { path: string }[]
}

const root = resolve(import.meta.dirname, '..')
const entryUrl = pathToFileURL(resolve(root, 'dist-ssr/entry-server.js')).href
const { render, getStaticPages } = (await import(entryUrl)) as ServerEntry

const pages = getStaticPages()
for (const page of pages) {
  const file = resolve(root, 'dist', outputFileName(page.path))
  const html = await readFile(file, 'utf8')
  const path = routePath(page.path)
  await writeFile(file, injectAppHtml(html, await render(path), path))
}

console.log(`prerender: ${pages.length} pages rendered`)
