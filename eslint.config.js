import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import { vueTsConfigs } from '@vue/eslint-config-typescript'
import eslintConfigPrettier from 'eslint-config-prettier'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'
import pluginAstro from 'eslint-plugin-astro'

/** @type {import('eslint').Linter.Config[]} */
export default [
  eslintConfigPrettier,

  {
    files: ['**/*.{js,ts,mjs,cjs}'],
    ...pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
  },
  {
    files: ['**/*.vue'],
    ...pluginVue.configs['flat/essential'],
    ...vueTsConfigs.recommended,
    skipFormatting,
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.vue'],
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
  },
  {
    files: ['**/*.astro'],
    ...pluginAstro.configs.recommended,
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro'],
        sourceType: 'module',
      },
    },
  },
  {
    ignores: ['dist/**', 'node_modules/**'],
  },
  {
    rules: {
      '@typescript-eslint/ban-ts-comment': [
        'error',
        {
          'ts-ignore': false,
        },
      ],
    },
  },
]
