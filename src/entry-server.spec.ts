// @vitest-environment node
//
// Renders every public route the way the build does: in Node, without a DOM. A component that
// touches `window` or `document` during setup makes this test fail before it breaks the build.
import { describe, expect, it } from 'vitest'
import { routePath } from '../build/html.ts'
import { projects } from '@/data/projects'
import { profile } from '@/data/profile'
import { getStaticPages, render } from './entry-server'

/** Text as it appears in rendered markup. */
const escaped = (text: string) => text.split('&').join('&amp;')

describe('server rendering', () => {
  it.each(getStaticPages().map((page) => [page.path]))('renders %s with one h1', async (path) => {
    const html = await render(routePath(path))

    expect(html.match(/<h1\b/g)).toHaveLength(1)
    expect(html).toContain('<header')
    expect(html).toContain('<footer')
  })

  it('renders the home hero, featured projects and the static hero animation', async () => {
    const html = await render('/en/')

    expect(html).toContain(profile.content.en.role)
    expect(html).toContain(escaped(profile.content.en.intro))
    for (const project of projects.filter((item) => item.featured)) {
      expect(html).toContain(escaped(project.content.en.title))
    }
    expect(html).toContain('role="img"')
    expect(html).not.toContain('is-playing')
  })

  it('renders case study content, not only the title', async () => {
    const project = projects[0]!
    const html = await render(`/projects/${project.slug}/`)

    expect(html).toContain(escaped(project.content['zh-TW'].title))
    expect(html).toContain('id="overview"')
    expect(html).toContain('id="tech-stack"')
  })
})
