import { describe, expect, it } from 'vitest'
import { LOCALES } from '@/i18n/locales'
import { findBlankStrings } from '@/test-utils/content'
import { profile } from './profile'

describe('profile', () => {
  it.each(LOCALES)('has complete %s content', (locale) => {
    expect(findBlankStrings(profile.content[locale])).toEqual([])
  })

  it('lists the same experience entries in every locale', () => {
    const counts = LOCALES.map((locale) => profile.content[locale].experience.length)
    expect(new Set(counts).size).toBe(1)
  })

  it('links to an https GitHub profile', () => {
    expect(profile.githubUrl).toMatch(/^https:\/\/github\.com\/[\w-]+$/)
  })
})
