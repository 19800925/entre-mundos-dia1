# EMERGENCY FIX v33 — Nada está a funcionar (GitHub Pages / iOS cache)

Este patch dá-te **três botões vermelhos** para recuperar o site já, mesmo com caches presos no iOS/Safari.

---

## 1) Redireciono o `index.html` para a versão mais nova

Incluo um `index.html` super simples que faz **redirect imediato** para `index-fase2.html?v=33`.
> Usa quando o teu `index.html` atual ficou preso em cache ou está a mostrar uma versão antiga.

**Como usar:**
1. Faz upload de `index.html` (substitui o teu).
2. Commit.
3. Abre: `https://SEU_USER.github.io/SEU_REPO/` — ele vai saltar para `index-fase2.html?v=33`.

Se quiseres apontar para outra página, edita o arquivo e muda a URL.

---

## 2) Desativar/limpar o Service Worker (SW)

Incluo `sw-nuke.js` que **desregista** qualquer SW ativo e limpa caches.

**Como usar (temporariamente):**
1. No arquivo `index-fase2.html` (ou em qualquer página que abras primeiro),
   adiciona **antes de `</body>`**:
   ```html
   <script src="sw-nuke.js?v=33"></script>
   ```
2. Abre a página uma vez.
3. Depois de o site voltar ao normal, REMOVE esta linha do HTML.

---

## 3) Forçar recarregamento ao voltar (bfcache fix)

Se ainda não aplicaste, também podes manter o `app-bfcache-fix.js` do patch anterior.
Adiciona:
```html
<script src="app-bfcache-fix.js?v=33"></script>
```
(Se não tiveres esse ficheiro, avisa que eu reenvio.)

---

## Ordem recomendada (rápida)

1) Substitui o `index.html` pelo deste patch (redirect).  
2) Adiciona `<script src="sw-nuke.js?v=33"></script>` no `index-fase2.html` e faz commit.  
3) Abre o site com `?v=33` (ex.: `index-fase2.html?v=33`).  
4) Testa voltar do Oráculo → menu.  
5) Se tudo OK, remove a linha do `sw-nuke.js` e faz novo commit.

Se ainda assim não regressar, diz-me e eu preparo um patch já com `index-fase2.html` completo a apontar para os teus ficheiros.

—