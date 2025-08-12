// assets/app.js — tabs + respiração + silêncio
(function(){
  const $ = sel => document.querySelector(sel);
  const $$ = sel => Array.from(document.querySelectorAll(sel));

  // Tabs
  $$('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      $$('.tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      $$('.section').forEach(sec => sec.hidden = true);
      const target = document.querySelector(tab.dataset.target);
      if (target) target.hidden = false;
      // scroll to top of content
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // Respiração 4-4-4-4
  let breathTimer = null, phase = 0, seconds = 0;
  const phases = [
    { label: 'Inspira...', len: 4, cls: 'grow'   },
    { label: 'Sustém...', len: 4, cls: ''       },
    { label: 'Expira...', len: 4, cls: 'shrink' },
    { label: 'Pausa...',  len: 4, cls: ''       }
  ];
  const ball = $('#breathBall');

  function stepBreath(){
    const p = phases[phase];
    ball.textContent = p.label;
    ball.classList.remove('grow','shrink');
    if (p.cls) ball.classList.add(p.cls);
    seconds = p.len;
  }
  function tickBreath(){
    seconds--;
    if (seconds <= 0){
      phase = (phase + 1) % phases.length;
      stepBreath();
    }
  }
  $('#btnStart').addEventListener('click', () => {
    if (breathTimer) return;
    phase = 0; stepBreath();
    breathTimer = setInterval(tickBreath, 1000);
  });
  $('#btnStop').addEventListener('click', () => {
    clearInterval(breathTimer); breathTimer = null;
    ball.textContent = 'Preparar...'; ball.classList.remove('grow','shrink');
  });

  // Silêncio 1 minuto
  let sTimer = null, sLeft = 60;
  const sLbl = $('#silencioTimer');
  function fmt(n){ return n.toString().padStart(2,'0'); }
  function drawSilencio(){ sLbl.textContent = `0${Math.floor(sLeft/60)}:${fmt(sLeft%60)}`; }
  $('#btnSilencioStart').addEventListener('click', () => {
    if (sTimer) return;
    sLeft = 60; drawSilencio();
    sTimer = setInterval(() => {
      sLeft--; drawSilencio();
      if (sLeft <= 0){ clearInterval(sTimer); sTimer = null; }
    }, 1000);
  });
  $('#btnSilencioStop').addEventListener('click', () => {
    clearInterval(sTimer); sTimer = null; sLeft = 60; drawSilencio();
  });
  drawSilencio();
})();