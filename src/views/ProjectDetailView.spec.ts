import { describe, expect, it, vi } from 'vitest'
import { hasNoSkippedLevels, headingLevels } from '@/test-utils/headings'
import { mountAtPath } from '@/test-utils/router'
import ProjectDetailView from './ProjectDetailView.vue'

// Fixture data keeps these tests independent of the real portfolio content.
vi.mock('@/data/projects', async () => {
  const { fullProject, minimalProject } = await import('@/test-utils/fixtures')
  const list = [fullProject, minimalProject]
  return {
    projects: list,
    getProjectBySlug: (slug: string) => list.find((project) => project.slug === slug),
    getAdjacentProjects: (slug: string) => {
      const index = list.findIndex((project) => project.slug === slug)
      return index === -1 ? {} : { previous: list[index - 1], next: list[index + 1] }
    },
  }
})

function mountDetail(slug: string, locale: 'zh-TW' | 'en' = 'en') {
  const prefix = locale === 'en' ? '/en' : ''
  return mountAtPath(ProjectDetailView, `${prefix}/projects/${slug}`, { props: { slug } })
}

function sectionTitles(wrapper: Awaited<ReturnType<typeof mountDetail>>['wrapper']) {
  return wrapper.findAll('section > h2').map((heading) => heading.text())
}

describe('ProjectDetailView', () => {
  it('renders every documented section in the specified order', async () => {
    const { wrapper } = await mountDetail('full-project')

    expect(wrapper.get('h1').text()).toBe('Full (en)')
    expect(sectionTitles(wrapper)).toEqual([
      'Overview',
      'My Role',
      'Problem',
      'Architecture / Flow',
      'Solution',
      'Technical Challenges',
      'Tech Stack',
      'Result',
      'What I Learned',
    ])
  })

  it('omits sections without content, including their headings', async () => {
    const { wrapper } = await mountDetail('minimal-project')

    expect(sectionTitles(wrapper)).toEqual(['Overview', 'Tech Stack'])
    expect(wrapper.find('#architecture').exists()).toBe(false)
    expect(wrapper.find('#challenges').exists()).toBe(false)
    expect(wrapper.text()).not.toContain('N/A')
  })

  it('pairs every challenge with its solution', async () => {
    const { wrapper } = await mountDetail('full-project')
    const items = wrapper.findAll('#challenges ~ div > div')

    expect(items).toHaveLength(2)
    expect(items[0]?.text()).toContain('Challenge A (en)')
    expect(items[0]?.text()).toContain('Fix A (en)')
    expect(items[1]?.text()).toContain('Challenge B (en)')
    expect(items[1]?.text()).toContain('Fix B (en)')
  })

  it('shows architecture steps in order with the diagram and its alt text', async () => {
    const { wrapper } = await mountDetail('full-project')
    const section = wrapper.get('section[aria-labelledby="architecture"]')

    expect(section.findAll('ol > li').map((step) => step.text())).toEqual([
      'Step one (en)',
      'Step two (en)',
    ])
    expect(section.get('img').attributes('alt')).toBe('Diagram (en)')
  })

  it('uses Traditional Chinese content and labels without the /en prefix', async () => {
    const { wrapper } = await mountDetail('full-project', 'zh-TW')

    expect(wrapper.get('h1').text()).toBe('Full (zh-TW)')
    expect(sectionTitles(wrapper)[0]).toBe('專案概述')
    expect(wrapper.find('a[href="/projects"]').exists()).toBe(true)
  })

  it('keeps a single h1 and no skipped heading levels', async () => {
    const { wrapper } = await mountDetail('full-project')
    const levels = headingLevels(wrapper.element)

    expect(levels.filter((level) => level === 1)).toHaveLength(1)
    expect(hasNoSkippedLevels(levels)).toBe(true)
  })

  it('loads the hero cover eagerly and the diagram lazily', async () => {
    const { wrapper } = await mountDetail('full-project')
    const [cover, diagram] = wrapper.findAll('img')

    expect(cover?.attributes('loading')).toBeUndefined()
    expect(cover?.attributes('fetchpriority')).toBe('high')
    expect(diagram?.attributes('loading')).toBe('lazy')
  })

  it('keeps tech stack tags out of the prose list styling', async () => {
    const { wrapper } = await mountDetail('full-project')
    const section = wrapper.get('section[aria-labelledby="tech-stack"]')

    expect(section.find('.prose-content').exists()).toBe(false)
    expect(section.findAll('li').map((item) => item.text())).toEqual(['Vue', 'RxJS'])
  })

  it('links to the next project', async () => {
    const { wrapper } = await mountDetail('full-project')
    expect(wrapper.get('a[rel="next"]').attributes('href')).toBe('/en/projects/minimal-project')
  })

  it('shows the not-found content in place for an unknown slug', async () => {
    const { wrapper } = await mountDetail('unknown-project')

    expect(wrapper.get('h1').text()).toBe('Page not found')
    expect(wrapper.find('article').exists()).toBe(false)
    expect(wrapper.find('a[href="/en/projects"]').exists()).toBe(true)
  })
})
