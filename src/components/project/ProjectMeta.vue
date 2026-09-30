<script setup lang="ts">
import { useLocale } from '@/composables/useLocale'
import type { ProjectStatus } from '@/types/project'
import StatusBadge from './StatusBadge.vue'

/** Project type labels and development status. Renders nothing when neither is set. */
defineProps<{
  labels?: readonly string[]
  status?: ProjectStatus
}>()

const { messages } = useLocale()
</script>

<template>
  <div v-if="labels?.length || status" class="flex flex-wrap items-center gap-x-3 gap-y-2">
    <ul
      v-if="labels?.length"
      :aria-label="messages.project.labels"
      class="flex flex-wrap items-center gap-x-2 font-mono text-xs text-ink-muted"
    >
      <li v-for="(label, index) in labels" :key="label" class="flex items-center gap-x-2">
        <span v-if="index > 0" aria-hidden="true">·</span>
        {{ label }}
      </li>
    </ul>
    <StatusBadge v-if="status" :status="status" />
  </div>
</template>
