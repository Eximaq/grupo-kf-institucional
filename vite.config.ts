import { defineConfig } from "vite";

export default defineConfig({
  base: "/grupo-kf-institucional/",
  build: {
    target: "es2022",
    rollupOptions: {
      input: {
        main: "index.html",
        contato: "contato/index.html",
      },
    },
  },
});
