<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, useTemplateRef } from 'vue'

/**
 * Frame and playback for a decorative hero sequence passed in the default slot.
 *
 * The sequence renders in its final state first, so the hero text and the page never wait on
 * it. Once the browser is idle the frame adds `is-playing`, which the sequence's own keyframes
 * key off. Playback is skipped while the visitor prefers reduced motion and paused while the
 * frame is off screen. A new sequence only needs its own markup and keyframes.
 */
defineProps<{
  /** Accessible name describing the whole sequence; the slot content is hidden from AT. */
  label: string
}>()

const root = useTemplateRef<HTMLElement>('root')
const playing = ref(false)
const paused = ref(false)

/** Cancels the pending idle start; undefined once playback has been allowed to start. */
let cancelStart: (() => void) | undefined
let reducedMotion: MediaQueryList | undefined
let observer: IntersectionObserver | undefined
let ready = false

function sync() {
  playing.value = ready && !reducedMotion?.matches
}

function start() {
  cancelStart = undefined
  ready = true
  sync()
}

onMounted(() => {
  reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')
  reducedMotion?.addEventListener('change', sync)

  if ('requestIdleCallback' in window) {
    const handle = window.requestIdleCallback(start, { timeout: 2000 })
    cancelStart = () => window.cancelIdleCallback(handle)
  } else {
    const handle = setTimeout(start, 1200)
    cancelStart = () => clearTimeout(handle)
  }

  if ('IntersectionObserver' in window && root.value) {
    observer = new IntersectionObserver(([entry]) => {
      paused.value = !entry?.isIntersecting
    })
    observer.observe(root.value)
  }
})

onBeforeUnmount(() => {
  cancelStart?.()
  reducedMotion?.removeEventListener('change', sync)
  observer?.disconnect()
})
</script>

<template>
  <div
    ref="root"
    role="img"
    :aria-label="label"
    :class="{ 'is-playing': playing, 'is-paused': paused }"
  >
    <slot />
  </div>
</template>

<style scoped>
.is-paused :deep(*) {
  animation-play-state: paused;
}
</style>
