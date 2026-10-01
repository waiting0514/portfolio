import './assets/main.css'

import { createApp, createSSRApp } from 'vue'
import { createWebHistory } from 'vue-router'
import App from './App.vue'
import { createAppRouter } from './router'

const base = import.meta.env.BASE_URL
const withoutTrailingSlash = (path: string) => path.replace(/\/+$/, '')

/**
 * Public routes are prerendered at build time, and their HTML is hydrated in place. Hydration
 * needs markup rendered for this exact URL: `404.html` (served for unknown URLs) has none, and a
 * host may answer a URL with another page's HTML (`vite preview` serves the home page for
 * `/about` without a trailing slash). Anything else is mounted from scratch, which replaces it.
 */
function hasPrerenderedMarkup(): boolean {
  const rendered = document.querySelector<HTMLElement>('#app')?.dataset.prerenderedPath
  const { pathname } = window.location
  const current = pathname.startsWith(base) ? pathname.slice(base.length - 1) : pathname
  return rendered !== undefined && withoutTrailingSlash(rendered) === withoutTrailingSlash(current)
}

const app = hasPrerenderedMarkup() ? createSSRApp(App) : createApp(App)
const router = createAppRouter(createWebHistory(base))

app.use(router)

// Mount after the initial navigation so the first render is already the requested page.
router.isReady().then(() => app.mount('#app'))
