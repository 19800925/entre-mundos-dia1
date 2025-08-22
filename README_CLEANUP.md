# Entre Mundos — Repo Cleanup Kit (seguro)
Este kit NÃO apaga ficheiros — **apenas move** os desnecessários para a pasta `_archive/`.
Podes reverter tudo correndo `restore.sh`.

## O que fica ativo (mantém na raiz)
- index.html  (o teu atual)
- app.js
- tabs-hotfix.js   (usar só 1 ficheiro de abas)
- oraculo.js       (versão 509 — já enviada)
- respiracao.js
- respiracao.css
- (opcional) silencio.js, silencio.css se estiverem ligados no index
- app.css OU style.css OU styles.css  (apenas 1, o que o index.html usa)
- assets/ (imagens, ícones)
- manifest.json (se usas PWA) e sw.js (se usas service worker)

## Como usar
1) Faz backup (commit) do repositório.
2) Faz upload dos ficheiros deste kit para a raiz do repositório.
3) Abre um terminal (Codespaces, local ou GitHub Desktop) e corre:
   bash archive_unused.sh
4) Faz commit das alterações (ficheiros movidos para `_archive/`).

Se precisares de reverter:
   bash restore.sh
