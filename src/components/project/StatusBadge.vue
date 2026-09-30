<script setup lang="ts">
import { useLocale } from '@/composables/useLocale'
import type { ProjectStatus } from '@/types/project'

/** Development status shown as text (not color alone), e.g. "In Development". */
defineProps<{ status: ProjectStatus }>()

const { messages } = useLocale()
</script>

<template>
  <span
    class="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent-soft px-2.5 py-0.5 text-xs font-semibold text-accent"
  >
    <span aria-hidden="true" class="size-1.5 rounded-full bg-accent"></span>
    {{ messages.project.status[status] }}
  </span>
</template>
