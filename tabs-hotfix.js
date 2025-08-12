// tabs-hotfix.js — reforça a navegação por abas e estado inicial
(function(){
  const map = {
    mensagem:  document.getElementById('sec-mensagem'),
    respiracao:document.getElementById('sec-respiracao'),
    frase:     document.getElementById('sec-frase'),
    silencio:  document.getElementById('sec-silencio')
  };
  const tabs = Array.from(document.querySelectorAll('.tab'));

  function activate(key){
    tabs.forEach(t => t.classList.toggle('is-active', t.id === 'tab-'+key));
    Object.entries(map).forEach(([k,sec])=>{
      if(!sec) return;
      sec.classList.toggle('is-hidden', k !== key);
    });
    try{ localStorage.setItem('em:lastTab', key); }catch(e){}
  }

  tabs.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const key = btn.id.replace('tab-','');
      activate(key);
    });
  });

  let initial = 'mensagem';
  try{
    const last = localStorage.getItem('em:lastTab');
    if (last && map[last]) initial = last;
  }catch(e){}
  activate(initial);

  window.addEventListener('pageshow', (e)=>{
    if(e.persisted){ activate(localStorage.getItem('em:lastTab')||'mensagem'); }
  });
})();