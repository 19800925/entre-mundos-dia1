PATCH: Oráculo na Página Inicial — Entre Mundos

O que vem neste patch
- oraculo-home.js    → injeta o bloco do Oráculo por baixo da “Mensagem de hoje” automaticamente
- oraculo-home.css   → estilos do bloco para combinar com o teu tema (azul cósmico)
- RESTORE.txt        → como voltar atrás (sem mexer no resto)
- PREVIEW.png        → mockup rápido do aspeto (referência)

Como aplicar (GitHub pelo telemóvel)
1) Entra no repositório (ramo main).
2) Toca em “Add file” → “Upload files” e envia: oraculo-home.js e oraculo-home.css (e podes enviar tudo do ZIP).
3) Commit (“Adicionar Oráculo na home”).

Não precisas editar o index.html.
O script vai:
- esperar pelo DOM;
- procurar a primeira “card” que contenha o título “Mensagem de hoje”;
- inserir logo a seguir o bloco do Oráculo;
- carregar as frases de “oraculo.json” (já existente no teu repo);
- mostrar uma frase aleatória (sem numeração);
- ter botões “Nova mensagem” e “Partilhar no WhatsApp”.

Se quiseres remover temporariamente:
- Apaga oraculo-home.js (ou renomeia para oraculo-home.js.off) e faz commit.
- Ou apaga oraculo-home.css também para limpar os estilos.

Dica de cache (iPhone/Safari):
- Se não vires a mudança, força “limpar cache” com o sufixo ?v=XYZ no URL (ex.: index.html?v=99) ou recarrega com o botão de recarregar.
