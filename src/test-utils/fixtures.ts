import type { Locale } from '@/i18n/locales'
import type { CaseStudy, Project, ProjectContent } from '@/types/project'

function localizedContent(
  title: string,
  build: (locale: Locale) => CaseStudy,
  facts?: (locale: Locale) => ProjectContent['facts'],
): Record<Locale, ProjectContent> {
  const make = (locale: Locale): ProjectContent => ({
    title: `${title} (${locale})`,
    subtitle: `Subtitle (${locale})`,
    summary: `Summary (${locale})`,
    coverAlt: `Cover of ${title} (${locale})`,
    highlights: [`Highlight (${locale})`],
    caseStudy: build(locale),
    ...(facts && { facts: facts(locale) }),
  })
  return { 'zh-TW': make('zh-TW'), en: make('en') }
}

/** The original nine sections, as used by finished projects. */
function classicSections(locale: Locale): CaseStudy {
  return {
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
  }
}

/**
 * A project that fills in every case study section, including an architecture diagram,
 * and is marked as in development with project labels.
 */
export const fullProject: Project = {
  slug: 'full-project',
  cover: { src: 'images/full.svg', width: 1600, height: 900 },
  architectureDiagram: { src: 'images/full-diagram.svg', width: 1200, height: 800 },
  technologies: ['Vue', 'RxJS'],
  featured: true,
  status: 'in-development',
  labels: ['Real-world Project', 'Frontend Development'],
  content: localizedContent(
    'Full',
    (locale) => {
      const classic = classicSections(locale)
      return {
        ...classic,
        background: {
          paragraphs: [`Background (${locale})`],
          flow: ['Input A', 'Input B'],
        },
        role: { ...classic.role!, flow: ['Analyse', 'Design', 'Build'] },
        problemExample: {
          heading: `Example (${locale})`,
          requirement: `Requirement (${locale})`,
          flow: ['Create', 'Schedule', 'Publish'],
          states: ['Draft', 'Published', 'Failed'],
        },
        workflow: ['Draft', 'Analysis', 'Implementation'],
        operationFlow: {
          phases: [
            { name: `Setup (${locale})`, steps: ['Sign in', 'Configure'] },
            { name: `Use (${locale})`, steps: ['Create', 'Review', 'Publish'] },
          ],
        },
        responsibilities: [
          { title: `Responsibility A (${locale})`, description: `Description A (${locale})` },
          { title: `Responsibility B (${locale})`, description: `Description B (${locale})` },
        ],
        aiAssisted: {
          paragraphs: [`AI paragraph (${locale})`],
          humanTasks: [`Human task (${locale})`],
        },
        currentStatus: [
          { label: 'Frontend', value: `In progress (${locale})` },
          { label: 'Backend', value: `Pending (${locale})` },
        ],
      }
    },
    (locale) => ({ company: `Company (${locale})`, period: `Since 2025 (${locale})` }),
  ),
}

/** A finished project with only the original sections, no labels and no status. */
export const legacyProject: Project = {
  slug: 'legacy-project',
  cover: { src: 'images/legacy.svg', width: 1600, height: 900 },
  architectureDiagram: { src: 'images/legacy-diagram.svg', width: 1200, height: 800 },
  technologies: ['Vue'],
  featured: true,
  content: localizedContent('Legacy', classicSections),
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
