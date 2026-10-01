import { describe, expect, it } from 'vitest'
import { profile } from '@/data/profile'
import { projects } from '@/data/projects'
import {
  assetAbsoluteUrl,
  buildPageHead,
  DEFAULT_OG_IMAGE,
  describePage,
  getStaticPages,
  headTags,
  pageUrl,
  socialImage,
} from './seo'

const SITE = 'https://user.github.io/portfolio/'
const project = projects[0]!

describe('describePage', () => {
  it('titles the home page with name and role', () => {
    const page = describePage({ page: 'home' }, 'en')
    expect(page.title).toBe(`${profile.content.en.name} | Frontend Developer`)
    expect(page.path).toBe('/en')
    expect(page.description).toBe(profile.content.en.intro)
  })

  it('uses "<page> | <name>" for other pages', () => {
    expect(describePage({ page: 'projects' }, 'zh-TW').title).toBe(
      `作品 | ${profile.content['zh-TW'].name}`,
    )
    expect(describePage({ page: 'about' }, 'en').path).toBe('/en/about')
  })

  it('describes a case study with its own title and summary', () => {
    const page = describePage({ page: 'project', slug: project.slug }, 'en')
    expect(page.title).toBe(`${project.content.en.title} | ${profile.content.en.name}`)
    expect(page.description).toBe(project.content.en.summary)
    expect(page.path).toBe(`/en/projects/${project.slug}`)
  })

  it('uses the project cover as the social image when it is not an SVG', () => {
    const page = describePage({ page: 'project', slug: project.slug }, 'en')
    expect(page.image).toBe(socialImage(project.cover.src))
  })
})

describe('socialImage', () => {
  it('keeps raster covers', () => {
    expect(socialImage('images/projects/cover.jpg')).toBe('images/projects/cover.jpg')
    expect(socialImage('images/projects/cover.webp')).toBe('images/projects/cover.webp')
  })

  it('falls back to the default image for SVG covers', () => {
    expect(socialImage('images/projects/placeholder.svg')).toBe(DEFAULT_OG_IMAGE)
  })

  it('describes an unknown project as a non-indexable not-found page', () => {
    const page = describePage({ page: 'project', slug: 'missing' }, 'zh-TW')
    expect(page.title).toContain('找不到頁面')
    expect(page.indexable).toBe(false)
  })
})

describe('URL helpers', () => {
  it.each([
    ['/', SITE],
    ['/en', `${SITE}en/`],
    ['/projects/x', `${SITE}projects/x/`],
    ['/about/', `${SITE}about/`],
  ])('pageUrl(%s)', (path, expected) => {
    expect(pageUrl(SITE, path)).toBe(expected)
  })

  it('accepts a site URL without a trailing slash', () => {
    expect(pageUrl('https://example.com', '/about')).toBe('https://example.com/about/')
    expect(assetAbsoluteUrl('https://example.com', '/og.png')).toBe('https://example.com/og.png')
  })
})

describe('buildPageHead', () => {
  it('resolves canonical, image and language alternates', () => {
    const head = buildPageHead(describePage({ page: 'about' }, 'en'), SITE)

    expect(head.url).toBe(`${SITE}en/about/`)
    expect(head.image).toBe(`${SITE}${DEFAULT_OG_IMAGE}`)
    expect(head.htmlLang).toBe('en')
    expect(head.ogLocale).toBe('en_US')
    expect(head.alternates).toEqual([
      { hreflang: 'zh-Hant-TW', href: `${SITE}about/` },
      { hreflang: 'en', href: `${SITE}en/about/` },
      { hreflang: 'x-default', href: `${SITE}about/` },
    ])
  })

  it('has no alternates for not-found pages', () => {
    const head = buildPageHead(describePage({ page: 'not-found' }, 'zh-TW'), SITE)
    expect(head.alternates).toEqual([])
    expect(head.url).toBeNull()
    expect(head.indexable).toBe(false)
    expect(head.htmlLang).toBe('zh-Hant-TW')
  })
})

describe('getStaticPages', () => {
  it('lists every page in both locales', () => {
    const paths = getStaticPages().map((page) => page.path)
    const neutral = ['/', '/projects', '/about', ...projects.map((p) => `/projects/${p.slug}`)]

    expect(paths).toHaveLength(neutral.length * 2)
    expect(paths).toEqual(
      expect.arrayContaining([
        ...neutral,
        ...neutral.map((path) => (path === '/' ? '/en' : `/en${path}`)),
      ]),
    )
    expect(getStaticPages().every((page) => page.indexable)).toBe(true)
  })
})

describe('og:type', () => {
  it('is article for case studies and website for every other page', () => {
    expect(describePage({ page: 'project', slug: project.slug }, 'en').type).toBe('article')
    for (const key of [{ page: 'home' }, { page: 'projects' }, { page: 'about' }] as const) {
      expect(describePage(key, 'en').type).toBe('website')
    }
  })
})

describe('headTags', () => {
  it('derives the Twitter tags from the Open Graph values', () => {
    const head = buildPageHead(describePage({ page: 'project', slug: project.slug }, 'en'), SITE)
    const tags = Object.fromEntries(headTags(head).map((tag) => [tag.key, tag.content]))

    expect(tags['og:type']).toBe('article')
    expect(tags['twitter:card']).toBe('summary_large_image')
    expect(tags['twitter:title']).toBe(tags['og:title'])
    expect(tags['twitter:description']).toBe(tags['og:description'])
    expect(tags['twitter:image']).toBe(tags['og:image'])
    expect(tags['og:image']).toMatch(new RegExp(`^${SITE}`))
  })

  it('lists each tag once and drops og:url on non-indexable pages', () => {
    const head = buildPageHead(describePage({ page: 'not-found' }, 'en'), SITE)
    const keys = headTags(head).map((tag) => tag.key)

    expect(new Set(keys).size).toBe(keys.length)
    expect(headTags(head).find((tag) => tag.key === 'og:url')?.content).toBeNull()
  })
})
