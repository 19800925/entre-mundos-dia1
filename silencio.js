/* Lógica do temporizador — Silêncio */
(function(){
  const $ = sel => document.querySelector(sel);
  const panel = $('#silencio-panel');
  if(!panel) return;

  const display = $('#timerDisplay');
  const input = $('#minutos');
  const btnStart = $('#btnStart');
  const btnStop  = $('#btnStop');
  const toggleSound = $('#toggleSound');
  const toggleVibrate = $('#toggleVibrate');

  let total = 60;     // segundos
  let left  = 60;     // restantes
  let tId   = null;
  let ctx;            // WebAudio

  function setFromMinutes(min){
    const m = Math.max(1, Math.min(180, parseInt(min||1,10)));
    input.value = m;
    total = left = m*60;
    render();
  }

  function render(){
    const m = Math.floor(left/60).toString().padStart(2,'0');
    const s = Math.floor(left%60).toString().padStart(2,'0');
    display.textContent = `${m}:${s}`;
  }

  function tick(){
    if(left<=0){ finish(); return; }
    left -= 1;
    render();
  }

  function start(){
    // sincroniza com campo
    setFromMinutes(input.value);
    // começa
    if(tId) clearInterval(tId);
    tId = setInterval(tick, 1000);
    tick(); // update imediato
  }

  function stop(){
    if(tId){ clearInterval(tId); tId=null; }
  }

  function finish(){
    stop();
    left = 0;
    render();
    // efeitos finais
    if(toggleVibrate?.checked && navigator.vibrate){
      try{ navigator.vibrate([160,80,160]); }catch(e){}
    }
    if(toggleSound?.checked){
      beep();
    }
  }

  // Beep com WebAudio (fallback simples e curto)
  function beep(){
    try{
      ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.connect(g); g.connect(ctx.destination);
      o.type = 'sine';
      o.frequency.setValueAtTime(880, ctx.currentTime);
      g.gain.setValueAtTime(0.0001, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.3, ctx.currentTime + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.38);
      o.start();
      o.stop(ctx.currentTime + 0.4);
      // pequeno "ding-dong"
      setTimeout(()=>{
        const o2 = ctx.createOscillator();
        const g2 = ctx.createGain();
        o2.connect(g2); g2.connect(ctx.destination);
        o2.type='sine';
        o2.frequency.setValueAtTime(660, ctx.currentTime);
        g2.gain.setValueAtTime(0.0001, ctx.currentTime);
        g2.gain.exponentialRampToValueAtTime(0.25, ctx.currentTime + 0.02);
        g2.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.32);
        o2.start();
        o2.stop(ctx.currentTime + 0.34);
      }, 120);
    }catch(e){
      // ignore falhas silenciosamente (iOS sem gesto prévio, etc.)
    }
  }

  // Eventos
  panel.querySelectorAll('.chip').forEach(ch => {
    ch.addEventListener('click', () => setFromMinutes(ch.dataset.min));
  });
  btnStart.addEventListener('click', start);
  btnStop.addEventListener('click', stop);
  input.addEventListener('change', () => setFromMinutes(input.value));

  // init
  setFromMinutes(input.value);
  render();
})();