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
  <header class="border-b border-line bg-canvas">
    <BaseContainer class="flex flex-wrap items-center justify-between gap-x-6">
      <RouterLink
        :to="localePath('/')"
        class="flex min-h-16 items-center text-lead font-bold tracking-tight text-ink"
      >
        {{ profile.content[locale].name }}
        <span class="sr-only">— {{ messages.nav.home }}</span>
      </RouterLink>

      <button
        ref="menuButton"
        type="button"
        class="inline-flex min-h-11 items-center gap-2 rounded-control border border-line bg-surface px-3 text-sm font-medium text-ink transition-state hover:border-line-strong md:hidden"
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
          stroke-linecap="round"
        >
          <path v-if="isMenuOpen" d="M5 5l10 10M15 5L5 15" />
          <path v-else d="M3 6h14M3 10h14M3 14h14" />
        </svg>
        {{ messages.nav.menu }}
      </button>

      <nav
        :id="MENU_ID"
        :aria-label="messages.nav.label"
        class="w-full pb-4 md:block md:w-auto md:pb-0"
        :class="isMenuOpen ? 'block' : 'hidden'"
      >
        <ul class="flex flex-col md:flex-row md:items-center md:gap-2">
          <li v-for="item in navItems" :key="item.to">
            <RouterLink
              :to="item.to"
              :aria-current="item.active ? 'page' : undefined"
              class="flex min-h-11 items-center rounded-inset px-3 text-ui transition-state"
              :class="
                item.active
                  ? 'font-semibold text-ink underline decoration-accent decoration-2 underline-offset-[10px]'
                  : 'link-muted font-medium'
              "
            >
              {{ item.label }}
            </RouterLink>
          </li>
          <li>
            <a
              :href="profile.githubUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="flex min-h-11 items-center rounded-inset px-3 link-muted text-ui font-medium transition-state"
            >
              {{ messages.nav.github }}
              <span class="sr-only">({{ messages.common.opensInNewTab }})</span>
            </a>
          </li>
          <li
            class="mt-2 border-t border-line pt-2 md:mt-0 md:ml-2 md:border-t-0 md:border-l md:pt-0 md:pl-2"
          >
            <RouterLink
              :to="alternatePath(otherLocale)"
              :lang="otherLocaleConfig.htmlLang"
              :hreflang="otherLocaleConfig.htmlLang"
              class="flex min-h-11 items-center rounded-inset px-3 font-mono text-label font-medium tracking-wide link-muted transition-state"
            >
              <span class="sr-only">{{ messages.nav.switchLanguage }}: </span>
              {{ otherLocaleConfig.nativeName }}
            </RouterLink>
          </li>
        </ul>
      </nav>
    </BaseContainer>
  </header>
</template>
