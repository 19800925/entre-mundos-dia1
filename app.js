
/* Tabs */
const tabs = document.querySelectorAll('.tab');
const panels = {
  guia: document.getElementById('tab-guia'),
  silencio: document.getElementById('tab-silencio'),
  escrita: document.getElementById('tab-escrita')
};
tabs.forEach(btn => {
  btn.addEventListener('click', () => {
    tabs.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    Object.values(panels).forEach(p => p.classList.remove('active'));
    panels[btn.dataset.tab].classList.add('active');
  });
});

/* Respiração 4-4-4-4 */
let breathTimer = null;
const circle = document.getElementById('breathCircle');
const label = document.getElementById('breathLabel');
const startBreath = document.getElementById('startBreath');
const stopBreath = document.getElementById('stopBreath');

function runBreathCycle() {
  const phases = [
    {t: 'Inspira', cls: 'grow'},
    {t: 'Sustém', cls: ''},
    {t: 'Expira', cls: 'shrink'},
    {t: 'Pausa', cls: ''},
  ];
  let i = 0;
  const step = () => {
    if (!breathTimer) return;
    const p = phases[i % phases.length];
    label.textContent = p.t;
    circle.classList.remove('grow','shrink');
    if (p.cls) circle.classList.add(p.cls);
    setTimeout(() => {
      if (!breathTimer) return;
      i++;
      step();
    }, 4000);
  };
  step();
}

startBreath.addEventListener('click', () => {
  if (breathTimer) return;
  label.textContent = 'Preparar…';
  // tiny delay then start
  breathTimer = true;
  setTimeout(runBreathCycle, 800);
});

stopBreath.addEventListener('click', () => {
  breathTimer = null;
  label.textContent = 'Preparar…';
  circle.classList.remove('grow','shrink');
});

/* Silêncio — contador */
let silentInterval = null;
const chips = document.querySelectorAll('.chip');
const customMin = document.getElementById('customMin');
const startSilent = document.getElementById('startSilent');
const stopSilent = document.getElementById('stopSilent');
const silentTimer = document.getElementById('silentTimer');

chips.forEach(c => {
  c.addEventListener('click', () => {
    chips.forEach(x => x.classList.remove('selected'));
    c.classList.add('selected');
    customMin.value = c.dataset.min;
    updateTimerDisplay(parseInt(customMin.value,10) * 60);
  });
});

customMin.addEventListener('input', () => {
  let v = parseInt(customMin.value || '1', 10);
  if (isNaN(v) || v < 1) v = 1;
  if (v > 180) v = 180;
  customMin.value = v;
  chips.forEach(x => x.classList.remove('selected'));
  updateTimerDisplay(v * 60);
});

function updateTimerDisplay(totalSeconds){
  const m = Math.floor(totalSeconds / 60).toString().padStart(2,'0');
  const s = Math.floor(totalSeconds % 60).toString().padStart(2,'0');
  silentTimer.textContent = `${m}:${s}`;
}

startSilent.addEventListener('click', () => {
  let secs = parseInt(customMin.value,10) * 60;
  if (silentInterval) clearInterval(silentInterval);
  updateTimerDisplay(secs);
  silentInterval = setInterval(() => {
    secs--;
    if (secs <= 0){
      clearInterval(silentInterval);
      silentInterval = null;
      updateTimerDisplay(0);
      try { new AudioContext(); } catch(e) {}
    } else {
      updateTimerDisplay(secs);
    }
  }, 1000);
});

stopSilent.addEventListener('click', () => {
  if (silentInterval) clearInterval(silentInterval);
  silentInterval = null;
});
// init
updateTimerDisplay(60);
