import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-motion': ['framer-motion'],
          'vendor-gsap': ['gsap', 'gsap/ScrollTrigger', '@gsap/react'],
          'vendor-icons': ['react-icons'],
          'vendor-xyflow': ['@xyflow/react'],
        }
      }
    }
  }
})
