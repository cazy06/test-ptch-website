import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/test-ptch-website/',
  build: {
    rollupOptions: {
      input: {
        main:  resolve(__dirname, 'index.html'),
        heroA: resolve(__dirname, 'hero-a/index.html'),
        heroB: resolve(__dirname, 'hero-b/index.html'),
        heroC: resolve(__dirname, 'hero-c/index.html'),
      },
    },
  },
})
