import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig } from 'vitest/config'
import viteConfig from './vite.config.ts'

export default defineConfig((env) =>
  mergeConfig(viteConfig(env), {
    test: {
      environment: 'jsdom',
      include: ['src/**/*.spec.ts', 'build/**/*.spec.ts'],
      setupFiles: ['src/test-utils/setup.ts'],
      root: fileURLToPath(new URL('./', import.meta.url)),
    },
  }),
)
