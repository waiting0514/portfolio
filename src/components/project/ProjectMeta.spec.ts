import { describe, expect, it } from 'vitest'
import { mountAtPath } from '@/test-utils/router'
import ProjectMeta from './ProjectMeta.vue'

describe('ProjectMeta', () => {
  it('shows labels and the localized status badge', async () => {
    const { wrapper } = await mountAtPath(ProjectMeta, '/', {
      props: { labels: ['Real-world Project', 'Frontend Development'], status: 'in-development' },
    })

    expect(wrapper.get('ul').attributes('aria-label')).toBe('專案類型')
    expect(wrapper.findAll('li').map((item) => item.text().replace('·', '').trim())).toEqual([
      'Real-world Project',
      'Frontend Development',
    ])
    expect(wrapper.text()).toContain('開發中')
  })

  it('uses English status text under /en', async () => {
    const { wrapper } = await mountAtPath(ProjectMeta, '/en', {
      props: { status: 'in-development' },
    })

    expect(wrapper.text()).toContain('In Development')
    expect(wrapper.find('ul').exists()).toBe(false)
  })

  it('renders nothing without labels or status', async () => {
    const { wrapper } = await mountAtPath(ProjectMeta, '/', { props: {} })
    expect(wrapper.html()).toBe('<!--v-if-->')
  })
})
