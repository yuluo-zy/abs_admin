import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgrPlugin from "@arco-plugins/vite-plugin-svgr";
import vitePluginForArco from "@arco-plugins/vite-react";
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3333,
    proxy: {
      // 选项写法
      '/api': {
        target: 'http://192.168.8.85:30102',
        // target: 'http://127.0.0.1:8886',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/')
      }
    }
  },
  resolve: {
    alias: [{ find: '@', replacement: '/src' }]
  },
  plugins: [
    react(),
    svgrPlugin({
      svgrOptions: {
        svgo: true
      }
    }),
    vitePluginForArco({
      theme: '@arco-themes/react-arco-pro'
    })
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {}
      }
    }
  }
});
