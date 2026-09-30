/**
 * Page metadata: the single source for titles, descriptions and social previews.
 *
 * Used at runtime by `usePageMeta` and at build time to write static HTML for every known route,
 * so this module (and everything it imports) must stay Node-compatible: relative imports only,
 * no `import.meta.env`, no DOM.
 */
import { getProjectBySlug, projects } from '../data/projects.ts'
import { profile } from '../data/profile.ts'
import {
  LOCALES,
  LOCALE_CONFIG,
  stripLocalePrefix,
  withLocalePrefix,
  type Locale,
} from '../i18n/locales.ts'
import { MESSAGES } from '../i18n/messages.ts'

/** Social preview image. SVG covers are not accepted by most social networks. */
export const DEFAULT_OG_IMAGE = 'og-default.png'

export type PageKey =
  | { page: 'home' }
  | { page: 'projects' }
  | { page: 'about' }
  | { page: 'project'; slug: string }
  | { page: 'not-found' }

/** What a page says about itself, independent of where the site is deployed. */
export interface PageDescription {
  locale: Locale
  /** App path including the locale prefix, e.g. `/en/about`. */
  path: string
  title: string
  description: string
  /** Path relative to `public/`. */
  image: string
  /** Not-found pages are excluded from indexing and have no language alternates. */
  indexable: boolean
}

export interface HeadAlternate {
  hreflang: string
  href: string
}

/** Everything that goes into `<head>`, with absolute URLs. */
export interface PageHead {
  title: string
  description: string
  htmlLang: string
  ogLocale: string
  /** Canonical URL; `null` for pages that must not be indexed. */
  url: string | null
  image: string
  alternates: HeadAlternate[]
  indexable: boolean
}

function formatTitle(pageTitle: string, locale: Locale): string {
  return `${pageTitle} | ${profile.content[locale].name}`
}

/** SVG covers are not accepted as social previews, so they fall back to the default image. */
export function socialImage(src: string): string {
  return src.endsWith('.svg') ? DEFAULT_OG_IMAGE : src
}

export function describePage(key: PageKey, locale: Locale): PageDescription {
  const messages = MESSAGES[locale]
  const person = profile.content[locale]
  const base = { locale, image: DEFAULT_OG_IMAGE, indexable: true }

  switch (key.page) {
    case 'home':
      return {
        ...base,
        path: withLocalePrefix('/', locale),
        title: `${person.name} | ${person.role}`,
        description: person.intro,
      }
    case 'projects':
      return {
        ...base,
        path: withLocalePrefix('/projects', locale),
        title: formatTitle(messages.pages.projectsTitle, locale),
        description: messages.pages.projectsDescription,
      }
    case 'about':
      return {
        ...base,
        path: withLocalePrefix('/about', locale),
        title: formatTitle(messages.pages.aboutTitle, locale),
        description: messages.about.description,
      }
    case 'project': {
      const project = getProjectBySlug(key.slug)
      if (!project) return describePage({ page: 'not-found' }, locale)
      const content = project.content[locale]
      return {
        ...base,
        path: withLocalePrefix(`/projects/${project.slug}`, locale),
        title: formatTitle(content.title, locale),
        description: content.summary,
        image: socialImage(project.cover.src),
      }
    }
    case 'not-found':
      return {
        ...base,
        path: withLocalePrefix('/404', locale),
        title: formatTitle(messages.notFound.title, locale),
        description: messages.notFound.description,
        indexable: false,
      }
  }
}

/** Absolute URL of an app path. Directory-style (trailing slash) to match the static files. */
export function pageUrl(siteUrl: string, path: string): string {
  const root = siteUrl.endsWith('/') ? siteUrl : `${siteUrl}/`
  const relative = path.replace(/^\/+/, '').replace(/\/+$/, '')
  return relative ? `${root}${relative}/` : root
}

export function assetAbsoluteUrl(siteUrl: string, file: string): string {
  const root = siteUrl.endsWith('/') ? siteUrl : `${siteUrl}/`
  return `${root}${file.replace(/^\/+/, '')}`
}

/**
 * Resolves a page description against the deployed site URL
 * (e.g. `https://user.github.io/portfolio/`).
 */
export function buildPageHead(page: PageDescription, siteUrl: string): PageHead {
  const neutralPath = stripLocalePrefix(page.path)
  const alternates: HeadAlternate[] = page.indexable
    ? [
        ...LOCALES.map((locale) => ({
          hreflang: LOCALE_CONFIG[locale].htmlLang,
          href: pageUrl(siteUrl, withLocalePrefix(neutralPath, locale)),
        })),
        { hreflang: 'x-default', href: pageUrl(siteUrl, neutralPath) },
      ]
    : []

  return {
    title: page.title,
    description: page.description,
    htmlLang: LOCALE_CONFIG[page.locale].htmlLang,
    ogLocale: LOCALE_CONFIG[page.locale].ogLocale,
    url: page.indexable ? pageUrl(siteUrl, page.path) : null,
    image: assetAbsoluteUrl(siteUrl, page.image),
    alternates,
    indexable: page.indexable,
  }
}

/** Every route that gets its own static HTML file at build time, in every locale. */
export function getStaticPages(): PageDescription[] {
  const keys: PageKey[] = [
    { page: 'home' },
    { page: 'projects' },
    { page: 'about' },
    ...projects.map((project): PageKey => ({ page: 'project', slug: project.slug })),
  ]
  return LOCALES.flatMap((locale) => keys.map((key) => describePage(key, locale)))
}
