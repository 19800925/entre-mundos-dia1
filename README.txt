Oráculo Entre Mundos — Pacote V2
================================
Ficheiros:
- oraculo.html  → página do oráculo (carrega mensagens de oraculo.json; tem fallback)
- oraculo.json  → lista de mensagens (podes editar e acrescentar à vontade)

Como publicar:
1) No GitHub (repo entre-mundos-dia1): Add file → Upload files → carrega oraculo.html e oraculo.json (na raiz).
2) Commit.
3) Testar: https://19800925.github.io/entre-mundos-dia1/oraculo.html?v=2

Como acrescentar mensagens:
- Edita o ficheiro oraculo.json (é um array JSON). Exemplo:
  [
    "Mensagem 1",
    "Mensagem 2",
    "Mensagem 3"
  ]
- Guarda/Commit. O oráculo vai usar a nova lista automaticamente.
- Se tiver cache teimoso, abre com ?v=2 no fim do URL para forçar refresh.

Funciona offline?
- Sim, quando a página já tiver sido aberta uma vez. Se quiseres garantir cache total,
  adiciona 'oraculo.html' e 'oraculo.json' ao array ASSETS do teu sw.js.
