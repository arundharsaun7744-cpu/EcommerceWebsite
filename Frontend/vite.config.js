import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    hmr: {
      host: 'localhost',
      port: 5173,
    },
  },
  plugins: [
    react({
      jsxRuntime: 'automatic',
    }),
  ],
  optimizeDeps: {
    force: true,  // Always re-optimize deps after install/config changes
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/react") || id.includes("node_modules/react-dom")) {
            return "vendor";
          }
          if (id.includes("node_modules/@mui/material") || id.includes("node_modules/@mui/icons-material")) {
            return "ui";
          }
          if (id.includes("node_modules/framer-motion") || id.includes("node_modules/motion")) {
            return "animation";
          }
        }
      }
    },
    chunkSizeWarningLimit: 1000,
  }
});
