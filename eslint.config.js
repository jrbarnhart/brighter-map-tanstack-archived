//  @ts-check
import { tanstackConfig } from '@tanstack/eslint-config'
import pluginQuery from '@tanstack/eslint-plugin-query'
import pluginRouter from '@tanstack/eslint-plugin-router'

export default [
  // Add an ignores config at the beginning to exclude these files entirely
  {
    ignores: ['vite.config.js', 'prettier.config.js', 'eslint.config.js'],
  },
  ...tanstackConfig,
  ...pluginQuery.configs['flat/recommended'],
  ...pluginRouter.configs['flat/recommended'],
]
