<script setup lang="ts">
import BaseButton from '@/components/common/BaseButton.vue'
import BaseContainer from '@/components/common/BaseContainer.vue'
import { useLocale } from '@/composables/useLocale'

/** Shared by the 404 route and case study pages with an unknown slug. */
const { messages, localePath } = useLocale()
</script>

<template>
  <BaseContainer as="section" class="section-spacing">
    <p class="font-mono text-sm text-ink-muted">404</p>
    <h1 class="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
      {{ messages.notFound.title }}
    </h1>
    <p class="mt-4 max-w-prose text-ink-muted">{{ messages.notFound.description }}</p>
    <div class="mt-8 flex flex-wrap gap-3">
      <BaseButton :to="localePath('/')">{{ messages.notFound.backHome }}</BaseButton>
      <BaseButton :to="localePath('/projects')" variant="secondary">
        {{ messages.notFound.browseProjects }}
      </BaseButton>
    </div>
  </BaseContainer>
</template>
