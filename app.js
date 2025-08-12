// app.js — Entre Mundos
// Tabs
const tabs = document.querySelectorAll('.tabs .chip');
const sections = document.querySelectorAll('.section');
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('is-active'));
    sections.forEach(s => s.hidden = true);
    tab.classList.add('is-active');
    document.getElementById(tab.dataset.target).hidden = false;
  });
});

// Oráculo
const phrases = [
  "A tua luz guia-te no silêncio.",
  "O teu ritmo é sagrado. Honra-o.",
  "Tudo chega no seu tempo certo.",
  "És mais vast@ do que o medo.",
  "Há respostas na tua respiração.",
  "A vida fala em sinais — escuta.",
  "Confia no tempo divino; ele não se atrasa.",
  "Aprende a descansar, não a desistir."
];
let lastIndex = -1;
const oracleText = document.getElementById('oracle-text');
function randomPhrase() {
  if (!phrases.length) return "";
  let i = Math.floor(Math.random() * phrases.length);
  if (i === lastIndex) { i = (i + 1) % phrases.length; }
  lastIndex = i;
  return phrases[i];
}
document.getElementById('btn-oracle-new').addEventListener('click', () => {
  oracleText.textContent = randomPhrase();
});
document.getElementById('btn-oracle-copy').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(oracleText.textContent.trim());
    toast('Mensagem copiada.');
  } catch(e) { alert('Não foi possível copiar.'); }
});
document.getElementById('btn-oracle-share').addEventListener('click', async () => {
  const text = oracleText.textContent.trim();
  const wa = "https://wa.me/?text=" + encodeURIComponent(text);
  if (navigator.share) {
    try { await navigator.share({ text }); } catch(e){}
  } else {
    window.location.href = wa;
  }
});

// Respiração — ciclo 4•4•4•4
const stageEl = document.getElementById('breath-stage');
const stages = [
  { label: 'Inspira', secs: 4 },
  { label: 'Sustém', secs: 4 },
  { label: 'Expira', secs: 4 },
  { label: 'Pausa',  secs: 4 },
];
let breathTimer=null, stageIndex=0, stageLeft=0;
function breathTick(){
  if (stageLeft <= 0){
    stageIndex = (stageIndex + 1) % stages.length;
    stageLeft = stages[stageIndex].secs;
  }
  stageEl.textContent = stages[stageIndex].label + '… ' + stageLeft + 's';
  stageLeft--;
}
document.getElementById('btn-breath-start').addEventListener('click', () => {
  clearInterval(breathTimer);
  stageIndex = -1; stageLeft = 0;
  breathTick();
  breathTimer = setInterval(breathTick, 1000);
});
document.getElementById('btn-breath-stop').addEventListener('click', () => {
  clearInterval(breathTimer);
  stageEl.textContent = 'Preparar…';
});

// Silêncio — temporizador
const presets = document.querySelectorAll('.preset');
const customMin = document.getElementById('custom-min');
const timerEl = document.getElementById('silence-timer');
let silenceTimer=null, targetTime=0;
presets.forEach(p => p.addEventListener('click', () => {
  presets.forEach(x => x.classList.remove('is-active'));
  p.classList.add('is-active');
  customMin.value = p.dataset.min;
  renderTimer(parseInt(customMin.value,10)*60);
}));
function renderTimer(total){
  const m = Math.floor(total/60).toString().padStart(2,'0');
  const s = Math.floor(total%60).toString().padStart(2,'0');
  timerEl.textContent = `${m}:${s}`;
}
function silenceTick(){
  const left = Math.max(0, Math.round((targetTime - Date.now())/1000));
  renderTimer(left);
  if (left <= 0){ clearInterval(silenceTimer); toast('Tempo concluído.'); }
}
document.getElementById('btn-silence-start').addEventListener('click', () => {
  const mins = Math.max(1, parseInt(customMin.value,10) || 1);
  targetTime = Date.now() + mins*60*1000 + 999;
  clearInterval(silenceTimer);
  silenceTick();
  silenceTimer = setInterval(silenceTick, 500);
});
document.getElementById('btn-silence-stop').addEventListener('click', () => {
  clearInterval(silenceTimer);
});
// iniciar com preset 1 min
renderTimer(60);

// Mini toast
function toast(msg){
  let el = document.createElement('div');
  el.className = 'toast';
  el.textContent = msg;
  document.body.appendChild(el);
  requestAnimationFrame(()=> el.classList.add('show'));
  setTimeout(()=>{
    el.classList.remove('show');
    setTimeout(()=> el.remove(), 200);
  }, 1500);
}
const toastStyle = document.createElement('style');
toastStyle.textContent = `.toast{position:fixed;left:50%;bottom:28px;transform:translateX(-50%) scale(.96);background:#173a63;color:#fff;padding:10px 14px;border-radius:12px;opacity:0;transition:all .2s;box-shadow:0 6px 16px rgba(0,0,0,.35);z-index:9999}.toast.show{opacity:1;transform:translateX(-50%) scale(1)}`;
document.head.appendChild(toastStyle);
