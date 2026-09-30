import { describe, expect, it } from 'vitest'
import { mountAtPath } from '@/test-utils/router'
import StatusBadge from './StatusBadge.vue'

describe('StatusBadge', () => {
  it.each([
    ['/', '開發中'],
    ['/en', 'In Development'],
  ])('shows the status as text at %s', async (path, text) => {
    const { wrapper } = await mountAtPath(StatusBadge, path, {
      props: { status: 'in-development' },
    })

    expect(wrapper.text()).toBe(text)
    // The dot is decorative; the text carries the meaning.
    expect(wrapper.get('[aria-hidden="true"]').text()).toBe('')
  })
})
