// Tabs
const tabs = document.querySelectorAll('.tab');
tabs.forEach(t=>t.addEventListener('click',()=>{
  tabs.forEach(x=>x.classList.remove('active'));
  t.classList.add('active');
  document.querySelectorAll('section.card').forEach(s=>s.classList.add('hide'));
  document.getElementById(t.dataset.tab).classList.remove('hide');
}));

// Breath animation (simple textual phases)
let breathTimer=null, phase=0, phases=['Inspira','Sustém','Expira','Pausa'];
document.getElementById('bStart').addEventListener('click',()=>{
  const el = document.getElementById('breathPhase');
  clearInterval(breathTimer);
  phase=0; el.textContent=phases[phase];
  breathTimer=setInterval(()=>{
    phase=(phase+1)%4;
    el.textContent=phases[phase];
  }, 4000);
});
document.getElementById('bStop').addEventListener('click',()=>{
  clearInterval(breathTimer);
  document.getElementById('breathPhase').textContent='Preparar…';
});

// Silence timer
const chips=[...document.querySelectorAll('.chip')];
const input=document.getElementById('customMin');
const timerEl=document.getElementById('timer');
let endAt=null, rafId=null;

function fmt(ms){
  const total = Math.max(0, Math.ceil(ms/1000));
  const m = Math.floor(total/60).toString().padStart(2,'0');
  const s = (total%60).toString().padStart(2,'0');
  return `${m}:${s}`;
}
function setActive(min){
  chips.forEach(c=>c.classList.toggle('active', +c.dataset.min===+min));
  input.value=min;
  timerEl.textContent = fmt(min*60*1000);
}
chips.forEach(c=>c.addEventListener('click',()=>setActive(c.dataset.min)));
document.getElementById('start').addEventListener('click',()=>{
  const min = Math.max(1, parseInt(input.value||'1',10));
  setActive(min);
  endAt = Date.now() + min*60*1000;
  cancelAnimationFrame(rafId);
  const step=()=>{
    const left=endAt-Date.now();
    timerEl.textContent = fmt(left);
    if (left>0){ rafId=requestAnimationFrame(step); }
  };
  rafId=requestAnimationFrame(step);
});
document.getElementById('stop').addEventListener('click',()=>{
  cancelAnimationFrame(rafId);
  const min = Math.max(1, parseInt(input.value||'1',10));
  timerEl.textContent = fmt(min*60*1000);
});

// default 1 min selected
setActive(1);
