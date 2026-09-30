import type { Locale } from '@/i18n/locales'
import type { CaseStudy, Project, ProjectContent } from '@/types/project'

function localizedContent(
  title: string,
  build: (locale: Locale) => CaseStudy,
): Record<Locale, ProjectContent> {
  const make = (locale: Locale): ProjectContent => ({
    title: `${title} (${locale})`,
    subtitle: `Subtitle (${locale})`,
    summary: `Summary (${locale})`,
    coverAlt: `Cover of ${title} (${locale})`,
    highlights: [`Highlight (${locale})`],
    caseStudy: build(locale),
  })
  return { 'zh-TW': make('zh-TW'), en: make('en') }
}

/** A project that fills in every case study section, including an architecture diagram. */
export const fullProject: Project = {
  slug: 'full-project',
  cover: { src: 'images/full.svg', width: 1600, height: 900 },
  architectureDiagram: { src: 'images/full-diagram.svg', width: 1200, height: 800 },
  technologies: ['Vue', 'RxJS'],
  featured: true,
  content: localizedContent('Full', (locale) => ({
    overview: [`Overview (${locale})`],
    role: { title: `Role (${locale})`, responsibilities: [`Responsibility (${locale})`] },
    problem: [`Problem (${locale})`],
    architecture: {
      steps: [`Step one (${locale})`, `Step two (${locale})`],
      diagramAlt: `Diagram (${locale})`,
    },
    solution: [`Solution (${locale})`],
    challenges: [
      { challenge: `Challenge A (${locale})`, solution: `Fix A (${locale})` },
      { challenge: `Challenge B (${locale})`, solution: `Fix B (${locale})` },
    ],
    results: [`Result (${locale})`],
    learnings: [`Learning (${locale})`],
  })),
}

/** A project that documents only an overview; empty sections must not render. */
export const minimalProject: Project = {
  slug: 'minimal-project',
  cover: { src: 'images/minimal.svg', width: 1600, height: 900 },
  technologies: ['TypeScript'],
  featured: false,
  content: localizedContent('Minimal', (locale) => ({
    overview: [`Overview (${locale})`],
    architecture: { steps: [] },
    challenges: [],
    results: [],
  })),
}
