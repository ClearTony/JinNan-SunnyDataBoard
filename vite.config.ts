import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { defineConfig, ConfigEnv } from 'vite'
// import vueSetupExtend from 'vite-plugin-vue-setup-extend-plus'
import compression from 'vite-plugin-compression'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { loadEnv } from './src/utils/vite'

const pathResolve = (dir: string): any => {
    return resolve(__dirname, '.', dir)
}

const alias: Record<string, string> = {
    '/@': pathResolve('./src/')
}

const viteConfig = defineConfig(({ mode, command }: ConfigEnv) => {
    const env = loadEnv(mode)
    return {
        esbuild: {
            jsxFactory: 'h',
            jsxFragment: 'Fragment',
            jsxInject: "import { h } from 'vue';"
        },
        plugins: [
            vue(),
            vueJsx(),
            // vueSetupExtend(),
            compression({
                threshold: 5121,
                disable: !env.VITE_COMPRESSION,
                deleteOriginFile: false
            })
        ],
        root: process.cwd(),
        resolve: { alias },
        base: command === 'serve' ? './' : env.VITE_PUBLIC_PATH,
        hmr: true,
        optimizeDeps: { exclude: ['vue-demi'] },
        server: {
            host: '0.0.0.0',
            port: env.VITE_PORT,
            open: env.VITE_OPEN
        },
        build: {
            outDir: 'dist',
            chunkSizeWarningLimit: 1500,
            sourcemap: false,
            rollupOptions: {
                output: {
                    chunkFileNames: 'assets/js/[name]-[hash].js',
                    entryFileNames: 'assets/js/[name]-[hash].js',
                    assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
                    sourcemapIgnoreList(relativeSourcePath: string, sourcemapPath: string) {
                        return relativeSourcePath.includes('src/views/example/')
                    },
                    manualChunks(id) {
                        if (id.includes('node_modules')) {
                            return id.toString().match(/\/node_modules\/(?!.pnpm)(?<moduleName>[^\/]*)\//)?.groups!.moduleName ?? 'vender'
                        }
                    }
                }
            }
        },
        css: { preprocessorOptions: { css: { charset: false } } },
        define: {
            __VUE_I18N_LEGACY_API__: JSON.stringify(false),
            __VUE_I18N_FULL_INSTALL__: JSON.stringify(false),
            __INTLIFY_PROD_DEVTOOLS__: JSON.stringify(false),
            __NEXT_VERSION__: JSON.stringify(process.env.npm_package_version),
            __NEXT_NAME__: JSON.stringify(process.env.npm_package_name)
        }
    }
})

export default viteConfig
