import type { Localized } from '@/i18n/locales'

export interface ExperienceEntry {
  company: string
  title: string
  period: string
  highlights: string[]
}

/** Text about the site owner, written once per locale. */
export interface ProfileContent {
  name: string
  role: string
  /** One or two sentences for the home page hero. */
  intro: string
  /** Short background paragraph for the home page "About" preview. */
  summary: string
  /** Paragraphs for the About page. */
  bio: string[]
  strengths: string[]
  experience: ExperienceEntry[]
}

export interface Profile {
  githubUrl: string
  email?: string
  /** Technologies highlighted in the hero; names are not translated. */
  focusTechnologies: readonly string[]
  content: Localized<ProfileContent>
}
