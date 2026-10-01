/**
 * Server entry used only at build time (`vite build --ssr`, then `build/prerender.ts`).
 * Renders one route of the same app the browser hydrates; it is never deployed.
 */
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { createMemoryHistory } from 'vue-router'
import App from './App.vue'
import { createAppRouter } from './router'

export { getStaticPages } from './utils/seo'

/** Renders the app markup for an in-app path such as `/en/projects/some-slug/`. */
export async function render(path: string): Promise<string> {
  const app = createSSRApp(App)
  const router = createAppRouter(createMemoryHistory(import.meta.env.BASE_URL))
  app.use(router)

  await router.push(path)
  await router.isReady()
  return renderToString(app)
}
