<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, useTemplateRef } from 'vue'
import { useLocale } from '@/composables/useLocale'

/**
 * Frame and playback for a decorative hero sequence passed in the default slot.
 *
 * The sequence renders in its final state first, so the hero text and the page never wait on
 * it. Once the browser is idle the frame adds `is-playing`, which the sequence's own keyframes
 * key off. Playback is skipped while the visitor prefers reduced motion and paused while the
 * frame is off screen. Because the loop runs longer than 5 s, a visible toggle lets the visitor
 * stop it (WCAG 2.2.2); stopping returns the sequence to its complete final state.
 * A new sequence only needs its own markup and keyframes.
 */
defineProps<{
  /** Accessible name describing the whole sequence; the slot content is hidden from AT. */
  label: string
}>()

const { messages } = useLocale()

const root = useTemplateRef<HTMLElement>('root')
const playing = ref(false)
const paused = ref(false)
/** Playback is possible here (idle reached, no reduced-motion preference), so offer the toggle. */
const canToggle = ref(false)
/** The visitor stopped the loop with the toggle. */
const stopped = ref(false)

/** Cancels the pending idle start; undefined once playback has been allowed to start. */
let cancelStart: (() => void) | undefined
let reducedMotion: MediaQueryList | undefined
let observer: IntersectionObserver | undefined
let ready = false

function sync() {
  canToggle.value = ready && !reducedMotion?.matches
  playing.value = canToggle.value && !stopped.value
}

function toggle() {
  stopped.value = !stopped.value
  sync()
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
  <div>
    <div
      ref="root"
      role="img"
      :aria-label="label"
      :class="{ 'is-playing': playing, 'is-paused': paused }"
    >
      <slot />
    </div>
    <!-- Always rendered so the layout doesn't shift when the toggle becomes available. -->
    <div class="mt-2 flex justify-end">
      <button
        type="button"
        class="link-muted inline-flex min-h-11 items-center gap-1.5 rounded-inset px-2 font-mono text-label transition-state"
        :class="{ invisible: !canToggle }"
        @click="toggle"
      >
        <svg aria-hidden="true" viewBox="0 0 16 16" class="size-3.5" fill="currentColor">
          <path v-if="playing" d="M4 3h3v10H4zM9 3h3v10H9z" />
          <path v-else d="M5 3l8 5-8 5z" />
        </svg>
        {{ playing ? messages.home.pauseAnimation : messages.home.playAnimation }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.is-paused :deep(*) {
  animation-play-state: paused;
}
</style>
