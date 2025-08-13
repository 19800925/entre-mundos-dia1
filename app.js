// app.js — Oráculo 1000 mensagens (auto-path para GitHub Pages) — v2.1
(function(){
  const $  = (s, c=document)=>c.querySelector(s);
  const $$ = (s, c=document)=>Array.from(c.querySelectorAll(s));

  // ---------- Abas (igual)
  function setupTabs(){
    const tabs = $$('.tab');
    const panels = {
      mensagem:  $('#sec-mensagem'),
      respiracao:$('#sec-respiracao'),
      frase:     $('#sec-frase'),
      silencio:  $('#sec-silencio')
    };
    function activate(key){
      tabs.forEach(t => t.classList.toggle('is-active', t.id === 'tab-'+key));
      Object.entries(panels).forEach(([k,sec])=> sec && sec.classList.toggle('is-hidden', k!==key));
      try{ localStorage.setItem('em:lastTab', key); }catch(_){}
    }
    tabs.forEach(btn=> btn.addEventListener('click', ()=> activate(btn.id.replace('tab-','')) ));
    let initial = 'mensagem';
    try{
      const last = localStorage.getItem('em:lastTab');
      if(last && panels[last]) initial = last;
    }catch(_){}
    activate(initial);
  }

  // ---------- Oráculo (1000+ via JSON externo, sem repetição até esgotar)
  function setupOracle(){
    const elText = $('#oracle-text');
    if(!elText) return;

    // Detectar base path em GitHub Pages (ex.: /utilizador/repositorio/)
    const baseEl = document.querySelector('base');
    const baseHref = baseEl ? baseEl.getAttribute('href') : null;
    const path = (baseHref || location.pathname).replace(/[^/]+$/, '');
    // Possíveis caminhos para localizar o JSON
    const candidates = [
      path + 'assets/messages.json?v=3',
      path + 'messages.json?v=3',
      '/assets/messages.json?v=3',
      '/messages.json?v=3',
      'assets/messages.json?v=3',
      'messages.json?v=3',
      'oraculo.json?v=3' // fallback de compatibilidade
    ];

    let pool = [];
    let bag  = [];
    function shuffle(a){ for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; }
    function nextMsg(){
      if(!bag.length) bag = shuffle(pool.slice());
      return bag.pop();
    }

    async function tryLoad(url){
      try{
        const res = await fetch(url, {cache:'no-store'});
        if(!res.ok) return false;
        const arr = await res.json();
        if(!Array.isArray(arr) || !arr.length) return false;
        pool = [...new Set(arr.map(s => (''+s).trim()).filter(Boolean))];
        bag = [];
        return pool.length > 0;
      }catch(_){ return false; }
    }

    async function load(){
      for(const url of candidates){
        const ok = await tryLoad(url);
        if(ok) return true;
      }
      // fallback mínimo (5 frases) se tudo falhar
      pool = [
        "Segue o brilho que só tu vês. Hoje é o dia.",
        "Confia no tempo divino; ele nunca se atrasa.",
        "A tua luz guia-te no silêncio.",
        "Tudo o que procuras também te procura.",
        "Abre espaço: o novo precisa de ar."
      ];
      bag = [];
      return false;
    }

    function bind(){
      document.addEventListener('click', (ev)=>{
        const t = ev.target.closest('#btn-oracle, #btn-copy, #btn-share');
        if(!t) return;
        if(t.id==='btn-oracle'){
          const msg = nextMsg();
          if(msg) elText.textContent = msg;
        }
        if(t.id==='btn-copy'){
          const txt = (elText.textContent||'').trim(); if(!txt) return;
          if(navigator.clipboard?.writeText){ navigator.clipboard.writeText(txt).catch(()=>{}); }
          else {
            const ta = document.createElement('textarea'); ta.value = txt;
            document.body.appendChild(ta); ta.select(); try{ document.execCommand('copy'); }catch(_){}
            document.body.removeChild(ta);
          }
        }
        if(t.id==='btn-share'){
          const txt = (elText.textContent||'').trim(); if(!txt) return;
          if(navigator.share){ navigator.share({text: txt}).catch(()=>{}); }
          else { location.href = 'https://wa.me/?text=' + encodeURIComponent(txt); }
        }
      });
    }

    bind();
    load();
  }

  // ---------- Respiração (mantida)
  function setupBreath(){
    const lbl = $('#breathStatus');
    const ball = $('#ball');
    const start = $('#btn-start');
    const stop  = $('#btn-stop');
    if(!(lbl && ball && start && stop)) return;

    let timer = null;
    const DUR = 4000;
    const stages = [
      {label:'Inspira...',  scale:1.25},
      {label:'Sustém...',   scale:1.25},
      {label:'Expira...',   scale:0.85},
      {label:'Pausa...',    scale:0.85},
    ];
    function animateScale(target, ms){
      const startTime = performance.now();
      const current = parseFloat(ball.style.transform.replace('scale(','').replace(')','')) || 0.85;
      function frame(t){
        const k = Math.min(1, (t-startTime)/ms);
        const val = current + (target - current) * k;
        ball.style.transform = `scale(${val})`;
        if(k<1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    }
    function loop(i=0){
      const s = stages[i%stages.length];
      lbl.textContent = s.label;
      animateScale(s.scale, DUR);
      timer = setTimeout(()=> loop(i+1), DUR);
    }
    function halt(){
      clearTimeout(timer); timer=null;
      lbl.textContent = 'Preparar...';
      ball.style.transform = 'scale(0.85)';
    }
    start.addEventListener('click', ()=>{ if(!timer) loop(0); });
    stop .addEventListener('click', halt);
  }

  function init(){ setupTabs(); setupOracle(); setupBreath(); }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
  window.addEventListener('pageshow', (e)=>{ if(e.persisted){ init(); } });
})();