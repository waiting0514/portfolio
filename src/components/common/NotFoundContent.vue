<script setup lang="ts">
import BaseButton from '@/components/common/BaseButton.vue'
import BaseContainer from '@/components/common/BaseContainer.vue'
import { useLocale } from '@/composables/useLocale'

/** Shared by the 404 route and case study pages with an unknown slug. */
const { messages, localePath } = useLocale()
</script>

<template>
  <section class="hero-grid border-b border-line">
    <BaseContainer class="py-20 md:py-32">
      <p class="eyebrow text-accent">Error 404</p>
      <h1 class="mt-4 text-4xl leading-tight font-bold tracking-tight md:text-[3.75rem]">
        {{ messages.notFound.title }}
      </h1>
      <p class="mt-5 max-w-prose text-lg text-ink-soft">{{ messages.notFound.description }}</p>
      <div class="mt-10 flex flex-wrap gap-3">
        <BaseButton :to="localePath('/')">{{ messages.notFound.backHome }}</BaseButton>
        <BaseButton :to="localePath('/projects')" variant="secondary">
          {{ messages.notFound.browseProjects }}
        </BaseButton>
      </div>
    </BaseContainer>
  </section>
</template>
