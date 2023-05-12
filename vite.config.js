import { defineConfig } from 'vite'
import dotenv from 'dotenv'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  define: {
    _API_: `"${process.env.RENDER_API_DOMAIN}"` || 'http://localhost:3030'
  },
  plugins: [vue()]
})
