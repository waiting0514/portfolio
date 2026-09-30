import { describe, expect, it } from 'vitest'
import { defineComponent, h } from 'vue'
import { mountAtPath } from '@/test-utils/router'
import { useLocale } from './useLocale'

function mountProbe(path: string) {
  let api!: ReturnType<typeof useLocale>
  const Probe = defineComponent({
    setup() {
      api = useLocale()
      return () => h('div')
    },
  })
  return mountAtPath(Probe, path).then(({ router }) => ({ api, router }))
}

describe('useLocale', () => {
  it('uses Traditional Chinese without a prefix', async () => {
    const { api } = await mountProbe('/projects')
    expect(api.locale.value).toBe('zh-TW')
    expect(api.messages.value.nav.projects).toBe('作品')
    expect(api.localePath('/about')).toBe('/about')
    expect(api.alternatePath('en')).toBe('/en/projects')
  })

  it('uses English under /en', async () => {
    const { api } = await mountProbe('/en/projects/some-project')
    expect(api.locale.value).toBe('en')
    expect(api.messages.value.nav.projects).toBe('Projects')
    expect(api.localePath('/about')).toBe('/en/about')
    expect(api.alternatePath('zh-TW')).toBe('/projects/some-project')
  })

  it('detects the locale on catch-all routes', async () => {
    const { api } = await mountProbe('/en/missing-page')
    expect(api.locale.value).toBe('en')
  })

  it('reacts to navigation', async () => {
    const { api, router } = await mountProbe('/about')
    await router.push('/en/about')
    expect(api.locale.value).toBe('en')
  })
})
