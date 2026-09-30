import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import App from './App.vue'
import router from './router'

describe('App', () => {
  it('renders the routed page inside the main landmark', async () => {
    await router.push('/')
    await router.isReady()

    const wrapper = mount(App, { global: { plugins: [router] } })

    expect(wrapper.find('main#main-content h1').exists()).toBe(true)
  })
})
