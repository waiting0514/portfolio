<script setup lang="ts">
import TechTag from './TechTag.vue'

defineProps<{
  items: readonly string[]
  /** Accessible name for the list, e.g. "Tech stack". */
  label?: string
}>()
</script>

<template>
  <ul class="flex flex-wrap gap-2" :aria-label="label">
    <li v-for="item in items" :key="item">
      <TechTag>{{ item }}</TechTag>
    </li>
  </ul>
</template>
