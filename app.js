(() => {
  const cfg = { insp: 4, hold: 4, exp: 4, pause: 4, minR: 38, maxR: 86 };
  const bubble = document.getElementById('bubble');
  const stageEl = document.getElementById('breathStage');
  const btnStart = document.getElementById('btnBreathStart');
  const btnStop  = document.getElementById('btnBreathStop');
  if (!bubble || !btnStart || !btnStop) return;

  let raf = 0, running = false, t0 = 0, phase = 0;
  const phases = [
    { key:'inspira',  dur: cfg.insp,  from: cfg.minR, to: cfg.maxR, text:'Inspira…'  },
    { key:'sustem',   dur: cfg.hold,  from: cfg.maxR, to: cfg.maxR, text:'Sustém…'   },
    { key:'expira',   dur: cfg.exp,   from: cfg.maxR, to: cfg.minR, text:'Expira…'   },
    { key:'pausa',    dur: cfg.pause, from: cfg.minR, to: cfg.minR, text:'Pausa…'    },
  ];

  const ease = x => x<.5 ? 2*x*x : 1 - Math.pow(-2*x+2,2)/2;

  function step(ts){
    if (!running) return;
    if (!t0) t0 = ts;
    const p = phases[phase];
    const elapsed = (ts - t0)/1000;
    const ratio = Math.min(1, elapsed / Math.max(0.0001, p.dur));
    const eased = p.from === p.to ? 1 : ease(ratio);
    const r = p.from + (p.to - p.from) * eased;
    bubble.setAttribute('r', r.toFixed(2));
    stageEl.textContent = p.text;

    if (ratio >= 1){
      phase = (phase + 1) % phases.length;
      t0 = ts;
    }
    raf = requestAnimationFrame(step);
  }

  function start(){
    if (running) return;
    running = true; phase = 0; t0 = 0;
    btnStart.disabled = true; btnStop.disabled = false;
    raf = requestAnimationFrame(step);
  }
  function stop(){
    running = false; cancelAnimationFrame(raf);
    bubble.setAttribute('r', cfg.minR);
    stageEl.textContent = 'Preparar…';
    btnStart.disabled = false; btnStop.disabled = true;
  }

  stop();
  btnStart.addEventListener('click', start);
  btnStop .addEventListener('click', stop);
})();