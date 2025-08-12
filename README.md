# Entre Mundos — Layout Base (congelado)
Esta é a **versão base oficial** do layout (igual ao screenshot que enviaste).
Sempre que fizermos novas alterações, começamos **a partir destes ficheiros** para evitar regressões.

## Estrutura
- `index.html` — marcação das três abas (Guia Espiritual, Silêncio, Escrita da Alma)
- `assets/css/style.css` — estilos (cartões, gradientes, tipografia, botões)
- `assets/js/app.js` — tabs + guia de respiração 4·4·4·4 (começar/parar)

## Como publicar no GitHub Pages
1. Sobe o conteúdo do ZIP para o teu repositório (raiz).
2. Garante que a página publica `index.html` na raiz (Settings → Pages → Source: main / root).

## Notas
- Para manter o layout estável, edita **apenas** estes ficheiros ou cria outros *novos* sem substituir esta base.
- A guia de respiração usa animação simples de escala para simular o “balão”.
