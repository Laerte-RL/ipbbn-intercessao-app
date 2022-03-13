import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import windcss from 'vite-plugin-windicss'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), windcss()]
})
