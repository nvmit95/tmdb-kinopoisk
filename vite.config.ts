import path from "path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react()],
  resolve: {
    alias: {
      "@/": `${path.resolve(__dirname, "src")}/`,
    },
  },
  server: {
    proxy: {
      // Same-origin proxy: TMDB часто блокируют напрямую (ERR_CONNECTION_REFUSED)
      "/api/tmdb": {
        target: "https://api.themoviedb.org",
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/api\/tmdb/, "/3"),
      },
      "/api/tmdb-image": {
        target: "https://image.tmdb.org",
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/api\/tmdb-image/, ""),
      },
      "/api/tmdb-static": {
        target: "https://www.themoviedb.org",
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/api\/tmdb-static/, ""),
      },
    },
  },
})
