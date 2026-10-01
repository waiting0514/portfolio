<script setup lang="ts">
/** A bordered card with a heading, shared by technical challenges and key responsibilities. */
withDefaults(defineProps<{ headingLevel?: 3 | 4 }>(), { headingLevel: 3 })
</script>

<template>
  <div class="rounded-xl border border-line bg-surface p-6">
    <component :is="`h${headingLevel}`" class="text-[1.0625rem] leading-relaxed font-bold">
      <slot name="title" />
    </component>
    <slot />
  </div>
</template>
