import { watchEffect } from 'vue'
import { buildPageHead, headTags, type PageDescription, type PageHead } from '@/utils/seo'

/**
 * Sets `<meta name|property="key" content>`, creating the tag when it does not exist yet.
 * A `null` content removes the tag.
 */
function setMeta(attribute: 'name' | 'property', key: string, content: string | null) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`)
  if (content === null) {
    element?.remove()
    return
  }
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.append(element)
  }
  element.content = content
}

function setLinks(rel: string, links: { href: string; hreflang?: string }[]) {
  document.head.querySelectorAll(`link[rel="${rel}"]`).forEach((link) => link.remove())
  for (const { href, hreflang } of links) {
    const link = document.createElement('link')
    link.rel = rel
    link.href = href
    if (hreflang) link.hreflang = hreflang
    document.head.append(link)
  }
}

export function applyPageHead(head: PageHead) {
  document.title = head.title
  document.documentElement.lang = head.htmlLang

  for (const { attribute, key, content } of headTags(head)) setMeta(attribute, key, content)

  setLinks('canonical', head.url ? [{ href: head.url }] : [])
  setLinks('alternate', head.alternates)
}

/**
 * Keeps `<head>` in sync with the current page. Pass a getter so the metadata follows
 * reactive state such as the locale or the case study slug.
 */
export function usePageMeta(describe: () => PageDescription) {
  // Prerendered HTML already carries the page head (written by the static-routes plugin), and
  // there is no document during server rendering.
  if (import.meta.env.SSR) return

  watchEffect(() => {
    const siteUrl = `${window.location.origin}${import.meta.env.BASE_URL}`
    applyPageHead(buildPageHead(describe(), siteUrl))
  })
}
