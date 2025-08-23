/*! Entre Mundos — Favoritos do Oráculo (v1.1)
    - Não altera layout existente
    - Adiciona botão ⭐ Guardar junto aos botões do Oráculo
    - Cria aba "Favoritos" e secção correspondente sem partir as abas atuais
    - Guarda em localStorage (entreMundos.favs.v1)
*/
(function(){
  const $ = (s,root=document)=>root.querySelector(s);
  const $$ = (s,root=document)=>Array.from(root.querySelectorAll(s));

  // 1) Descobrir elementos do Oráculo já existentes
  const elText = $('#oracleMsg, #oracleText, #oracle-msg, #oracle_text');
  const btnNova = $('#btnNova, #btnNovaMensagem, #oracle-new, #btn-oraculo-nova');
  const btnCopiar = $('#btnCopiar, #oracle-copy, #btn-oraculo-copiar');
  const btnWhats = $('#btnWhats, #oracle-wa, #btn-oraculo-wa');

  if (!elText || !btnNova) { console.warn('[Favoritos] Oráculo não encontrado; abort.'); return; }

  // 2) Criar botão "⭐ Guardar" se ainda não existir
  let btnFav = $('#btnFav');
  if (!btnFav) {
    btnFav = document.createElement('button');
    btnFav.id = 'btnFav';
    btnFav.type = 'button';
    btnFav.textContent = '⭐ Guardar';
    btnFav.style.marginLeft = '0';
    // inserir depois do botão Whats se houver, senão depois do Nova
    const row = btnWhats?.parentElement || btnNova.parentElement;
    row?.appendChild(btnFav);
  }

  // 3) Criar aba "Favoritos" + secção, se não existirem
  const nav = $('nav');
  let chipFav = $$('nav .chip').find(c => c.textContent.trim().toLowerCase() === 'favoritos');
  if (!chipFav && nav) {
    chipFav = document.createElement('div');
    chipFav.className = 'chip';
    chipFav.textContent = 'Favoritos';
    chipFav.setAttribute('role','button');
    chipFav.setAttribute('tabindex','0');
    chipFav.dataset.tab = 'tabFavoritos';
    nav.appendChild(chipFav);
  }
  let secFav = $('#tabFavoritos');
  if (!secFav) {
    secFav = document.createElement('section');
    secFav.className = 'card';
    secFav.id = 'tabFavoritos';
    secFav.style.display = 'none';
    secFav.innerHTML = `
      <h2>Favoritos</h2>
      <div id="favList" aria-live="polite"></div>
      <div class="note">
        <span class="muted-link" id="btnClearAll" role="button" tabindex="0">Limpar todos</span>
      </div>`;
    // inserir antes do footer
    const footer = $('footer');
    footer?.parentNode?.insertBefore(secFav, footer);
  }

  // 4) Helper para mostrar uma secção (respeitando o silêncio)
  function showSection(id){
    $$('.card').forEach(sec => sec.style.display = 'none');
    const show = document.getElementById(id);
    if (show) show.style.display = 'block';
    const orac = $('#cardOraculo');
    if (orac) orac.style.display = (id === 'tabSilencio') ? 'none' : 'block';
  }

  // 5) Ligar chip dos Favoritos sem mexer nos outros
  if (chipFav) {
    chipFav.addEventListener('click', ()=>{ showSection('tabFavoritos'); renderFavs(); });
    chipFav.addEventListener('keydown', (e)=>{
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); showSection('tabFavoritos'); renderFavs(); }
    });
  }

  /* ===== Favoritos (localStorage) ===== */
  const LS_KEY = 'entreMundos.favs.v1';
  function getFavs(){ try{ return JSON.parse(localStorage.getItem(LS_KEY)||'[]'); } catch { return []; } }
  function setFavs(arr){ localStorage.setItem(LS_KEY, JSON.stringify(arr.slice(0,1000))); }
  function isFav(txt){ const t=(txt||'').trim(); return getFavs().some(x=>x===t); }
  function escapeHtml(s){ return s.replace(/[&<>"]/g, m=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m])); }

  function renderFavs(){
    const box = $('#favList');
    if (!box) return;
    const favs = getFavs();
    if (!favs.length) {
      box.innerHTML = '<p class="fav-empty">Ainda não tens favoritos. Guarda frases com o botão ⭐ no Oráculo.</p>';
      return;
    }
    box.innerHTML = favs.map(t => `
      <div class="fav-item">
        <div class="fav-text">${escapeHtml(t)}</div>
        <button class="secondary" data-rm="${encodeURIComponent(t)}">Remover</button>
      </div>`).join('');
    $$('#favList button[data-rm]').forEach(b => {
      b.addEventListener('click', ()=> {
        const txt = decodeURIComponent(b.dataset.rm||'');
        const next = getFavs().filter(x => x !== txt);
        setFavs(next); renderFavs(); updateFavButtonState();
      });
    });
  }
  function updateFavButtonState(){
    const t=(elText.textContent||'').trim();
    if(!t){ btnFav.disabled=true; btnFav.textContent='⭐ Guardar'; return; }
    btnFav.disabled=false;
    btnFav.textContent = isFav(t) ? '★ Guardado' : '⭐ Guardar';
  }

  btnFav.addEventListener('click', ()=>{
    const t=(elText.textContent||'').trim(); if(!t) return;
    if (isFav(t)) return;
    const favs = getFavs();
    favs.unshift(t); setFavs(favs);
    updateFavButtonState();
  });

  // 6) Tenta atualizar o estado do botão quando a frase mudar
  const obs = new MutationObserver(()=> updateFavButtonState());
  obs.observe(elText, {childList:true, subtree:true, characterData:true});
  updateFavButtonState();

  // 7) Ligar "Limpar todos"
  document.addEventListener('click', (e)=>{
    const clear = e.target.closest && e.target.closest('#btnClearAll');
    if (clear) {
      if (confirm('Limpar todos os favoritos?')){
        setFavs([]); renderFavs(); updateFavButtonState();
      }
    }
  });

})();