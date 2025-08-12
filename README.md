# Silêncio — Timer com Som e Vibração

Este patch adiciona o temporizador de silêncio à tua aba **Silêncio**,
com botões rápidos (1/2/3/5 min), valor personalizado, e efeitos ao terminar:
beep curto (WebAudio) e vibração (quando suportado).

## Ficheiros
- `silencio.html` — markup do painel.
- `silencio.css` — estilos.
- `silencio.js` — lógica do temporizador (som + vibração).
- `COMO_INSTALAR.txt` — guia rápido.

## Notas
- O som usa a WebAudio API; em iOS, o áudio só toca após uma interação do utilizador (clicar Iniciar).
- A vibração funciona em Android e alguns browsers; no iOS Safari pode não vibrar.