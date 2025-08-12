// app.js
(() => {
  // Tabs
  const tabs = document.querySelectorAll('.tab');
  const sections = document.querySelectorAll('[data-section]');
  function activate(targetId){
    sections.forEach(s => s.hidden = s.id !== targetId);
    tabs.forEach(b => b.classList.toggle('is-active', b.dataset.target === targetId));
  }
  tabs.forEach(b => b.addEventListener('click', () => activate(b.dataset.target)));
  // default
  activate('sec-mensagem');

  // Oracle messages (random, no numbers, no repeats within a session)
  const messages = [
    "A tua luz guia-te no silêncio.",
    "Confia no tempo divino, ele nunca se atrasa.",
    "Segue o brilho que só tu vês. Hoje é o dia.",
    "A vida fala em sinais; aprende a escutar.",
    "O mar dentro de ti conhece o caminho."
  ];
  let pool = shuffle([...messages]);
  const oracleText = document.getElementById('oracleText');
  document.getElementById('btnNova').addEventListener('click', () => {
    if (pool.length === 0) pool = shuffle([...messages]);
    oracleText.textContent = pool.pop();
  });
  document.getElementById('btnCopiar').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(oracleText.textContent.trim());
      flash('Copiado!');
    } catch(e){ alert('Não foi possível copiar.'); }
  });
  document.getElementById('btnWhats').addEventListener('click', () => {
    const txt = encodeURIComponent(oracleText.textContent.trim());
    const url = `https://wa.me/?text=${txt}`;
    window.location.href = url;
  });
  function shuffle(a){
    for (let i=a.length-1;i>0;i--){ const j = Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; }
    return a;
  }
  function flash(msg){
    const el = document.createElement('div');
    el.textContent = msg;
    el.style.position='fixed'; el.style.bottom='24px'; el.style.left='50%'; el.style.transform='translateX(-50%)';
    el.style.background='rgba(0,0,0,.7)'; el.style.color='#fff'; el.style.padding='10px 14px'; el.style.borderRadius='10px';
    el.style.zIndex=9999; document.body.appendChild(el);
    setTimeout(()=>el.remove(),1200);
  }

  // Breathing bubble 4-4-4-4
  const bubble = document.getElementById('bubble');
  const phaseEl = document.getElementById('phase');
  const startBtn = document.getElementById('breathStart');
  const stopBtn = document.getElementById('breathStop');
  let timer = null, running = false;
  const phases = [
    {name:'Inspira…', scale:1.3, sec:4},
    {name:'Sustém…', scale:1.3, sec:4},
    {name:'Expira…', scale:0.9, sec:4},
    {name:'Pausa…', scale:0.9, sec:4},
  ];
  function runCycle(i=0){
    if(!running) return;
    const p = phases[i];
    phaseEl.textContent = p.name;
    bubble.style.transform = `scale(${p.scale})`;
    bubble.style.filter = p.scale>1 ? 'saturate(1.1) brightness(1.05)' : 'saturate(0.9) brightness(0.95)';
    timer = setTimeout(()=> runCycle((i+1)%phases.length), p.sec*1000);
  }
  startBtn.addEventListener('click', ()=>{
    if(running) return;
    running = true; runCycle(0);
  });
  stopBtn.addEventListener('click', ()=>{
    running = false; clearTimeout(timer);
    phaseEl.textContent = 'Preparar…';
    bubble.style.transform='scale(1)';
    bubble.style.filter='';
  });
})();