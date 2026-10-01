/**
 * Vite plugin: writes one HTML file per known route, a `404.html` SPA fallback, `sitemap.xml`
 * and `robots.txt`.
 *
 * GitHub Pages has no server-side rewrites. Emitting `projects/<slug>/index.html` (and so on)
 * means every known URL answers 200 with page-specific metadata that crawlers and social
 * previews can read without running JavaScript; `build/prerender.ts` then fills in the page
 * content. Unknown URLs get `404.html`, which boots the SPA so the router can render the
 * site's own Not Found page.
 */
import type { Plugin } from 'vite'
import { projects, SLUG_PATTERN } from '../src/data/projects.ts'
import {
  buildPageHead,
  describePage,
  getStaticPages,
  headTags,
  type PageHead,
} from '../src/utils/seo.ts'
import { APP_CONTAINER, outputFileName } from './html.ts'

/** Returns a problem per invalid or duplicated slug; empty when every slug is fine. */
export function validateSlugs(slugs: readonly string[]): string[] {
  const problems: string[] = []
  const seen = new Set<string>()
  for (const slug of slugs) {
    if (!SLUG_PATTERN.test(slug)) problems.push(`Invalid project slug "${slug}"`)
    if (seen.has(slug)) problems.push(`Duplicate project slug "${slug}"`)
    seen.add(slug)
  }
  return problems
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

/** Tags this plugin owns; they are removed from the template before page tags are added. */
const MANAGED_TAGS = [
  /<title>[\s\S]*?<\/title>\s*/g,
  /<meta\b[^>]*\b(?:name|property)="(?:description|robots|twitter:[\w:]+|og:[\w:]+)"[^>]*>\s*/g,
  /<link\b[^>]*\brel="(?:canonical|alternate)"[^>]*>\s*/g,
]

export function renderHeadTags(head: PageHead): string {
  const meta = (attribute: string, key: string, content: string) =>
    `<meta ${attribute}="${key}" content="${escapeHtml(content)}" />`

  return [
    `<title>${escapeHtml(head.title)}</title>`,
    ...headTags(head).flatMap(({ attribute, key, content }) =>
      content === null ? [] : [meta(attribute, key, content)],
    ),
    ...(head.url ? [`<link rel="canonical" href="${escapeHtml(head.url)}" />`] : []),
    ...head.alternates.map(
      ({ hreflang, href }) =>
        `<link rel="alternate" hreflang="${hreflang}" href="${escapeHtml(href)}" />`,
    ),
  ].join('\n    ')
}

/** Replaces `<html lang>` and every managed head tag in the built `index.html`. */
export function renderPageHtml(template: string, head: PageHead): string {
  const withoutManagedTags = MANAGED_TAGS.reduce((html, tag) => html.replace(tag, ''), template)
  return withoutManagedTags
    .replace(/<html\b[^>]*>/, `<html lang="${head.htmlLang}">`)
    .replace('</head>', `  ${renderHeadTags(head)}\n  </head>`)
}

/** One `<url>` per indexable page, at its canonical URL, with its language alternates. */
export function renderSitemap(heads: readonly PageHead[]): string {
  const urls = heads
    .filter((head) => head.indexable && head.url)
    .map((head) =>
      [
        '  <url>',
        `    <loc>${escapeHtml(head.url!)}</loc>`,
        ...head.alternates.map(
          ({ hreflang, href }) =>
            `    <xhtml:link rel="alternate" hreflang="${hreflang}" href="${escapeHtml(href)}" />`,
        ),
        '  </url>',
      ].join('\n'),
    )

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...urls,
    '</urlset>',
    '',
  ].join('\n')
}

/**
 * Crawlers only read `/robots.txt` at the host root, so on a project site this file is
 * informational; the sitemap still has to be submitted in the search engines' webmaster tools.
 */
export function renderRobots(siteUrl: string): string {
  const root = siteUrl.endsWith('/') ? siteUrl : `${siteUrl}/`
  return ['User-agent: *', 'Allow: /', '', `Sitemap: ${root}sitemap.xml`, ''].join('\n')
}

/** Shown only by `404.html`, the one page that is not prerendered. */
const NOSCRIPT = '<noscript>This page needs JavaScript. 本頁需要啟用 JavaScript。</noscript>'

interface StaticRoutesOptions {
  /** Absolute site URL including the base path, e.g. `https://user.github.io/portfolio/`. */
  siteUrl?: string
}

export function staticRoutes(options: StaticRoutesOptions = {}): Plugin {
  let siteUrl = options.siteUrl ?? ''

  return {
    name: 'portfolio:static-routes',
    // The SSR build of `src/entry-server.ts` has no index.html; it only feeds the prerender step.
    apply: (_config, { command, isSsrBuild }) => command === 'build' && !isSsrBuild,

    configResolved(config) {
      // Local builds have no public URL; `vite preview` serves on port 4173 by default.
      siteUrl ||= `http://localhost:4173${config.base}`
    },

    buildStart() {
      const problems = validateSlugs(projects.map((project) => project.slug))
      if (problems.length) this.error(problems.join('\n'))
    },

    generateBundle: {
      // Vite emits the processed index.html in its own generateBundle hook; run after it.
      order: 'post',
      handler(_options, bundle) {
        const entry = bundle['index.html']
        if (entry?.type !== 'asset' || typeof entry.source !== 'string') {
          this.error('static-routes: index.html was not found in the bundle')
        }
        const template = entry.source

        const pages = getStaticPages()
        const heads = pages.map((page) => buildPageHead(page, siteUrl))
        pages.forEach((page, index) => {
          const fileName = outputFileName(page.path)
          const source = renderPageHtml(template, heads[index]!)
          if (fileName === 'index.html') entry.source = source
          else this.emitFile({ type: 'asset', fileName, source })
        })

        this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: renderSitemap(heads) })
        this.emitFile({ type: 'asset', fileName: 'robots.txt', source: renderRobots(siteUrl) })

        const notFound = buildPageHead(describePage({ page: 'not-found' }, 'zh-TW'), siteUrl)
        this.emitFile({
          type: 'asset',
          fileName: '404.html',
          source: renderPageHtml(template, notFound).replace(
            APP_CONTAINER,
            `${APP_CONTAINER}\n    ${NOSCRIPT}`,
          ),
        })
      },
    },
  }
}
