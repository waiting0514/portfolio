import { describe, expect, it } from 'vitest'
import { APP_CONTAINER, injectAppHtml, outputFileName, routePath } from './html.ts'

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

describe('routePath', () => {
  it.each([
    ['/', '/'],
    ['/en', '/en/'],
    ['/about', '/about/'],
    ['/en/projects/some-slug', '/en/projects/some-slug/'],
  ])('renders %s at the directory URL %s', (path, expected) => {
    expect(routePath(path)).toBe(expected)
  })
})

describe('injectAppHtml', () => {
  const page = `<body>\n    ${APP_CONTAINER}\n    <script type="module" src="/a.js"></script>\n  </body>`

  it('puts the rendered markup inside the mount point', () => {
    const html = injectAppHtml(page, '<main><h1>Title</h1></main>', '/about/')
    expect(html).toContain(
      '<div id="app" data-prerendered-path="/about/"><main><h1>Title</h1></main></div>',
    )
    expect(html).toContain('<script type="module" src="/a.js"></script>')
  })

  it('keeps replacement patterns in the markup literally', () => {
    expect(injectAppHtml(page, '<p>$& $1</p>', '/')).toContain('<p>$& $1</p>')
  })

  it('fails when the page has no empty mount point', () => {
    expect(() => injectAppHtml('<body></body>', '<p></p>', '/')).toThrow(/was not found/)
  })
})
