import { afterEach, describe, expect, it } from 'vitest'
import type { VueWrapper } from '@vue/test-utils'
import { mountAtPath } from '@/test-utils/router'
import SiteHeader from './SiteHeader.vue'

let mounted: VueWrapper | undefined

async function mountHeader(path: string) {
  const result = await mountAtPath(SiteHeader, path, { attachTo: document.body })
  mounted = result.wrapper
  return result
}

afterEach(() => {
  mounted?.unmount()
  mounted = undefined
})

describe('SiteHeader navigation links', () => {
  it('shows localized links and marks the current page', async () => {
    const { wrapper } = await mountHeader('/about')
    const current = wrapper.findAll('a[aria-current="page"]')

    expect(current).toHaveLength(1)
    expect(current[0]?.text()).toBe('關於我')
    expect(wrapper.text()).toContain('作品')
  })

  it('treats case study pages as part of Projects', async () => {
    const { wrapper } = await mountHeader('/en/projects/some-project')
    const current = wrapper.get('a[aria-current="page"]')

    expect(current.text()).toBe('Projects')
    expect(current.attributes('href')).toBe('/en/projects')
  })

  it('keeps the navigation to site pages; GitHub lives in the footer and contact section', async () => {
    const { wrapper } = await mountHeader('/')

    expect(wrapper.find('a[target="_blank"]').exists()).toBe(false)
  })
})

describe('SiteHeader language switcher', () => {
  it('links to the same page in English', async () => {
    const { wrapper } = await mountHeader('/projects/some-project')
    const switcher = wrapper.get('a[hreflang]')

    expect(switcher.attributes('href')).toBe('/en/projects/some-project')
    expect(switcher.attributes('lang')).toBe('en')
    expect(switcher.text()).toContain('English')
  })

  it('links back to Traditional Chinese', async () => {
    const { wrapper } = await mountHeader('/en/about')
    const switcher = wrapper.get('a[hreflang]')

    expect(switcher.attributes('href')).toBe('/about')
    expect(switcher.attributes('hreflang')).toBe('zh-Hant-TW')
    expect(switcher.text()).toContain('中文')
  })
})

describe('SiteHeader mobile menu', () => {
  it('toggles aria-expanded and controls the navigation', async () => {
    const { wrapper } = await mountHeader('/')
    const button = wrapper.get('button')
    const nav = wrapper.get('nav')

    expect(button.attributes('aria-controls')).toBe(nav.attributes('id'))
    expect(button.attributes('aria-expanded')).toBe('false')
    expect(nav.classes()).toContain('hidden')

    await button.trigger('click')

    expect(button.attributes('aria-expanded')).toBe('true')
    expect(nav.classes()).toContain('block')
  })

  it('closes on Escape and returns focus to the toggle', async () => {
    const { wrapper } = await mountHeader('/')
    const button = wrapper.get('button')
    await button.trigger('click')

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    await wrapper.vm.$nextTick()

    expect(button.attributes('aria-expanded')).toBe('false')
    expect(document.activeElement).toBe(button.element)
  })

  it('closes after navigating', async () => {
    const { wrapper, router } = await mountHeader('/')
    await wrapper.get('button').trigger('click')

    await router.push('/about')
    await wrapper.vm.$nextTick()

    expect(wrapper.get('button').attributes('aria-expanded')).toBe('false')
  })
})
