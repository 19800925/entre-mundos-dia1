# Entre Mundos — Oráculo (backup seguro)

Este pacote é uma cópia **estável** da tua app, com o oráculo a ler frases de `assets/messages.json`.
- Se o ficheiro existir, é usado.
- Se falhar, usa um conjunto interno de emergência (5 frases).

## Como colocar 1000 mensagens (sem alterar o layout)

1) Abre `assets/messages.json` e substitui o conteúdo por uma _lista JSON_ com as tuas 1000 frases, por exemplo:
```json
[
  "Confia no que sentes quando tudo silencia.",
  "És casa antes de qualquer caminho.",
  "... demais ..."
]
```
> **Atenção:** Sem números à frente; uma string por linha; mantém as aspas.

2) Sobe **apenas** `assets/messages.json` para o GitHub (ou para o teu servidor).  
   O layout não muda porque **nenhum** CSS/HTML foi alterado.

3) O botão **Nova mensagem** já evita repetições: não repete até percorrer todas as frases.

## Dica de versão
Cria uma _tag_ no GitHub (ex.: `v1.0-estavel`) antes de publicar as 1000 frases.
Assim consegues voltar a esta versão em 1 clique.

— Feito com verdade 💙