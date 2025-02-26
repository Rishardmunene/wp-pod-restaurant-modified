import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: 'http://localhost:5173/',
  server: {
    port: 5173,
    host: '0.0.0.0',
    strictPort: true,
    cors: true,
    origin: 'http://localhost:5173',
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 5173,
      clientPort: 5173
    },
    proxy: {
      '/wp-json': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false
      }
    }
  },
  build: {
    outDir: path.resolve(__dirname, 'wordpress/bundled'),
    assetsDir: 'assets',
    manifest: true,
    rollupOptions: {
      input: path.resolve(__dirname, 'src/main.tsx')
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      'react': path.resolve(__dirname, 'node_modules/react'),
      'react-dom': path.resolve(__dirname, 'node_modules/react-dom')
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
    force: true
  }
}) 