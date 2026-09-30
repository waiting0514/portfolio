import { describe, expect, it } from 'vitest'
import { createMemoryHistory } from 'vue-router'
import { createAppRouter } from './index'

const router = createAppRouter(createMemoryHistory())

describe('route table', () => {
  it.each([
    ['/', 'home', undefined],
    ['/en', 'home', 'en'],
    ['/en/', 'home', 'en'],
    ['/projects', 'projects', undefined],
    ['/en/projects', 'projects', 'en'],
    ['/about', 'about', undefined],
    ['/en/about', 'about', 'en'],
  ])('resolves %s to %s', (path, name, locale) => {
    const resolved = router.resolve(path)
    expect(resolved.name).toBe(name)
    expect(resolved.params.locale || undefined).toBe(locale)
  })

  it('resolves case study slugs in both locales', () => {
    expect(router.resolve('/projects/some-project').params.slug).toBe('some-project')
    const english = router.resolve('/en/projects/some-project')
    expect(english.name).toBe('project-detail')
    expect(english.params.slug).toBe('some-project')
  })

  it('accepts trailing slashes produced by GitHub Pages directory URLs', () => {
    expect(router.resolve('/about/').name).toBe('about')
    expect(router.resolve('/en/projects/').name).toBe('projects')
  })

  it.each(['/does-not-exist', '/en/does-not-exist', '/english', '/projects/a/b', '/fr/about'])(
    'sends %s to the catch-all route',
    (path) => {
      expect(router.resolve(path).name).toBe('not-found')
    },
  )
})
