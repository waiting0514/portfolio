<script setup lang="ts">
/**
 * A simple flow chart of how a system is operated: numbered phases down a dashed rail, and
 * each phase's steps as chips joined by arrows. Phases and steps are plain ordered lists, so the
 * order is available to assistive technology; the numbers and arrows are generated content.
 * Steps wrap on narrow screens, so the chart never scrolls sideways.
 */
defineProps<{
  phases: readonly { name: string; steps: readonly string[] }[]
  /** Accessible name for the list of phases. */
  label?: string
}>()
</script>

<template>
  <ol
    :aria-label="label"
    class="ml-4 border-l border-dashed border-line-strong [counter-reset:phase]"
  >
    <li
      v-for="phase in phases"
      :key="phase.name"
      class="relative pb-8 pl-8 [counter-increment:phase] before:absolute before:top-0 before:-left-4 before:flex before:size-8 before:items-center before:justify-center before:rounded-inset before:border before:border-accent before:bg-accent-soft before:font-mono before:text-label before:text-accent before:content-[counter(phase,decimal-leading-zero)] last:pb-0"
    >
      <h3 class="font-mono text-ui leading-8 font-semibold text-ink">{{ phase.name }}</h3>
      <ol class="mt-2 flex flex-wrap gap-y-2">
        <li
          v-for="step in phase.steps"
          :key="step"
          class="flex max-w-full items-center after:mx-2 after:font-mono after:text-label after:text-accent after:content-['→'] last:after:content-none"
        >
          <span
            class="min-w-0 rounded-inset border border-line-strong bg-surface px-2.5 py-1 text-label leading-snug text-ink-soft"
          >
            {{ step }}
          </span>
        </li>
      </ol>
    </li>
  </ol>
</template>
