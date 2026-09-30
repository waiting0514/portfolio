import { describe, expect, it } from 'vitest'
import { LOCALES } from '@/i18n/locales'
import { findBlankStrings } from '@/test-utils/content'
import { skillCategories } from './skills'

describe('skillCategories', () => {
  it('names every category in every locale and lists at least one skill', () => {
    expect(findBlankStrings(skillCategories)).toEqual([])
    for (const category of skillCategories) {
      for (const locale of LOCALES) expect(category.name[locale]).toBeTruthy()
      expect(category.items.length).toBeGreaterThan(0)
    }
  })

  it('covers the required categories', () => {
    expect(skillCategories.map((category) => category.name.en)).toEqual([
      'Frontend',
      'State / Reactive',
      'Realtime / Media',
      'Tooling',
      'DevOps',
    ])
  })

  it('does not repeat a skill', () => {
    const skills = skillCategories.flatMap((category) => category.items)
    expect(new Set(skills).size).toBe(skills.length)
  })
})
