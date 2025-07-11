import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
    base: '/weather-app/',
      build: {
    outDir: 'dist', 
    rollupOptions: {
      input: './src/main.jsx', 
    },
  },
})
