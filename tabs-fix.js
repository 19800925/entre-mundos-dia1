// tabs-fix.js — Entre Mundos
// Lida com abas por data-tab + data-section e atualiza o hash da URL.
// Requisitos no HTML:
//  - Botões/links com [data-tab="mensagem|respiracao|frase|silencio"]
//  - Secções com [data-section="..."] correspondentes
//  - A secção ativa NÃO deve ter o atributo hidden; as demais podem ter.

(function () {
  function $(sel, root = document) { return root.querySelector(sel); }
  function $all(sel, root = document) { return Array.from(root.querySelectorAll(sel)); }

  const tabButtons = $all('[data-tab]');
  const sections = $all('[data-section]');
  if (!tabButtons.length || !sections.length) return;

  function activate(name, push = true) {
    // Botões
    tabButtons.forEach(btn => {
      const isActive = btn.getAttribute('data-tab') === name;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-selected', String(isActive));
      // Para acessibilidade, role suave para o início da secção
      if (isActive) btn.blur();
    });
    // Secções
    sections.forEach(sec => {
      const show = sec.getAttribute('data-section') === name;
      if (show) {
        sec.removeAttribute('hidden');
      } else {
        sec.setAttribute('hidden', '');
      }
    });
    // Hash na URL (sem recarregar)
    if (push) {
      const url = new URL(location.href);
      url.hash = name;
      history.replaceState({ tab: name }, '', url);
    }
  }

  // Clique nas abas
  tabButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const name = btn.getAttribute('data-tab');
      activate(name, true);
    });
  });

  // Inicialização: pelo hash ou pela primeira aba ativa
  const allowed = new Set(sections.map(s => s.getAttribute('data-section')));
  const fromHash = location.hash ? location.hash.replace('#', '') : '';
  const initial =
    allowed.has(fromHash) ? fromHash :
    (tabButtons.find(b => b.classList.contains('active'))?.getAttribute('data-tab') ||
     sections[0].getAttribute('data-section'));
  activate(initial, false);

  // Suporte ao botão voltar/avançar
  window.addEventListener('hashchange', () => {
    const h = location.hash.replace('#', '');
    if (allowed.has(h)) activate(h, false);
  });
})();
