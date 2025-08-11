# Patch: voltar do Oráculo mostra sempre o Dia 1 completo

## O que faz
- Força o **reload** do `index-fase2.html` sempre que voltas do Oráculo pelo botão *Voltar* (corrige o problema do Safari/iOS que guarda um DOM parcial no Back/Forward Cache).
- Mantém tudo como está visualmente.

## Como aplicar
1. Faça upload destes ficheiros para a raiz do repositório `entre-mundos-dia1`:
   - `app-fix-back-forward.js`
   - `oraculo.html` (com o botão Voltar a apontar para `index-fase2.html?v=31`)
2. Abra o ficheiro `index-fase2.html` e **adicione esta linha antes de `</body>`**:

```html
<script src="app-fix-back-forward.js?v=31"></script>
```

3. Commit. Depois testa em:
   `https://19800925.github.io/entre-mundos-dia1/index-fase2.html?v=31`

> Dica: se ainda vires a versão antiga, limpa a cache do Safari
> (Definições › Safari › Avançadas › Dados dos sites › apaga `github.io`) ou usa
> uma query diferente `?v=31` para obrigar o refresh.
