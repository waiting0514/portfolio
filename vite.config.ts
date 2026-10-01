import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { normalizeBasePath } from './build/base-path.ts'
import { staticRoutes } from './build/static-routes.ts'

// https://vite.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  // `/` locally and for a user site; `/<repo>/` for a GitHub Pages project site (set by CI).
  base: normalizeBasePath(process.env.BASE_PATH),
  define: {
    // Shown in the footer; fixed at build time so prerendered HTML and hydration agree.
    __BUILD_YEAR__: JSON.stringify(new Date().getFullYear()),
  },
  plugins: [
    vue(),
    tailwindcss(),
    // Absolute URL used in canonical / Open Graph tags of the generated HTML (set by CI).
    staticRoutes({ siteUrl: process.env.SITE_URL }),
  ],
  build: {
    // The SSR bundle only feeds `build/prerender.ts`; `public/` is already copied into `dist/`.
    copyPublicDir: !isSsrBuild,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
}))
