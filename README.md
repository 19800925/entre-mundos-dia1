# Patch — Temporizador na aba **Silêncio**

Este pequeno patch coloca o **temporizador de silêncio** diretamente na página/aba **Silêncio**,
com o mesmo estilo azul (botões arredondados) e um contador grande `mm:ss`.

## O que vem no ZIP
- `silencio.html` — bloco HTML pronto para colar dentro da seção **Silêncio** (logo abaixo do título).
- `silencio.css` — estilos do painel e botões (cores/raios condizem com o tema).
- `silencio.js` — lógica do temporizador (1–5 min, valor personalizado, iniciar/parar, contador).
- `COMO_INSTALAR.txt` — passos rápidos.

## Instalação rápida (resumo)
1. Envia os três ficheiros (`silencio.html`, `silencio.css`, `silencio.js`) para a tua pasta do site (ex.: a mesma do `index.html`).  
2. No teu `index.html` (ou página onde está a aba **Silêncio**):
   - **CSS**: adiciona `<link rel="stylesheet" href="silencio.css">` no `<head>` (abaixo dos teus estilos).
   - **HTML**: encontra o *card/painel* da aba **Silêncio** e **substitui o conteúdo interno** pelo que está em `silencio.html`.
   - **JS**: antes de `</body>`, adiciona `<script src="silencio.js"></script>`.
3. Publica no GitHub Pages. Recarrega (podes precisar de “Limpar cache”/hard refresh).

> Dica: Se usas abas com `display: none` / `block`, não alteres isso; o bloco já é auto-contido.

## Notas
- O contador mostra sempre `mm:ss`, com zero à esquerda.
- Botões rápidos: **1, 2, 3, 5 min**. Campo para **valor personalizado** (em minutos).  
- O temporizador continua a contar se o ecrã escurecer, mas **em alguns iPhones o iOS pode pausar abas em background** — é normal em PWA/safari.

Feito com verdade 💙
