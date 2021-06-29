import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [vue()],
  resolve: {
    alias: {
			'@': path.resolve(__dirname, 'src'),
      'styles':path.resolve(__dirname, 'src/assets/style/'),
      'api':path.resolve(__dirname, 'src/api/'),
      'comps':path.resolve(__dirname, 'src/components'),
		}
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.0:6001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
    },
    cors:true
  },
  
})
