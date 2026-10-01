<script setup lang="ts">
import type { Project } from '@/types/project'
import ProjectCard from './ProjectCard.vue'

withDefaults(
  defineProps<{
    projects: readonly Project[]
    headingLevel?: 2 | 3
  }>(),
  { headingLevel: 3 },
)
</script>

<template>
  <!-- 1 column on mobile, 2 on tablet (≥768px), 3 on desktop (≥1024px). -->
  <ul class="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
    <li v-for="(project, index) in projects" :key="project.slug">
      <ProjectCard :project="project" :heading-level="headingLevel" :index="index + 1" />
    </li>
  </ul>
</template>
