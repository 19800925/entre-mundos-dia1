const navItems = document.querySelectorAll('.nav-item');
const screens = document.querySelectorAll('.screen');
const activeKey = 'entreMundos.v3.active';

function showScreen(id){
  navItems.forEach(btn => btn.classList.toggle('active', btn.dataset.tab === id));
  screens.forEach(screen => screen.classList.toggle('active', screen.id === id));
  localStorage.setItem(activeKey, id);
}
navItems.forEach(btn => btn.addEventListener('click', () => showScreen(btn.dataset.tab)));
showScreen(localStorage.getItem(activeKey) || 'mensagem');

const oraclePhrases = [
  'Tudo o que procuras lá fora, já vive em ti.',
  'Nem tudo o que abranda te atrasa.',
  'A tua sensibilidade não é excesso. É direção.',
  'Hoje, escolhe ficar onde a tua alma respira melhor.',
  'Há luz em ti mesmo quando ainda não a vês.',
  'O silêncio também te responde.',
  'A tua paz vale mais do que a urgência dos outros.',
  'Respira antes de decidir. A pressa confunde.',
  'O coração também pede espaço.',
  'Recomeçar também é uma forma de coragem.',
  'Há beleza em abrandar sem culpa.',
  'Nem toda a ferida quer resposta. Algumas pedem colo.',
  'És permitido sentir sem te perderes.',
  'O invisível também sustenta.',
  'Há ciclos que acabam para que a tua alma respire.',
  'A tua intuição fala baixo. Fica perto.',
  'O que hoje parece vazio pode ser espaço sagrado.',
  'Protege a tua energia sem endurecer o coração.',
  'Não confundas intensidade com destino.',
  'O que te honra raramente te esmaga.',
  'Respirar fundo também é um ato espiritual.',
  'O teu ritmo também merece respeito.',
  'Quando te escolhes, algo em ti volta para casa.',
  'Hoje basta uma coisa: não te abandones.',
  'A tua alma não se atrasa.',
  'Confia no que te devolve a ti.',
  'O dia muda quando voltas ao centro.',
  'Há força em quem sabe parar.',
  'A tua luz não precisa de permissão.',
  'Hoje, sê porto para ti mesmo.',
  'Mesmo em transição, continuas guiado.',
  'Há uma parte tua que já sabe o próximo passo.',
  'A paz começa quando deixas de lutar contra ti.',
  'O que é teu encontra-te mesmo sem ruído.',
  'A tua verdade pode ser suave e ainda assim firme.',
  'Há respostas que só aparecem depois do descanso.',
  'Fica onde a tua verdade não encolhe.',
  'Há uma vida em ti à espera de menos medo.',
  'Nem sempre é o fim. Às vezes é limpeza.',
  'Também é progresso quando escolhes não voltar ao mesmo.',
  'Escuta o que te acalma. Aí há verdade.',
  'O teu corpo sabe quando algo já não te pertence.',
  'Hoje, menos defesa. Mais presença.',
  'Mesmo cansado, continuas inteiro.',
  'Não te apagues para caber no dia de ninguém.',
  'Nem tudo precisa de explicação para fazer sentido.',
  'O que é leve não é vazio. Pode ser maturidade.',
  'Há encontros que chegam quando paras de correr.',
  'Há portas que só abrem quando deixas de forçar.',
  'A tua presença vale mais do que a tua pressa.',
  'Nem tudo o que perdeste era teu para sempre.',
  'Também é sagrado repousar.',
  'Aquilo que te chama em silêncio merece atenção.',
  'Pára um instante. Há mais sabedoria em ti do que pensas.',
  'Há força em quem abranda sem culpa.',
  'Hoje, sê abrigo para ti.',
  'A calma também pode transformar tudo.',
  'Nem tudo o que dói é amor.',
  'A tua luz continua, mesmo quando vacilas.',
  'Voltar a ti também é caminho.'
];

let seenOracleIndexes = JSON.parse(localStorage.getItem('entreMundos.v3.seen') || '[]');
const oracleText = document.getElementById('oracleText');
const oracleCounter = document.getElementById('oracleCounter');
const newOracleBtn = document.getElementById('newOracleBtn');
const shareOracleBtn = document.getElementById('shareOracleBtn');

function updateOracleCounter(){
  oracleCounter.textContent = `${seenOracleIndexes.length || 1} de ${oraclePhrases.length}`;
}

function swapOracle(text){
  oracleText.animate(
    [{opacity:.2, transform:'translateY(8px)'},{opacity:1, transform:'translateY(0)'}],
    {duration:260,easing:'ease'}
  );
  oracleText.textContent = text;
}

function nextOracle(){
  if(seenOracleIndexes.length >= oraclePhrases.length) seenOracleIndexes = [];
  const available = oraclePhrases.map((_, i) => i).filter(i => !seenOracleIndexes.includes(i));
  const pick = available[Math.floor(Math.random() * available.length)];
  seenOracleIndexes.push(pick);
  localStorage.setItem('entreMundos.v3.seen', JSON.stringify(seenOracleIndexes));
  swapOracle(oraclePhrases[pick]);
  updateOracleCounter();
}

if (newOracleBtn) newOracleBtn.addEventListener('click', nextOracle);

if (shareOracleBtn) {
  shareOracleBtn.addEventListener('click', async () => {
    const text = oracleText.textContent;
    if (navigator.share) {
      try { await navigator.share({ title: 'Entre Mundos', text }); } catch {}
    } else {
      await navigator.clipboard.writeText(text);
      shareOracleBtn.textContent = 'COPIADA';
      setTimeout(() => shareOracleBtn.textContent = 'PARTILHAR', 1200);
    }
  });
}

if (oracleText && !oracleText.textContent.trim()) nextOracle();
updateOracleCounter();

const breathVisual = document.getElementById('breathVisual');
const breathStage = document.getElementById('breathStage');
const startBreathBtn = document.getElementById('startBreathBtn');
const resetBreathBtn = document.getElementById('resetBreathBtn');
let breathTimer = null;
let runningBreath = false;

function resetBreath(){
  clearTimeout(breathTimer);
  runningBreath = false;
  breathVisual.className = 'breath-orb';
  breathStage.innerHTML = 'INSPIRA<br><strong>4s</strong>';
}

function runBreathCycle(cycle = 1){
  if (!runningBreath) return;
  breathVisual.className = 'breath-orb expand';
  breathStage.innerHTML = 'INSPIRA<br><strong>4s</strong>';
  breathTimer = setTimeout(() => {
    breathVisual.className = 'breath-orb hold';
    breathStage.innerHTML = 'SEGURA<br><strong>4s</strong>';
    breathTimer = setTimeout(() => {
      breathVisual.className = 'breath-orb contract';
      breathStage.innerHTML = 'EXPIRA<br><strong>6s</strong>';
      breathTimer = setTimeout(() => {
        if (cycle < 5 && runningBreath) runBreathCycle(cycle + 1);
        else resetBreath();
      }, 6000);
    }, 4000);
  }, 4000);
}

if (startBreathBtn) {
  startBreathBtn.addEventListener('click', () => {
    resetBreath();
    runningBreath = true;
    runBreathCycle();
  });
}
if (resetBreathBtn) resetBreathBtn.addEventListener('click', resetBreath);

const silenceTime = document.getElementById('silenceTime');
const silenceRing = document.getElementById('silenceRing');
const presets = document.querySelectorAll('.preset');
const startSilenceBtn = document.getElementById('startSilenceBtn');
const pauseSilenceBtn = document.getElementById('pauseSilenceBtn');
const resetSilenceBtn = document.getElementById('resetSilenceBtn');

let silenceSelected = 120;
let silenceRemaining = 120;
let silenceInterval = null;

function formatTime(sec){
  const m = String(Math.floor(sec / 60)).padStart(2, '0');
  const s = String(sec % 60).padStart(2, '0');
  return `${m}:${s}`;
}

function renderSilence(){
  silenceTime.textContent = formatTime(silenceRemaining);
  const progress = ((silenceSelected - silenceRemaining) / silenceSelected) * 360;
  silenceRing.style.background = `conic-gradient(var(--ring) ${progress}deg, rgba(95,70,140,.4) 0deg)`;
}

function stopSilence(){
  clearInterval(silenceInterval);
  silenceInterval = null;
}

presets.forEach(btn => {
  btn.addEventListener('click', () => {
    presets.forEach(b => b.classList.remove('gold', 'active'));
    btn.classList.add('gold', 'active');
    silenceSelected = Number(btn.dataset.seconds);
    silenceRemaining = silenceSelected;
    stopSilence();
    renderSilence();
  });
});

if (startSilenceBtn) {
  startSilenceBtn.addEventListener('click', () => {
    stopSilence();
    silenceInterval = setInterval(() => {
      if (silenceRemaining > 0) {
        silenceRemaining--;
        renderSilence();
      } else {
        stopSilence();
      }
    }, 1000);
  });
}

if (pauseSilenceBtn) pauseSilenceBtn.addEventListener('click', stopSilence);

if (resetSilenceBtn) {
  resetSilenceBtn.addEventListener('click', () => {
    stopSilence();
    silenceRemaining = silenceSelected;
    renderSilence();
  });
}

renderSilence();
