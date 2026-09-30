<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import BaseContainer from '@/components/common/BaseContainer.vue'
import NotFoundContent from '@/components/common/NotFoundContent.vue'
import TechTagList from '@/components/common/TechTagList.vue'
import CaseStudySection from '@/components/project/CaseStudySection.vue'
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
        <h1
          id="case-study-title"
          class="mt-4 max-w-4xl text-3xl font-bold tracking-tight md:text-5xl"
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

      <CaseStudySection v-if="hasContent(caseStudy.role)" id="role" :title="sectionTitles.role">
        <p class="font-semibold">{{ caseStudy.role.title }}</p>
        <ul v-if="hasContent(caseStudy.role.responsibilities)">
          <li v-for="item in caseStudy.role.responsibilities" :key="item">{{ item }}</li>
        </ul>
      </CaseStudySection>

      <CaseStudySection
        v-if="hasContent(caseStudy.problem)"
        id="problem"
        :title="sectionTitles.problem"
      >
        <p v-for="paragraph in caseStudy.problem" :key="paragraph">{{ paragraph }}</p>
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
        v-if="hasContent(caseStudy.challenges)"
        id="challenges"
        :title="sectionTitles.challenges"
      >
        <div
          v-for="(item, index) in caseStudy.challenges"
          :key="item.challenge"
          class="rounded-lg border border-line p-5"
        >
          <h3 class="text-base font-semibold">
            <span class="text-ink-muted">{{ messages.caseStudy.challenge }} {{ index + 1 }}</span>
            <span class="mt-1 block">{{ item.challenge }}</span>
          </h3>
          <p class="mt-3">
            <strong>{{ messages.caseStudy.solution }}{{ messages.common.labelSeparator }}</strong
            >{{ item.solution }}
          </p>
        </div>
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
