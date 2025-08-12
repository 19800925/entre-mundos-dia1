// Entre Mundos — app.js (tabs + respiração + silêncio + oráculo demo)

// ---------- Tabs ----------
(function setupTabs(){
  const tabs = document.querySelectorAll('[data-tab]');
  const sections = document.querySelectorAll('[data-section]');
  function show(section){
    sections.forEach(s => {
      if (s.getAttribute('data-section') === section) s.removeAttribute('hidden');
      else s.setAttribute('hidden', '');
    });
    tabs.forEach(t => {
      const active = t.getAttribute('data-tab') === section;
      t.classList.toggle('active', active);
      t.setAttribute('aria-selected', active ? 'true' : 'false');
    });
  }
  tabs.forEach(t => t.addEventListener('click', () => show(t.getAttribute('data-tab'))));
  show('mensagem');
})();

// ---------- Respiração 4·4·4·4 ----------
(function breathModule(){
  const stageEl = document.getElementById('breathStage');
  const timerEl = document.getElementById('breathTimer');
  const btnStart = document.getElementById('breathStart');
  const btnStop  = document.getElementById('breathStop');
  if(!stageEl || !timerEl || !btnStart || !btnStop) return;

  const stages = [
    { name: 'Inspira', seconds: 4 },
    { name: 'Sustém', seconds: 4 },
    { name: 'Expira', seconds: 4 },
    { name: 'Pausa', seconds: 4 },
  ];

  let interval = null;
  let sIdx = 0;
  let left = stages[0].seconds;

  function render(){
    stageEl.textContent = stages[sIdx].name;
    timerEl.textContent = String(left).padStart(2, '0');
  }
  function tick(){
    left--;
    if (left <= 0) {
      sIdx = (sIdx + 1) % stages.length;
      left = stages[sIdx].seconds;
    }
    render();
  }
  function start(){
    if(interval) return;
    sIdx = 0; left = stages[0].seconds;
    render();
    interval = setInterval(tick, 1000);
  }
  function stop(){
    clearInterval(interval); interval = null;
    stageEl.textContent = 'Preparar…';
    timerEl.textContent = '00';
  }
  btnStart.addEventListener('click', start);
  btnStop.addEventListener('click', stop);
})();

// ---------- Silêncio (temporizador MM:SS) ----------
(function silenceModule(){
  const input  = document.getElementById('silencioInput');
  const clock  = document.getElementById('silencioClock');
  const startB = document.getElementById('silencioStart');
  const stopB  = document.getElementById('silencioStop');
  if(!input || !clock || !startB || !stopB) return;

  let total = 60; // 1 min
  let left  = total;
  let timer = null;

  function fmt(s){
    const m = Math.floor(s/60);
    const r = s % 60;
    return `${String(m).padStart(2,'0')}:${String(r).padStart(2,'0')}`;
  }
  function render(){ clock.textContent = fmt(left); }
  function setMinutes(min){
    const n = Math.max(1, parseInt(min,10) || 1);
    total = n * 60; left = total; render();
    input.value = n;
  }
  document.querySelectorAll('[data-section="silencio"] [data-min]')
    .forEach(b => b.addEventListener('click', () => setMinutes(b.getAttribute('data-min'))));
  input.addEventListener('change', () => setMinutes(input.value));

  function start(){
    if(timer) return;
    if(left <= 0) left = total;
    render();
    timer = setInterval(() => {
      left--;
      if(left <= 0){
        clearInterval(timer); timer = null;
        left = 0; render();
        if (navigator.vibrate) navigator.vibrate(200);
        return;
      }
      render();
    }, 1000);
  }
  function stop(){
    clearInterval(timer); timer = null;
    left = total; render();
  }
  startB.addEventListener('click', start);
  stopB.addEventListener('click', stop);
  setMinutes(input.value || 1);
})();

// ---------- Oráculo (demo) ----------
(function oracleModule(){
  const msgEl   = document.getElementById('oracleMsg');
  const btnNova = document.getElementById('btnNova');
  const btnCopy = document.getElementById('btnCopiar');
  const btnWa   = document.getElementById('btnWhats');
  if(!msgEl || !btnNova || !btnCopy || !btnWa) return;

  const frases = [
    'Confia no tempo divino, ele nunca se atrasa.',
    'A vida fala em sinais, aprende a escutar.',
    'O silêncio também responde.',
    'Nem todos vão entender-te, mas todos vão sentir a tua energia.'
  ];

  function randomFrase(){
    return frases[Math.floor(Math.random()*frases.length)];
  }

  function nova(){
    const f = randomFrase();
    msgEl.textContent = f;
  }

  function copiar(){
    const txt = msgEl.textContent.trim();
    if(!txt) return;
    navigator.clipboard?.writeText(txt).catch(()=>{});
  }

  function whats(){
    const txt = encodeURIComponent(msgEl.textContent.trim());
    const url = `https://wa.me/?text=${txt}`;
    window.location.href = url;
  }

  btnNova.addEventListener('click', nova);
  btnCopy.addEventListener('click', copiar);
  btnWa.addEventListener('click', whats);
})();
