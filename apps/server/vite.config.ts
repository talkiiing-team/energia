/// <reference types="vitest" />

import path from 'path'
import { defineConfig } from 'vite'
import pkg from './package.json'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [],
  test: {},
  build: {
    outDir: path.resolve('../../dist-server'),
    lib: {
      entry: './src/dev.entry.ts',
      fileName: () => 'index.js',
      formats: ['cjs'],
    },
    emptyOutDir: true,
    rollupOptions: {
      external: [...Object.keys(pkg.dependencies), 'url', 'path'],
    },
  },
})
