# Limpeza do repositório — pacote base

Este ZIP contém só os ficheiros necessários para a app:

- `index.html` (único HTML)
- `tabs.js` (abas estáveis)
- `respiracao.js` (respiração 4·4·4·4)
- **Não inclui** `oraculo.js` para não sobrescrever a tua versão com 509 frases. Mantém o teu `oraculo.js` atual no root.

## Como aplicar
1) Garante que tens backup do repositório (já tens 👍).
2) Sobe estes 3 ficheiros para a raiz do repositório, a substituir.
3) Edita o `index.html` se quiseres ajustar textos.
4) Confirma que os únicos JS carregados na página são:
   - `tabs.js`
   - `respiracao.js`
   - `oraculo.js` (o teu, com 509 frases)

## Sugerido (organização)
Cria uma pasta `backup/` e move para lá ficheiros duplicados/antigos:
- `index_com_abas.html`, `index-fase2.html`, `index-silencio.html`, `oraculo-inline.html`, `oraculo-com-voltar.html`
- `tabs-fix.js`, `tabs-fix-corrigido.js`, `tabs-hotfix.js`
- `oraculo-home.js`, `share-oraculo.js`
- `oraculo.css`, `oraculo-home.css`, `oraculo-inline.css` (se não estiverem em uso)

