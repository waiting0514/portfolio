import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { normalizeBasePath } from './build/base-path.ts'

// https://vite.dev/config/
export default defineConfig({
  // `/` locally and for a user site; `/<repo>/` for a GitHub Pages project site (set by CI).
  base: normalizeBasePath(process.env.BASE_PATH),
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
