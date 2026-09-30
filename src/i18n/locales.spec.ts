import { describe, expect, it } from 'vitest'
import { localeFromPath, stripLocalePrefix, switchLocalePath, withLocalePrefix } from './locales'

describe('localeFromPath', () => {
  it.each([
    ['/', 'zh-TW'],
    ['/projects', 'zh-TW'],
    ['/english', 'zh-TW'],
    ['/projects/en', 'zh-TW'],
    ['/en', 'en'],
    ['/en/', 'en'],
    ['/en/projects/some-slug', 'en'],
    ['/en/does-not-exist', 'en'],
  ])('%s → %s', (path, locale) => {
    expect(localeFromPath(path)).toBe(locale)
  })
})

describe('stripLocalePrefix', () => {
  it.each([
    ['/en', '/'],
    ['/en/', '/'],
    ['/en/about', '/about'],
    ['/about', '/about'],
    ['/english', '/english'],
  ])('%s → %s', (path, expected) => {
    expect(stripLocalePrefix(path)).toBe(expected)
  })
})

describe('withLocalePrefix', () => {
  it('leaves default-locale paths unprefixed', () => {
    expect(withLocalePrefix('/', 'zh-TW')).toBe('/')
    expect(withLocalePrefix('/projects', 'zh-TW')).toBe('/projects')
  })

  it('prefixes English paths', () => {
    expect(withLocalePrefix('/', 'en')).toBe('/en')
    expect(withLocalePrefix('/projects/x', 'en')).toBe('/en/projects/x')
  })

  it('does not double-prefix', () => {
    expect(withLocalePrefix('/en/about', 'en')).toBe('/en/about')
  })
})

describe('switchLocalePath', () => {
  it('maps a page to its counterpart in both directions', () => {
    expect(switchLocalePath('/projects/large-file-upload-system', 'en')).toBe(
      '/en/projects/large-file-upload-system',
    )
    expect(switchLocalePath('/en/about', 'zh-TW')).toBe('/about')
    expect(switchLocalePath('/en', 'zh-TW')).toBe('/')
  })
})
