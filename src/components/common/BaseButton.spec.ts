import { describe, expect, it } from 'vitest'
import { mountAtPath } from '@/test-utils/router'
import BaseButton from './BaseButton.vue'

describe('BaseButton', () => {
  it('renders an in-app route as a router link', async () => {
    const { wrapper } = await mountAtPath(BaseButton, '/', {
      props: { to: '/projects' },
      slots: { default: 'View Projects' },
    })

    const link = wrapper.get('a')
    expect(link.attributes('href')).toBe('/projects')
    expect(link.attributes('target')).toBeUndefined()
    expect(link.classes()).toContain('bg-accent')
  })

  it('renders an external URL with new-tab safety attributes and a hint', async () => {
    const { wrapper } = await mountAtPath(BaseButton, '/en', {
      props: { href: 'https://github.com/example', variant: 'secondary' },
      slots: { default: 'GitHub' },
    })

    const link = wrapper.get('a')
    expect(link.attributes('href')).toBe('https://github.com/example')
    expect(link.attributes('target')).toBe('_blank')
    expect(link.attributes('rel')).toBe('noopener noreferrer')
    // The hint is separated from the label, so it is announced as "GitHub (opens in a new tab)".
    expect(link.text()).toMatch(/^GitHub\s+\(opens in a new tab\)$/)
    expect(link.classes()).toContain('border-line-strong')
  })

  it('never renders a <button>, because every call to action navigates', async () => {
    const { wrapper } = await mountAtPath(BaseButton, '/', { props: { to: '/about' } })
    expect(wrapper.find('button').exists()).toBe(false)
  })
})
