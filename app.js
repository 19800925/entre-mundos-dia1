// app.js — Entre Mundos
(function(){
  // tabs
  const tabs = document.querySelectorAll('.tab');
  const panes = document.querySelectorAll('.pane');
  function show(tabName){
    panes.forEach(p => p.hidden = p.dataset.section !== tabName);
    tabs.forEach(t => {
      const active = t.dataset.tab === tabName;
      t.classList.toggle('active', active);
      t.setAttribute('aria-selected', active);
    });
    localStorage.setItem('em:tab', tabName);
  }
  tabs.forEach(t => t.addEventListener('click', () => show(t.dataset.tab)));
  show(localStorage.getItem('em:tab') || 'mensagem');

  // Oráculo
  const mensagens = [
    "A tua luz guia-te no silêncio.",
    "Confia no tempo divino, ele nunca se atrasa.",
    "Nem todos vão entender-te, mas todos vão sentir a tua energia.",
    "A calma abre portas que a pressa não vê.",
    "Hoje, escolhe ser gentileza para ti."
  ];
  let last = -1;
  const ora = document.getElementById('ora-msg');
  function nova(){
    let i;
    do { i = Math.floor(Math.random()*mensagens.length); } while(i===last && mensagens.length>1);
    last = i;
    ora.textContent = mensagens[i];
  }
  document.getElementById('btn-nova').addEventListener('click', nova);
  document.getElementById('btn-copiar').addEventListener('click', async () => {
    try{ await navigator.clipboard.writeText(ora.textContent||""); alert('Copiado!'); }catch(e){ alert('Não foi possível copiar.'); }
  });
  document.getElementById('btn-whats').addEventListener('click', () => {
    const txt = encodeURIComponent(ora.textContent||"");
    const url = 'https://wa.me/?text=' + txt;
    window.open(url, '_blank');
  });
})();