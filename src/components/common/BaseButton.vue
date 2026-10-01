<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useLocale } from '@/composables/useLocale'

/**
 * A link styled as a button. Every call to action on this site navigates, so it always
 * renders an anchor: `to` for in-app routes (already locale-prefixed), `href` for external URLs.
 */
const props = withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary'
    to?: string
    href?: string
  }>(),
  { variant: 'primary', to: undefined, href: undefined },
)

const { messages } = useLocale()

const variantClass = computed(() =>
  props.variant === 'primary'
    ? 'bg-accent text-white hover:bg-accent-strong'
    : 'border border-line-strong bg-surface text-ink hover:border-accent hover:text-accent',
)
</script>

<template>
  <RouterLink
    v-if="to"
    :to="to"
    class="inline-flex min-h-12 items-center justify-center gap-2 rounded-control px-6 text-ui font-bold transition-state active:translate-y-px"
    :class="variantClass"
  >
    <slot />
  </RouterLink>
  <a
    v-else
    :href="href"
    target="_blank"
    rel="noopener noreferrer"
    class="inline-flex min-h-12 items-center justify-center gap-2 rounded-control px-6 text-ui font-bold transition-state active:translate-y-px"
    :class="variantClass"
  >
    <slot />
    <span class="sr-only">&nbsp;({{ messages.common.opensInNewTab }})</span>
  </a>
</template>
