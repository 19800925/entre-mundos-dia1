// Tabs
document.querySelectorAll('.tab-link').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    document.querySelectorAll('.tab-link').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const tab = btn.dataset.tab;
    document.querySelectorAll('.tab-section').forEach(s=>s.classList.remove('active'));
    document.getElementById(tab).classList.add('active');
  });
});

// Timer (keeps running even if screen locks; uses Date math)
let timerId = null, endAt = null;
const display = document.getElementById('timerDisplay');
const customMin = document.getElementById('customMin');

function setSelected(min){
  document.querySelectorAll('.chip').forEach(c=>c.classList.remove('selected'));
  const chosen = Array.from(document.querySelectorAll('.chip')).find(c=>+c.dataset.min===+min);
  if(chosen) chosen.classList.add('selected');
  customMin.value = min;
  updateTimer(min*60);
}

function updateTimer(s){
  const m = Math.floor(s/60).toString().padStart(2,'0');
  const r = Math.floor(s%60).toString().padStart(2,'0');
  display.textContent = `${m}:${r}`;
}

document.querySelectorAll('.chip').forEach(chip=>{
  chip.addEventListener('click', ()=> setSelected(chip.dataset.min));
});

document.getElementById('startTimer').addEventListener('click', ()=>{
  const mins = Math.max(1, Math.min(60, parseInt(customMin.value || '1',10)));
  setSelected(mins);
  const now = Date.now();
  endAt = now + mins*60*1000;
  if(timerId) cancelAnimationFrame(timerId);
  const tick = ()=>{
    const left = Math.max(0, Math.round((endAt - Date.now())/1000));
    updateTimer(left);
    if(left>0){ timerId = requestAnimationFrame(tick); } else {
      display.textContent = '00:00';
      navigator.vibrate?.(200);
    }
  };
  tick();
});

document.getElementById('stopTimer').addEventListener('click', ()=>{
  if(timerId) cancelAnimationFrame(timerId);
  timerId = null; endAt = null;
});

// Breathing coach 4•4•4•4
const circle = document.getElementById('breathCircle');
let breathRAF = null, phase = 0, phaseNames=['Inspira','Sustém','Expira','Pausa'];
function runBreath(){
  const steps = [4,4,4,4]; // seconds
  let started = performance.now();
  function frame(t){
    const elapsed = (t-started)/1000;
    const total = steps.reduce((a,b)=>a+b,0);
    const e = elapsed % total;
    // determine phase
    let acc = 0, p = 0;
    for(let i=0;i<steps.length;i++){ acc += steps[i]; if(e<acc){ p=i; break; } }
    if(p!==phase){
      phase = p;
      circle.classList.toggle('expanding', phase===0); // expand on inspire
    }
    const name = phaseNames[phase];
    circle.textContent = name;
    breathRAF = requestAnimationFrame(frame);
  }
  breathRAF = requestAnimationFrame(frame);
}

document.getElementById('startBreath').addEventListener('click', ()=>{
  if(breathRAF) cancelAnimationFrame(breathRAF);
  runBreath();
});
document.getElementById('stopBreath').addEventListener('click', ()=>{
  if(breathRAF) cancelAnimationFrame(breathRAF);
  breathRAF = null; phase=0; circle.textContent='Preparar…'; circle.classList.remove('expanding');
});

// Initialize defaults
setSelected(1);
