// Temporizador de Silêncio — Entre Mundos
(function(){
  const chips = Array.from(document.querySelectorAll('.chip[data-min]'));
  const inputMin = document.getElementById('silencioMin');
  const display = document.getElementById('silencioDisplay');
  const btnStart = document.getElementById('btnIniciarSilencio');
  const btnStop = document.getElementById('btnPararSilencio');

  let totalSeconds = 60;
  let leftSeconds = totalSeconds;
  let timer = null;

  function setMinutes(min){
    const m = Math.max(1, parseInt(min || 1, 10));
    totalSeconds = m * 60;
    leftSeconds = totalSeconds;
    render();
  }

  function pad(n){ return n < 10 ? '0'+n : ''+n; }

  function render(){
    const m = Math.floor(leftSeconds / 60);
    const s = leftSeconds % 60;
    display.textContent = pad(m) + ':' + pad(s);
  }

  function tick(){
    if(leftSeconds <= 0){
      clearInterval(timer);
      timer = null;
      leftSeconds = 0;
      render();
      // vibração curta (alguns browsers/iOS podem ignorar)
      if(navigator.vibrate){ navigator.vibrate([120,60,120]); }
      return;
    }
    leftSeconds--;
    render();
  }

  function start(){
    if(timer){ clearInterval(timer); }
    // se o utilizador alterou manualmente o campo, usa-o
    const chosen = parseInt(inputMin.value,10);
    if(!isNaN(chosen) && chosen>0){
      setMinutes(chosen);
    }
    timer = setInterval(tick, 1000);
  }

  function stop(){
    if(timer){ clearInterval(timer); timer = null; }
    leftSeconds = totalSeconds;
    render();
  }

  // eventos
  chips.forEach(ch => {
    ch.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      ch.classList.add('active');
      const m = parseInt(ch.getAttribute('data-min'),10);
      inputMin.value = m;
      setMinutes(m);
    });
  });

  btnStart?.addEventListener('click', start);
  btnStop?.addEventListener('click', stop);

  // init com 1 minuto
  setMinutes(1);
})();
