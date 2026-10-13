# Verificação da apresentação

## Revisão visual

Capturas no Chromium em 1440 × 1000, 768 × 1024 e 390 × 844 pixels. A segunda revisão confirmou os seguintes refinamentos:

1. A fotografia de varejo tinha altura determinada pela proporção original. A imagem agora ocupa o quadro definido pela composição, sem ampliar a seção.
2. O enquadramento de varejo deixava o produto abaixo de uma área vazia excessiva. O recorte agora destaca o calçado.
3. A primeira imagem de cultivo não comunicava bem o contexto de soja. A versão final usa uma lavoura de soja fotografada no Paraná, com crédito e licença preservados.
4. A seleção de segmentos no tablet se dividia em duas linhas. Os cinco controles agora permanecem em uma linha.
5. A abertura móvel deixava os controles abaixo da primeira tela. A escala do título e a altura da fotografia foram ajustadas. A logo VD recebeu também uma área maior na seção de varejo.

As capturas por seção ocultam apenas o cabeçalho fixo durante o registro, para não sobrepor o conteúdo inspecionado. As capturas da página completa e da abertura mantêm a interface original.

## Validação técnica

- Build de produção e checagem TypeScript aprovados.
- Três larguras verificadas: sem transbordamento horizontal.
- Dez aplicações das cinco logos carregadas, com arquivos originais preservados.
- Imagens, fontes locais e âncoras carregadas sem erro.
- Cinco abas da abertura testadas com clique e teclado, incluindo Home, End e setas.
- Menu móvel testado com abertura, navegação e fechamento por Escape, com retorno de foco.
- Créditos testados com abertura, links e fechamento por Escape.
- Navegação das empresas, referências geográficas e retorno ao início verificados.
- Console e respostas HTTP sem erros durante a execução completa.
- Movimento reduzido respeitado nas capturas e interações.

O script `scripts/verify_site.py` permite repetir as verificações no endereço público. Relatório e capturas locais ficam em `qa/`, fora do repositório.
