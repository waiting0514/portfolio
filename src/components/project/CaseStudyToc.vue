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
    <p class="eyebrow mb-4 text-xs text-ink-muted">
      <span class="marker-hash">{{ messages.caseStudy.toc }}</span>
    </p>
    <ol class="[counter-reset:toc]">
      <li v-for="item in items" :key="item.id" class="[counter-increment:toc]">
        <a
          :href="`#${item.id}`"
          :aria-current="item.id === activeId ? 'true' : undefined"
          class="flex min-h-10 items-center gap-3 border-l-2 py-1 pl-4 text-ui transition-state before:font-mono before:text-micro before:text-ink-muted before:content-[counter(toc,decimal-leading-zero)]"
          :class="
            item.id === activeId
              ? 'border-accent bg-accent-soft font-semibold text-ink before:text-accent'
              : 'link-muted border-line hover:border-line-strong'
          "
        >
          {{ item.title }}
        </a>
      </li>
    </ol>
  </nav>
</template>
