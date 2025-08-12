// Tabs
(function(){
  const tabs = document.querySelectorAll('.tab');
  const panels = document.querySelectorAll('.panel');
  tabs.forEach(t => t.addEventListener('click', () => {
    tabs.forEach(x => x.classList.remove('active'));
    t.classList.add('active');
    panels.forEach(p => p.classList.remove('show'));
    const target = document.querySelector(t.dataset.target);
    if (target) target.classList.add('show');
    window.scrollTo({top:0, behavior:'smooth'});
  }));
})();

// Oráculo na Home (gera só ao clicar)
(function(){
  const textEl = document.getElementById('oracleTxt');
  const btnNew = document.getElementById('btnNova');
  const btnCopy= document.getElementById('btnCopiar');
  const btnWA  = document.getElementById('btnWA');
  let frases = []; let last = -1;

  const limpa = s => String(s||'').replace(/\s*\(\s*\d+\s*\)\s*$/,'').trim();

  async function load(){
    try{
      const r = await fetch('oraculo.json?v=' + Date.now());
      const data = await r.json();
      frases = (Array.isArray(data)?data:(data.frases||data.mensagens||[])).map(limpa).filter(Boolean);
    }catch(e){
      // fallback curto
      frases = [
        "Confia no tempo divino, ele nunca se atrasa.",
        "A tua luz guia-te no silêncio.",
        "Segue o brilho que só tu vês. Hoje é o dia.",
        "Tu és a casa antes do mundo."
      ];
    }
  }

  function pick(){
    if(!frases.length) return "Respira. Confia.";
    let i = Math.floor(Math.random()*frases.length);
    if (frases.length>1 && i===last) i = (i+1)%frases.length;
    last = i;
    return frases[i];
  }

  btnNew?.addEventListener('click', ()=>{
    textEl.textContent = pick();
  });

  btnCopy?.addEventListener('click', async ()=>{
    const t = textEl.textContent.trim();
    if(!t) return;
    try{ await navigator.clipboard.writeText(t); btnCopy.textContent='Copiado ✓'; setTimeout(()=>btnCopy.textContent='Copiar',1200);}catch(e){}
  });

  btnWA?.addEventListener('click', ()=>{
    const t = (textEl.textContent||'').trim();
    if(!t) return;
    const url = "https://wa.me/?text=" + encodeURIComponent(t + " — Entre Mundos");
    window.location.href = url;
  });

  load();
})();

// Respiração 4-4-4-4
(function(){
  const circle = document.getElementById('breathCircle');
  const label  = document.getElementById('breathLabel');
  let timer=null, idx=0, secs=4;
  const phases=[ 'Inspira', 'Sustém', 'Expira', 'Pausa' ];

  function step(){
    label.textContent = phases[idx] + ' ' + secs + 's';
    if(phases[idx]==='Inspira'){ circle.classList.add('expand'); }
    if(phases[idx]==='Expira'){ circle.classList.remove('expand'); }
    secs--;
    if(secs<0){ idx=(idx+1)%4; secs=4; }
  }

  document.getElementById('breathStart').addEventListener('click', ()=>{
    clearInterval(timer); idx=0; secs=4; step(); timer=setInterval(step,1000);
  });
  document.getElementById('breathStop').addEventListener('click', ()=>{
    clearInterval(timer); timer=null; label.textContent='Preparar…'; circle.classList.remove('expand');
  });
})();

// Silêncio timer (com beep + vibração)
(function(){
  const chips = document.querySelectorAll('.chip');
  const input = document.getElementById('minutos');
  const display = document.getElementById('timerDisplay');
  const btnStart = document.getElementById('silenceStart');
  const btnStop  = document.getElementById('silenceStop');
  let raf=null, endAt=0, audioCtx=null;

  function setFromMin(m){
    m = Math.max(1, Math.min(60, parseInt(m||1,10)));
    input.value = m;
    update(m*60);
  }

  function update(total){
    const m = Math.floor(total/60).toString().padStart(2,'0');
    const s = Math.floor(total%60).toString().padStart(2,'0');
    display.textContent = `${m}:${s}`;
  }

  function beep(){
    try{
      audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
      const o = audioCtx.createOscillator();
      const g = audioCtx.createGain();
      o.type='sine'; o.frequency.value = 880;
      o.connect(g); g.connect(audioCtx.destination);
      g.gain.value=0.0001;
      o.start();
      g.gain.exponentialRampToValueAtTime(0.15, audioCtx.currentTime + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.28);
      o.stop(audioCtx.currentTime + 0.3);
    }catch(e){}
  }

  function vibrate(){ if(navigator.vibrate) navigator.vibrate([160,80,160]); }

  function start(){
    const mins = Math.max(1, parseInt(input.value||'1',10));
    endAt = Date.now() + mins*60*1000 + 50;
    if(raf) cancelAnimationFrame(raf);
    tick();
  }
  function stop(){ if(raf) cancelAnimationFrame(raf); raf=null; }

  function tick(){
    const left = Math.max(0, Math.ceil((endAt - Date.now())/1000));
    update(left);
    if(left<=0){ stop(); beep(); vibrate(); return; }
    raf = requestAnimationFrame(tick);
  }

  chips.forEach(c => c.addEventListener('click', ()=>{ setFromMin(c.dataset.min); }));
  btnStart.addEventListener('click', start);
  btnStop.addEventListener('click', stop);

  setFromMin(1);
})();
