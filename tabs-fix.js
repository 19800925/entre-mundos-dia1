/*! Entre Mundos — tabs-fix.js (rev 2)
 *  Requisitos no HTML:
 *   - Botões/links com [data-tab="mensagem|respiracao|frase|silencio"]
 *   - Secções com [data-section="..."] correspondentes
 *   - Regra CSS: [data-section][hidden]{display:none}
 */
(function () {
  const $all = (sel, root=document) => Array.from(root.querySelectorAll(sel));

  function activate(name, pushHash=true){
    const tabs = $all('[data-tab]');
    const secs = $all('[data-section]');
    if (!tabs.length || !secs.length) return;

    // Atualiza abas
    for (const t of tabs){
      const on = t.getAttribute('data-tab') === name;
      t.classList.toggle('active', on);
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      if (on) { try { t.blur(); } catch(e){} }
    }

    // Mostra/esconde secções
    for (const s of secs){
      const show = s.getAttribute('data-section') === name;
      if (show) s.removeAttribute('hidden');
      else s.setAttribute('hidden','');
    }

    // Hash estável na URL (sem saltos)
    if (pushHash){
      const url = new URL(location.href);
      url.hash = name;
      history.replaceState({tab:name}, '', url);
    }
  }

  function onClick(e){
    const btn = e.target.closest('[data-tab]');
    if (!btn) return;
    e.preventDefault();
    activate(btn.getAttribute('data-tab'), true);
  }

  function init(){
    // Liga clicks (delegado para funcionar mesmo com elementos adicionados depois)
    document.addEventListener('click', onClick, {capture:false});

    const secs = $all('[data-section]');
    const tabs = $all('[data-tab]');
    if (!tabs.length || !secs.length) return;

    // Aba inicial: pela hash, senão pela primeira aba marcada como .active, senão pela primeira secção
    const allowed = new Set(secs.map(s => s.getAttribute('data-section')));
    const fromHash = (location.hash || '').replace('#','');
    const fromActive = tabs.find(b => b.classList.contains('active'))?.getAttribute('data-tab');
    const fallback = secs[0]?.getAttribute('data-section') || 'mensagem';
    const start = allowed.has(fromHash) ? fromHash : (fromActive || fallback);
    activate(start, false);

    // Botão voltar/avançar do navegador
    window.addEventListener('hashchange', () => {
      const h = (location.hash || '').replace('#','');
      if (allowed.has(h)) activate(h, false);
    });
  }

  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init, {once:true});
  } else {
    init();
  }
})();
