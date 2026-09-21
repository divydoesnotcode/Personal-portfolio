import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/',
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor libraries into separate chunks
          'react-vendor': ['react', 'react-dom'],
          'motion-vendor': ['motion', 'framer-motion'],
          'gsap-vendor': ['gsap', 'gsap/ScrollTrigger', 'gsap/CustomEase', '@gsap/react'],
          'lenis-vendor': ['lenis'],
        }
      }
    },
    // Increase chunk warning limit
    chunkSizeWarningLimit: 600,
  }
})