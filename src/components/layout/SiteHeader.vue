<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, useTemplateRef, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import BaseContainer from '@/components/common/BaseContainer.vue'
import { useLocale } from '@/composables/useLocale'
import { profile } from '@/data/profile'
import { LOCALE_CONFIG, stripLocalePrefix, type Locale } from '@/i18n/locales'

const route = useRoute()
const { locale, messages, localePath, alternatePath } = useLocale()

const MENU_ID = 'primary-navigation'
const isMenuOpen = ref(false)
const menuButton = useTemplateRef('menuButton')

const navItems = computed(() => {
  const neutralPath = stripLocalePrefix(route.path)
  return [
    { label: messages.value.nav.home, to: localePath('/'), active: neutralPath === '/' },
    {
      label: messages.value.nav.projects,
      to: localePath('/projects'),
      // Case study pages belong to the Projects section.
      active: neutralPath === '/projects' || neutralPath.startsWith('/projects/'),
    },
    {
      label: messages.value.nav.about,
      to: localePath('/about'),
      active: neutralPath.replace(/\/$/, '') === '/about',
    },
  ]
})

const otherLocale = computed<Locale>(() => (locale.value === 'en' ? 'zh-TW' : 'en'))
const otherLocaleConfig = computed(() => LOCALE_CONFIG[otherLocale.value])

function closeMenu() {
  isMenuOpen.value = false
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && isMenuOpen.value) {
    closeMenu()
    menuButton.value?.focus()
  }
}

// Any navigation (link click, back button, language switch) closes the mobile menu.
watch(() => route.fullPath, closeMenu)

onMounted(() => document.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => document.removeEventListener('keydown', onKeydown))
</script>

<template>
  <header class="border-b border-line-strong bg-canvas">
    <BaseContainer class="flex flex-wrap items-center justify-between gap-x-6">
      <RouterLink
        :to="localePath('/')"
        class="group flex min-h-16 items-center gap-2 font-mono text-ui font-semibold tracking-tight text-ink"
      >
        <span
          aria-hidden="true"
          class="grid h-7 place-items-center rounded-inset bg-ink px-1.5 text-label text-white transition-state group-hover:bg-accent"
          >~/</span
        >
        {{ profile.content[locale].name }}
        <span class="sr-only">— {{ messages.nav.home }}</span>
      </RouterLink>

      <button
        ref="menuButton"
        type="button"
        class="inline-flex min-h-11 items-center gap-2 rounded-control border border-line-strong bg-surface px-3 font-mono text-label font-medium text-ink transition-state hover:border-accent hover:text-accent md:hidden"
        :aria-expanded="isMenuOpen"
        :aria-controls="MENU_ID"
        @click="isMenuOpen = !isMenuOpen"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          class="size-4"
          fill="none"
          stroke="currentColor"
          stroke-width="1.75"
          stroke-linecap="square"
        >
          <path v-if="isMenuOpen" d="M5 5l10 10M15 5L5 15" />
          <path v-else d="M3 6h14M3 10h14M3 14h9" />
        </svg>
        {{ messages.nav.menu }}
      </button>

      <nav
        :id="MENU_ID"
        :aria-label="messages.nav.label"
        class="w-full pb-4 md:block md:w-auto md:pb-0"
        :class="isMenuOpen ? 'block' : 'hidden'"
      >
        <ul class="flex flex-col font-mono text-ui md:flex-row md:items-center md:gap-1">
          <li v-for="item in navItems" :key="item.to">
            <RouterLink
              :to="item.to"
              :aria-current="item.active ? 'page' : undefined"
              class="nav-link flex min-h-11 items-center rounded-inset px-2 transition-state"
              :class="item.active ? 'font-semibold text-ink' : 'link-muted'"
            >
              {{ item.label }}
            </RouterLink>
          </li>
          <li>
            <a
              :href="profile.githubUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="nav-link flex min-h-11 items-center gap-1 rounded-inset px-2 link-muted transition-state"
            >
              {{ messages.nav.github }}
              <span aria-hidden="true" class="text-label">↗</span>
              <span class="sr-only">({{ messages.common.opensInNewTab }})</span>
            </a>
          </li>
          <li
            class="mt-2 border-t border-dashed border-line-strong pt-2 md:mt-0 md:ml-2 md:border-t-0 md:border-l md:pt-0 md:pl-3"
          >
            <RouterLink
              :to="alternatePath(otherLocale)"
              :lang="otherLocaleConfig.htmlLang"
              :hreflang="otherLocaleConfig.htmlLang"
              class="flex min-h-11 items-center gap-1.5 rounded-inset px-2 text-label font-medium tracking-wide link-muted transition-state"
            >
              <span aria-hidden="true" class="text-syntax-keyword">--lang</span>
              <span class="sr-only">{{ messages.nav.switchLanguage }}: </span>
              {{ otherLocaleConfig.nativeName }}
            </RouterLink>
          </li>
        </ul>
      </nav>
    </BaseContainer>
  </header>
</template>

<style scoped>
/*
 * Brackets mark the current page like a selected tab in a terminal UI: "[Projects]".
 * They are generated content, so the link's accessible name stays the plain label, and they
 * are always present (transparent when inactive) so selecting a page never shifts the row.
 */
.nav-link::before,
.nav-link::after {
  color: transparent;
  transition: color var(--duration-state) var(--ease-out-soft);
}

.nav-link::before {
  content: '[';
  margin-right: 0.3em;
}

.nav-link::after {
  content: ']';
  margin-left: 0.3em;
}

@media (hover: hover) {
  .nav-link:hover::before,
  .nav-link:hover::after {
    color: var(--color-line-strong);
  }
}

.nav-link[aria-current='page']::before,
.nav-link[aria-current='page']::after {
  color: var(--color-accent);
}
</style>
