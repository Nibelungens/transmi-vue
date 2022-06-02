import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueI18n from '@intlify/vite-plugin-vue-i18n'

export default defineConfig({
    server: {
        proxy: {
            '^/api': {
                target: 'http://192.168.1.100:9001',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '/transmission/rpc')
            }
        }
    },
    plugins: [
        vue(),
        vueI18n({
            defaultSFCLang: 'yml'
        })
    ]
})
