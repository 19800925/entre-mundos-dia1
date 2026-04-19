const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.panel');
const storageTabKey = 'entreMundos.activeTab.v2';

function setActiveTab(id) {
  tabs.forEach(tab => tab.classList.toggle('active', tab.dataset.tab === id));
  panels.forEach(panel => panel.classList.toggle('active', panel.id === id));
  localStorage.setItem(storageTabKey, id);
}

tabs.forEach(tab => tab.addEventListener('click', () => setActiveTab(tab.dataset.tab)));
setActiveTab(localStorage.getItem(storageTabKey) || 'oraculo');

const oraclePhrases = [
  'Nem tudo o que abranda te atrasa.',
  'Há portas que só abrem quando deixas de forçar.',
  'A tua sensibilidade não é excesso. É direção.',
  'Hoje, escolhe ficar onde a tua alma respira melhor.',
  'Há luz em ti mesmo quando ainda não a vês.',
  'Nem toda a dúvida é fraqueza. Às vezes é travessia.',
  'O silêncio também te responde.',
  'O que é verdadeiro em ti não precisa de gritar.',
  'Descansa. Nem sempre tens de carregar o mundo.',
  'A tua paz vale mais do que a urgência dos outros.',
  'Há encontros que chegam quando paras de correr.',
  'O teu corpo sabe quando algo já não te pertence.',
  'Respira antes de decidir. A pressa confunde.',
  'Nem tudo o que perdeste era teu para sempre.',
  'O coração também pede espaço.',
  'O caminho certo nem sempre vem com certeza. Vem com calma.',
  'Aquilo que te chama em silêncio merece atenção.',
  'Não te apagues para caber no dia de ninguém.',
  'A tua verdade pode ser suave e ainda assim firme.',
  'Recomeçar também é uma forma de coragem.',
  'Há beleza em abrandar sem culpa.',
  'O que é teu encontra-te mesmo sem ruído.',
  'Pára um instante. Há mais sabedoria em ti do que pensas.',
  'Nem toda a ferida quer resposta. Algumas pedem colo.',
  'És permitido sentir sem te perderes.',
  'Hoje, menos defesa. Mais presença.',
  'Mesmo cansado, continuas inteiro.',
  'Há uma parte tua que já sabe o próximo passo.',
  'A paz começa quando deixas de lutar contra ti.',
  'O invisível também sustenta.',
  'Há ciclos que acabam para que a tua alma respire.',
  'Escuta o que te acalma. Aí há verdade.',
  'Nem tudo precisa de explicação para fazer sentido.',
  'A tua intuição fala baixo. Fica perto.',
  'O que hoje parece vazio pode ser espaço sagrado.',
  'Protege a tua energia sem endurecer o coração.',
  'Há respostas que só aparecem depois do descanso.',
  'Não confundas intensidade com destino.',
  'Também é progresso quando escolhes não voltar ao mesmo.',
  'O que te honra raramente te esmaga.',
  'Fica onde a tua verdade não encolhe.',
  'Há uma vida em ti à espera de menos medo.',
  'Respirar fundo também é um ato espiritual.',
  'Ser sensível não te torna fraco. Torna-te inteiro.',
  'O teu ritmo também merece respeito.',
  'Nem sempre é o fim. Às vezes é limpeza.',
  'O que é leve não é vazio. Pode ser maturidade.',
  'Quando te escolhes, algo em ti volta para casa.',
  'Hoje basta uma coisa: não te abandones.',
  'A tua alma não se atrasa.',
  'Nem tudo o que dói é amor.',
  'A calma também pode transformar tudo.',
  'Confia no que te devolve a ti.',
  'A tua presença vale mais do que a tua pressa.',
  'O dia muda quando voltas ao centro.',
  'Não precisas de ser compreendido por todos para seres verdadeiro.',
  'Há força em quem sabe parar.',
  'A tua luz não precisa de permissão.',
  'Hoje, sê porto para ti mesmo.',
  'Mesmo em transição, continuas guiado.'
];

const quotes = [
  'Mesmo no escuro, a tua luz interior sabe o caminho.',
  'Há dias em que voltar a ti já é vitória.',
  'Nem todo o silêncio é vazio. Às vezes é cura.',
  'O universo não te pede perfeição. Pede presença.',
  'Aquilo que é real em ti sobrevive ao ruído.'
];

let seenOracleIndexes = JSON.parse(localStorage.getItem('entreMundos.oracleSeen.v2') || '[]');
const oracleText = document.getElementById('oracleText');
const oracleCounter = document.getElementById('oracleCounter');
const newOracleBtn = document.getElementById('newOracleBtn');
const copyOracleBtn = document.getElementById('copyOracleBtn');
const shareOracleBtn = document.getElementById('shareOracleBtn');

function swapText(el, text) {
  el.classList.add('fade-swap');
  setTimeout(() => {
    el.textContent = text;
    el.classList.remove('fade-swap');
  }, 170);
}

function updateOracleCounter() {
  oracleCounter.textContent = `${seenOracleIndexes.length} de ${oraclePhrases.length}`;
}

function nextOracle() {
  if (seenOracleIndexes.length === oraclePhrases.length) seenOracleIndexes = [];
  const remaining = oraclePhrases.map((_, i) => i).filter(i => !seenOracleIndexes.includes(i));
  const choice = remaining[Math.floor(Math.random() * remaining.length)];
  seenOracleIndexes.push(choice);
  localStorage.setItem('entreMundos.oracleSeen.v2', JSON.stringify(seenOracleIndexes));
  swapText(oracleText, oraclePhrases[choice]);
  updateOracleCounter();
}

function copyText(text, button) {
  navigator.clipboard.writeText(text).then(() => {
    const original = button.textContent;
    button.textContent = 'Copiado';
    setTimeout(() => button.textContent = original, 1200);
  });
}

newOracleBtn.addEventListener('click', nextOracle);
copyOracleBtn.addEventListener('click', () => copyText(oracleText.textContent, copyOracleBtn));
shareOracleBtn.addEventListener('click', () => {
  const text = encodeURIComponent(oracleText.textContent);
  window.open(`https://wa.me/?text=${text}`, '_blank');
});
updateOracleCounter();

const dailyQuote = document.getElementById('dailyQuote');
const newQuoteBtn = document.getElementById('newQuoteBtn');
const copyQuoteBtn = document.getElementById('copyQuoteBtn');

newQuoteBtn.addEventListener('click', () => {
  const current = dailyQuote.textContent;
  const options = quotes.filter(q => q !== current);
  swapText(dailyQuote, options[Math.floor(Math.random() * options.length)] || quotes[0]);
});
copyQuoteBtn.addEventListener('click', () => copyText(dailyQuote.textContent, copyQuoteBtn));

const breathVisual = document.getElementById('breathVisual');
const breathStage = document.getElementById('breathStage');
const startBreathBtn = document.getElementById('startBreathBtn');
const resetBreathBtn = document.getElementById('resetBreathBtn');
let breathTimeouts = [];
let breathRunning = false;

function clearBreath() {
  breathTimeouts.forEach(clearTimeout);
  breathTimeouts = [];
  breathRunning = false;
  breathVisual.className = 'breath-visual';
  breathStage.textContent = 'Pronto para começar';
}

function queueBreath(delay, action) {
  breathTimeouts.push(setTimeout(action, delay));
}

function startBreathing() {
  if (breathRunning) return;
  clearBreath();
  breathRunning = true;
  const cycle = [
    { label: 'Inspira • 4', className: 'expand', duration: 4000 },
    { label: 'Segura • 4', className: 'hold', duration: 4000 },
    { label: 'Expira • 6', className: 'contract', duration: 6000 },
  ];

  let elapsed = 0;
  for (let c = 0; c < 5; c++) {
    cycle.forEach(step => {
      queueBreath(elapsed, () => {
        breathVisual.className = `breath-visual ${step.className}`;
        breathStage.textContent = step.label;
      });
      elapsed += step.duration;
    });
  }

  queueBreath(elapsed, () => {
    breathVisual.className = 'breath-visual';
    breathStage.textContent = 'Terminaste. Fica mais um instante.';
    breathRunning = false;
  });
}

startBreathBtn.addEventListener('click', startBreathing);
resetBreathBtn.addEventListener('click', clearBreath);

const silenceTime = document.getElementById('silenceTime');
const silenceHint = document.getElementById('silenceHint');
const startSilenceBtn = document.getElementById('startSilenceBtn');
const pauseSilenceBtn = document.getElementById('pauseSilenceBtn');
const resetSilenceBtn = document.getElementById('resetSilenceBtn');
const presets = document.querySelectorAll('.preset');

let selectedSeconds = 60;
let remainingSeconds = selectedSeconds;
let silenceInterval = null;

function formatTime(seconds) {
  const m = String(Math.floor(seconds / 60)).padStart(2, '0');
  const s = String(seconds % 60).padStart(2, '0');
  return `${m}:${s}`;
}

function renderSilence() {
  silenceTime.textContent = formatTime(remainingSeconds);
}

function stopSilenceInterval() {
  if (silenceInterval) clearInterval(silenceInterval);
  silenceInterval = null;
}

presets.forEach(btn => {
  btn.addEventListener('click', () => {
    presets.forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    selectedSeconds = Number(btn.dataset.seconds);
    remainingSeconds = selectedSeconds;
    stopSilenceInterval();
    silenceHint.textContent = 'Respira. Fica. Não tens de fazer mais nada.';
    renderSilence();
  });
});

startSilenceBtn.addEventListener('click', () => {
  if (silenceInterval) return;
  silenceHint.textContent = 'Mantém-te presente. Deixa o tempo cair em ti.';
  silenceInterval = setInterval(() => {
    remainingSeconds -= 1;
    renderSilence();
    if (remainingSeconds <= 0) {
      stopSilenceInterval();
      silenceHint.textContent = 'Terminou. Leva esta calma contigo.';
      remainingSeconds = 0;
      renderSilence();
    }
  }, 1000);
});

pauseSilenceBtn.addEventListener('click', () => {
  stopSilenceInterval();
  silenceHint.textContent = 'Pausado. Retoma quando quiseres.';
});

resetSilenceBtn.addEventListener('click', () => {
  stopSilenceInterval();
  remainingSeconds = selectedSeconds;
  silenceHint.textContent = 'Respira. Fica. Não tens de fazer mais nada.';
  renderSilence();
});

renderSilence();

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  });
}
