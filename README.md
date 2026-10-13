# Grupo KF

Apresentação institucional estática das cinco empresas do Grupo KF. React, TypeScript, Vite e CSS, com navegação por âncoras, seleção dos segmentos na abertura, menu responsivo e créditos fotográficos.

## Desenvolvimento

Requer Node.js 22.12 ou superior.

```sh
npm ci
npm run dev
```

Endereço local: http://127.0.0.1:5173/grupo-kf-institucional/

```sh
npm run build
npm run preview
```

O build executa a checagem de TypeScript e produz `dist/`. O caminho público está configurado em `vite.config.ts` para `/grupo-kf-institucional/`.

## Publicação

O workflow `.github/workflows/deploy.yml` publica no GitHub Pages após cada envio à branch `main`. Instalação reproduzível via `npm ci`, build com TypeScript e permissões de publicação restritas ao job de deploy.

## Verificação visual e funcional

```sh
python -m pip install playwright
python -m playwright install chromium
python scripts/verify_site.py
```

O script usa Chromium headless e verifica larguras de 1440, 768 e 390 pixels, carregamento de imagens e fontes, âncoras, abas, teclado, menu móvel e diálogo de créditos. Capturas e relatório ficam em `qa/`, fora do controle de versão. Para testar a publicação, use `--url https://eximaq.github.io/grupo-kf-institucional/`.

## Conteúdo e identidade

Direção de arte: `DESIGN.md`. Fontes, fotografias, licenças e marcas: `ASSETS.md`. Os cinco logotipos fornecidos são preservados integralmente. Fotografias representam os segmentos e não retratam operações reais do grupo.

Materiais para uma atualização editorial: logotipo oficial do Grupo KF, fotografias próprias, descrição validada dos serviços, dados oficiais de contato e confirmação das localidades de atuação.
