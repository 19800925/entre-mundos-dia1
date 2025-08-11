// Tabs
const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.tabpanel');
tabs.forEach(t => t.addEventListener('click', () => {
  tabs.forEach(x => x.classList.remove('active'));
  panels.forEach(p => p.classList.remove('active'));
  t.classList.add('active');
  document.querySelector('#tab-' + t.dataset.tab).classList.add('active');
}));

// Breathing (4·4·4·4)
const circle = document.getElementById('circle');
const startBtn = document.getElementById('start');
const stopBtn  = document.getElementById('stop');
let breathing = false;

const fases = [
  {label:'Inspira',   secs:4, expand:true},
  {label:'Sustém',    secs:4, expand:true},
  {label:'Expira',    secs:4, expand:false},
  {label:'Pausa',     secs:4, expand:false},
];

function sleep(ms){ return new Promise(r => setTimeout(r, ms)); }
async function ciclo(){
  while(breathing){
    for (const f of fases){
      if(!breathing) break;
      circle.textContent = f.label;
      circle.classList.toggle('expand', !!f.expand);
      await sleep(f.secs*1000);
    }
  }
  circle.classList.remove('expand');
  circle.textContent = 'Pausa';
}
startBtn?.addEventListener('click', () => { if (!breathing){ breathing = true; ciclo(); } });
stopBtn?.addEventListener('click', () => { breathing = false; });

// Silêncio 1:00
const sBtn = document.getElementById('silence-btn');
const sTimer = document.getElementById('silence-timer');
let sInt = null;
sBtn?.addEventListener('click', () => {
  let t = 60;
  sBtn.disabled = true;
  sInt && clearInterval(sInt);
  sInt = setInterval(() => {
    t--; const mm = String(Math.floor(t/60)).padStart(2,'0');
    const ss = String(t%60).padStart(2,'0');
    sTimer.textContent = `${mm}:${ss}`;
    if (t<=0){ clearInterval(sInt); sBtn.disabled=false; sTimer.textContent='01:00'; }
  },1000);
});

// Escrita da Alma (localStorage)
const area = document.getElementById('journaling');
const saveBtn = document.getElementById('save-note');
const clearBtn = document.getElementById('clear-note');
const status = document.getElementById('save-status');
const KEY = 'entre-mundos-dia1-journal';
if (area) area.value = localStorage.getItem(KEY) || '';
saveBtn?.addEventListener('click', () => {
  localStorage.setItem(KEY, area.value || '');
  status.textContent = 'Guardado neste dispositivo.';
  setTimeout(()=> status.textContent='', 1800);
});
clearBtn?.addEventListener('click', () => {
  area.value=''; localStorage.removeItem(KEY); status.textContent='Limpo.';
  setTimeout(()=> status.textContent='', 1200);
});

// PWA SW
if ('serviceWorker' in navigator) {
  window.addEventListener('load', ()=> navigator.serviceWorker.register('sw.js'));
}
