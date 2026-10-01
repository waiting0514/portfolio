<script setup lang="ts">
import BaseContainer from '@/components/common/BaseContainer.vue'
import { useLocale } from '@/composables/useLocale'
import { profile } from '@/data/profile'

const { locale, messages } = useLocale()
// The build year, not the visit year: prerendered HTML and the hydrated app must match.
const year = __BUILD_YEAR__
</script>

<template>
  <footer class="border-t border-line-strong bg-canvas">
    <BaseContainer
      class="flex flex-col gap-3 py-8 font-mono text-label text-ink-muted md:flex-row md:items-center md:justify-between md:gap-6"
    >
      <p>
        <span class="text-ink"
          >© <span class="text-syntax-number">{{ year }}</span>
          {{ profile.content[locale].name }}</span
        >
        <span aria-hidden="true" class="mx-2 text-line-strong">/</span>
        <span class="text-ink-muted"
          ><span aria-hidden="true">// </span>{{ messages.footer.builtWith }}</span
        >
      </p>
      <a
        :href="profile.githubUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex min-h-11 items-center gap-1 link-accent font-medium transition-state md:min-h-6"
      >
        {{ messages.nav.github }}
        <span aria-hidden="true">↗</span>
        <span class="sr-only">({{ messages.common.opensInNewTab }})</span>
      </a>
    </BaseContainer>
  </footer>
</template>
