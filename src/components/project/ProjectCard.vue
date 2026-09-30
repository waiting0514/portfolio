<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import TechTagList from '@/components/common/TechTagList.vue'
import { useLocale } from '@/composables/useLocale'
import type { Project } from '@/types/project'
import { assetUrl } from '@/utils/asset'
import ProjectMeta from './ProjectMeta.vue'

const props = withDefaults(
  defineProps<{
    project: Project
    /** Heading level of the card title, so it nests under the surrounding section. */
    headingLevel?: 2 | 3
  }>(),
  { headingLevel: 3 },
)

const { locale, messages, localePath } = useLocale()
const content = computed(() => props.project.content[locale.value])
</script>

<template>
  <!--
    The case study link is stretched over the whole card (see the `after:` classes), so the
    card is clickable everywhere but is a single tab stop with a descriptive accessible name.
  -->
  <article
    class="relative flex h-full flex-col overflow-hidden rounded-lg border border-line bg-canvas transition-shadow hover:shadow-sm has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-accent"
  >
    <img
      :src="assetUrl(project.cover.src)"
      :alt="content.coverAlt"
      :width="project.cover.width"
      :height="project.cover.height"
      loading="lazy"
      decoding="async"
      class="aspect-video w-full border-b border-line bg-surface object-cover"
    />
    <div class="flex flex-1 flex-col p-6">
      <ProjectMeta class="mb-3" :labels="project.labels" :status="project.status" />
      <component :is="`h${headingLevel}`" class="text-lg font-semibold tracking-tight text-ink">
        {{ content.title }}
      </component>
      <p class="mt-2 text-sm leading-relaxed text-ink-muted">{{ content.summary }}</p>
      <TechTagList class="mt-4" :items="project.technologies" :label="messages.project.techStack" />
      <RouterLink
        :to="localePath(`/projects/${project.slug}`)"
        class="mt-auto inline-flex items-center gap-1 pt-6 text-sm font-semibold text-accent after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
      >
        <span>
          {{ messages.project.viewCaseStudy
          }}<span class="sr-only">{{ messages.common.labelSeparator }}{{ content.title }}</span>
        </span>
        <span aria-hidden="true">→</span>
      </RouterLink>
    </div>
  </article>
</template>
