import { describe, expect, it } from 'vitest'
import { projects } from '../src/data/projects.ts'
import { buildPageHead, describePage, getStaticPages } from '../src/utils/seo.ts'
import { renderPageHtml, renderRobots, renderSitemap, validateSlugs } from './static-routes.ts'

const SITE = 'https://user.github.io/portfolio/'

const TEMPLATE = `<!doctype html>
<html lang="zh-Hant-TW">
  <head>
    <meta charset="UTF-8" />
    <title>Default</title>
    <meta
      name="description"
      content="Default description"
    />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Default" />
    <meta name="twitter:card" content="summary_large_image" />
    <script type="module" crossorigin src="/portfolio/assets/index.js"></script>
  </head>
  <body><div id="app"></div></body>
</html>`

function count(html: string, pattern: RegExp) {
  return html.match(pattern)?.length ?? 0
}

describe('validateSlugs', () => {
  it('accepts unique kebab-case slugs', () => {
    expect(validateSlugs(['a', 'large-file-upload', 'v2-app'])).toEqual([])
  })

  it('reports duplicates and invalid slugs', () => {
    expect(validateSlugs(['same', 'same', 'Bad Slug', 'trailing-'])).toEqual([
      'Duplicate project slug "same"',
      'Invalid project slug "Bad Slug"',
      'Invalid project slug "trailing-"',
    ])
  })
})

describe('renderPageHtml', () => {
  const head = buildPageHead(describePage({ page: 'about' }, 'en'), SITE)
  const html = renderPageHtml(TEMPLATE, head)

  it('sets the page language', () => {
    expect(html).toContain('<html lang="en">')
  })

  it('replaces managed tags instead of duplicating them', () => {
    expect(count(html, /<title>/g)).toBe(1)
    expect(count(html, /name="description"/g)).toBe(1)
    expect(count(html, /property="og:title"/g)).toBe(1)
    expect(count(html, /name="twitter:card"/g)).toBe(1)
    expect(count(html, /name="twitter:title"/g)).toBe(1)
    expect(html).not.toContain('Default description')
    expect(html).toContain(`<title>${head.title}</title>`)
  })

  it('writes canonical, Open Graph and hreflang alternates with absolute URLs', () => {
    expect(html).toContain(`<link rel="canonical" href="${SITE}en/about/" />`)
    expect(html).toContain(`<meta property="og:url" content="${SITE}en/about/" />`)
    expect(html).toContain(`<meta property="og:image" content="${SITE}og/default-og.png" />`)
    expect(html).toContain(`<link rel="alternate" hreflang="zh-Hant-TW" href="${SITE}about/" />`)
    expect(html).toContain(`<link rel="alternate" hreflang="x-default" href="${SITE}about/" />`)
  })

  it('keeps everything else in the template, including the app script', () => {
    expect(html).toContain('<meta charset="UTF-8" />')
    expect(html).toContain('src="/portfolio/assets/index.js"')
    expect(html).toContain('<div id="app"></div>')
  })

  it('escapes text that could break the markup', () => {
    const unsafe = { ...head, title: 'A "quoted" <title> & more' }
    const rendered = renderPageHtml(TEMPLATE, unsafe)
    expect(rendered).toContain('<title>A &quot;quoted&quot; &lt;title&gt; &amp; more</title>')
  })

  it('renders not-found pages as noindex without canonical or alternates', () => {
    const notFound = renderPageHtml(
      TEMPLATE,
      buildPageHead(describePage({ page: 'not-found' }, 'zh-TW'), SITE),
    )
    expect(notFound).toContain('content="noindex"')
    expect(notFound).not.toContain('rel="canonical"')
    expect(notFound).not.toContain('rel="alternate"')
    expect(notFound).not.toContain('og:url')
  })
})

describe('Twitter and og:type', () => {
  it('mirrors the Open Graph values in the Twitter tags', () => {
    const head = buildPageHead(describePage({ page: 'about' }, 'en'), SITE)
    const html = renderPageHtml(TEMPLATE, head)

    expect(html).toContain('<meta property="og:type" content="website" />')
    expect(html).toContain('<meta name="twitter:card" content="summary_large_image" />')
    expect(html).toContain(`<meta name="twitter:image" content="${head.image}" />`)
    expect(html).toContain(`<meta name="twitter:description" content="${head.description}" />`)
  })

  it('marks case studies as articles', () => {
    const slug = projects[0]!.slug
    const html = renderPageHtml(
      TEMPLATE,
      buildPageHead(describePage({ page: 'project', slug }, 'zh-TW'), SITE),
    )
    expect(html).toContain('<meta property="og:type" content="article" />')
  })
})

describe('renderSitemap', () => {
  const heads = getStaticPages().map((page) => buildPageHead(page, SITE))
  const notFound = buildPageHead(describePage({ page: 'not-found' }, 'zh-TW'), SITE)
  const sitemap = renderSitemap([...heads, notFound])

  it('lists every indexable page once, at its canonical URL', () => {
    expect(count(sitemap, /<url>/g)).toBe(heads.length)
    for (const head of heads) expect(sitemap).toContain(`<loc>${head.url}</loc>`)
    expect(sitemap).toContain(`<loc>${SITE}projects/${projects[0]!.slug}/</loc>`)
    expect(sitemap).not.toContain('404')
  })

  it('links the language alternates of each page', () => {
    expect(sitemap).toContain('xmlns:xhtml="http://www.w3.org/1999/xhtml"')
    expect(sitemap).toContain(
      `<xhtml:link rel="alternate" hreflang="en" href="${SITE}en/about/" />`,
    )
  })
})

describe('renderRobots', () => {
  it('allows crawling and points to the absolute sitemap URL', () => {
    const robots = renderRobots('https://user.github.io/portfolio')
    expect(robots).toContain('Sitemap: https://user.github.io/portfolio/sitemap.xml')
    expect(robots).toContain('Allow: /')
    expect(robots).not.toContain('Disallow')
  })
})
