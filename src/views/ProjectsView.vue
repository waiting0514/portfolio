<script setup lang="ts">
import BaseContainer from '@/components/common/BaseContainer.vue'
import { useLocale } from '@/composables/useLocale'

// Placeholder until Phase 4 builds the project listing.
const { messages } = useLocale()
</script>

<template>
  <BaseContainer as="section" class="section-spacing">
    <h1 class="text-3xl font-bold tracking-tight md:text-4xl">
      {{ messages.pages.projectsTitle }}
    </h1>
  </BaseContainer>
</template>
