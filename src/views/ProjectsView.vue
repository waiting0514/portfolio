<script setup lang="ts">
import BaseContainer from '@/components/common/BaseContainer.vue'
import ManHeader from '@/components/common/ManHeader.vue'
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
    <header class="hero-grid border-b border-line-strong">
      <BaseContainer class="pt-6 pb-14 md:pt-8 md:pb-20">
        <ManHeader page="projects" />
        <p class="mt-10 eyebrow text-accent md:mt-14">
          <span class="marker-hash">{{ messages.pages.projectsEyebrow }}</span>
        </p>
        <h1 id="projects-title" class="mt-4 text-4xl leading-tight font-bold md:text-display">
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
