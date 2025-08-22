/*! respiracao.js – balão simples e instruções */
(function(){
  const sec = document.getElementById('tabRespiracao');
  if(!sec) return;
  let label = sec.querySelector('#breathInstruction');
  let ball  = sec.querySelector('#breathBalloon');
  if(!label){
    label = document.createElement('p'); label.id='breathInstruction'; label.className='note';
    sec.appendChild(label);
  }
  if(!ball){
    ball = document.createElement('div'); ball.id='breathBalloon'; sec.insertBefore(ball, label);
  }
  const steps = [
    {text: "Inspira (4)", scale: 1.35, ms: 4000},
    {text: "Sustém (4)",  scale: 1.35, ms: 4000},
    {text: "Expira (6)",  scale: 1.00, ms: 6000},
    {text: "Pausa (2)",   scale: 1.00, ms: 2000}
  ];
  let i=0;
  function loop(){
    const st = steps[i];
    label.textContent = st.text;
    ball.style.transition = `transform ${st.ms/1000}s ease-in-out`;
    ball.style.transform  = `scale(${st.scale})`;
    i = (i+1) % steps.length;
    setTimeout(loop, st.ms);
  }
  loop();
})();