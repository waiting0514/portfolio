import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { localeFromPath, switchLocalePath, withLocalePrefix, type Locale } from '@/i18n/locales'
import { MESSAGES } from '@/i18n/messages'

/**
 * Current locale and its UI copy, derived from the route path.
 * The locale is not stored anywhere: the URL is the single source of truth.
 */
export function useLocale() {
  const route = useRoute()

  const locale = computed(() => localeFromPath(route.path))
  const messages = computed(() => MESSAGES[locale.value])

  /** Builds an in-app link that stays in the current locale. */
  function localePath(path: string): string {
    return withLocalePrefix(path, locale.value)
  }

  /** The current page in another locale. */
  function alternatePath(target: Locale): string {
    return switchLocalePath(route.path, target)
  }

  return { locale, messages, localePath, alternatePath }
}
