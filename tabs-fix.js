/*! Entre Mundos — Tabs Fix (drop‑in) */
(function () {
  function $$(sel){ return Array.from(document.querySelectorAll(sel)); }
  function showTab(name){
    // Show/hide sections
    $$('[data-section]').forEach(sec => {
      const active = sec.dataset.section === name;
      sec.hidden = !active;
      sec.setAttribute('aria-hidden', (!active).toString());
    });
    // Update buttons state
    $$('[data-tab]').forEach(btn => {
      const active = btn.dataset.tab === name;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-selected', active ? 'true' : 'false');
      btn.setAttribute('tabindex', active ? '0' : '-1');
    });
    // Keep URL hash in sync (no scroll jump)
    const hash = '#' + name;
    if (location.hash !== hash) history.replaceState(null, '', hash);
  }

  function onClick(e){
    const btn = e.target.closest('[data-tab]');
    if(!btn) return;
    e.preventDefault();
    showTab(btn.dataset.tab);
  }

  function init(){
    document.addEventListener('click', onClick);
    // Initial tab: hash -> existing tab -> "mensagem"
    const all = $$('[data-tab]');
    const hash = location.hash.replace('#','');
    const first = all.length ? all[0].dataset.tab : 'mensagem';
    const start = all.some(b => b.dataset.tab === hash) ? hash : first;
    showTab(start);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
