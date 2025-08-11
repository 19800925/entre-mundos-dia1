# Patch v32 — Corrige o “voltar” do Oráculo (iOS/Safari)

## O que este patch faz
- Evita que o Safari iOS mostre uma versão “congelada” da página quando regressas do Oráculo.
- Força **re-render** do Dia 1 ao voltar do Oráculo.
- Atualiza o botão “Voltar ao menu” do Oráculo para usar *cache busting* (?v=32).

---

## Ficheiros incluídos
1. `app-bfcache-fix.js` — script que força reload quando a página volta do histórico (bfcache).
2. `oraculo.html` — versão com o botão **Voltar ao menu** a apontar para `index-fase2.html?v=32` (podes mudar o número sempre que fizeres deploy).
3. `SNIPPET-pageshow.txt` — caso prefiras colar o snippet diretamente no `index-fase2.html` em vez de usar o JS externo.

---

## Como aplicar

### Passo 1 — Fazer upload para a raiz do projeto
- Envia `app-bfcache-fix.js` para a **raiz** do repositório.
- (Opcional) Substitui o teu `oraculo.html` por este, OU copia apenas o `href` do botão **Voltar ao menu** para garantir `index-fase2.html?v=32`.

### Passo 2 — Ligar o script no `index-fase2.html`
Mesmo antes de `</body>`, adiciona **uma** das opções abaixo:

**Opção A — Ficheiro externo (recomendado)**
```html
<script src="app-bfcache-fix.js?v=32"></script>
```

**Opção B — Snippet inline**
Copia o conteúdo de `SNIPPET-pageshow.txt` para dentro do `index-fase2.html` antes de `</body>`.

### Passo 3 — Publicar e testar
- Commit e abre: `https://19800925.github.io/entre-mundos-dia1/index-fase2.html?v=32`
- Se vires ainda a versão antiga, muda o número do `?v=` (ex.: `?v=33`) **ou** limpa os dados do site no Safari.

### Observação
Se tiveres *service worker* ativo a fazer cache agressiva, posso enviar um patch para o atualizar/desativar temporariamente.
