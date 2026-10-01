<script setup lang="ts">
/**
 * The running header of a manual page: "PROJECTS(1) · Frontend Developer Manual · 2026".
 * Purely decorative, so it is hidden from assistive technology: the page heading below
 * carries the meaning. The centre text is dropped on narrow screens.
 */
withDefaults(
  defineProps<{
    /** Page name, shown in the man-page form "NAME(1)". */
    page: string
    center?: string
  }>(),
  { center: 'Frontend Developer Manual' },
)

// The build year, not the visit year: prerendered HTML and the hydrated app must match.
const year = __BUILD_YEAR__
</script>

<template>
  <div
    aria-hidden="true"
    class="flex items-center justify-between gap-4 border-b border-dashed border-line-strong pb-3 font-mono text-label tracking-wide text-ink-muted uppercase"
  >
    <span class="text-ink">{{ page }}<span class="text-accent">(1)</span></span>
    <span class="hidden truncate sm:block">{{ center }}</span>
    <span class="text-syntax-number">{{ year }}</span>
  </div>
</template>
