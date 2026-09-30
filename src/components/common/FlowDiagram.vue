<script setup lang="ts">
/**
 * An ordered flow of steps: stacked vertically on small screens and laid out horizontally
 * (wrapping as needed) from the `md` breakpoint. Arrows are decorative and hidden from
 * assistive technology, which reads the steps as an ordered list.
 */
defineProps<{
  steps: readonly string[]
  /** Accessible name for the list. */
  label?: string
}>()
</script>

<template>
  <ol
    class="flex flex-col items-stretch gap-2 md:flex-row md:flex-wrap md:items-center"
    :aria-label="label"
  >
    <li
      v-for="(step, index) in steps"
      :key="`${index}-${step}`"
      class="flex flex-col items-center gap-2 md:flex-row"
    >
      <span
        class="w-full rounded-md border border-line bg-surface px-3 py-2 text-center text-sm leading-snug text-ink md:w-auto"
      >
        {{ step }}
      </span>
      <span v-if="index < steps.length - 1" aria-hidden="true" class="text-sm text-ink-muted">
        <span class="md:hidden">↓</span>
        <span class="hidden md:inline">→</span>
      </span>
    </li>
  </ol>
</template>
