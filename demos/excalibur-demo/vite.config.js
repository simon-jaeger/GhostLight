import {defineConfig} from "vite"

// https://vitejs.dev/config/
export default defineConfig({
  server: {port: 3030},
  build: {assetsInlineLimit: 0},
})
