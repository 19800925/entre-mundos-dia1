# Patch — Oráculo inline na Home

Este patch coloca o **Oráculo** logo abaixo de “Mensagem de hoje”, com frases **aleatórias**, **sem números**, e botões **Nova mensagem**, **Copiar** e **Partilhar no WhatsApp** (ícone branco).

## Como aplicar (2 minutos)

1) **Carrega os ficheiros** deste patch para a raiz do teu repositório (GitHub → Add file → Upload):
   - `oraculo-inline.css`
   - `oraculo-inline.js`
   - `assets/wa-white.svg` (ícone)
   - (mantém o teu `oraculo.json` na raiz — o script lê automaticamente).

2) **Abre o teu `index.html`** e, logo **abaixo** do bloco da **Mensagem de hoje**, cola este placeholder:

```html
<!-- COLOCA isto logo ABAIXO da carta “Mensagem de hoje” -->
<div id="oraculo-inline"></div>
<!-- FIM do placeholder do Oráculo -->

<!-- IMPORTA os ficheiros do Oráculo (de preferência perto do fim do body) -->
<link rel="stylesheet" href="oraculo-inline.css">
<script src="oraculo-inline.js" defer></script>
```

> Se já tens um `<div id="oraculo-inline"></div>` noutro sítio, não duplica — move-o para logo abaixo da Mensagem de hoje.

3) Publica o site e abre com `?v=inline2` para forçar refresh do cache:
```
https://…/index.html?v=inline2
```

### Notas
- O script remove sufixos numéricos do tipo `(94)` nas frases.
- Evita repetição imediata (se a próxima aleatória sair igual, salta para a seguinte).
- Se o WhatsApp não abrir, a frase já fica copiada — é só colar.

Bom trabalho! 💙