<script setup lang="ts">
import { useLocale } from '@/composables/useLocale'

/** "On this page" navigation for a case study; the parent decides where it is shown. */
defineProps<{
  items: readonly { id: string; title: string }[]
  activeId?: string
}>()

const { messages } = useLocale()
</script>

<template>
  <nav :aria-label="messages.caseStudy.toc">
    <p class="eyebrow mb-4 text-xs text-ink-muted">{{ messages.caseStudy.toc }}</p>
    <ol>
      <li v-for="item in items" :key="item.id">
        <a
          :href="`#${item.id}`"
          :aria-current="item.id === activeId ? 'true' : undefined"
          class="flex min-h-10 items-center border-l-2 py-1 pl-4 text-[0.9375rem] transition-colors"
          :class="
            item.id === activeId
              ? 'border-accent font-bold text-ink'
              : 'border-line text-ink-muted hover:border-line-strong hover:text-ink'
          "
        >
          {{ item.title }}
        </a>
      </li>
    </ol>
  </nav>
</template>
