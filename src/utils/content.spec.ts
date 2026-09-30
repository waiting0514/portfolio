import { describe, expect, it } from 'vitest'
import { hasContent } from './content'

describe('hasContent', () => {
  it.each([undefined, null, '', '   ', [], [''], {}, { steps: [] }, { title: '', items: [] }])(
    'treats %j as empty',
    (value) => {
      expect(hasContent(value)).toBe(false)
    },
  )

  it.each(['text', ['a'], ['', 'b'], { steps: ['one'] }, { title: 'Role', items: [] }, 0, false])(
    'treats %j as content',
    (value) => {
      expect(hasContent(value)).toBe(true)
    },
  )
})
