import { defineConfig } from "vite";
import { existsSync } from "node:fs";

export default defineConfig({
  base: "/grupo-kf-institucional/",
  define: {
    __VD_DELUXE_AVAILABLE__: JSON.stringify(existsSync("public/assets/photos/kd-deluxe-capa.jpg")),
    __VD_KIDS_AVAILABLE__: JSON.stringify(existsSync("public/assets/photos/kd-kids-descricao.jpg")),
  },
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
