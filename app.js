/* Tabs */
const tabs = document.querySelectorAll('.tab');
const panels = {
  mensagem: document.getElementById('panel-mensagem'),
  respiracao: document.getElementById('panel-respiracao'),
  frase: document.getElementById('panel-frase'),
  silencio: document.getElementById('panel-silencio'),
};

tabs.forEach(btn => {
  btn.addEventListener('click', () => {
    tabs.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    Object.values(panels).forEach(p => p.classList.remove('active'));
    panels[btn.dataset.tab].classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

/* Oráculo */
const oracleMsgs = [
  "A vida fala em sinais, aprende a escutar.",
  "Nem todos vão entender-te, mas todos vão sentir a tua energia.",
  "Onde pões atenção, pões a tua luz.",
  "Quando respiras, o mundo respira contigo.",
  "Segue o brilho que só tu vês. Hoje é o dia.",
  "Volta a ti. A resposta já vive no teu peito.",
  "Tu és a casa antes do mundo.",
  "Confia no tempo divino, ele nunca se atrasa.",
  "A tua verdade não precisa gritar.",
  "A tua calma é magia em movimento."
];
let lastIndex = -1;
const oracleMsgEl = document.getElementById('oracle-msg');

function pickRandomMessage() {
  if (!oracleMsgs.length) return "Respira. Confia.";
  let idx = Math.floor(Math.random() * oracleMsgs.length);
  if (idx === lastIndex) { // evitar repetição imediata
    idx = (idx + 1) % oracleMsgs.length;
  }
  lastIndex = idx;
  return oracleMsgs[idx];
}

function showNewOracleMessage() {
  const msg = pickRandomMessage();
  oracleMsgEl.textContent = msg;
  navigator.clipboard?.writeText(msg).catch(()=>{});
}
document.getElementById('btn-nova').addEventListener('click', showNewOracleMessage);
document.getElementById('btn-copiar').addEventListener('click', () => {
  const txt = oracleMsgEl.textContent.trim();
  navigator.clipboard?.writeText(txt);
});

document.getElementById('btn-whatsapp').addEventListener('click', () => {
  const txt = oracleMsgEl.textContent.trim() || "Entre Mundos";
  const url = "https://wa.me/?text=" + encodeURIComponent(txt);
  window.location.href = url;
});

/* Respiração — animação simples */
const circle = document.getElementById('breath-circle');
const label = document.getElementById('breath-label');
let breathTimer = null;
const phases = [
  { name:'Inspira', seconds:4, hint:'Inspira…' },
  { name:'Sustém', seconds:4, hint:'Sustém…' },
  { name:'Expira', seconds:4, hint:'Expira…' },
  { name:'Pausa', seconds:4, hint:'Pausa…' },
];
let phaseIdx = 0, phaseRemaining = 0;

function startBreath() {
  phaseIdx = 0;
  phaseRemaining = phases[0].seconds;
  stepBreath();
  if (breathTimer) clearInterval(breathTimer);
  breathTimer = setInterval(stepBreath, 1000);
}
function stopBreath() {
  if (breathTimer) clearInterval(breathTimer);
  breathTimer = null;
  label.textContent = "Preparar…";
  circle.classList.remove('expanded');
}
function stepBreath() {
  const p = phases[phaseIdx];
  label.textContent = p.hint + " " + phaseRemaining + "s";
  if (p.name === 'Inspira') circle.classList.add('expanded');
  if (p.name === 'Expira') circle.classList.remove('expanded');

  phaseRemaining--;
  if (phaseRemaining < 0) {
    phaseIdx = (phaseIdx + 1) % phases.length;
    phaseRemaining = phases[phaseIdx].seconds;
  }
}
document.getElementById('breath-start').addEventListener('click', startBreath);
document.getElementById('breath-stop').addEventListener('click', stopBreath);

/* Momento de silêncio — temporizador */
const chips = document.querySelectorAll('.chip');
const customMin = document.getElementById('custom-min');
const timerEl = document.getElementById('timer');
let silenceInterval = null;
let totalSeconds = 60;
chips.forEach(ch => {
  ch.addEventListener('click', () => {
    chips.forEach(c => c.classList.remove('active'));
    ch.classList.add('active');
    const m = parseInt(ch.dataset.min, 10) || 1;
    totalSeconds = m * 60;
    customMin.value = m;
    renderTimer(totalSeconds);
  });
});
customMin.addEventListener('input', () => {
  const val = Math.max(1, parseInt(customMin.value||"1",10));
  totalSeconds = val * 60;
  chips.forEach(c => c.classList.remove('active'));
  renderTimer(totalSeconds);
});

function renderTimer(sec) {
  const m = String(Math.floor(sec/60)).padStart(2,'0');
  const s = String(sec%60).padStart(2,'0');
  timerEl.textContent = `${m}:${s}`;
}

function startSilence() {
  if (silenceInterval) clearInterval(silenceInterval);
  let remaining = totalSeconds;
  renderTimer(remaining);
  silenceInterval = setInterval(() => {
    remaining--;
    renderTimer(remaining);
    if (remaining <= 0) {
      clearInterval(silenceInterval);
      silenceInterval = null;
      // vibração leve (em alguns browsers)
      if (navigator.vibrate) navigator.vibrate(200);
    }
  }, 1000);
}
function stopSilence() {
  if (silenceInterval) clearInterval(silenceInterval);
  silenceInterval = null;
}
document.getElementById('silence-start').addEventListener('click', startSilence);
document.getElementById('silence-stop').addEventListener('click', stopSilence);

// Estado inicial
renderTimer(totalSeconds);
