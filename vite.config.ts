import {defineConfig} from "vite"
import reactRefresh from "@vitejs/plugin-react-refresh"
import tsNameof from "vite-plugin-ts-nameof"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh(), tsNameof()],
  server: {port: 3010},
})
