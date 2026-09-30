import { describe, expect, it } from 'vitest'
import { findBlankStrings } from '@/test-utils/content'
import { LOCALES } from './locales'
import { MESSAGES } from './messages'

describe('MESSAGES', () => {
  it.each(LOCALES)('has no blank strings in %s', (locale) => {
    expect(findBlankStrings(MESSAGES[locale])).toEqual([])
  })
})
