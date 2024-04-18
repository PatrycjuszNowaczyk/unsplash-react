import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)


// https://vitejs.dev/config/
// noinspection JSUnusedGlobalSymbols
export default defineConfig({
  base: './',
  plugins: [react()],
  resolve: {
    alias: {
      '@src': resolve(__dirname, 'src'),
      '@components': resolve(__dirname, 'src/components'),
      '@layouts': resolve(__dirname, 'src/layouts'),
      '@assets': resolve(__dirname, 'src/assets')
    },
  },
})
