import { afterEach, describe, expect, it } from 'vitest'
import { flushPromises, mount, type VueWrapper } from '@vue/test-utils'
import { createMemoryHistory } from 'vue-router'
import { createAppRouter } from '@/router'
import { mountAtPath } from '@/test-utils/router'
import App from './App.vue'

let mounted: VueWrapper | undefined

afterEach(() => {
  mounted?.unmount()
  mounted = undefined
})

async function mountApp(path: string) {
  const result = await mountAtPath(App, path, { attachTo: document.body })
  mounted = result.wrapper
  await flushPromises()
  return result
}

describe('App layout', () => {
  it('renders skip link, header, a single main landmark and footer', async () => {
    const { wrapper } = await mountApp('/')

    const firstLink = wrapper.find('a')
    expect(firstLink.attributes('href')).toBe('#main-content')
    expect(wrapper.findAll('header')).toHaveLength(1)
    expect(wrapper.findAll('main')).toHaveLength(1)
    expect(wrapper.find('main#main-content h1').exists()).toBe(true)
    expect(wrapper.findAll('footer')).toHaveLength(1)
  })

  it('moves focus to the main content after navigation', async () => {
    const { wrapper, router } = await mountApp('/')

    await router.push('/projects')
    await flushPromises()

    expect(document.activeElement).toBe(wrapper.get('main').element)
  })

  it('does not steal focus on the initial page load', async () => {
    const router = createAppRouter(createMemoryHistory())
    // Mount before the first navigation resolves, as a direct page load can.
    mounted = mount(App, { attachTo: document.body, global: { plugins: [router] } })
    await router.push('/about')
    await flushPromises()

    expect(document.activeElement).toBe(document.body)
  })

  it('renders the English not-found page for unknown English paths', async () => {
    const { wrapper } = await mountApp('/en/does-not-exist')

    expect(wrapper.get('main h1').text()).toBe('Page not found')
    expect(wrapper.find('main a[href="/en"]').exists()).toBe(true)
  })
})
