/**
 * Vite plugin: writes one HTML file per known route, plus a `404.html` SPA fallback.
 *
 * GitHub Pages has no server-side rewrites. Emitting `projects/<slug>/index.html` (and so on)
 * means every known URL answers 200 with page-specific metadata that crawlers and social
 * previews can read without running JavaScript. Unknown URLs get `404.html`, which boots the
 * SPA so the router can render the site's own Not Found page.
 */
import type { Plugin } from 'vite'
import { projects, SLUG_PATTERN } from '../src/data/projects.ts'
import { buildPageHead, describePage, getStaticPages, type PageHead } from '../src/utils/seo.ts'

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

/** `/` → `index.html`, `/en/projects/x` → `en/projects/x/index.html`. */
export function outputFileName(path: string): string {
  const relative = path.replace(/^\/+|\/+$/g, '')
  return relative ? `${relative}/index.html` : 'index.html'
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
  /<meta\b[^>]*\b(?:name|property)="(?:description|robots|twitter:card|og:[\w:]+)"[^>]*>\s*/g,
  /<link\b[^>]*\brel="(?:canonical|alternate)"[^>]*>\s*/g,
]

export function renderHeadTags(head: PageHead): string {
  const meta = (attribute: string, key: string, content: string) =>
    `<meta ${attribute}="${key}" content="${escapeHtml(content)}" />`

  return [
    `<title>${escapeHtml(head.title)}</title>`,
    meta('name', 'description', head.description),
    meta('name', 'robots', head.indexable ? 'index, follow' : 'noindex'),
    meta('property', 'og:type', 'website'),
    meta('property', 'og:title', head.title),
    meta('property', 'og:description', head.description),
    ...(head.url ? [meta('property', 'og:url', head.url)] : []),
    meta('property', 'og:image', head.image),
    meta('property', 'og:locale', head.ogLocale),
    meta('name', 'twitter:card', 'summary_large_image'),
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

interface StaticRoutesOptions {
  /** Absolute site URL including the base path, e.g. `https://user.github.io/portfolio/`. */
  siteUrl?: string
}

export function staticRoutes(options: StaticRoutesOptions = {}): Plugin {
  let siteUrl = options.siteUrl ?? ''

  return {
    name: 'portfolio:static-routes',
    apply: 'build',

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

        for (const page of getStaticPages()) {
          const fileName = outputFileName(page.path)
          const source = renderPageHtml(template, buildPageHead(page, siteUrl))
          if (fileName === 'index.html') entry.source = source
          else this.emitFile({ type: 'asset', fileName, source })
        }

        const notFound = buildPageHead(describePage({ page: 'not-found' }, 'zh-TW'), siteUrl)
        this.emitFile({
          type: 'asset',
          fileName: '404.html',
          source: renderPageHtml(template, notFound),
        })
      },
    },
  }
}
