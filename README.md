
# Entre Mundos — Tabs Fix (Patch)

Este patch corrige as **abas que não mudam de conteúdo** ao tocar.

## Como usar (2 passos)

1) **No HTML**, garanta que os botões das abas têm `data-tab` e as secções têm `data-section`:

```html
<nav class="tabs">
  <button class="tab-btn" data-tab="mensagem">Mensagem</button>
  <button class="tab-btn" data-tab="respiracao">Respiração</button>
  <button class="tab-btn" data-tab="frase">Frase</button>
  <button class="tab-btn" data-tab="silencio">Silêncio</button>
</nav>

<section data-section="mensagem" id="mensagem">…</section>
<section data-section="respiracao" id="respiracao">…</section>
<section data-section="frase" id="frase">…</section>
<section data-section="silencio" id="silencio">…</section>
```

Adicione também uma regra CSS (se ainda não tem):
```css
[data-section][hidden]{ display:none; }
```

2) **Inclua o JS** ao final do `body` (ou com `defer`):
```html
<script src="tabs-fix.js" defer></script>
```

Pronto. As abas ficam a funcionar, com estado visual (classe `active`), `aria-selected`
e sincronização do `#hash` sem saltos na página.

> Dica: se já tem um script próprio para abas, remova ou comente para evitar conflitos.
