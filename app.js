// Tabs + breathing + 1-min timer
(function(){
  const $ = (sel, ctx=document) => ctx.querySelector(sel);
  const $$ = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));

  // Tabs
  const tabs = $$('.tab');
  const panels = $$('.panel');
  tabs.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.tab;
      tabs.forEach(b => b.classList.toggle('active', b===btn));
      panels.forEach(p => p.hidden = p.dataset.section !== id);
    });
  });

  // Breathing orb 4-4-4-4
  const orb = $('#orb');
  const lbl = $('#orbLabel');
  const start = $('#btnStart');
  const stop = $('#btnStop');

  const phases = [
    {name:'Inspira...', scale:1.22, dur:4000},
    {name:'Sustém...', scale:1.22, dur:4000},
    {name:'Expira...', scale:0.9,  dur:4000},
    {name:'Pausa...',  scale:0.9,  dur:4000}
  ];
  let idx=0, timer=null;
  function step(){
    const p = phases[idx];
    lbl.textContent = p.name;
    orb.style.transform = `scale(${p.scale})`;
    timer = setTimeout(()=>{ idx=(idx+1)%phases.length; step(); }, p.dur);
  }
  function startBreath(){
    if(timer) return;
    idx = 0; step();
  }
  function stopBreath(){
    clearTimeout(timer); timer=null;
    lbl.textContent = 'Preparar...';
    orb.style.transform = 'scale(1)';
  }
  start.addEventListener('click', startBreath);
  stop.addEventListener('click', stopBreath);

  // Silêncio 1-min timer
  let qInt=null, remain=60;
  const qStart = $('#quietStart'), qStop = $('#quietStop'), qTime = $('#quietTime');
  const fmt = s => String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0');

  function tick(){
    remain--; qTime.textContent = fmt(remain);
    if(remain<=0){ clearInterval(qInt); qInt=null; alert('Tempo concluído.'); remain=60; qTime.textContent=fmt(remain); }
  }
  if(qStart){
    qStart.addEventListener('click', ()=>{
      if(qInt) return;
      remain=60; qTime.textContent=fmt(remain);
      qInt = setInterval(tick, 1000);
    });
  }
  if(qStop){ qStop.addEventListener('click', ()=>{ clearInterval(qInt); qInt=null; remain=60; qTime.textContent=fmt(remain); }); }

})();