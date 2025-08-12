// Tabs
const tabs = document.querySelectorAll('.tab');
const sections = {
  guia: document.getElementById('sec-guia'),
  silencio: document.getElementById('sec-silencio'),
  escrita: document.getElementById('sec-escrita')
};

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('is-active'));
    tab.classList.add('is-active');

    // hide all
    Object.values(sections).forEach(sec => sec.classList.add('is-hidden'));
    // show current
    if (tab.id === 'tab-guia') sections.guia.classList.remove('is-hidden');
    if (tab.id === 'tab-silencio') sections.silencio.classList.remove('is-hidden');
    if (tab.id === 'tab-escrita') sections.escrita.classList.remove('is-hidden');
  });
});

// Simple 4-4-4-4 breathing guide
const stageLabel = document.getElementById('stageLabel');
const sphere = document.getElementById('sphere');
const btnStart = document.getElementById('btnStart');
const btnStop = document.getElementById('btnStop');

let timer = null;
let idx = 0;
const stages = [
  {label:'Inspira…', scale:1.35, secs:4},
  {label:'Sustém…',  scale:1.35, secs:4},
  {label:'Expira…',  scale:0.95, secs:4},
  {label:'Pausa…',   scale:0.95, secs:4},
];

function runCycle(){
  const s = stages[idx % stages.length];
  stageLabel.textContent = s.label;
  sphere.style.transform = `scale(${s.scale})`;
  timer = setTimeout(()=>{
    idx++; runCycle();
  }, s.secs * 1000);
}

btnStart?.addEventListener('click', () => {
  if (timer) return; // já a correr
  idx = 0;
  runCycle();
});

btnStop?.addEventListener('click', () => {
  clearTimeout(timer);
  timer = null;
  stageLabel.textContent = 'Preparar…';
  sphere.style.transform = 'scale(1)';
});
