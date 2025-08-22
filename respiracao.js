// respiracao.js — animação + temporizador (1–2 min) para a aba Respiração
(()=>{
  const $ = s => document.querySelector(s);
  const panel = $('#tabRespiracao'); if(!panel) return;

  const balloon = $('#resp-balloon');
  const phaseEl = $('#resp-phase');
  const countEl = $('#resp-count');
  const selDur  = $('#resp-duration');
  const selPat  = $('#resp-pattern');
  const btnStart= $('#resp-start');
  const btnPause= $('#resp-pause');
  const btnStop = $('#resp-stop');

  const PHASES = ["Inspira","Sustém","Expira","Pausa"];
  let running = false, paused=false, timerId=null, endAt=0, remaining=0;
  let cycle = [4,4,4,4]; // default
  let phaseIndex = 0, phaseRemaining = 0, cycleId = 0;

  function parsePattern(v){
    const parts = (v||"4-4-4-4").split('-').map(n=>Math.max(1, parseInt(n,10)||4));
    return parts.length===4 ? parts : [4,4,4,4];
  }

  function setPhase(idx){
    phaseIndex = idx%4;
    phaseRemaining = cycle[phaseIndex];
    phaseEl.textContent = PHASES[phaseIndex];
    // animação: inspira cresce, sustém fixa, expira diminui, pausa fixa pequena
    const scales = [1.2, 1.2, 0.9, 1.0];
    balloon.style.transform = `scale(${scales[phaseIndex]})`;
  }

  function tick(){
    if(!running || paused) return;
    const now = Date.now();
    if(now >= endAt){
      stop(true); // terminou
      return;
    }
    // update cronómetro
    const secsLeft = Math.max(0, Math.round((endAt-now)/1000));
    countEl.textContent = toMMSS(secsLeft);

    // fases
    phaseRemaining -= 1;
    if(phaseRemaining <= 0){
      setPhase(phaseIndex+1);
      if(phaseIndex===0) cycleId++; // novo ciclo ao passar de "Pausa" -> "Inspira"
    }
  }

  function toMMSS(s){
    const m = Math.floor(s/60), ss = s%60;
    return String(m).padStart(2,'0')+":"+String(ss).padStart(2,'0');
  }

  function start(){
    if(running) stop();
    running = true; paused=false;
    const dur = Math.max(10, parseInt(selDur.value,10)||60);
    cycle = parsePattern(selPat.value);
    endAt = Date.now() + dur*1000;
    setPhase(0);
    // alinhar ao segundo
    clearInterval(timerId);
    timerId = setInterval(tick, 1000);
    navigator.vibrate && navigator.vibrate(20);
  }

  function pause(){
    if(!running) return;
    paused = !paused;
    phaseEl.textContent = paused ? "Pausa (parado)" : PHASES[phaseIndex];
  }

  function stop(done=false){
    running = false; paused=false;
    clearInterval(timerId);
    timerId = null;
    balloon.style.transform = "scale(1)";
    if(done){
      phaseEl.textContent = "Concluído";
      navigator.vibrate && navigator.vibrate([30,40,30]);
    } else {
      phaseEl.textContent = "Pronto";
    }
  }

  btnStart && btnStart.addEventListener('click', start);
  btnPause && btnPause.addEventListener('click', pause);
  btnStop  && btnStop .addEventListener('click', ()=>stop(false));

  // acessibilidade inicial
  phaseEl.textContent = "Pronto";
  countEl.textContent = "00:00";
})();
