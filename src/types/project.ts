import type { Localized } from '@/i18n/locales'

/** A file in `public/`, with intrinsic size to reserve layout space before it loads. */
export interface ImageAsset {
  /** Path relative to `public/`, e.g. `images/projects/cover.svg`. */
  src: string
  width: number
  height: number
}

export interface TechnicalChallenge {
  challenge: string
  solution: string
}

/**
 * Case study sections. Every section is optional: a section without content is not rendered,
 * so a project only documents what is actually known about it.
 */
export interface CaseStudy {
  /** Paragraphs. */
  overview?: string[]
  role?: {
    title: string
    responsibilities: string[]
  }
  /** Paragraphs. */
  problem?: string[]
  architecture?: {
    /** Ordered steps of the main flow. */
    steps: string[]
    /** Alt text for `Project.architectureDiagram`, when a diagram exists. */
    diagramAlt?: string
  }
  /** Paragraphs. */
  solution?: string[]
  challenges?: TechnicalChallenge[]
  results?: string[]
  learnings?: string[]
}

/** Project text, written once per locale. */
export interface ProjectContent {
  title: string
  subtitle: string
  /** Card description and meta description. */
  summary: string
  coverAlt: string
  highlights: string[]
  caseStudy: CaseStudy
}

export interface Project {
  /** URL segment shared by both locales: lowercase letters, digits and hyphens. */
  slug: string
  cover: ImageAsset
  architectureDiagram?: ImageAsset
  /** Technology names are not translated. */
  technologies: readonly string[]
  featured: boolean
  content: Localized<ProjectContent>
}
