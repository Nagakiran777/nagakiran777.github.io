import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// This is a personal GitHub Pages site: https://Nagakiran777.github.io/
export default defineConfig({
  base: '/',
  plugins: [react()],
})
