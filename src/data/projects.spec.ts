import { describe, expect, it } from 'vitest'
import { LOCALES } from '@/i18n/locales'
import { findBlankStrings } from '@/test-utils/content'
import {
  featuredProjects,
  getAdjacentProjects,
  getProjectBySlug,
  MAX_FEATURED_PROJECTS,
  projects,
  SLUG_PATTERN,
} from './projects'

describe('projects data', () => {
  it('uses unique, URL-safe slugs', () => {
    const slugs = projects.map((project) => project.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
    for (const slug of slugs) expect(slug).toMatch(SLUG_PATTERN)
  })

  describe.each(projects.map((project) => [project.slug, project] as const))('%s', (_, project) => {
    it.each(LOCALES)('has complete %s content', (locale) => {
      expect(findBlankStrings(project.content[locale])).toEqual([])
    })

    it('documents the same case study sections in every locale', () => {
      const sectionSets = LOCALES.map((locale) =>
        Object.keys(project.content[locale].caseStudy).sort().join(','),
      )
      expect(new Set(sectionSets).size).toBe(1)
    })
  })

  it('references covers in public/images with a 16:9 intrinsic size', () => {
    for (const project of projects) {
      expect(project.cover.src).toMatch(/^images\/projects\/[\w-]+\.(svg|webp|png|jpg)$/)
      expect(project.cover.width / project.cover.height).toBeCloseTo(16 / 9)
    }
  })

  it('lists technologies for every project', () => {
    for (const project of projects) expect(project.technologies.length).toBeGreaterThan(0)
  })
})

describe('featuredProjects', () => {
  it('keeps featured projects in display order, up to the limit', () => {
    expect(featuredProjects.length).toBeLessThanOrEqual(MAX_FEATURED_PROJECTS)
    expect(featuredProjects.every((project) => project.featured)).toBe(true)
    expect(featuredProjects.map((project) => project.slug)).toEqual(
      projects
        .filter((project) => project.featured)
        .map((project) => project.slug)
        .slice(0, 3),
    )
  })
})

describe('getProjectBySlug', () => {
  it('finds a project or returns undefined', () => {
    expect(getProjectBySlug('multi-stream-video-system')?.technologies).toContain('WebRTC')
    expect(getProjectBySlug('unknown')).toBeUndefined()
  })
})

describe('getAdjacentProjects', () => {
  it('has no previous project at the start', () => {
    const { previous, next } = getAdjacentProjects(projects[0]!.slug)
    expect(previous).toBeUndefined()
    expect(next?.slug).toBe(projects[1]?.slug)
  })

  it('has no next project at the end', () => {
    const last = projects[projects.length - 1]!
    const { previous, next } = getAdjacentProjects(last.slug)
    expect(previous?.slug).toBe(projects[projects.length - 2]?.slug)
    expect(next).toBeUndefined()
  })

  it('returns nothing for an unknown slug', () => {
    expect(getAdjacentProjects('unknown')).toEqual({})
  })
})
