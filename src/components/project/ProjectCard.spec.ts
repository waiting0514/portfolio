import { describe, expect, it } from 'vitest'
import { projects } from '@/data/projects'
import { minimalProject } from '@/test-utils/fixtures'
import { mountAtPath } from '@/test-utils/router'
import type { Project } from '@/types/project'
import ProjectCard from './ProjectCard.vue'

const project = projects[0]!

describe('ProjectCard', () => {
  it('is a single tab stop linking to the case study', async () => {
    const { wrapper } = await mountAtPath(ProjectCard, '/', { props: { project } })

    const links = wrapper.findAll('a')
    expect(links).toHaveLength(1)
    expect(links[0]?.attributes('href')).toBe(`/projects/${project.slug}`)
    expect(links[0]?.text()).toContain(project.content['zh-TW'].title)
  })

  it('keeps the link in the current locale', async () => {
    const { wrapper } = await mountAtPath(ProjectCard, '/en', { props: { project } })

    expect(wrapper.get('a').attributes('href')).toBe(`/en/projects/${project.slug}`)
    // The accessible name excludes the aria-hidden arrow.
    const nameParts = wrapper.findAll('a > span:not([aria-hidden])')
    expect(nameParts.map((part) => part.text()).join('')).toBe(
      `View Case Study: ${project.content.en.title}`,
    )
    expect(wrapper.get('h3').text()).toBe(project.content.en.title)
  })

  it('lazy-loads a cover with alt text and a reserved size', async () => {
    const { wrapper } = await mountAtPath(ProjectCard, '/', { props: { project } })
    const img = wrapper.get('img')

    expect(img.attributes('loading')).toBe('lazy')
    expect(img.attributes('alt')).toBe(project.content['zh-TW'].coverAlt)
    expect(img.attributes('width')).toBe(String(project.cover.width))
    expect(img.attributes('height')).toBe(String(project.cover.height))
  })

  it('lists technologies and supports a custom heading level', async () => {
    const { wrapper } = await mountAtPath(ProjectCard, '/', {
      props: { project, headingLevel: 2 },
    })

    expect(wrapper.find('h2').exists()).toBe(true)
    const techList = wrapper.get('ul[aria-label="使用技術"]')
    expect(techList.findAll('li').map((item) => item.text())).toEqual([...project.technologies])
  })
})

describe('ProjectCard labels and status', () => {
  const labelled: Project = {
    ...minimalProject,
    labels: ['Real-world Project', 'Frontend Development'],
    status: 'in-development',
  }

  it('shows project labels and the status badge while keeping a single link', async () => {
    const { wrapper } = await mountAtPath(ProjectCard, '/', { props: { project: labelled } })

    const labels = wrapper.get('ul[aria-label="專案類型"]')
    expect(labels.text()).toContain('Real-world Project')
    expect(labels.text()).toContain('Frontend Development')
    expect(wrapper.text()).toContain('開發中')
    expect(wrapper.findAll('a')).toHaveLength(1)
  })

  it('renders no label row or badge for projects without them', async () => {
    const { wrapper } = await mountAtPath(ProjectCard, '/', { props: { project: minimalProject } })

    expect(wrapper.find('ul[aria-label="專案類型"]').exists()).toBe(false)
    expect(wrapper.text()).not.toContain('開發中')
  })
})
