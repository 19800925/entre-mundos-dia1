/*! respiracao.js – 4·4·4·4 simples */
(function(){
  const label = document.getElementById('resp-label');
  const btnStart = document.getElementById('resp-start');
  const btnStop  = document.getElementById('resp-stop');
  if(!label || !btnStart || !btnStop) return;

  const steps = [
    {name:'Inspira', secs:4},
    {name:'Sustém', secs:4},
    {name:'Expira', secs:4},
    {name:'Pausa',  secs:4},
  ];
  let t=null, i=0, c=0, running=false;

  function tick(){
    if(!running) return;
    const step = steps[i];
    label.textContent = step.name + ' ' + (step.secs-c);
    c++;
    if(c>step.secs){ i=(i+1)%steps.length; c=0; }
    t = setTimeout(tick, 1000);
  }
  btnStart.addEventListener('click', ()=>{
    if(running) return;
    running=true; i=0; c=0; label.textContent='Preparar…';
    clearTimeout(t); t=setTimeout(tick, 800);
  });
  btnStop.addEventListener('click', ()=>{
    running=false; clearTimeout(t); label.textContent='Preparar…';
  });
})();