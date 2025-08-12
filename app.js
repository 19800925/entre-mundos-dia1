// app.js — Entre Mundos (abas + oráculo + respiração)
(function(){
  // ----- Tabs -----
  const tabs = document.querySelectorAll('.tab');
  const sections = {
    mensagem: document.getElementById('sec-mensagem'),
    respiracao: document.getElementById('sec-respiracao'),
    frase: document.getElementById('sec-frase'),
    silencio: document.getElementById('sec-silencio')
  };
  function activate(key){
    tabs.forEach(t=>t.classList.remove('is-active'));
    const activeTab = document.getElementById('tab-'+key);
    if(activeTab) activeTab.classList.add('is-active');
    Object.keys(sections).forEach(k => {
      if(sections[k]) sections[k].classList.toggle('is-hidden', k!==key);
    });
    try{ localStorage.setItem('em:lastTab', key); }catch(e){}
  }
  tabs.forEach(btn=>btn.addEventListener('click', ()=>{
    const key = btn.id.replace('tab-','');
    activate(key);
  }));
  // Restaurar última aba ativa
  try{
    const last = localStorage.getItem('em:lastTab');
    if (last && sections[last]) activate(last);
  }catch(e){}

  // ----- Oráculo -----
  const frases = [
    "Segue o brilho que só tu vês. Hoje é o dia.",
    "Confia no tempo divino, ele nunca se atrasa.",
    "A tua luz guia-te no silêncio.",
    "Tudo o que procuras também te procura.",
    "Abre espaço: o novo precisa de ar."
  ];
  const elText = document.getElementById('oracle-text');
  const btnOracle = document.getElementById('btn-oracle');
  if(btnOracle){
    btnOracle.addEventListener('click', ()=>{
      const n = Math.floor(Math.random()*frases.length);
      elText.textContent = frases[n];
    });
  }
  const btnCopy = document.getElementById('btn-copy');
  if(btnCopy){
    btnCopy.addEventListener('click', async ()=>{
      try{ await navigator.clipboard.writeText(elText.textContent.trim()); }catch(e){}
    });
  }
  const btnShare = document.getElementById('btn-share');
  if(btnShare){
    btnShare.addEventListener('click', ()=>{
      const msg = elText.textContent.trim();
      const url = 'https://wa.me/?text=' + encodeURIComponent(msg);
      window.location.href = url;
    });
  }

  // ----- Respiração 4-4-4-4 -----
  const statusEl = document.getElementById('breathStatus');
  const ball = document.getElementById('ball');
  const btnStart = document.getElementById('btn-start');
  const btnStop  = document.getElementById('btn-stop');

  let timer = null;
  const DUR = 4*1000; // 4s
  const stages = [
    {label:'Inspira...',  scale:1.25},
    {label:'Sustém...',   scale:1.25},
    {label:'Expira...',   scale:0.85},
    {label:'Pausa...',    scale:0.85},
  ];
  function animateScale(target, ms){
    if(!ball) return;
    const start = performance.now();
    const currentTransform = window.getComputedStyle(ball).transform;
    let from = 1;
    if(currentTransform !== 'none'){
      const m = currentTransform.split('(')[1].split(')')[0].split(',');
      // scale from matrix a value if uniform
      const a = parseFloat(m[0]); 
      from = a if 'a' else 1
    }
    const to = target;
    function frame(t){
      const k = Math.min(1, (t-start)/ms);
      const val = from + (to - from) * k;
      ball.style.transform = `scale(${val})`;
      if(k<1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }
  function loop(i=0){
    if(!statusEl || !ball) return;
    const s = stages[i%stages.length];
    statusEl.textContent = s.label;
    animateScale(s.scale, DUR);
    timer = setTimeout(()=> loop(i+1), DUR);
  }
  function stop(){
    clearTimeout(timer); timer=null;
    if(statusEl) statusEl.textContent = 'Preparar...';
    if(ball) ball.style.transform = 'scale(0.85)';
  }
  if(btnStart) btnStart.addEventListener('click', ()=>{ if(!timer) loop(0); });
  if(btnStop)  btnStop .addEventListener('click', stop);

  window.addEventListener('pageshow', (e)=>{
    if(e.persisted){ window.location.reload(); }
  });
})();