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
    /** 1-based position in the list, shown as a decorative index ("01"). */
    index?: number
  }>(),
  { headingLevel: 3, index: undefined },
)

const { locale, messages, localePath } = useLocale()
const content = computed(() => props.project.content[locale.value])
const indexLabel = computed(() =>
  props.index === undefined ? undefined : String(props.index).padStart(2, '0'),
)
</script>

<template>
  <!--
    The case study link is stretched over the whole card (see the `after:` classes), so the
    card is clickable everywhere but is a single tab stop with a descriptive accessible name.
  -->
  <article
    class="group card-lift relative flex h-full flex-col overflow-hidden rounded-card border border-line bg-surface has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-focus-ring"
  >
    <!-- Decorative window bar: the card reads as one file in the projects directory. -->
    <div
      aria-hidden="true"
      class="flex h-10 items-center gap-3 border-b border-line bg-canvas px-4 font-mono text-label"
    >
      <span v-if="indexLabel" class="font-medium text-accent">{{ indexLabel }}</span>
      <span class="min-w-0 truncate text-ink-muted"
        >~/projects/<span class="text-ink">{{ project.slug }}</span></span
      >
      <span class="ml-auto flex gap-1">
        <span class="size-2 rounded-full border border-line-strong"></span>
        <span class="size-2 rounded-full border border-line-strong"></span>
        <span
          class="size-2 rounded-full bg-line-strong transition-state group-hover:bg-accent"
        ></span>
      </span>
    </div>
    <img
      :src="assetUrl(project.cover.src)"
      :alt="content.coverAlt"
      :width="project.cover.width"
      :height="project.cover.height"
      loading="lazy"
      decoding="async"
      class="aspect-video w-full border-b border-line bg-canvas object-cover"
    />
    <div class="flex flex-1 flex-col p-6 md:p-7">
      <ProjectMeta class="mb-3" :labels="project.labels" :status="project.status" />
      <component :is="`h${headingLevel}`" class="text-title leading-snug font-semibold text-ink">
        {{ content.title }}
      </component>
      <p class="mt-3 text-ui leading-relaxed text-ink-muted">{{ content.summary }}</p>
      <TechTagList class="mt-5" :items="project.technologies" :label="messages.project.techStack" />
      <RouterLink
        :to="localePath(`/projects/${project.slug}`)"
        class="mt-auto inline-flex items-center gap-1.5 pt-7 font-mono text-ui font-semibold text-accent after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
      >
        <span class="marker-prompt">
          {{ messages.project.viewCaseStudy
          }}<span class="sr-only">{{ messages.common.labelSeparator }}{{ content.title }}</span>
        </span>
        <span aria-hidden="true" class="transition-state motion-safe:group-hover:translate-x-0.5"
          >→</span
        >
      </RouterLink>
    </div>
  </article>
</template>
