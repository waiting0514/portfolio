<script setup lang="ts">
/**
 * Section title with an optional monospace eyebrow and lead paragraph.
 * `level` keeps the page heading outline intact.
 */
withDefaults(
  defineProps<{
    title: string
    description?: string
    /** Small uppercase label above the title, e.g. "SELECTED WORK". */
    eyebrow?: string
    level?: 2 | 3
    id?: string
  }>(),
  { description: undefined, eyebrow: undefined, level: 2, id: undefined },
)
</script>

<template>
  <div class="mb-10 max-w-prose md:mb-12">
    <p v-if="eyebrow" class="eyebrow mb-3 text-accent">{{ eyebrow }}</p>
    <component
      :is="`h${level}`"
      :id="id"
      class="font-bold tracking-tight"
      :class="level === 2 ? 'text-3xl leading-tight md:text-heading-lg' : 'text-xl'"
    >
      {{ title }}
    </component>
    <p v-if="description" class="mt-4 text-lead opacity-80">{{ description }}</p>
  </div>
</template>
