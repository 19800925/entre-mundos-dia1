// app.js — patch robusto p/ abas + oráculo + respiração
(function(){
  // -------- Helpers
  const $ = (sel, ctx=document) => ctx.querySelector(sel);
  const $$ = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));

  // -------- Abas (tabs)
  function setupTabs(){
    const tabs = $$('.tab');
    const sections = {
      mensagem: $('#sec-mensagem'),
      respiracao: $('#sec-respiracao'),
      frase: $('#sec-frase'),
      silencio: $('#sec-silencio'),
    };
    function activate(key){
      tabs.forEach(t=>t.classList.remove('is-active'));
      const active = $('#tab-'+key);
      if(active){ active.classList.add('is-active'); }
      Object.keys(sections).forEach(k => {
        if(sections[k]) sections[k].classList.toggle('is-hidden', k!==key);
      });
      try{ localStorage.setItem('em:lastTab', key); }catch(_){}
    }
    tabs.forEach(btn=>btn.addEventListener('click', ()=>{
      const key = btn.id.replace('tab-','');
      activate(key);
    }));
    // restaurar última aba
    let last = null;
    try{ last = localStorage.getItem('em:lastTab'); }catch(_){}
    if(last && sections[last]) activate(last); else activate('mensagem');
  }

  // -------- Oráculo (delegation para resistir ao bfcache)
  function setupOracle(){
    const frases = [
      "Segue o brilho que só tu vês. Hoje é o dia.",
      "Confia no tempo divino, ele nunca se atrasa.",
      "A tua luz guia-te no silêncio.",
      "Tudo o que procuras também te procura.",
      "Abre espaço: o novo precisa de ar."
    ];
    const elText = $('#oracle-text');
    if (!elText) return;

    function nova(){
      const n = Math.floor(Math.random()*frases.length);
      elText.textContent = frases[n];
    }
    async function copiar(){
      const txt = (elText.textContent||'').trim();
      try{
        if(navigator.clipboard && navigator.clipboard.writeText){
          await navigator.clipboard.writeText(txt);
        }else{
          const ta = document.createElement('textarea');
          ta.value = txt; document.body.appendChild(ta); ta.select();
          document.execCommand('copy'); ta.remove();
        }
      }catch(_){}
    }
    function partilhar(){
      const txt = (elText.textContent||'').trim();
      if (navigator.share){
        navigator.share({text: txt}).catch(()=>{});
      }else{
        const url = 'https://wa.me/?text=' + encodeURIComponent(txt);
        window.location.href = url;
      }
    }
    // listeners resilientes (delegation)
    document.addEventListener('click', (ev)=>{
      const t = ev.target.closest('#btn-oracle, #btn-copy, #btn-share');
      if(!t) return;
      if(t.id==='btn-oracle') nova();
      if(t.id==='btn-copy') copiar();
      if(t.id==='btn-share') partilhar();
    });
  }

  // -------- Respiração 4•4•4•4 (balão)
  function setupBreath(){
    const statusEl = $('#breathStatus');
    const ball = $('#ball');
    const btnStart = $('#btn-start');
    const btnStop  = $('#btn-stop');
    if(!(statusEl && ball && btnStart && btnStop)) return;

    let timer = null;
    const DUR = 4000;
    const stages = [
      {label:'Inspira...',  scale:1.25},
      {label:'Sustém...',   scale:1.25},
      {label:'Expira...',   scale:0.85},
      {label:'Pausa...',    scale:0.85},
    ];
    function animateScale(target, ms){
      const start = performance.now();
      const cur = parseFloat(ball.style.transform.replace('scale(','').replace(')','')) || 0.85;
      const to = target;
      function frame(t){
        const k = Math.min(1, (t-start)/ms);
        const val = cur + (to - cur) * k;
        ball.style.transform = `scale(${val})`;
        if(k<1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    }
    function loop(i=0){
      const s = stages[i%stages.length];
      statusEl.textContent = s.label;
      animateScale(s.scale, DUR);
      timer = setTimeout(()=> loop(i+1), DUR);
    }
    function stop(){
      clearTimeout(timer); timer=null;
      statusEl.textContent = 'Preparar...';
      ball.style.transform = 'scale(0.85)';
    }
    btnStart.addEventListener('click', ()=>{ if(!timer) loop(0); });
    btnStop.addEventListener('click', stop);
  }

  // -------- Inicialização (também após bfcache)
  function init(){
    setupTabs();
    setupOracle();
    setupBreath();
  }
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  }else{
    init();
  }
  window.addEventListener('pageshow', (e)=>{
    if(e.persisted){ init(); }
  });
})();