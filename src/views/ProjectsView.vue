<script setup lang="ts">
import BaseContainer from '@/components/common/BaseContainer.vue'
import ProjectGrid from '@/components/project/ProjectGrid.vue'
import { useLocale } from '@/composables/useLocale'
import { usePageMeta } from '@/composables/usePageMeta'
import { describePage } from '@/utils/seo'
import { projects } from '@/data/projects'

const { locale, messages } = useLocale()

usePageMeta(() => describePage({ page: 'projects' }, locale.value))
</script>

<template>
  <BaseContainer as="section" aria-labelledby="projects-title" class="section-spacing">
    <header class="mb-10 max-w-prose md:mb-14">
      <h1 id="projects-title" class="text-3xl font-bold tracking-tight md:text-4xl">
        {{ messages.pages.projectsTitle }}
      </h1>
      <p class="mt-4 text-lg text-ink-muted">{{ messages.pages.projectsDescription }}</p>
    </header>
    <!-- Cards sit directly under the page h1, so their titles are h2. -->
    <ProjectGrid :projects="projects" :heading-level="2" />
  </BaseContainer>
</template>
