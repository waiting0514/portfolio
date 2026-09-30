import { describe, expect, it } from 'vitest'
import { featuredProjects } from '@/data/projects'
import { skillCategories } from '@/data/skills'
import { hasNoSkippedLevels, headingLevels } from '@/test-utils/headings'
import { mountAtPath } from '@/test-utils/router'
import HomeView from './HomeView.vue'

describe('HomeView', () => {
  it('has a single h1 and no skipped heading levels', async () => {
    const { wrapper } = await mountAtPath(HomeView, '/')
    const levels = headingLevels(wrapper.element.parentElement ?? wrapper.element)

    expect(levels.filter((level) => level === 1)).toHaveLength(1)
    expect(levels[0]).toBe(1)
    expect(hasNoSkippedLevels(levels)).toBe(true)
  })

  it('shows the role and calls to action in Chinese by default', async () => {
    const { wrapper } = await mountAtPath(HomeView, '/')

    expect(wrapper.get('h1').text()).toBe('前端工程師')
    expect(wrapper.find('a[href="/projects"]').exists()).toBe(true)
    expect(wrapper.find('a[href="https://github.com/waiting0514"]').exists()).toBe(true)
    expect(wrapper.find('a[href="/about"]').exists()).toBe(true)
  })

  it('shows the English hero and keeps links in English', async () => {
    const { wrapper } = await mountAtPath(HomeView, '/en')

    expect(wrapper.get('h1').text()).toContain('Frontend Engineer')
    expect(wrapper.find('a[href="/en/projects"]').exists()).toBe(true)
    expect(wrapper.find('a[href="/en/about"]').exists()).toBe(true)
  })

  it('renders one card per featured project', async () => {
    const { wrapper } = await mountAtPath(HomeView, '/')

    expect(wrapper.findAll('article')).toHaveLength(featuredProjects.length)
    for (const project of featuredProjects) {
      expect(wrapper.find(`a[href="/projects/${project.slug}"]`).exists()).toBe(true)
    }
  })

  it('lists every skill category as a titled list', async () => {
    const { wrapper } = await mountAtPath(HomeView, '/en')
    const section = wrapper.get('section[aria-labelledby="skills-title"]')

    expect(section.findAll('h3').map((heading) => heading.text())).toEqual(
      skillCategories.map((category) => category.name.en),
    )
    expect(section.findAll('li')).toHaveLength(
      skillCategories.reduce((total, category) => total + category.items.length, 0),
    )
  })
})
