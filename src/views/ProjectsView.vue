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
  <section aria-labelledby="projects-title">
    <header class="hero-grid border-b border-line">
      <BaseContainer class="py-14 md:py-20">
        <p class="eyebrow text-accent">{{ messages.pages.projectsEyebrow }}</p>
        <h1
          id="projects-title"
          class="mt-4 text-4xl leading-tight font-bold tracking-tight md:text-[3.75rem]"
        >
          {{ messages.pages.projectsTitle }}
        </h1>
        <p class="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
          {{ messages.pages.projectsDescription }}
        </p>
      </BaseContainer>
    </header>
    <BaseContainer class="section-spacing">
      <!-- Cards sit directly under the page h1, so their titles are h2. -->
      <ProjectGrid :projects="projects" :heading-level="2" />
    </BaseContainer>
  </section>
</template>
