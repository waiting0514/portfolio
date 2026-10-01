import { afterEach, describe, expect, it } from 'vitest'
import { defineComponent, h, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describePage, type PageKey } from '@/utils/seo'
import type { Locale } from '@/i18n/locales'
import { usePageMeta } from './usePageMeta'

function meta(selector: string) {
  return document.head.querySelector<HTMLMetaElement>(selector)?.content
}

function mountWithMeta(initialKey: PageKey, initialLocale: Locale) {
  const key = ref<PageKey>(initialKey)
  const locale = ref<Locale>(initialLocale)
  const wrapper = mount(
    defineComponent({
      setup() {
        usePageMeta(() => describePage(key.value, locale.value))
        return () => h('div')
      },
    }),
  )
  return { wrapper, key, locale }
}

afterEach(() => {
  document.head.innerHTML = ''
  document.documentElement.lang = ''
})

describe('usePageMeta', () => {
  it('writes title, lang, description, Open Graph and alternates', () => {
    mountWithMeta({ page: 'about' }, 'en')

    expect(document.title).toContain('About |')
    expect(document.documentElement.lang).toBe('en')
    expect(meta('meta[name="description"]')).toBe('Background, experience and strengths.')
    expect(meta('meta[property="og:title"]')).toBe(document.title)
    expect(meta('meta[property="og:locale"]')).toBe('en_US')
    expect(meta('meta[property="og:url"]')).toMatch(/\/en\/about\/$/)
    expect(meta('meta[name="twitter:card"]')).toBe('summary_large_image')
    expect(meta('meta[name="twitter:title"]')).toBe(document.title)
    expect(meta('meta[property="og:type"]')).toBe('website')
    expect(document.head.querySelectorAll('link[rel="alternate"]')).toHaveLength(3)
    expect(document.head.querySelector('link[rel="canonical"]')).not.toBeNull()
  })

  it('updates in place when the page or locale changes, without duplicating tags', async () => {
    const { key, locale, wrapper } = mountWithMeta({ page: 'about' }, 'en')

    locale.value = 'zh-TW'
    key.value = { page: 'projects' }
    await wrapper.vm.$nextTick()

    expect(document.documentElement.lang).toBe('zh-Hant-TW')
    expect(document.title).toContain('作品 |')
    expect(document.head.querySelectorAll('meta[name="description"]')).toHaveLength(1)
    expect(document.head.querySelectorAll('link[rel="alternate"]')).toHaveLength(3)
  })

  it('marks not-found pages as noindex without canonical, og:url or alternates', async () => {
    const { key, wrapper } = mountWithMeta({ page: 'about' }, 'en')
    key.value = { page: 'project', slug: 'missing' }
    await wrapper.vm.$nextTick()

    expect(meta('meta[name="robots"]')).toBe('noindex')
    expect(document.head.querySelector('meta[property="og:url"]')).toBeNull()
    expect(document.head.querySelector('link[rel="canonical"]')).toBeNull()
    expect(document.head.querySelectorAll('link[rel="alternate"]')).toHaveLength(0)
  })
})
