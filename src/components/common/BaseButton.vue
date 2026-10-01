<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useLocale } from '@/composables/useLocale'

/**
 * A link styled as a button. Every call to action on this site navigates, so it always
 * renders an anchor: `to` for in-app routes (already locale-prefixed), `href` for external URLs.
 * External web pages open in a new tab; `mailto:` links hand off to the mail app in place.
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

const opensNewTab = computed(() => !props.href?.startsWith('mailto:'))

const variantClass = computed(() =>
  props.variant === 'primary'
    ? 'bg-accent text-white shadow-[3px_3px_0_var(--color-ink)] hover:bg-accent-strong active:shadow-[1px_1px_0_var(--color-ink)]'
    : 'border border-line-strong bg-surface text-ink hover:border-accent hover:text-accent',
)
</script>

<template>
  <RouterLink
    v-if="to"
    :to="to"
    class="inline-flex min-h-12 items-center justify-center gap-2 rounded-control px-5 font-mono text-ui font-semibold transition-state active:translate-px"
    :class="variantClass"
  >
    <slot />
  </RouterLink>
  <a
    v-else
    :href="href"
    :target="opensNewTab ? '_blank' : undefined"
    :rel="opensNewTab ? 'noopener noreferrer' : undefined"
    class="inline-flex min-h-12 items-center justify-center gap-2 rounded-control px-5 font-mono text-ui font-semibold transition-state active:translate-px"
    :class="variantClass"
  >
    <slot />
    <span v-if="opensNewTab" class="sr-only">&nbsp;({{ messages.common.opensInNewTab }})</span>
  </a>
</template>
