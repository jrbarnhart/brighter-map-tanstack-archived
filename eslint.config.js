//  @ts-check
import { tanstackConfig } from '@tanstack/eslint-config'

export default [
  // Add an ignores config at the beginning to exclude these files entirely
  {
    ignores: ['vite.config.js', 'prettier.config.js', 'eslint.config.js'],
  },
  ...tanstackConfig,
]
