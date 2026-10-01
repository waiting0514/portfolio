<script setup lang="ts">
import BaseContainer from '@/components/common/BaseContainer.vue'
import { useLocale } from '@/composables/useLocale'
import { profile } from '@/data/profile'

const { locale, messages } = useLocale()
const year = new Date().getFullYear()
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
        class="inline-flex min-h-11 items-center font-medium text-ink hover:text-accent md:min-h-0"
      >
        {{ messages.nav.github }}
        <span class="sr-only">({{ messages.common.opensInNewTab }})</span>
      </a>
    </BaseContainer>
  </footer>
</template>
