<script setup lang="ts">
/** A bordered card with a heading, shared by technical challenges and key responsibilities. */
withDefaults(defineProps<{ headingLevel?: 3 | 4 }>(), { headingLevel: 3 })
</script>

<template>
  <div class="rounded-lg border border-line p-5">
    <component :is="`h${headingLevel}`" class="text-base font-semibold">
      <slot name="title" />
    </component>
    <slot />
  </div>
</template>
