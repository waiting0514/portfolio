import { describe, expect, it } from 'vitest'
import { projects } from '@/data/projects'
import { mountAtPath } from '@/test-utils/router'
import ProjectPager from './ProjectPager.vue'

const first = projects[0]!
const second = projects[1]!
const last = projects[projects.length - 1]!
const secondToLast = projects[projects.length - 2]!

function mountPager(slug: string, path = `/projects/${slug}`) {
  return mountAtPath(ProjectPager, path, { props: { slug } })
}

describe('ProjectPager', () => {
  it('shows only "next" on the first project', async () => {
    const { wrapper } = await mountPager(first.slug)
    const links = wrapper.findAll('a')

    expect(links).toHaveLength(1)
    expect(links[0]?.attributes('rel')).toBe('next')
    expect(links[0]?.attributes('href')).toBe(`/projects/${second.slug}`)
    expect(links[0]?.text()).toContain(second.content['zh-TW'].title)
  })

  it('shows only "previous" on the last project', async () => {
    const { wrapper } = await mountPager(last.slug)
    const links = wrapper.findAll('a')

    expect(links).toHaveLength(1)
    expect(links[0]?.attributes('rel')).toBe('prev')
    expect(links[0]?.attributes('href')).toBe(`/projects/${secondToLast.slug}`)
  })

  it('keeps links in English and labels the navigation', async () => {
    const { wrapper } = await mountPager(first.slug, `/en/projects/${first.slug}`)

    expect(wrapper.get('nav').attributes('aria-label')).toBe('More projects')
    expect(wrapper.get('a').attributes('href')).toBe(`/en/projects/${second.slug}`)
    expect(wrapper.get('a').text()).toContain('Next project')
  })

  it('renders nothing for an unknown project', async () => {
    const { wrapper } = await mountPager('unknown')
    expect(wrapper.find('nav').exists()).toBe(false)
  })
})
