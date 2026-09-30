/**
 * Locale definitions and URL helpers.
 *
 * The locale is always derived from the URL: Traditional Chinese (default) has no prefix,
 * English lives under `/en`. Kept free of Vue / Vite APIs so build-time code can import it.
 */

export const LOCALES = ['zh-TW', 'en'] as const

export type Locale = (typeof LOCALES)[number]

/** One complete value per supported locale. */
export type Localized<T> = Record<Locale, T>

export const DEFAULT_LOCALE: Locale = 'zh-TW'

interface LocaleConfig {
  /** Value for `<html lang>` and `hreflang`. */
  htmlLang: string
  /** Value for `og:locale`. */
  ogLocale: string
  /** The language's own name, used by the language switcher. */
  nativeName: string
  /** URL segment without slashes; empty for the default locale. */
  prefix: string
}

export const LOCALE_CONFIG: Localized<LocaleConfig> = {
  'zh-TW': { htmlLang: 'zh-Hant-TW', ogLocale: 'zh_TW', nativeName: '中文', prefix: '' },
  en: { htmlLang: 'en', ogLocale: 'en_US', nativeName: 'English', prefix: 'en' },
}

const EN_PREFIX_PATTERN = /^\/en(?=\/|$)/

/** Returns the locale encoded in an app path (a path without the deploy base). */
export function localeFromPath(path: string): Locale {
  return EN_PREFIX_PATTERN.test(path) ? 'en' : DEFAULT_LOCALE
}

/** Removes the locale prefix: `/en/projects` → `/projects`, `/en` → `/`. */
export function stripLocalePrefix(path: string): string {
  const stripped = path.replace(EN_PREFIX_PATTERN, '')
  return stripped.startsWith('/') ? stripped : `/${stripped}`
}

/** Adds the locale prefix to a locale-neutral path: (`/projects`, `en`) → `/en/projects`. */
export function withLocalePrefix(path: string, locale: Locale): string {
  const neutral = stripLocalePrefix(path)
  const { prefix } = LOCALE_CONFIG[locale]
  if (!prefix) return neutral
  return neutral === '/' ? `/${prefix}` : `/${prefix}${neutral}`
}

/** The same page in another locale. */
export function switchLocalePath(path: string, target: Locale): string {
  return withLocalePrefix(path, target)
}
