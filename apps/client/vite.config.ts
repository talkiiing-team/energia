import { defineConfig } from 'vite'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import svgLoader from 'vite-svg-loader'
import tsConfigPaths from 'vite-tsconfig-paths'

import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      reactivityTransform: true,
    }),
    vueJsx(),
    svgLoader(),
    tsConfigPaths({
      root: path.resolve(__dirname),
    }),
  ],
  build: {
    outDir: path.resolve(__dirname, '../../dist-client'),
    emptyOutDir: true,
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src'),
      },
    ],
  },
})
