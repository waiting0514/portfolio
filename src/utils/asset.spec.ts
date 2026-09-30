import { afterEach, describe, expect, it, vi } from 'vitest'
import { assetUrl } from './asset'

describe('assetUrl', () => {
  afterEach(() => {
    vi.unstubAllEnvs()
  })

  it('resolves against the root base', () => {
    vi.stubEnv('BASE_URL', '/')
    expect(assetUrl('images/a.svg')).toBe('/images/a.svg')
  })

  it('resolves against a project-site base', () => {
    vi.stubEnv('BASE_URL', '/portfolio/')
    expect(assetUrl('images/a.svg')).toBe('/portfolio/images/a.svg')
    expect(assetUrl('/images/a.svg')).toBe('/portfolio/images/a.svg')
  })
})
