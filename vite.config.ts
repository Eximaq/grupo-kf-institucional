import { defineConfig } from "vite";

export default defineConfig({
  base: "/grupo-kf-institucional/",
  build: {
    target: "es2022",
    rollupOptions: {
      input: {
        main: "index.html",
        contato: "contato/index.html",
        "kf-agro": "empresas/kf-agro/index.html",
        "kf-air": "empresas/kf-air/index.html",
        "kf-servico": "empresas/kf-servico/index.html",
        "kf-caminhoes-maquinas": "empresas/kf-caminhoes-maquinas/index.html",
        "vd-calcados": "empresas/vd-calcados/index.html",
      },
    },
  },
});
