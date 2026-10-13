# Grupo KF — site institucional

Apresentação digital do Grupo KF com cinco unidades de negócio: KF Agro, KF Air, KF Serviço, KF Caminhões e Máquinas Pesadas e VD Calçados.

## Estrutura

- React + TypeScript + Vite.
- Design responsivo, sem backend ou serviços pagos.
- Abertura fotográfica e seleção interativa das cinco empresas.
- Imagens e logomarcas em `public/assets`.
- Direção de arte descrita em `DESIGN.md` e créditos em `ASSETS.md`.

## Execução

Requer Node.js compatível com o Vite configurado.

```bash
npm ci
npm run dev
```

Build de produção:

```bash
npm run build
```

## Publicação

A GitHub Action `.github/workflows/deploy.yml` publica automaticamente o conteúdo da branch `main` em:

https://eximaq.github.io/grupo-kf-institucional/

A base de publicação é definida em `vite.config.ts` e as fontes usam o caminho correspondente no CSS.

## Testes visuais

Para rodar a verificação em Chromium, após iniciar o servidor local:

```bash
python -m pip install playwright
python -m playwright install chromium
python scripts/verify_site.py
```

A action `visual-qa.yml` também executa testes e gera screenshots em desktop, tablet e mobile como artefatos do workflow.

## Materiais pendentes

A marca principal do grupo foi representada com monograma simplificado enquanto não houver arquivo oficial independente de alta qualidade. Para uma versão definitiva, substituir pela logo oficial, revisar textos e localidades e usar fotografias próprias das empresas. As fotografias atuais são ilustrativas.
