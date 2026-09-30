<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useLocale } from '@/composables/useLocale'
import { getAdjacentProjects } from '@/data/projects'

/** Previous / next project links, in display order. A missing neighbour is simply not shown. */
const props = defineProps<{ slug: string }>()

const { locale, messages, localePath } = useLocale()

const links = computed(() => {
  const { previous, next } = getAdjacentProjects(props.slug)
  return [
    previous && {
      key: 'previous',
      label: messages.value.caseStudy.previous,
      title: previous.content[locale.value].title,
      to: localePath(`/projects/${previous.slug}`),
      align: 'md:text-left',
    },
    next && {
      key: 'next',
      label: messages.value.caseStudy.next,
      title: next.content[locale.value].title,
      to: localePath(`/projects/${next.slug}`),
      align: 'md:col-start-2 md:text-right',
    },
  ].filter((link) => link !== undefined)
})
</script>

<template>
  <nav
    v-if="links.length"
    :aria-label="messages.caseStudy.pagerLabel"
    class="border-t border-line pt-10"
  >
    <ul class="grid gap-4 md:grid-cols-2">
      <li v-for="link in links" :key="link.key" :class="link.align">
        <RouterLink
          :to="link.to"
          :rel="link.key === 'previous' ? 'prev' : 'next'"
          class="block rounded-lg border border-line p-5 transition-colors hover:border-ink-muted hover:bg-surface"
        >
          <span class="block text-sm text-ink-muted">
            <span v-if="link.key === 'previous'" aria-hidden="true">← </span>{{ link.label
            }}<span v-if="link.key === 'next'" aria-hidden="true"> →</span>
          </span>
          <span class="mt-1 block font-semibold text-ink">{{ link.title }}</span>
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>
