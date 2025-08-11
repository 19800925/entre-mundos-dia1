ENTRE MUNDOS — Fase 2 (Lite)
=============================
Este pacote contém:
- sw.js (novo) → melhor cache + atualizações rápidas
- Snippets JS prontos para colar no index.html (opcional, mantém o visual)

COMO USAR
---------
1) No GitHub, substitua o ficheiro sw.js da raiz por este (arraste e faça Commit).
2) Aguarde 1–2 minutos. Abra a app com ?v=7 no fim do link para forçar refresh:
   https://19800925.github.io/entre-mundos-dia1/?v=7
3) Se estiver instalada no ecrã do iPhone, apague o atalho e volte a "Adicionar ao Ecrã Principal".

SNIPPET #1 — Respiração (mesmo visual, transição mais suave)
----------------------------------------------------------------
Cole no <script> do seu index.html, substituindo apenas a parte da respiração.

// Respiração (rAF para suavizar, mantém 4•4•4•4)
let breathTimer=null, phase=0; const phases=['Inspira','Sustenha','Expira','Pausa'];
const circle=document.getElementById('circle'), btxt=document.getElementById('breath-text');

function stepPhase(){
  const p = phases[phase % 4];
  if (btxt) btxt.textContent = p;
  const target = (p==='Inspira') ? 1.2 : (p==='Expira' ? 0.9 : 1.05);
  const start = performance.now(); const dur = 750;
  const from = 1; // escala base

  function anim(t){
    const k = Math.min(1, (t - start)/dur);
    const scale = from + (target - from)*k;
    if (circle) circle.style.transform = `scale(${scale})`;
    if(k<1) requestAnimationFrame(anim);
  }
  requestAnimationFrame(anim);
  phase++;
}

document.getElementById('start-breath')?.addEventListener('click', ()=>{
  if (breathTimer) return;
  phase = 0; stepPhase();
  breathTimer = setInterval(stepPhase, 4000);
});
document.getElementById('stop-breath')?.addEventListener('click', ()=>{
  clearInterval(breathTimer); breathTimer=null;
  if (btxt) btxt.textContent='Pausa';
  if (circle) circle.style.transform='scale(1)';
});

SNIPPET #2 — Silêncio (guardar última duração escolhida)
--------------------------------------------------------
Cole no seu <script>, sem remover o que já existe.

const minsInput = document.getElementById('minutes');
if (minsInput) {
  const saved = localStorage.getItem('entre-mundos-dia1-silencio-mins');
  if (saved) minsInput.value = saved;
  minsInput.addEventListener('change', ()=> {
    localStorage.setItem('entre-mundos-dia1-silencio-mins', minsInput.value);
  });
}
