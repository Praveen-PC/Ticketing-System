import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Ensures output is in the 'dist' directory
  },
  proxy: {
    "/api": {
      target: "https://cri.macsoftautomations.in",
      changeOrigin: true,
      secure: false, // Optional for self-signed certificates
    },
  },
})



