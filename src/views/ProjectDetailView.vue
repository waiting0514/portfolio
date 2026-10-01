<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import BaseContainer from '@/components/common/BaseContainer.vue'
import FlowDiagram from '@/components/common/FlowDiagram.vue'
import ManHeader from '@/components/common/ManHeader.vue'
import NotFoundContent from '@/components/common/NotFoundContent.vue'
import TechTagList from '@/components/common/TechTagList.vue'
import CaseStudyCard from '@/components/project/CaseStudyCard.vue'
import CaseStudySection from '@/components/project/CaseStudySection.vue'
import CaseStudyToc from '@/components/project/CaseStudyToc.vue'
import OperationFlow from '@/components/project/OperationFlow.vue'
import ProjectMeta from '@/components/project/ProjectMeta.vue'
import ProjectPager from '@/components/project/ProjectPager.vue'
import { useActiveSection } from '@/composables/useActiveSection'
import { useLocale } from '@/composables/useLocale'
import { usePageMeta } from '@/composables/usePageMeta'
import { describePage } from '@/utils/seo'
import { getProjectBySlug } from '@/data/projects'
import { assetUrl } from '@/utils/asset'
import { hasContent } from '@/utils/content'

const props = defineProps<{ slug: string }>()

const { locale, messages, localePath } = useLocale()

const project = computed(() => getProjectBySlug(props.slug))
const content = computed(() => project.value?.content[locale.value])
const caseStudy = computed(() => content.value?.caseStudy)
const sectionTitles = computed(() => messages.value.caseStudy.sections)

/**
 * The sections this project renders, in page order. The template uses the same conditions;
 * this list drives the table of contents and the section numbers.
 */
const sections = computed(() => {
  const study = caseStudy.value
  const text = content.value
  if (!study || !text) return []
  const titles = sectionTitles.value
  return [
    {
      id: 'overview',
      title: titles.overview,
      show: hasContent(study.overview) || hasContent(text.highlights),
    },
    { id: 'background', title: titles.background, show: hasContent(study.background) },
    { id: 'role', title: titles.role, show: hasContent(study.role) },
    {
      id: 'problem',
      title: titles.problem,
      show: hasContent(study.problem) || hasContent(study.problemExample),
    },
    { id: 'workflow', title: titles.workflow, show: hasContent(study.workflow) },
    { id: 'architecture', title: titles.architecture, show: hasContent(study.architecture) },
    {
      id: 'operation-flow',
      title: titles.operationFlow,
      show: hasContent(study.operationFlow),
    },
    { id: 'solution', title: titles.solution, show: hasContent(study.solution) },
    {
      id: 'responsibilities',
      title: titles.responsibilities,
      show: hasContent(study.responsibilities),
    },
    { id: 'challenges', title: titles.challenges, show: hasContent(study.challenges) },
    { id: 'ai-assisted', title: titles.aiAssisted, show: hasContent(study.aiAssisted) },
    { id: 'tech-stack', title: titles.techStack, show: true },
    { id: 'results', title: titles.results, show: hasContent(study.results) },
    { id: 'current-status', title: titles.currentStatus, show: hasContent(study.currentStatus) },
    { id: 'learnings', title: titles.learnings, show: hasContent(study.learnings) },
  ]
    .filter((section) => section.show)
    .map(({ id, title }) => ({ id, title }))
})
const sectionIndex = computed(
  () => new Map(sections.value.map((section, index) => [section.id, index + 1])),
)
const sectionIds = computed(() => sections.value.map((section) => section.id))
const activeId = useActiveSection(sectionIds)

/** Known facts only; a fact without a value is left out rather than shown empty. */
const facts = computed(() => {
  const text = content.value
  const current = project.value
  if (!text || !current) return []
  const labels = messages.value.caseStudy.facts
  return [
    { label: labels.role, value: text.caseStudy.role?.title, mono: false },
    { label: labels.company, value: text.facts?.company, mono: false },
    { label: labels.period, value: text.facts?.period, mono: false },
    { label: labels.stack, value: current.technologies.join(' · '), mono: true },
  ].filter((fact): fact is { label: string; value: string; mono: boolean } =>
    hasContent(fact.value),
  )
})

usePageMeta(() => describePage({ page: 'project', slug: props.slug }, locale.value))
</script>

<template>
  <!-- An unknown slug renders the 404 content in place, so the mistyped URL stays visible. -->
  <NotFoundContent v-if="!project || !content || !caseStudy" />

  <article v-else aria-labelledby="case-study-title">
    <header class="hero-grid border-b border-line-strong">
      <BaseContainer class="pt-6 pb-14 md:pt-8 md:pb-20">
        <ManHeader :page="project.slug" center="Case Study" />
        <RouterLink
          :to="localePath('/projects')"
          class="mt-4 inline-flex min-h-11 items-center gap-1.5 link-muted font-mono text-label font-medium transition-state"
        >
          <span aria-hidden="true">cd ..</span>
          <span aria-hidden="true" class="text-line-strong">/</span>
          {{ messages.caseStudy.allProjects }}
        </RouterLink>
        <div class="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
          <p class="eyebrow text-accent">
            <span class="marker-hash">{{ messages.caseStudy.eyebrow }}</span>
          </p>
          <ProjectMeta :labels="project.labels" :status="project.status" />
        </div>
        <h1
          id="case-study-title"
          class="mt-4 max-w-5xl text-4xl leading-headline font-bold text-balance md:text-display"
        >
          {{ content.title }}
        </h1>
        <p class="mt-5 max-w-3xl text-lg leading-relaxed text-ink-soft md:text-xl">
          {{ content.subtitle }}
        </p>
        <dl
          class="mt-10 grid grid-cols-2 rounded-card border border-line-strong bg-surface md:flex"
        >
          <div
            v-for="fact in facts"
            :key="fact.label"
            class="border-b border-line px-4 py-4 odd:border-r md:min-w-0 md:flex-1 md:border-r-0 md:border-b-0 md:border-l md:px-5 md:first:border-l-0"
          >
            <dt class="font-mono text-micro tracking-wider text-syntax-keyword uppercase">
              {{ fact.label }}
            </dt>
            <dd class="mt-1.5 font-bold" :class="{ 'font-mono text-sm font-medium': fact.mono }">
              {{ fact.value }}
            </dd>
          </div>
        </dl>
        <!-- Above the fold: loaded eagerly with high priority. -->
        <img
          :src="assetUrl(project.cover.src)"
          :alt="content.coverAlt"
          :width="project.cover.width"
          :height="project.cover.height"
          fetchpriority="high"
          decoding="async"
          class="mt-10 aspect-video w-full rounded-card border border-line-strong bg-surface object-cover"
        />
      </BaseContainer>
    </header>

    <BaseContainer class="py-14 md:py-20 lg:grid lg:grid-cols-12 lg:gap-8">
      <CaseStudyToc
        class="hidden lg:sticky lg:top-8 lg:col-span-3 lg:block lg:self-start"
        :items="sections"
        :active-id="activeId"
      />

      <div class="lg:col-span-8 lg:col-start-5">
        <CaseStudySection
          v-if="hasContent(caseStudy.overview) || hasContent(content.highlights)"
          id="overview"
          :title="sectionTitles.overview"
          :index="sectionIndex.get('overview')"
          :prose="false"
        >
          <div class="prose-content">
            <p v-for="paragraph in caseStudy.overview" :key="paragraph">{{ paragraph }}</p>
          </div>
          <template v-if="hasContent(content.highlights)">
            <h3 class="mt-8 text-base font-bold">{{ messages.caseStudy.highlights }}</h3>
            <ul class="mt-4 flex flex-wrap gap-2">
              <li
                v-for="highlight in content.highlights"
                :key="highlight"
                class="rounded-inset border border-line-strong bg-surface px-3 py-1.5 text-sm text-ink-soft"
              >
                {{ highlight }}
              </li>
            </ul>
          </template>
        </CaseStudySection>

        <!-- Flows stay outside the prose container, so they are not styled as numbered lists. -->
        <CaseStudySection
          v-if="hasContent(caseStudy.background)"
          id="background"
          :title="sectionTitles.background"
          :index="sectionIndex.get('background')"
          :prose="false"
        >
          <div class="prose-content">
            <p v-for="paragraph in caseStudy.background.paragraphs" :key="paragraph">
              {{ paragraph }}
            </p>
          </div>
          <FlowDiagram
            v-if="hasContent(caseStudy.background.flow)"
            class="mt-8"
            :steps="caseStudy.background.flow"
            :label="sectionTitles.background"
          />
        </CaseStudySection>

        <CaseStudySection
          v-if="hasContent(caseStudy.role)"
          id="role"
          :title="sectionTitles.role"
          :index="sectionIndex.get('role')"
          :prose="false"
        >
          <div class="prose-content">
            <p class="font-bold text-ink">{{ caseStudy.role.title }}</p>
            <ul v-if="hasContent(caseStudy.role.responsibilities)">
              <li v-for="item in caseStudy.role.responsibilities" :key="item">{{ item }}</li>
            </ul>
          </div>
          <FlowDiagram
            v-if="hasContent(caseStudy.role.flow)"
            class="mt-8"
            :steps="caseStudy.role.flow"
            :label="sectionTitles.role"
          />
        </CaseStudySection>

        <CaseStudySection
          v-if="hasContent(caseStudy.problem) || hasContent(caseStudy.problemExample)"
          id="problem"
          :title="sectionTitles.problem"
          :index="sectionIndex.get('problem')"
          :prose="false"
        >
          <div class="prose-content">
            <p v-for="paragraph in caseStudy.problem" :key="paragraph">{{ paragraph }}</p>
          </div>
          <div
            v-if="hasContent(caseStudy.problemExample)"
            class="mt-8 rounded-card border border-line-strong bg-surface p-6 md:p-8"
          >
            <h3 v-if="caseStudy.problemExample.heading" class="text-lg font-bold">
              {{ caseStudy.problemExample.heading }}
            </h3>
            <p class="mt-3 max-w-prose leading-relaxed text-ink-soft">
              <strong class="text-ink"
                >{{ messages.caseStudy.requirement }}{{ messages.common.labelSeparator }}</strong
              >{{ caseStudy.problemExample.requirement }}
            </p>
            <p class="eyebrow mt-6 text-xs text-ink-muted">{{ messages.caseStudy.requiredFlow }}</p>
            <FlowDiagram
              class="mt-3"
              :steps="caseStudy.problemExample.flow"
              :label="messages.caseStudy.requiredFlow"
            />
            <template v-if="hasContent(caseStudy.problemExample.states)">
              <p class="eyebrow mt-6 text-xs text-ink-muted">
                {{ messages.caseStudy.requiredStates }}
              </p>
              <TechTagList
                class="mt-3"
                :items="caseStudy.problemExample.states"
                :label="messages.caseStudy.requiredStates"
              />
            </template>
          </div>
        </CaseStudySection>

        <CaseStudySection
          v-if="hasContent(caseStudy.workflow)"
          id="workflow"
          :title="sectionTitles.workflow"
          :index="sectionIndex.get('workflow')"
          :prose="false"
        >
          <FlowDiagram :steps="caseStudy.workflow" :label="sectionTitles.workflow" />
        </CaseStudySection>

        <CaseStudySection
          v-if="hasContent(caseStudy.architecture)"
          id="architecture"
          :title="sectionTitles.architecture"
          :index="sectionIndex.get('architecture')"
          :prose="false"
        >
          <!-- Step numbers come from a CSS counter, so the list text stays the step text. -->
          <ol class="max-w-prose space-y-5 [counter-reset:step]">
            <li
              v-for="step in caseStudy.architecture.steps"
              :key="step"
              class="relative min-h-8 pl-12 text-lead leading-relaxed text-ink-soft [counter-increment:step] before:absolute before:top-0 before:left-0 before:flex before:size-8 before:items-center before:justify-center before:rounded-inset before:border before:border-accent before:bg-accent-soft before:font-mono before:text-label before:text-accent before:content-[counter(step)]"
            >
              {{ step }}
            </li>
          </ol>
          <img
            v-if="project.architectureDiagram && caseStudy.architecture.diagramAlt"
            :src="assetUrl(project.architectureDiagram.src)"
            :alt="caseStudy.architecture.diagramAlt"
            :width="project.architectureDiagram.width"
            :height="project.architectureDiagram.height"
            loading="lazy"
            decoding="async"
            class="mt-8 h-auto w-full rounded-card border border-line-strong bg-surface"
          />
        </CaseStudySection>

        <CaseStudySection
          v-if="hasContent(caseStudy.operationFlow)"
          id="operation-flow"
          :title="sectionTitles.operationFlow"
          :index="sectionIndex.get('operation-flow')"
          :prose="false"
        >
          <OperationFlow
            :phases="caseStudy.operationFlow.phases"
            :label="sectionTitles.operationFlow"
          />
        </CaseStudySection>

        <CaseStudySection
          v-if="hasContent(caseStudy.solution)"
          id="solution"
          :title="sectionTitles.solution"
          :index="sectionIndex.get('solution')"
        >
          <p v-for="paragraph in caseStudy.solution" :key="paragraph">{{ paragraph }}</p>
        </CaseStudySection>

        <CaseStudySection
          v-if="hasContent(caseStudy.responsibilities)"
          id="responsibilities"
          :title="sectionTitles.responsibilities"
          :index="sectionIndex.get('responsibilities')"
          :prose="false"
          body-class="grid gap-4 md:grid-cols-2"
        >
          <CaseStudyCard v-for="item in caseStudy.responsibilities" :key="item.title">
            <template #title>{{ item.title }}</template>
            <p class="mt-2 leading-relaxed text-ink-muted">{{ item.description }}</p>
          </CaseStudyCard>
        </CaseStudySection>

        <CaseStudySection
          v-if="hasContent(caseStudy.challenges)"
          id="challenges"
          :title="sectionTitles.challenges"
          :index="sectionIndex.get('challenges')"
          :prose="false"
          body-class="grid gap-4 md:grid-cols-2"
        >
          <CaseStudyCard v-for="(item, index) in caseStudy.challenges" :key="item.challenge">
            <template #title>
              <span
                class="block font-mono text-xs font-medium tracking-wider text-ink-muted uppercase"
                >{{ messages.caseStudy.challenge }} {{ String(index + 1).padStart(2, '0') }}</span
              >
              <span class="mt-2 block">{{ item.challenge }}</span>
            </template>
            <p
              class="mt-4 border-t border-dashed border-line pt-4 text-ui leading-relaxed text-ink-soft"
            >
              <strong class="text-ink"
                >{{ messages.caseStudy.solution }}{{ messages.common.labelSeparator }}</strong
              >{{ item.solution }}
            </p>
          </CaseStudyCard>
        </CaseStudySection>

        <CaseStudySection
          v-if="hasContent(caseStudy.aiAssisted)"
          id="ai-assisted"
          :title="sectionTitles.aiAssisted"
          :index="sectionIndex.get('ai-assisted')"
        >
          <p v-for="paragraph in caseStudy.aiAssisted.paragraphs" :key="paragraph">
            {{ paragraph }}
          </p>
          <template v-if="hasContent(caseStudy.aiAssisted.humanTasks)">
            <p class="font-bold text-ink">{{ messages.caseStudy.humanTasks }}</p>
            <ul>
              <li v-for="task in caseStudy.aiAssisted.humanTasks" :key="task">{{ task }}</li>
            </ul>
          </template>
        </CaseStudySection>

        <CaseStudySection
          id="tech-stack"
          :title="sectionTitles.techStack"
          :index="sectionIndex.get('tech-stack')"
          :prose="false"
        >
          <TechTagList :items="project.technologies" :label="sectionTitles.techStack" />
        </CaseStudySection>

        <CaseStudySection
          v-if="hasContent(caseStudy.results)"
          id="results"
          :title="sectionTitles.results"
          :index="sectionIndex.get('results')"
          :prose="false"
        >
          <ul class="max-w-prose border-t border-ink">
            <li
              v-for="result in caseStudy.results"
              :key="result"
              class="border-b border-dashed border-line-strong py-4 pl-7 text-lead leading-relaxed text-ink-soft relative before:absolute before:left-0 before:font-mono before:text-syntax-string before:content-['✓']"
            >
              {{ result }}
            </li>
          </ul>
        </CaseStudySection>

        <CaseStudySection
          v-if="hasContent(caseStudy.currentStatus)"
          id="current-status"
          :title="sectionTitles.currentStatus"
          :index="sectionIndex.get('current-status')"
          :prose="false"
        >
          <dl class="max-w-prose divide-y divide-line border-y border-line">
            <div
              v-for="item in caseStudy.currentStatus"
              :key="item.label"
              class="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
            >
              <dt class="font-mono text-ui font-semibold text-ink">{{ item.label }}</dt>
              <dd class="font-mono text-label text-syntax-string sm:text-right">
                {{ item.value }}
              </dd>
            </div>
          </dl>
        </CaseStudySection>

        <CaseStudySection
          v-if="hasContent(caseStudy.learnings)"
          id="learnings"
          :title="sectionTitles.learnings"
          :index="sectionIndex.get('learnings')"
        >
          <ul>
            <li v-for="learning in caseStudy.learnings" :key="learning">{{ learning }}</li>
          </ul>
        </CaseStudySection>

        <ProjectPager class="mt-6" :slug="project.slug" />
      </div>
    </BaseContainer>
  </article>
</template>
