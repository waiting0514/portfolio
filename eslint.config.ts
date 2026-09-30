import { globalIgnores } from 'eslint/config'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'
import pluginVueA11y from 'eslint-plugin-vuejs-accessibility'
import pluginVitest from '@vitest/eslint-plugin'
import skipFormatting from 'eslint-config-prettier/flat'

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{vue,ts,mts,tsx}'],
  },

  globalIgnores([
    '**/dist/**',
    '**/coverage/**',
    'openspec/**',
    '.agents/**',
    '.claude/**',
    '.gemini/**',
  ]),

  ...pluginVue.configs['flat/recommended'],
  ...pluginVueA11y.configs['flat/recommended'],
  vueTsConfigs.recommended,

  {
    name: 'app/strictness',
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
    },
  },

  {
    ...pluginVitest.configs.recommended,
    files: ['**/*.spec.ts'],
  },

  skipFormatting,
)
