<script setup lang="ts">
import BaseContainer from '@/components/common/BaseContainer.vue'
import { useLocale } from '@/composables/useLocale'
import { profile } from '@/data/profile'

const { locale, messages } = useLocale()
// The build year, not the visit year: prerendered HTML and the hydrated app must match.
const year = __BUILD_YEAR__
</script>

<template>
  <footer class="border-t border-line bg-canvas">
    <BaseContainer
      class="flex flex-col gap-4 py-8 text-sm text-ink-muted md:flex-row md:items-center md:justify-between"
    >
      <p>© {{ year }} {{ profile.content[locale].name }} · {{ messages.footer.builtWith }}</p>
      <a
        :href="profile.githubUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex min-h-11 items-center link-accent font-medium transition-state md:min-h-6"
      >
        {{ messages.nav.github }}
        <span class="sr-only">({{ messages.common.opensInNewTab }})</span>
      </a>
    </BaseContainer>
  </footer>
</template>
