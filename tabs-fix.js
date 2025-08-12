// tabs-fix.js
(function () {
  function showTab(name, pushHash=true){
    const sections = document.querySelectorAll('[data-section]');
    const tabs = document.querySelectorAll('.tab-btn[data-tab]');
    sections.forEach(s => {
      if (s.dataset.section === name) s.removeAttribute('hidden');
      else s.setAttribute('hidden','');
    });
    tabs.forEach(t => {
      const active = t.dataset.tab === name;
      t.setAttribute('aria-selected', active ? 'true' : 'false');
      t.classList.toggle('is-active', active);
    });
    if (pushHash) {
      const newUrl = `${location.pathname}#${name}`;
      if (location.hash !== `#${name}`) history.replaceState(null,'',newUrl);
    }
  }

  function initTabs(){
    const tabs = document.querySelectorAll('.tab-btn[data-tab]');
    if (!tabs.length) return;
    tabs.forEach(btn=>{
      btn.addEventListener('click', (e)=>{
        e.preventDefault();
        showTab(btn.dataset.tab);
      }, {passive:true});
    });

    const fromHash = (location.hash || '').replace('#','');
    const first = tabs[0]?.dataset.tab || 'mensagem';
    const valid = t => ['mensagem','respiracao','frase','silencio'].includes(t);
    showTab(valid(fromHash) ? fromHash : first, false);

    window.addEventListener('hashchange', ()=>{
      const name = (location.hash || '').replace('#','');
      if (name) showTab(name, false);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTabs);
  } else {
    initTabs();
  }
})();