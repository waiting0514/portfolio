import { describe, expect, it } from 'vitest'
import { profile } from '@/data/profile'
import { hasNoSkippedLevels, headingLevels } from '@/test-utils/headings'
import { mountAtPath } from '@/test-utils/router'
import AboutView from './AboutView.vue'

describe('AboutView', () => {
  it('renders bio, experience, strengths and the GitHub link', async () => {
    const { wrapper } = await mountAtPath(AboutView, '/about')
    const content = profile.content['zh-TW']

    expect(wrapper.get('h1').text()).toBe('關於我')
    for (const paragraph of content.bio) expect(wrapper.text()).toContain(paragraph)
    expect(wrapper.findAll('#experience-title ~ ol > li')).toHaveLength(content.experience.length)
    for (const strength of content.strengths) expect(wrapper.text()).toContain(strength)
    expect(wrapper.find(`a[href="${profile.githubUrl}"]`).exists()).toBe(true)
  })

  it('links to projects in the current locale', async () => {
    const { wrapper } = await mountAtPath(AboutView, '/en/about')

    expect(wrapper.get('h1').text()).toBe('About')
    expect(wrapper.find('a[href="/en/projects"]').exists()).toBe(true)
  })

  it('keeps a single h1 and no skipped heading levels', async () => {
    const { wrapper } = await mountAtPath(AboutView, '/about')
    const levels = headingLevels(wrapper.element)

    expect(levels.filter((level) => level === 1)).toHaveLength(1)
    expect(hasNoSkippedLevels(levels)).toBe(true)
  })

  it('omits the email button when no email is configured', async () => {
    const { wrapper } = await mountAtPath(AboutView, '/about')
    expect(wrapper.find('a[href^="mailto:"]').exists()).toBe(profile.email !== undefined)
  })
})
