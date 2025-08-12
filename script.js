// Oracle inline
const oracleBox = document.getElementById('oracleBox');
const oracleNew = document.getElementById('oracleNew');
const oracleCopy = document.getElementById('oracleCopy');
const oracleWA = document.getElementById('oracleWA');
let frases = []; let cursor = -1;
function cleanTail(s){ return (s||'').toString().replace(/\s*\(\d+\)\s*$/,'').trim(); }
function shuffle(a){ for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; }
async function loadOracle(){
  try{
    const res = await fetch('oraculo.json', {cache:'no-store'});
    const data = await res.json();
    frases = shuffle((Array.isArray(data)?data:(data.mensagens||data.frases||[])).map(cleanTail).filter(Boolean));
  }catch(e){
    frases = ['Confia no tempo divino.', 'A vida fala em sinais.', 'Tu és a casa antes do mundo.', 'O silêncio também é resposta.'];
  }
  novaFrase(true);
}
function novaFrase(first=false){
  if(!frases.length) return;
  cursor = (cursor+1) % frases.length;
  oracleBox.textContent = frases[cursor];
  if(!first){ try{ navigator.vibrate && navigator.vibrate(15);}catch(e){} }
}
function copyFrase(){
  const t = oracleBox.textContent.trim(); if(!t) return;
  navigator.clipboard?.writeText(t);
  oracleCopy.textContent = 'Copiado ✓'; setTimeout(()=>oracleCopy.textContent='Copiar', 1200);
}
function shareWA(){
  const t = oracleBox.textContent.trim() || '';
  const url = 'https://wa.me/?text=' + encodeURIComponent(t);
  copyFrase(); window.location.href = url;
}
oracleNew.addEventListener('click', ()=> novaFrase());
oracleCopy.addEventListener('click', copyFrase);
oracleWA.addEventListener('click', shareWA);

// Respiração 4-4-4-4
const circle = document.getElementById('breathCircle');
let breathRAF=null, phase=0, names=['Inspira','Sustém','Expira','Pausa'];
function runBreath(){
  const steps=[4,4,4,4]; let start=performance.now();
  function frame(t){
    const e=(t-start)/1000, total=steps.reduce((a,b)=>a+b,0), m=e%total;
    let acc=0, p=0; for(let i=0;i<steps.length;i++){ acc+=steps[i]; if(m<acc){ p=i; break; }}
    if(p!==phase){ phase=p; circle.classList.toggle('expanding', phase===0); }
    circle.textContent = names[phase];
    breathRAF = requestAnimationFrame(frame);
  }
  breathRAF = requestAnimationFrame(frame);
}
document.getElementById('startBreath').addEventListener('click', ()=>{ if(breathRAF) cancelAnimationFrame(breathRAF); runBreath(); });
document.getElementById('stopBreath').addEventListener('click', ()=>{ if(breathRAF) cancelAnimationFrame(breathRAF); breathRAF=null; phase=0; circle.textContent='Preparar…'; circle.classList.remove('expanding'); });

// Silêncio
let rafId=null, endAt=null;
const display=document.getElementById('timerDisplay'), customMin=document.getElementById('customMin');
function setSelected(min){
  document.querySelectorAll('.chip').forEach(c=>c.classList.remove('selected'));
  const chosen=[...document.querySelectorAll('.chip')].find(c=>+c.dataset.min===+min);
  chosen && chosen.classList.add('selected'); customMin.value=min; updateTimer(min*60);
}
function updateTimer(s){ const m=Math.floor(s/60).toString().padStart(2,'0'); const r=Math.floor(s%60).toString().padStart(2,'0'); display.textContent=`${m}:${r}`; }
document.querySelectorAll('.chip').forEach(c=>c.addEventListener('click',()=>setSelected(c.dataset.min)));
document.getElementById('startTimer').addEventListener('click',()=>{
  const mins=Math.max(1, Math.min(60, parseInt(customMin.value||'1',10)));
  setSelected(mins); endAt=Date.now()+mins*60*1000;
  if(rafId) cancelAnimationFrame(rafId);
  const step=()=>{ const left=Math.max(0, Math.round((endAt-Date.now())/1000)); updateTimer(left); if(left>0){ rafId=requestAnimationFrame(step); } };
  step();
});
document.getElementById('stopTimer').addEventListener('click',()=>{ if(rafId) cancelAnimationFrame(rafId); rafId=null; });

// Init
setSelected(1);
loadOracle();
