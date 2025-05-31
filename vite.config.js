import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        sourcemap: true,
    },
    optimizeDeps: {
        include: ['react', 'react-dom'],
        esbuildOptions: {
            target: 'es2020',
        },
    },
    server: {
        fs: {
            strict: false,
        },
    },
    css: {
        devSourcemap: false,
    },
});
