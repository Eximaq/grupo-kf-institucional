# Vídeos de drone para a abertura do Grupo KF

A abertura usa três cenas com duração aproximada de 4,5 segundos cada, com transição cruzada de 0,6 segundo. O vídeo é reproduzido sem áudio e em loop.

Para substituir o vídeo demonstrativo pelas cenas reais, adicione **arquivos MP4 autorizados para uso comercial** neste diretório:

- `maceio.mp4`: vídeo da orla de Maceió, sugerido: https://www.pexels.com/pt-br/video/praia-litoral-brasil-predios-13867959/
- `santa-catarina.mp4`: filmagem da região de Santa Catarina, sugestão: https://www.pexels.com/video/beautiful-aerial-beach-view-in-santa-catarina-34328786/
- `rio-grande-do-sul.mp4`: filmagem de Porto Alegre/RS, sugestão: https://www.pexels.com/pt-br/video/vista-aerea-da-paisagem-urbana-de-porto-alegre-33404367/

O script `scripts/build_reel.sh` detecta automaticamente os três arquivos. Se todos estiverem presentes, monta um único vídeo MP4 otimizado com transições suaves. Enquanto não estiverem, mantém o vídeo ilustrativo preexistente **sem afirmar que mostra filmagens reais dessas cidades**.

Se o banco de vídeos bloquear os downloads automatizados, baixe manualmente usando o botão oficial do Pexels e faça upload dos arquivos ao projeto. Não utilize sites extratores não oficiais.

Os vídeos do Pexels são normalmente disponibilizados sob a licença Pexels, mas é importante verificar eventuais marcas, pessoas ou direitos de terceiros retratados.

Os arquivos de fontes maiores devem ser comprimidos em H.264 antes de entrar no repositório para manter o deploy leve. Para exibir as localidades no hero, o pipeline valida a presença das três cenas.
