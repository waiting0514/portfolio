<script setup lang="ts">
import { computed } from 'vue'

/**
 * One case study section: a labelled landmark with an h2 and readable, width-limited content.
 * Set `prose` to false for non-text content (e.g. tag lists) that must not get list bullets;
 * `bodyClass` lays out the content wrapper (e.g. a card grid).
 */
const props = withDefaults(
  defineProps<{
    id: string
    title: string
    prose?: boolean
    /** 1-based position among the rendered sections, shown as a decorative "01". */
    index?: number
    bodyClass?: string
  }>(),
  { prose: true, index: undefined, bodyClass: undefined },
)

const indexLabel = computed(() =>
  props.index === undefined ? undefined : String(props.index).padStart(2, '0'),
)
</script>

<template>
  <section
    :aria-labelledby="id"
    class="border-t border-line py-12 first:border-t-0 first:pt-0 md:py-14"
  >
    <p v-if="indexLabel" aria-hidden="true" class="mb-3 font-mono text-sm font-medium text-accent">
      {{ indexLabel }}
    </p>
    <h2
      :id="id"
      class="scroll-mt-16 text-heading-sm leading-tight font-bold tracking-tight md:text-heading"
    >
      {{ title }}
    </h2>
    <div class="mt-6" :class="[{ 'prose-content': prose }, bodyClass]">
      <slot />
    </div>
  </section>
</template>
