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
    document.getElementById('tab-'+key).classList.add('is-active');
    Object.keys(sections).forEach(k => {
      sections[k].classList.toggle('is-hidden', k!==key);
    });
    // Guardar última aba
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
  const ORACLE_URL = 'assets/messages.json?v=1';
let frases = [
  "Segue o brilho que só tu vês. Hoje é o dia.",
  "Confia no tempo divino, ele nunca se atrasa.",
  "A tua luz guia-te no silêncio.",
  "Tudo o que procuras também te procura.",
  "Abre espaço: o novo precisa de ar."
];
async function loadOracle(){
  try{
    const r = await fetch(ORACLE_URL, {cache:'no-store'});
    if(r.ok){
      const arr = await r.json();
      if (Array.isArray(arr) && arr.length){
        frases = arr.filter(s => typeof s === 'string' && s.trim().length).map(s=>s.trim());
      }
    }
  }catch(e){/* fallback to seed */}
}
loadOracle();
// Sacola embaralhada para evitar repetição até esgotar
let _bag = [];
function shuffle(a){ for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; }
function nextMsg(){
  if (!_bag.length) _bag = shuffle(frases.slice());
  return _bag.pop();
}
  const elText = document.getElementById('oracle-text');
  document.getElementById('btn-oracle').addEventListener('click', ()=>{
    const n = Math.floor(Math.random()*frases.length);
    elText.textContent = frases[n];
  });
  document.getElementById('btn-copy').addEventListener('click', async ()=>{
    try{ await navigator.clipboard.writeText(elText.textContent.trim()); }catch(e){}
  });
  document.getElementById('btn-share').addEventListener('click', ()=>{
    const msg = elText.textContent.trim();
    const url = 'https://wa.me/?text=' + encodeURIComponent(msg);
    window.location.href = url;
  });

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
    const start = performance.now();
    const from = parseFloat(getComputedStyle(ball).getPropertyValue('--_scale')||1) || parseFloat(ball.style.transform.replace('scale(','').replace(')','')) || 1;
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
  btnStop .addEventListener('click', stop);

  // Segurança: evitar regressar com BFCache mostrando layout antigo
  window.addEventListener('pageshow', (e)=>{
    if(e.persisted){ window.location.reload(); }
  });
})();