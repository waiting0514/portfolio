import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import HeroAnimation from './HeroAnimation.vue'
import RequirementToProduct from './sequences/RequirementToProduct.vue'
import { mountAtPath } from '@/test-utils/router'

function stubReducedMotion(matches: boolean) {
  vi.stubGlobal(
    'matchMedia',
    vi.fn(() => ({ matches, addEventListener: vi.fn(), removeEventListener: vi.fn() })),
  )
}

async function mountAnimation(path = '/en') {
  const { wrapper } = await mountAtPath(HeroAnimation, path, {
    props: { label: 'Requirement to product' },
    slots: { default: RequirementToProduct },
  })
  return wrapper
}

const frame = (wrapper: Awaited<ReturnType<typeof mountAnimation>>) => wrapper.get('[role="img"]')

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
    const wrapper = await mountAnimation()

    expect(frame(wrapper).classes()).not.toContain('is-playing')
    expect(wrapper.text()).toContain('Maintainable Web Application')

    await vi.runAllTimersAsync()
    expect(frame(wrapper).classes()).toContain('is-playing')
  })

  it('never plays when the visitor prefers reduced motion', async () => {
    stubReducedMotion(true)
    const wrapper = await mountAnimation()

    await vi.runAllTimersAsync()
    expect(frame(wrapper).classes()).not.toContain('is-playing')
  })

  it('exposes one accessible image and hides the decorative content', async () => {
    stubReducedMotion(false)
    const wrapper = await mountAnimation()

    expect(frame(wrapper).attributes('aria-label')).toBe('Requirement to product')
    expect(wrapper.get('.seq').attributes('aria-hidden')).toBe('true')
    expect(frame(wrapper).find('a, button, [tabindex]').exists()).toBe(false)
  })

  it('shows the requirement, architecture and product stages', async () => {
    stubReducedMotion(false)
    const text = (await mountAnimation()).text()

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
    expect(frame(await mountAnimation()).findAll('*').length).toBeLessThan(40)
  })

  it('offers a toggle that stops the loop and starts it again (WCAG 2.2.2)', async () => {
    stubReducedMotion(false)
    const wrapper = await mountAnimation()
    const toggle = wrapper.get('button')

    expect(toggle.classes()).toContain('invisible')
    await vi.runAllTimersAsync()
    expect(toggle.classes()).not.toContain('invisible')
    expect(toggle.text()).toBe('Pause animation')

    await toggle.trigger('click')
    expect(frame(wrapper).classes()).not.toContain('is-playing')
    expect(toggle.text()).toBe('Play animation')

    await toggle.trigger('click')
    expect(frame(wrapper).classes()).toContain('is-playing')
  })

  it('hides the toggle when the visitor prefers reduced motion', async () => {
    stubReducedMotion(true)
    const wrapper = await mountAnimation()

    await vi.runAllTimersAsync()
    expect(wrapper.get('button').classes()).toContain('invisible')
  })
})
