
(function(){
  // Tabs
  const tabs = document.querySelectorAll('.tab');
  const panels = document.querySelectorAll('.panel');
  tabs.forEach(t => t.addEventListener('click', () => {
    tabs.forEach(x => x.classList.remove('active'));
    t.classList.add('active');
    panels.forEach(p => p.classList.remove('show'));
    const target = document.querySelector(t.dataset.target);
    if (target) target.classList.add('show');
  }));

  // Simple breath mock
  const breathStatus = document.getElementById('breathStatus');
  let breathTimer = null, breathPhase = 0;
  document.getElementById('btnBreathStart').addEventListener('click', () => {
    if (breathTimer) return;
    const phases = ['Inspira 4', 'Sustém 4', 'Expira 4', 'Pausa 4'];
    breathPhase = 0;
    breathStatus.textContent = phases[breathPhase];
    breathTimer = setInterval(() => {
      breathPhase = (breathPhase + 1) % phases.length;
      breathStatus.textContent = phases[breathPhase];
    }, 4000);
  });
  document.getElementById('btnBreathStop').addEventListener('click', () => {
    clearInterval(breathTimer); breathTimer = null; breathStatus.textContent = 'Preparar…';
  });

  // Silêncio timer
  const timerDisplay = document.getElementById('timerDisplay');
  const inputMin = document.getElementById('minutos');
  let countdown = null, endAt = 0, audioCtx = null;

  // quick chips
  document.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
      inputMin.value = chip.dataset.min;
      updateTimerDisplay(parseInt(inputMin.value,10) * 60);
    });
  });

  function updateTimerDisplay(totalSecs){
    const m = Math.floor(totalSecs/60).toString().padStart(2,'0');
    const s = Math.floor(totalSecs%60).toString().padStart(2,'0');
    timerDisplay.textContent = `${m}:${s}`;
  }
  updateTimerDisplay(parseInt(inputMin.value,10) * 60);

  function beep(){
    try{
      audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
      const o = audioCtx.createOscillator();
      const g = audioCtx.createGain();
      o.type = 'sine';
      o.frequency.value = 880; // A5
      g.gain.value = 0.001;
      o.connect(g); g.connect(audioCtx.destination);
      o.start(); 
      g.gain.exponentialRampToValueAtTime(0.2, audioCtx.currentTime + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.25);
      o.stop(audioCtx.currentTime + 0.26);
    }catch(e){/* noop */}
  }
  function vibrate(pattern=[180,80,180]){
    if (navigator.vibrate) navigator.vibrate(pattern);
  }

  function startTimer(mins){
    const total = Math.max(1, Math.min(60, mins)) * 60;
    endAt = Date.now() + total*1000 + 50;
    clearInterval(countdown);
    countdown = setInterval(tick, 200);
    tick(); // paint immediately
  }
  function stopTimer(){
    clearInterval(countdown); countdown = null;
  }
  function tick(){
    const remaining = Math.max(0, Math.ceil((endAt - Date.now())/1000));
    updateTimerDisplay(remaining);
    if (remaining <= 0){
      stopTimer();
      // feedback
      beep(); vibrate();
    }
  }

  document.getElementById('btnSilencioStart').addEventListener('click', () => {
    const mins = parseInt(inputMin.value,10) || 1;
    startTimer(mins);
  });
  document.getElementById('btnSilencioStop').addEventListener('click', stopTimer);

})();
