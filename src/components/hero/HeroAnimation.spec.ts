import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import HeroAnimation from './HeroAnimation.vue'
import RequirementToProduct from './sequences/RequirementToProduct.vue'

function stubReducedMotion(matches: boolean) {
  vi.stubGlobal(
    'matchMedia',
    vi.fn(() => ({ matches, addEventListener: vi.fn(), removeEventListener: vi.fn() })),
  )
}

function mountAnimation() {
  return mount(HeroAnimation, {
    props: { label: 'Requirement to product' },
    slots: { default: RequirementToProduct },
  })
}

describe('HeroAnimation', () => {
  beforeEach(() => {
    // jsdom has no requestIdleCallback, so playback starts from the setTimeout fallback.
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.unstubAllGlobals()
  })

  it('renders the final state first and starts the loop once the browser is idle', async () => {
    stubReducedMotion(false)
    const wrapper = mountAnimation()

    expect(wrapper.classes()).not.toContain('is-playing')
    expect(wrapper.text()).toContain('Maintainable Web Application')

    await vi.runAllTimersAsync()
    expect(wrapper.classes()).toContain('is-playing')
  })

  it('never plays when the visitor prefers reduced motion', async () => {
    stubReducedMotion(true)
    const wrapper = mountAnimation()

    await vi.runAllTimersAsync()
    expect(wrapper.classes()).not.toContain('is-playing')
  })

  it('exposes one accessible image and hides the decorative content', () => {
    stubReducedMotion(false)
    const wrapper = mountAnimation()

    expect(wrapper.attributes('role')).toBe('img')
    expect(wrapper.attributes('aria-label')).toBe('Requirement to product')
    expect(wrapper.get('.seq').attributes('aria-hidden')).toBe('true')
    expect(wrapper.find('a, button, [tabindex]').exists()).toBe(false)
  })

  it('shows the requirement, architecture and product stages', () => {
    stubReducedMotion(false)
    const text = mountAnimation().text()

    for (const stage of [
      'Product / AI Spec',
      'Requirement Analysis',
      'Frontend Architecture',
      'Component',
      'State',
      'Router',
      'API',
      'Web Product',
    ]) {
      expect(text).toContain(stage)
    }
    expect(mountAnimation().findAll('*').length).toBeLessThan(40)
  })
})
