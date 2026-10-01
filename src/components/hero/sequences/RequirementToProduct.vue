<script setup lang="ts">
/**
 * Hero sequence 01: Requirement → Architecture → Product.
 *
 * The markup is the final, complete state, which is what renders before playback starts and
 * when the visitor prefers reduced motion. `HeroAnimation` adds `is-playing` to an ancestor to
 * run the 6 s loop. Every element stays in the layout; only opacity and transform animate,
 * so playback never changes the size of the figure.
 *
 * Timeline (6 s = 100%): 0.8 s = 13.3%, 1.8 s = 30%, 3.2 s = 53.3%, 4.6 s = 76.7%, 5.4 s = 90%.
 * The text is fixed English and decorative; the frame carries the accessible name.
 */
const requirementRows = ['Feature Requirement', 'User Scenario', 'Business Rule'] as const

/** `shift` nudges each node toward the centre when the architecture converges (3.2–4.6 s). */
const nodes = [
  { name: 'Component', shift: '3px', optional: false },
  { name: 'State', shift: '1px', optional: false },
  { name: 'Router', shift: '-1px', optional: true },
  { name: 'API', shift: '-3px', optional: false },
] as const
</script>

<template>
  <div class="seq flex flex-col items-center" aria-hidden="true">
    <div
      class="seq-req relative w-full overflow-hidden rounded-xl border border-line bg-surface px-5 py-4"
    >
      <span
        class="seq-scan pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-linear-to-r from-transparent via-accent-soft to-transparent"
      ></span>
      <div class="relative">
        <p class="eyebrow text-[0.6875rem] text-ink-muted">Requirement</p>
        <p class="mt-1 font-bold">Product / AI Spec</p>
        <ul class="mt-3 grid gap-1.5">
          <li
            v-for="(row, index) in requirementRows"
            :key="row"
            class="seq-row flex items-center gap-2 font-mono text-xs text-ink-muted before:size-1.5 before:rounded-full before:bg-line-strong"
            :style="{ '--seq-delay': `${150 + index * 100}ms` }"
          >
            {{ row }}
          </li>
        </ul>
      </div>
    </div>

    <div class="relative flex h-14 justify-center">
      <span
        class="seq-line-analysis relative w-px origin-top bg-line-strong after:absolute after:-bottom-px after:left-1/2 after:size-1.5 after:-translate-x-1/2 after:rotate-45 after:border-r after:border-b after:border-line-strong"
      ></span>
      <span
        class="seq-label absolute top-1/2 left-1/2 ml-3 -translate-y-1/2 font-mono text-[0.6875rem] tracking-wide whitespace-nowrap text-accent uppercase"
      >
        Requirement Analysis
      </span>
    </div>

    <div class="seq-arch w-full rounded-xl border border-accent/40 bg-surface px-5 py-4">
      <p class="eyebrow text-center text-[0.6875rem] text-accent">Frontend Architecture</p>
      <ul class="mt-3 flex flex-wrap justify-center gap-2">
        <li
          v-for="(node, index) in nodes"
          :key="node.name"
          class="seq-node rounded-md border border-line bg-canvas px-2.5 py-1 font-mono text-xs text-ink-soft transition-colors duration-150 hover:border-accent hover:text-accent"
          :class="{ 'hidden sm:block': node.optional }"
          :style="{ '--seq-delay': `${index * 120}ms`, '--seq-shift': node.shift }"
        >
          {{ node.name }}
        </li>
      </ul>
    </div>

    <div class="flex h-8 justify-center">
      <span
        class="seq-line-build relative w-px origin-top bg-line-strong after:absolute after:-bottom-px after:left-1/2 after:size-1.5 after:-translate-x-1/2 after:rotate-45 after:border-r after:border-b after:border-line-strong"
      ></span>
    </div>

    <div class="seq-app w-full overflow-hidden rounded-xl border border-line bg-surface">
      <div class="flex items-center gap-1.5 border-b border-line px-4 py-2.5">
        <span class="size-2 rounded-full bg-line-strong"></span>
        <span class="size-2 rounded-full bg-line-strong"></span>
        <span class="size-2 rounded-full bg-line-strong"></span>
        <span class="eyebrow ml-2 text-[0.6875rem] text-ink-muted">Web Product</span>
        <span
          class="seq-done ml-auto inline-flex items-center gap-1 rounded-full border border-accent/30 bg-accent-soft px-2 py-0.5 text-[0.6875rem] font-semibold text-accent"
        >
          ✓ Ready
        </span>
      </div>
      <div class="grid gap-2.5 p-4">
        <span class="seq-tile font-mono text-xs text-ink-muted">Dashboard</span>
        <div class="grid grid-cols-2 gap-2.5">
          <span
            class="seq-tile h-9 rounded-md border border-line bg-canvas"
            style="--seq-delay: 120ms"
          ></span>
          <span
            class="seq-tile h-9 rounded-md border border-line bg-canvas"
            style="--seq-delay: 240ms"
          ></span>
        </div>
        <p class="seq-done text-sm font-bold" style="--seq-delay: 100ms">
          Maintainable Web Application
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/*
 * Keyframes only apply while playing and only without a reduced-motion preference. The global
 * reduced-motion rule would otherwise stop each animation on its last frame, and the loop's
 * last frame is fully transparent.
 */
@media (prefers-reduced-motion: no-preference) {
  .is-playing .seq,
  .is-playing .seq-req,
  .is-playing .seq-scan,
  .is-playing .seq-row,
  .is-playing .seq-line-analysis,
  .is-playing .seq-label,
  .is-playing .seq-arch,
  .is-playing .seq-node,
  .is-playing .seq-line-build,
  .is-playing .seq-app,
  .is-playing .seq-tile,
  .is-playing .seq-done {
    animation-duration: 6s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    animation-fill-mode: both;
    /* Start inside the 5.4–6 s fade-out so playback continues from the static final state. */
    animation-delay: calc(var(--seq-delay, 0ms) - 5.4s);
  }

  .is-playing .seq {
    animation-name: seq-cycle;
  }
  .is-playing .seq-req {
    animation-name: seq-req;
  }
  .is-playing .seq-scan {
    animation-name: seq-scan;
  }
  .is-playing .seq-row {
    animation-name: seq-row;
  }
  .is-playing .seq-line-analysis {
    animation-name: seq-line-analysis;
  }
  .is-playing .seq-label {
    animation-name: seq-label;
  }
  .is-playing .seq-arch {
    animation-name: seq-arch;
  }
  .is-playing .seq-node {
    animation-name: seq-node;
  }
  .is-playing .seq-line-build {
    animation-name: seq-line-build;
  }
  .is-playing .seq-app {
    animation-name: seq-app;
  }
  .is-playing .seq-tile {
    animation-name: seq-tile;
  }
  .is-playing .seq-done {
    animation-name: seq-done;
  }
}

/*
 * The whole figure fades out and lifts 4px at 5.4–6 s. Children reset to hidden while the
 * figure is transparent, so the loop seam is invisible; the figure fades back in over the
 * first 30 ms to hide any one-frame mismatch between them.
 */
@keyframes seq-cycle {
  0% {
    opacity: 0;
  }
  0.5%,
  90% {
    opacity: 1;
    transform: none;
  }
  100% {
    opacity: 0;
    transform: translateY(-4px);
  }
}

/* 0–0.8 s: the requirement card enters; 0.8–1.8 s: it moves up slightly. */
@keyframes seq-req {
  0% {
    opacity: 0;
    transform: translateY(8px);
    animation-timing-function: cubic-bezier(0.2, 0.7, 0.2, 1);
  }
  13.3% {
    opacity: 1;
    transform: none;
  }
  15% {
    transform: none;
    animation-timing-function: ease-in-out;
  }
  28%,
  100% {
    opacity: 1;
    transform: translateY(-4px);
  }
}

/* A faint highlight crosses the requirement card once. */
@keyframes seq-scan {
  0%,
  3% {
    opacity: 0;
    transform: translateX(-100%);
  }
  4%,
  14% {
    opacity: 1;
  }
  16%,
  100% {
    opacity: 0;
    transform: translateX(300%);
  }
}

@keyframes seq-row {
  0%,
  6% {
    opacity: 0;
    animation-timing-function: cubic-bezier(0.2, 0.7, 0.2, 1);
  }
  13%,
  100% {
    opacity: 1;
  }
}

/* 0.8–1.8 s: requirement analysis, the first connection grows downward. */
@keyframes seq-line-analysis {
  0%,
  13.3% {
    transform: scaleY(0);
    animation-timing-function: cubic-bezier(0.2, 0.7, 0.2, 1);
  }
  28%,
  100% {
    transform: scaleY(1);
  }
}

@keyframes seq-label {
  0%,
  16% {
    opacity: 0;
  }
  24%,
  100% {
    opacity: 1;
  }
}

/* 1.8–3.2 s: the architecture card, then its nodes 120 ms apart. */
@keyframes seq-arch {
  0%,
  30% {
    opacity: 0;
    transform: translateY(8px);
    animation-timing-function: cubic-bezier(0.2, 0.7, 0.2, 1);
  }
  39%,
  100% {
    opacity: 1;
    transform: none;
  }
}

/* Nodes converge toward the centre at 3.2–4.6 s as the product is built. */
@keyframes seq-node {
  0%,
  35% {
    opacity: 0;
    transform: translateY(4px);
    animation-timing-function: cubic-bezier(0.2, 0.7, 0.2, 1);
  }
  41% {
    opacity: 1;
    transform: none;
  }
  53.3% {
    transform: none;
    animation-timing-function: ease-in-out;
  }
  62%,
  100% {
    opacity: 1;
    transform: translateX(var(--seq-shift, 0)) scale(0.96);
  }
}

/* 3.2–4.6 s: the second connection, then the application window. */
@keyframes seq-line-build {
  0%,
  53.3% {
    transform: scaleY(0);
    animation-timing-function: cubic-bezier(0.2, 0.7, 0.2, 1);
  }
  63%,
  100% {
    transform: scaleY(1);
  }
}

@keyframes seq-app {
  0%,
  58% {
    opacity: 0;
    transform: translateY(8px);
    animation-timing-function: cubic-bezier(0.2, 0.7, 0.2, 1);
  }
  68%,
  100% {
    opacity: 1;
    transform: none;
  }
}

@keyframes seq-tile {
  0%,
  63% {
    opacity: 0;
    transform: translateY(4px);
    animation-timing-function: cubic-bezier(0.2, 0.7, 0.2, 1);
  }
  71%,
  100% {
    opacity: 1;
    transform: none;
  }
}

/* 4.6–5.4 s: complete state. */
@keyframes seq-done {
  0%,
  76.7% {
    opacity: 0;
    animation-timing-function: cubic-bezier(0.2, 0.7, 0.2, 1);
  }
  82%,
  100% {
    opacity: 1;
  }
}
</style>
