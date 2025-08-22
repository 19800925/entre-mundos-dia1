/*! tabs-hotfix.js — estável */
(function(){
  function show(id){
    document.querySelectorAll('section.card').forEach(s=>s.style.display='none');
    const el = document.getElementById(id);
    if (el) el.style.display='block';
    const oracle = document.getElementById('cardOraculo');
    if (oracle && id !== 'cardOraculo') oracle.style.display = 'block';
  }
  document.querySelectorAll('.chip[data-tab]').forEach(chip=>{
    chip.addEventListener('click', ()=> show(chip.dataset.tab));
  });
  // estado inicial
  if (document.getElementById('tabMensagem')) show('tabMensagem');
})();