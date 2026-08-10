import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import cesium from 'vite-plugin-cesium'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  base: './',
  plugins: [vue(), cesium()],
  resolve: {
    alias: {
      '@sdk': fileURLToPath(new URL('./src/sdk', import.meta.url)),
    },
  },
  build: {
    outDir: 'demo-dist',
  },
})

