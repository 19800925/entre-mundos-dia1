# Clean Overlay Pack (manter layout)

Este pacote NÃO mexe no teu HTML. Apenas substitui os JS/CSS essenciais:
- tabs-hotfix.js (abas estáveis)
- oraculo.js (versão produção 509 frases)
- respiracao.js e respiracao.css (balão + instruções)

## Como aplicar
1) Sobe estes ficheiros para a RAIZ do repositório, a substituir os existentes.
2) Garante que o teu `index.html` carrega exatamente estes scripts/estilos:
   <script src="tabs-hotfix.js" defer></script>
   <script src="oraculo.js?v=prod509" defer></script>
   <link rel="stylesheet" href="respiracao.css">
   <script src="respiracao.js" defer></script>

## Opcional: limpeza de duplicados (manualmente no GitHub)
- Apaga/move para `_archive/`: `tabs.js`, `tabs-fix*.js`, `tabs-hotfix-*.js`, `oraculo-*.html/js/css/json`, `patch_*.html/js`, `*inline*.html/css`, `index-*.html`, `*teste*.html`.
