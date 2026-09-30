<script setup lang="ts">
/** Section title with an optional lead paragraph. `level` keeps the page heading outline intact. */
withDefaults(
  defineProps<{
    title: string
    description?: string
    level?: 2 | 3
    id?: string
  }>(),
  { description: undefined, level: 2, id: undefined },
)
</script>

<template>
  <div class="mb-8 max-w-prose md:mb-10">
    <component
      :is="`h${level}`"
      :id="id"
      class="font-bold tracking-tight text-ink"
      :class="level === 2 ? 'text-2xl md:text-3xl' : 'text-xl'"
    >
      {{ title }}
    </component>
    <p v-if="description" class="mt-3 text-ink-muted">{{ description }}</p>
  </div>
</template>
