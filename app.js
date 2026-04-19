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

function updateOracleCounter(){ oracleCounter.textContent = `${seenOracleIndexes.length || 1} de ${oraclePhrases.length}`; }
function swapOracle(text){ oracleText.animate([{opacity:.2, transform:'translateY(8px)'},{opacity:1, transform:'translateY(0)'}],{duration:260,easing:'ease'}); oracleText.textContent = text; }
function nextOracle(){
  if(seenOracleIndexes.length === oraclePhrases.length) seenOracleIndexes = [];
  const remaining = oraclePhrases.map((_, i) => i).filter(i => !seenOracleIndexes.includes(i));
  const index = remaining[Math.floor(Math.random() * remaining.length)];
  seenOracleIndexes.push(index);
  localStorage.setItem('entreMundos.v3.seen', JSON.stringify(seenOracleIndexes));
  swapOracle(oraclePhrases[index]);
  updateOracleCounter();
}
newOracleBtn.addEventListener('click', nextOracle);
shareOracleBtn.addEventListener('click', () => window.open(`https://wa.me/?text=${encodeURIComponent(oracleText.textContent)}`, '_blank'));
updateOracleCounter();

const breathVisual = document.getElementById('breathVisual');
const breathStage = document.getElementById('breathStage');
const startBreathBtn = document.getElementById('startBreathBtn');
const resetBreathBtn = document.getElementById('resetBreathBtn');
let breathTimeouts = []; let breathRunning = false;
function clearBreath(){ breathTimeouts.forEach(clearTimeout); breathTimeouts=[]; breathRunning=false; breathVisual.className='breath-orb'; breathStage.innerHTML='INSPIRA<br><strong>4s</strong>'; }
function queueBreath(delay, fn){ breathTimeouts.push(setTimeout(fn, delay)); }
function startBreathing(){
  if(breathRunning) return; clearBreath(); breathRunning=true;
  const cycle=[{html:'INSPIRA<br><strong>4s</strong>',cls:'expand',dur:4000},{html:'SEGURA<br><strong>4s</strong>',cls:'hold',dur:4000},{html:'EXPIRA<br><strong>6s</strong>',cls:'contract',dur:6000}];
  let elapsed = 0;
  for(let c=0;c<5;c++) for(const step of cycle){
    queueBreath(elapsed,()=>{ breathVisual.className=`breath-orb ${step.cls}`; breathStage.innerHTML=step.html; });
    elapsed += step.dur;
  }
  queueBreath(elapsed,()=>{ breathVisual.className='breath-orb'; breathStage.innerHTML='TERMINOU<br><strong>✓</strong>'; breathRunning=false; });
}
startBreathBtn.addEventListener('click', startBreathing);
resetBreathBtn.addEventListener('click', clearBreath);

const presets = document.querySelectorAll('.preset');
const silenceTime = document.getElementById('silenceTime');
const silenceHint = document.getElementById('silenceHint');
const silenceRing = document.getElementById('silenceRing');
const startSilenceBtn = document.getElementById('startSilenceBtn');
const pauseSilenceBtn = document.getElementById('pauseSilenceBtn');
const resetSilenceBtn = document.getElementById('resetSilenceBtn');
let selectedSeconds=120, remainingSeconds=120, silenceInterval=null;
function formatTime(s){return `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;}
function renderSilence(){
  silenceTime.textContent = formatTime(remainingSeconds);
  const progress = ((selectedSeconds - remainingSeconds) / selectedSeconds) * 360;
  silenceRing.style.background = `conic-gradient(var(--ring) ${progress}deg, rgba(95,70,140,.38) ${progress}deg)`;
}
function stopSilence(){ if(silenceInterval) clearInterval(silenceInterval); silenceInterval=null; }
presets.forEach(btn => btn.addEventListener('click', ()=>{ presets.forEach(b=>b.classList.remove('active','gold')); btn.classList.add('active','gold'); selectedSeconds=Number(btn.dataset.seconds); remainingSeconds=selectedSeconds; stopSilence(); silenceHint.textContent='Respira. Fica. Não tens de fazer mais nada.'; renderSilence(); }));
startSilenceBtn.addEventListener('click', ()=>{ if(silenceInterval) return; silenceHint.textContent='Mantém-te presente. Deixa o tempo cair em ti.'; silenceInterval=setInterval(()=>{ remainingSeconds--; renderSilence(); if(remainingSeconds<=0){ stopSilence(); remainingSeconds=0; renderSilence(); silenceHint.textContent='Terminou. Leva esta calma contigo.'; } },1000); });
pauseSilenceBtn.addEventListener('click', ()=>{ stopSilence(); silenceHint.textContent='Pausado. Retoma quando quiseres.';});
resetSilenceBtn.addEventListener('click', ()=>{ stopSilence(); remainingSeconds=selectedSeconds; silenceHint.textContent='Respira. Fica. Não tens de fazer mais nada.'; renderSilence();});
renderSilence();

if('serviceWorker' in navigator){ window.addEventListener('load', ()=> navigator.serviceWorker.register('./sw.js').catch(()=>{})); }
