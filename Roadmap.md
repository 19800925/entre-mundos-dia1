# Entre Mundos — Roadmap v1.1

Estado atual: **v1.0 Base Estável**
- Oráculo com **509** frases (offline)
- Respiração funcional (exercício guiado)
- Layout azul-base (cartões, chips, botão WA)
- Repositório limpo de duplicados

---

## Objetivos v1.1 (curto prazo)

### 1) Oráculo
- [ ] Ajustar o gerador para **variação extra** (menos repetições semanticamente próximas)
- [ ] Permitir **categoria opcional** (e.g., “acolhimento”, “coragem”, “silêncio”)
- [ ] Botão **“Guardar nos favoritos”** (armazenar localmente com `localStorage`)
- [ ] Vista **Favoritos** (lista simples, copiar/partilhar e remover)
- [ ] Telemetria local simples (apenas contagem de cliques “Nova mensagem” – sem tracking externo)

**Aceitação**
- Deck mínimo 509 itens, sem mostrar números.
- Favoritos persistem entre sessões (localStorage).
- Zero impacto no layout atual.

---

### 2) Respiração
- [ ] Três modos: **Box (4–4–4–4)**, **Alongada (4–4–6)** e **Círculo 4–7–8**
- [ ] Indicador visual suave (círculo/anel) com animação CSS apenas
- [ ] **Contagem silenciosa** acessível (aria-live off por defeito; toggle “usar contagem sonora” no futuro)
- [ ] Botões: Iniciar / Pausar / Reiniciar

**Aceitação**
- Funciona em Safari iOS/Android sem gaguejar.
- Animações CSS **sem** forçar reflow pesado; 60fps na maioria dos equipamentos.

---

### 3) Visual & UX
- [ ] Pequenos refinamentos: espaçamentos responsivos e contraste de botões secundários
- [ ] **Modo Alto-contraste** (toggle) sem alterar identidade
- [ ] Micro-transições (hover/focus/active) nos chips/btns

**Aceitação**
- Lighthouse ≥ 95 em Acessibilidade e Best Practices.
- Nenhuma regressão do layout.

---

### 4) Sons (opcional e discreto)
- [ ] “Ping” muito suave para marcar **inspira/expira** (muted por defeito)
- [ ] Respeitar `prefers-reduced-motion` e mute global do sistema
- [ ] Pré-carregamento leve e sem bloqueio

**Aceitação**
- Zero erros de autoplay no iOS (som só após interação).
- Toggle persistente (localStorage).

---

### 5) Estrutura Técnica
- [ ] `index.html` continua **único ponto** (sem frameworks)
- [ ] JS modular leve: `oraculo.js`, `respiracao.js`, `app.js`
- [ ] **Sem dependências externas** (CDNs)
- [ ] Lint básico (ES2020) e formatação consistente
- [ ] `ROADMAP.md` + `CHANGELOG.md` a partir desta versão

---

## Plano de Entrega (proposto)

1. **1.1-alpha**  
   - Oráculo: favoritos + variação extra  
   - Respiração: modos Box/Alongada/4-7-8 (sem som)  
2. **1.1-beta**  
   - Sons opcionais + toggle  
   - Alto-contraste + refinamentos visuais  
3. **1.1-final**  
   - Otimizações de performance + limpeza de código  
   - Changelog e nota de release

---

## Tarefas técnicas (detalhe)

### Oráculo
- [ ] `oraculo.js`: adicionar `Favoritos` (API)
  ```js
  const Fav = {
    key: 'em_favs',
    all(){ try{ return JSON.parse(localStorage.getItem(this.key)||'[]'); } catch{ return []; } },
    add(t){ const a=this.all(); if(!a.includes(t)) a.push(t); localStorage.setItem(this.key, JSON.stringify(a)); },
    del(t){ const a=this.all().filter(x=>x!==t); localStorage.setItem(this.key, JSON.stringify(a)); }
  };
