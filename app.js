// Tabs
const tabs = document.querySelectorAll('.tab-btn');
const cards = document.querySelectorAll('main .card');
tabs.forEach(btn => {
  btn.addEventListener('click', () => {
    tabs.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const t = btn.dataset.target;
    cards.forEach(c => c.classList.toggle('visible', c.id === t));
  });
});

// Breathing animation 4·4·4·4
let breathTimer = null;
const circle = document.getElementById('breathCircle');
const startBreath = () => {
  stopBreath();
  const phases = [
    {label:'Inspira…', scale:1.0, to:1.15},
    {label:'Sustém…', scale:1.15, to:1.15},
    {label:'Expira…', scale:1.15, to:1.0},
    {label:'Pausa…', scale:1.0, to:1.0},
  ];
  let i = 0;
  circle.style.transition = 'transform 4s ease-in-out';
  circle.textContent = phases[0].label;
  circle.style.transform = `scale(${phases[0].to})`;
  breathTimer = setInterval(() => {
    i = (i + 1) % phases.length;
    const p = phases[i];
    circle.textContent = p.label;
    circle.style.transform = `scale(${p.to})`;
  }, 4000);
};
const stopBreath = () => {
  if (breathTimer){ clearInterval(breathTimer); breathTimer=null; }
  circle.textContent = 'Preparar…';
  circle.style.transform = 'scale(1)';
};
document.getElementById('breathStart').onclick = startBreath;
document.getElementById('breathStop').onclick = stopBreath;

// Timer (Silêncio)
let countdown = null;
let remaining = 60;
const timerEl = document.getElementById('timer');
const chips = document.querySelectorAll('.chip');
const customMin = document.getElementById('customMin');

function fmt(sec){
  const m = String(Math.floor(sec/60)).padStart(2,'0');
  const s = String(sec%60).padStart(2,'0');
  return `${m}:${s}`;
}
function setMinutes(min){
  chips.forEach(c => c.classList.toggle('selected', c.dataset.min == min));
  customMin.value = min;
  remaining = min * 60;
  timerEl.textContent = fmt(remaining);
}
chips.forEach(c => c.addEventListener('click', () => setMinutes(+c.dataset.min)));
customMin.addEventListener('change', e => setMinutes(Math.max(1, Math.min(60, +e.target.value || 1))));

document.getElementById('timerStart').onclick = () => {
  if (countdown) return;
  countdown = setInterval(() => {
    remaining--;
    if (remaining <= 0){
      remaining = 0;
      clearInterval(countdown); countdown = null;
    }
    timerEl.textContent = fmt(remaining);
  }, 1000);
};
document.getElementById('timerStop').onclick = () => { clearInterval(countdown); countdown=null; };

// Initialize
setMinutes(1);
