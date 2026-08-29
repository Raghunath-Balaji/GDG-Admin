import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000,
        host: '0.0.0.0',
        allowedHosts: true,
        headers: {
            "Cross-Origin-Opener-Policy": "unsafe-none",
            "Cross-Origin-Embedder-Policy": "unsafe-none"
        }
    },
    build: {
        outDir: 'dist',
        sourcemap: false,
        rollupOptions: {
            output: {
                manualChunks: {
                    'react-vendor': ['react', 'react-dom', 'react-router-dom'],
                    'motion': ['framer-motion']
                }
            }
        }
    }
})
