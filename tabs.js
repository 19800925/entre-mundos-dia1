/*! tabs.js – simples e estável */
(function(){
  function show(id){
    document.querySelectorAll('section.card').forEach(s=>s.style.display='none');
    const el = document.getElementById(id);
    if (el) el.style.display='block';
    // o oráculo deve estar sempre visível juntamente com a aba escolhida
    if (id !== 'cardOraculo'){
      const orac = document.getElementById('cardOraculo');
      if (orac) orac.style.display='block';
    }
  }
  document.querySelectorAll('.chip[data-tab]').forEach(chip=>{
    chip.addEventListener('click', ()=> show(chip.dataset.tab));
  });
  // estado inicial
  show('tabMensagem');
})();