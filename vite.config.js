import { defineConfig } from 'vite';

export default defineConfig({
    css: {
        preprocessorOptions: {
            less: {
                javascriptEnabled: true,
            },
        },
        // Esto le dice a PostCSS que no intente resolver las URLs del CSS
        postcss: {
            plugins: [
                {
                    postcssPlugin: 'internal:charset-removal',
                    AtRule: {
                        charset: (atRule) => {
                            if (atRule.name === 'charset') {
                                atRule.remove();
                            }
                        }
                    }
                }
            ],
        }
    },
    build: {
        outDir: 'dist',
        rollupOptions: {
            // Importante: No intentes resolver URLs externas/relativas inexistentes
            external: [/^..\/..\/images\/.*/], 
            input: ['frontend/js/main.js', 'frontend/css/main.less'],
            output: {
                entryFileNames: `[name].js`,
                chunkFileNames: `[name].js`,
                assetFileNames: `[name].[ext]`
            }
        },
    },
});