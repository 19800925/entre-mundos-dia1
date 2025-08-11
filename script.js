
(function(){
  const pills = document.querySelectorAll('.pill');
  const customMin = document.getElementById('customMin');
  const counter = document.getElementById('counter');
  const startBtn = document.getElementById('startBtn');
  const stopBtn = document.getElementById('stopBtn');
  let timer = null;
  let remaining = 60;

  function fmt(sec){
    const m = Math.floor(sec/60).toString().padStart(2,'0');
    const s = Math.floor(sec%60).toString().padStart(2,'0');
    return `${m}:${s}`;
  }
  function setMinutes(min){
    remaining = Math.max(1, Number(min)) * 60;
    counter.textContent = fmt(remaining);
  }
  pills.forEach(p => p.addEventListener('click', () => {
    setMinutes(p.dataset.min);
    customMin.value = p.dataset.min;
  }));
  customMin.addEventListener('change', e => setMinutes(e.target.value));

  startBtn.addEventListener('click', () => {
    if(timer) clearInterval(timer);
    const endAt = Date.now() + remaining*1000;
    timer = setInterval(() => {
      remaining = Math.max(0, Math.round((endAt - Date.now())/1000));
      counter.textContent = fmt(remaining);
      if(remaining <= 0){ clearInterval(timer); timer=null; }
    }, 250);
  });
  stopBtn.addEventListener('click', () => {
    if(timer) clearInterval(timer);
    timer = null;
  });

  // Simple tabs active style on hash change
  const tabs = document.querySelectorAll('.tab');
  function updateTabs(){
    const h = location.hash || '#mensagem';
    tabs.forEach(t => t.classList.toggle('active', t.getAttribute('href') === h));
  }
  window.addEventListener('hashchange', updateTabs);
  updateTabs();

  // default
  setMinutes(1);

  // Breathing demo (text only)
  let breathTimer=null, phase=0, phases=['Inspira','Sustém','Expira','Pausa'];
  const breathStart=document.getElementById('breathStart');
  const breathStop=document.getElementById('breathStop');
  breathStart?.addEventListener('click',()=>{
    if(breathTimer) clearInterval(breathTimer);
    phase=0;
    breathTimer=setInterval(()=>{
      phase=(phase+1)%4;
    },4000);
  });
  breathStop?.addEventListener('click',()=>{ if(breathTimer) clearInterval(breathTimer); breathTimer=null; });
})();
