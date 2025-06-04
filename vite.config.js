import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
export default defineConfig(function (_a) {
    var mode = _a.mode;
    var env = loadEnv(mode, process.cwd(), '');
    var isDev = env.VITE_ENV === 'development';
    var apiUrl = env.VITE_API_URL;
    return {
        plugins: [react()],
        base: process.env.NODE_ENV === 'production' ? '/ai-data-analyzer-ui/' : '/', build: {
            sourcemap: isDev,
            minify: 'terser',
            terserOptions: {
                compress: {
                    drop_console: true,
                    drop_debugger: true,
                },
            },
            rollupOptions: {
                output: {
                    manualChunks: {
                        vendor: ['react', 'react-dom'],
                        ui: ['framer-motion', 'react-hot-toast'],
                    },
                },
            },
        },
        optimizeDeps: {
            include: ['react', 'react-dom'],
            esbuildOptions: {
                target: 'es2020',
            },
        },
        server: {
            fs: {
                strict: true,
            },
            headers: {
                'X-Content-Type-Options': 'nosniff',
                'X-Frame-Options': 'DENY',
                'X-XSS-Protection': '1; mode=block',
                'Referrer-Policy': 'strict-origin-when-cross-origin',
                'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
            },
            csp: {
                'default-src': "'self'",
                'connect-src': "'self' ".concat(apiUrl, " ws: wss:"),
                'script-src': "'self' 'unsafe-inline' 'unsafe-eval'",
                'style-src': "'self' 'unsafe-inline'",
                'img-src': "'self' data:",
                'font-src': "'self' data:",
                'worker-src': "'self' blob:",
                'object-src': "'none'",
                'base-uri': "'self'",
                'frame-ancestors': "'none'",
                'form-action': "'self'"
            }
        },
        css: {
            devSourcemap: false,
        },
    };
});
