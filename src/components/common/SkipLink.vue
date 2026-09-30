<script setup lang="ts">
import { useLocale } from '@/composables/useLocale'

const { messages } = useLocale()
</script>

<template>
  <a
    href="#main-content"
    class="sr-only z-50 rounded-md bg-accent text-sm font-semibold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:px-4 focus:py-2"
  >
    {{ messages.common.skipToContent }}
  </a>
</template>
