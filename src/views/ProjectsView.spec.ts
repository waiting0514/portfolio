import { describe, expect, it } from 'vitest'
import { projects } from '@/data/projects'
import { hasNoSkippedLevels, headingLevels } from '@/test-utils/headings'
import { mountAtPath } from '@/test-utils/router'
import ProjectsView from './ProjectsView.vue'

describe('ProjectsView', () => {
  it('lists every project from the data module', async () => {
    const { wrapper } = await mountAtPath(ProjectsView, '/')

    expect(wrapper.findAll('article')).toHaveLength(projects.length)
    for (const project of projects) {
      expect(wrapper.find(`a[href="/projects/${project.slug}"]`).exists()).toBe(true)
    }
  })

  it('nests card titles directly under the page h1', async () => {
    const { wrapper } = await mountAtPath(ProjectsView, '/')
    const levels = headingLevels(wrapper.element)

    expect(levels).toEqual([1, ...projects.map(() => 2)])
    expect(hasNoSkippedLevels(levels)).toBe(true)
  })

  it('uses a 1 / 2 / 3 column responsive grid', async () => {
    const { wrapper } = await mountAtPath(ProjectsView, '/')
    const grid = wrapper.get('ul.grid')

    expect(grid.classes()).toEqual(expect.arrayContaining(['md:grid-cols-2', 'lg:grid-cols-3']))
    expect(grid.classes().some((name) => /^grid-cols-/.test(name))).toBe(false)
  })

  it('renders in English under /en', async () => {
    const { wrapper } = await mountAtPath(ProjectsView, '/en/projects')

    expect(wrapper.get('h1').text()).toBe('Projects')
    expect(wrapper.find(`a[href="/en/projects/${projects[0]!.slug}"]`).exists()).toBe(true)
  })
})
