import { describe, expect, it } from 'vitest'
import { normalizeBasePath } from './base-path'

describe('normalizeBasePath', () => {
  it.each([undefined, '', '   ', '/', '//'])('falls back to root for %j', (input) => {
    expect(normalizeBasePath(input)).toBe('/')
  })

  it.each([
    ['/portfolio', '/portfolio/'],
    ['portfolio', '/portfolio/'],
    ['/portfolio/', '/portfolio/'],
    [' portfolio/ ', '/portfolio/'],
    ['/a//b/', '/a/b/'],
  ])('normalizes %j to %j', (input, expected) => {
    expect(normalizeBasePath(input)).toBe(expected)
  })
})
