import type { Localized } from './locales'

/**
 * UI copy. Every locale must satisfy this interface, so a missing or misspelled key
 * is a type error rather than a blank string at runtime.
 */
export interface Messages {
  nav: {
    label: string
    home: string
    projects: string
    about: string
    github: string
    menu: string
    switchLanguage: string
  }
  common: {
    skipToContent: string
    opensInNewTab: string
    viewProjects: string
  }
  pages: {
    projectsTitle: string
    aboutTitle: string
  }
  notFound: {
    title: string
    description: string
    backHome: string
    browseProjects: string
  }
  footer: {
    builtWith: string
  }
}

const zhTW = {
  nav: {
    label: '主要導覽',
    home: '首頁',
    projects: '作品',
    about: '關於我',
    github: 'GitHub',
    menu: '選單',
    switchLanguage: '切換語言',
  },
  common: {
    skipToContent: '跳至主要內容',
    opensInNewTab: '另開新分頁',
    viewProjects: '查看作品',
  },
  pages: {
    projectsTitle: '作品',
    aboutTitle: '關於我',
  },
  notFound: {
    title: '找不到頁面',
    description: '這個網址不存在，可能已被移動或輸入有誤。',
    backHome: '回到首頁',
    browseProjects: '瀏覽作品',
  },
  footer: {
    builtWith: '以 Vue 3、TypeScript 與 Vite 打造',
  },
} satisfies Messages

const en = {
  nav: {
    label: 'Primary',
    home: 'Home',
    projects: 'Projects',
    about: 'About',
    github: 'GitHub',
    menu: 'Menu',
    switchLanguage: 'Switch language',
  },
  common: {
    skipToContent: 'Skip to content',
    opensInNewTab: 'opens in a new tab',
    viewProjects: 'View Projects',
  },
  pages: {
    projectsTitle: 'Projects',
    aboutTitle: 'About',
  },
  notFound: {
    title: 'Page not found',
    description: 'This page does not exist. It may have moved, or the address may be mistyped.',
    backHome: 'Back to Home',
    browseProjects: 'Browse Projects',
  },
  footer: {
    builtWith: 'Built with Vue 3, TypeScript and Vite',
  },
} satisfies Messages

export const MESSAGES: Localized<Messages> = { 'zh-TW': zhTW, en }
