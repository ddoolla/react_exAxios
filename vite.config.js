import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  /* 프록시 서버 설정 */
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080", // API 서버 주소
        changeOrigin: true, // Origin 헤더 변경
        secure: false, // https: true, http: false
      },
    },
  },
});
