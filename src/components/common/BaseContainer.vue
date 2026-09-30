<script setup lang="ts">
withDefaults(defineProps<{ as?: string }>(), { as: 'div' })
</script>

<template>
  <component :is="as" class="mx-auto w-full max-w-content px-4 sm:px-6 lg:px-8">
    <slot />
  </component>
</template>
