import { describe, expect, it } from 'vitest'
import { buildPageHead, describePage } from '../src/utils/seo.ts'
import { outputFileName, renderPageHtml, validateSlugs } from './static-routes.ts'

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

describe('outputFileName', () => {
  it.each([
    ['/', 'index.html'],
    ['/en', 'en/index.html'],
    ['/projects', 'projects/index.html'],
    ['/en/projects/some-slug', 'en/projects/some-slug/index.html'],
  ])('%s → %s', (path, fileName) => {
    expect(outputFileName(path)).toBe(fileName)
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
    expect(html).not.toContain('Default description')
    expect(html).toContain(`<title>${head.title}</title>`)
  })

  it('writes canonical, Open Graph and hreflang alternates with absolute URLs', () => {
    expect(html).toContain(`<link rel="canonical" href="${SITE}en/about/" />`)
    expect(html).toContain(`<meta property="og:url" content="${SITE}en/about/" />`)
    expect(html).toContain(`<meta property="og:image" content="${SITE}og-default.png" />`)
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
