<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import BaseContainer from '@/components/common/BaseContainer.vue'
import FlowDiagram from '@/components/common/FlowDiagram.vue'
import NotFoundContent from '@/components/common/NotFoundContent.vue'
import TechTagList from '@/components/common/TechTagList.vue'
import CaseStudyCard from '@/components/project/CaseStudyCard.vue'
import CaseStudySection from '@/components/project/CaseStudySection.vue'
import ProjectMeta from '@/components/project/ProjectMeta.vue'
import ProjectPager from '@/components/project/ProjectPager.vue'
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

usePageMeta(() => describePage({ page: 'project', slug: props.slug }, locale.value))
</script>

<template>
  <!-- An unknown slug renders the 404 content in place, so the mistyped URL stays visible. -->
  <NotFoundContent v-if="!project || !content || !caseStudy" />

  <article v-else aria-labelledby="case-study-title">
    <header class="border-b border-line">
      <BaseContainer class="pt-10 pb-12 md:pt-14 md:pb-16">
        <RouterLink
          :to="localePath('/projects')"
          class="inline-flex min-h-11 items-center gap-1 text-sm font-medium text-ink-muted hover:text-ink"
        >
          <span aria-hidden="true">←</span> {{ messages.caseStudy.allProjects }}
        </RouterLink>
        <ProjectMeta class="mt-6" :labels="project.labels" :status="project.status" />
        <h1
          id="case-study-title"
          class="mt-4 max-w-4xl text-3xl font-bold tracking-tight text-balance md:text-5xl"
        >
          {{ content.title }}
        </h1>
        <p class="mt-4 max-w-prose text-lg text-ink-muted">{{ content.subtitle }}</p>
        <TechTagList
          class="mt-6"
          :items="project.technologies"
          :label="messages.project.techStack"
        />
        <!-- Above the fold: loaded eagerly with high priority. -->
        <img
          :src="assetUrl(project.cover.src)"
          :alt="content.coverAlt"
          :width="project.cover.width"
          :height="project.cover.height"
          fetchpriority="high"
          decoding="async"
          class="mt-10 aspect-video w-full rounded-lg border border-line bg-surface object-cover"
        />
      </BaseContainer>
    </header>

    <BaseContainer class="pb-16 md:pb-24">
      <CaseStudySection
        v-if="hasContent(caseStudy.overview) || hasContent(content.highlights)"
        id="overview"
        :title="sectionTitles.overview"
      >
        <p v-for="paragraph in caseStudy.overview" :key="paragraph">{{ paragraph }}</p>
        <template v-if="hasContent(content.highlights)">
          <h3 class="pt-2 text-base font-semibold">{{ messages.caseStudy.highlights }}</h3>
          <ul>
            <li v-for="highlight in content.highlights" :key="highlight">{{ highlight }}</li>
          </ul>
        </template>
      </CaseStudySection>

      <!-- Sections that contain a flow keep it outside the prose container, so it is not styled as a numbered list. -->
      <CaseStudySection
        v-if="hasContent(caseStudy.background)"
        id="background"
        :title="sectionTitles.background"
        :prose="false"
      >
        <div class="prose-content">
          <p v-for="paragraph in caseStudy.background.paragraphs" :key="paragraph">
            {{ paragraph }}
          </p>
        </div>
        <FlowDiagram
          v-if="hasContent(caseStudy.background.flow)"
          class="mt-6"
          :steps="caseStudy.background.flow"
          :label="sectionTitles.background"
        />
      </CaseStudySection>

      <CaseStudySection
        v-if="hasContent(caseStudy.role)"
        id="role"
        :title="sectionTitles.role"
        :prose="false"
      >
        <div class="prose-content">
          <p class="font-semibold">{{ caseStudy.role.title }}</p>
          <ul v-if="hasContent(caseStudy.role.responsibilities)">
            <li v-for="item in caseStudy.role.responsibilities" :key="item">{{ item }}</li>
          </ul>
        </div>
        <FlowDiagram
          v-if="hasContent(caseStudy.role.flow)"
          class="mt-6"
          :steps="caseStudy.role.flow"
          :label="sectionTitles.role"
        />
      </CaseStudySection>

      <CaseStudySection
        v-if="hasContent(caseStudy.problem) || hasContent(caseStudy.problemExample)"
        id="problem"
        :title="sectionTitles.problem"
        :prose="false"
      >
        <div class="prose-content">
          <p v-for="paragraph in caseStudy.problem" :key="paragraph">{{ paragraph }}</p>
        </div>
        <div v-if="hasContent(caseStudy.problemExample)" class="mt-8">
          <h3 v-if="caseStudy.problemExample.heading" class="text-lg font-semibold">
            {{ caseStudy.problemExample.heading }}
          </h3>
          <p class="mt-3 max-w-prose">
            <strong>{{ messages.caseStudy.requirement }}{{ messages.common.labelSeparator }}</strong
            >{{ caseStudy.problemExample.requirement }}
          </p>
          <p class="mt-6 text-sm font-semibold">{{ messages.caseStudy.requiredFlow }}</p>
          <FlowDiagram
            class="mt-3"
            :steps="caseStudy.problemExample.flow"
            :label="messages.caseStudy.requiredFlow"
          />
          <template v-if="hasContent(caseStudy.problemExample.states)">
            <p class="mt-6 text-sm font-semibold">{{ messages.caseStudy.requiredStates }}</p>
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
        :prose="false"
      >
        <FlowDiagram :steps="caseStudy.workflow" :label="sectionTitles.workflow" />
      </CaseStudySection>

      <CaseStudySection
        v-if="hasContent(caseStudy.architecture)"
        id="architecture"
        :title="sectionTitles.architecture"
      >
        <ol>
          <li v-for="step in caseStudy.architecture.steps" :key="step">{{ step }}</li>
        </ol>
        <img
          v-if="project.architectureDiagram && caseStudy.architecture.diagramAlt"
          :src="assetUrl(project.architectureDiagram.src)"
          :alt="caseStudy.architecture.diagramAlt"
          :width="project.architectureDiagram.width"
          :height="project.architectureDiagram.height"
          loading="lazy"
          decoding="async"
          class="h-auto w-full rounded-lg border border-line bg-surface"
        />
      </CaseStudySection>

      <CaseStudySection
        v-if="hasContent(caseStudy.solution)"
        id="solution"
        :title="sectionTitles.solution"
      >
        <p v-for="paragraph in caseStudy.solution" :key="paragraph">{{ paragraph }}</p>
      </CaseStudySection>

      <CaseStudySection
        v-if="hasContent(caseStudy.responsibilities)"
        id="responsibilities"
        :title="sectionTitles.responsibilities"
        :prose="false"
      >
        <div class="grid gap-4 md:grid-cols-2">
          <CaseStudyCard v-for="item in caseStudy.responsibilities" :key="item.title">
            <template #title>{{ item.title }}</template>
            <p class="mt-2 leading-relaxed text-ink-muted">{{ item.description }}</p>
          </CaseStudyCard>
        </div>
      </CaseStudySection>

      <CaseStudySection
        v-if="hasContent(caseStudy.challenges)"
        id="challenges"
        :title="sectionTitles.challenges"
      >
        <CaseStudyCard v-for="(item, index) in caseStudy.challenges" :key="item.challenge">
          <template #title>
            <span class="text-ink-muted">{{ messages.caseStudy.challenge }} {{ index + 1 }}</span>
            <span class="mt-1 block">{{ item.challenge }}</span>
          </template>
          <p class="mt-3">
            <strong>{{ messages.caseStudy.solution }}{{ messages.common.labelSeparator }}</strong
            >{{ item.solution }}
          </p>
        </CaseStudyCard>
      </CaseStudySection>

      <CaseStudySection
        v-if="hasContent(caseStudy.aiAssisted)"
        id="ai-assisted"
        :title="sectionTitles.aiAssisted"
      >
        <p v-for="paragraph in caseStudy.aiAssisted.paragraphs" :key="paragraph">
          {{ paragraph }}
        </p>
        <template v-if="hasContent(caseStudy.aiAssisted.humanTasks)">
          <p class="font-semibold">{{ messages.caseStudy.humanTasks }}</p>
          <ul>
            <li v-for="task in caseStudy.aiAssisted.humanTasks" :key="task">{{ task }}</li>
          </ul>
        </template>
      </CaseStudySection>

      <CaseStudySection id="tech-stack" :title="sectionTitles.techStack" :prose="false">
        <TechTagList :items="project.technologies" :label="sectionTitles.techStack" />
      </CaseStudySection>

      <CaseStudySection
        v-if="hasContent(caseStudy.results)"
        id="results"
        :title="sectionTitles.results"
      >
        <ul>
          <li v-for="result in caseStudy.results" :key="result">{{ result }}</li>
        </ul>
      </CaseStudySection>

      <CaseStudySection
        v-if="hasContent(caseStudy.currentStatus)"
        id="current-status"
        :title="sectionTitles.currentStatus"
        :prose="false"
      >
        <dl class="max-w-prose divide-y divide-line border-y border-line">
          <div
            v-for="item in caseStudy.currentStatus"
            :key="item.label"
            class="flex flex-col gap-1 py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
          >
            <dt class="font-medium text-ink">{{ item.label }}</dt>
            <dd class="text-ink-muted sm:text-right">{{ item.value }}</dd>
          </div>
        </dl>
      </CaseStudySection>

      <CaseStudySection
        v-if="hasContent(caseStudy.learnings)"
        id="learnings"
        :title="sectionTitles.learnings"
      >
        <ul>
          <li v-for="learning in caseStudy.learnings" :key="learning">{{ learning }}</li>
        </ul>
      </CaseStudySection>

      <ProjectPager :slug="project.slug" />
    </BaseContainer>
  </article>
</template>
