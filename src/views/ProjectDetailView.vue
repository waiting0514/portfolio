<script setup lang="ts">
import BaseContainer from '@/components/common/BaseContainer.vue'

// Placeholder until Phase 5 builds the case study page.
defineProps<{ slug: string }>()
</script>

<template>
  <BaseContainer as="article" class="section-spacing">
    <h1 class="text-3xl font-bold tracking-tight md:text-4xl">{{ slug }}</h1>
  </BaseContainer>
</template>
