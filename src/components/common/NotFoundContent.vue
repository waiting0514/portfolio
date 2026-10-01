<script setup lang="ts">
import BaseButton from '@/components/common/BaseButton.vue'
import BaseContainer from '@/components/common/BaseContainer.vue'
import ManHeader from '@/components/common/ManHeader.vue'
import { useLocale } from '@/composables/useLocale'

/** Shared by the 404 route and case study pages with an unknown slug. */
const { messages, localePath } = useLocale()
</script>

<template>
  <section class="hero-grid border-b border-line-strong">
    <BaseContainer class="pt-6 pb-20 md:pt-8 md:pb-32">
      <ManHeader page="404" />
      <p class="mt-14 font-mono text-label text-warn md:mt-20">
        <span aria-hidden="true">✗ </span>Error 404: ENOENT
      </p>
      <h1 class="mt-4 text-4xl leading-tight font-bold md:text-display">
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
