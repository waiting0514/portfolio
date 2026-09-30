<script setup lang="ts">
import { nextTick, onBeforeUnmount, useTemplateRef } from 'vue'
import { RouterView, START_LOCATION, useRouter } from 'vue-router'
import SkipLink from '@/components/common/SkipLink.vue'
import SiteFooter from '@/components/layout/SiteFooter.vue'
import SiteHeader from '@/components/layout/SiteHeader.vue'

const router = useRouter()
const main = useTemplateRef('main')

// After client-side navigation, move focus to the new content so keyboard and
// screen reader users start from the top of the page instead of the old link.
// The initial page load is skipped: focus must start at the skip link.
const removeAfterEach = router.afterEach(async (to, from, failure) => {
  if (failure || from === START_LOCATION || to.path === from.path) return
  await nextTick()
  main.value?.focus({ preventScroll: true })
})

onBeforeUnmount(removeAfterEach)
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <SkipLink />
    <SiteHeader />
    <main id="main-content" ref="main" tabindex="-1" class="flex-1 focus:outline-none">
      <RouterView />
    </main>
    <SiteFooter />
  </div>
</template>
