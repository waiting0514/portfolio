<script setup lang="ts">
/**
 * One case study section: a labelled landmark with an h2 and readable, width-limited content.
 * Set `prose` to false for non-text content (e.g. tag lists) that must not get list bullets.
 */
withDefaults(
  defineProps<{
    id: string
    title: string
    prose?: boolean
  }>(),
  { prose: true },
)
</script>

<template>
  <section :aria-labelledby="id" class="border-t border-line py-10 md:py-12">
    <h2 :id="id" class="text-xl font-bold tracking-tight md:text-2xl">{{ title }}</h2>
    <div class="mt-5" :class="{ 'prose-content': prose }">
      <slot />
    </div>
  </section>
</template>
