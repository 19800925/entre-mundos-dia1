Entre Mundos — Integração do Oráculo (400 mensagens)
====================================================

Ficheiros neste pacote:
- index.html       → acrescenta um botão fixo de rodapé "🔮 Oráculo" (fundo azul cósmico)
- oraculo.html     → página do Oráculo (lê mensagens de oraculo.json, tem Guardar/Partilhar)
- oraculo.json     → 400 mensagens (podes editar à vontade)
- sw.js            → inclui oraculo.html e oraculo.json no cache offline (v8)

Como publicar (GitHub Pages):
1) Abra o repositório `entre-mundos-dia1` → Add file → Upload files.
2) Carregue estes 4 ficheiros para a raiz (substitua os existentes quando aplicável).
3) Commit.
4) Teste: https://19800925.github.io/entre-mundos-dia1/?v=8
   - Oráculo direto: https://19800925.github.io/entre-mundos-dia1/oraculo.html?v=3
5) Se a app já estava instalada no iPhone, apague o atalho e volte a "Adicionar ao Ecrã Principal".

Personalização:
- Acrescentar mensagens: edite `oraculo.json` (array JSON). A página lerá automaticamente.
- Se o cache ficar teimoso, incremente a versão no URL (?v=8/3) ou no `CACHE` do sw.js.
