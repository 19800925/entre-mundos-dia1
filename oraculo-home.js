// oraculo-home.js — injeta o bloco do Oráculo logo após “Mensagem de hoje”
(function(){
  const PICK = () => Math.floor(Math.random()*messages.length);
  let messages = [];
  let currentIdx = -1;

  function findMessageCard(){
    // tenta encontrar o card da “Mensagem de hoje”
    const allCards = document.querySelectorAll('*');
    for (const el of allCards){
      const txt = (el.innerText||'').trim();
      if (!txt) continue;
      if (/^Mensagem de hoje\s*—/i.test(txt) || txt.includes('Mensagem de hoje')){
        // sobe até um container com borda/raio (heurística)
        let node = el;
        for (let i=0;i<3;i++){
          if (!node.parentElement) break;
          node = node.parentElement;
          const cs = getComputedStyle(node);
          if ((cs.borderRadius && parseFloat(cs.borderRadius)>8) || cs.boxShadow){
            return node;
          }
        }
        return el;
      }
    }
    return null;
  }

  function createCard(){
    const card = document.createElement('section');
    card.id = 'oraculo-home-card';
    card.innerHTML = `
      <div class="oh-title">Oráculo — Entre Mundos</div>
      <div class="oh-msg" id="oh-msg">Toca em “Nova mensagem”.</div>
      <div class="oh-actions">
        <button class="oh-btn" id="oh-new">Nova mensagem</button>
        <button class="oh-btn secondary" id="oh-share">Partilhar no WhatsApp</button>
      </div>
    `;
    return card;
  }

  function renderMessage(idx){
    currentIdx = idx;
    const el = document.getElementById('oh-msg');
    if (!el) return;
    const raw = messages[idx] || '';
    const clean = String(raw).replace(/\s*\(\d+\)\s*$/, ''); // tira números finais ex. (94)
    el.textContent = clean;
  }

  function pickNew(){
    if (!messages.length) return;
    let idx = PICK();
    if (messages.length>1 && idx===currentIdx) idx = (idx+1)%messages.length;
    renderMessage(idx);
  }

  function shareWhatsApp(){
    const el = document.getElementById('oh-msg');
    const text = (el?.textContent||'').trim();
    if (!text) return;
    const url = 'https://api.whatsapp.com/send?text=' + encodeURIComponent(text + ' — Entre Mundos');
    window.open(url, '_blank');
  }

  async function init(){
    const anchor = findMessageCard();
    if (!anchor) return; // não faz nada se não encontrar
    // cria card e insere abaixo do anchor
    const card = createCard();
    anchor.insertAdjacentElement('afterend', card);

    // listeners
    card.querySelector('#oh-new')?.addEventListener('click', pickNew);
    card.querySelector('#oh-share')?.addEventListener('click', shareWhatsApp);

    try{
      const res = await fetch('oraculo.json?v=' + Date.now());
      messages = await res.json();
      // remove vazios e normaliza
      messages = (messages||[]).map(x=>String(x||'').trim()).filter(Boolean);
      pickNew();
    }catch(e){
      console.warn('oraculo-home: não foi possível carregar oraculo.json', e);
    }
  }

  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  }else{
    init();
  }
})();
