import { describe, expect, it } from 'vitest'
import { projects } from '@/data/projects'
import { mountAtPath } from '@/test-utils/router'
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
    expect(wrapper.findAll('li').map((item) => item.text())).toEqual([...project.technologies])
  })
})
