// app-bfcache-fix.js — força reload ao voltar do histórico (bfcache) no iOS/Safari
(function () {
  function cameFromBackForward() {
    try {
      // Navigation Timing Level 2 (mais fiável)
      var nav = performance.getEntriesByType && performance.getEntriesByType('navigation');
      if (nav && nav[0] && nav[0].type === 'back_forward') return true;
    } catch (_) {}
    return false;
  }

  // 1) Caso a página venha do bfcache
  window.addEventListener('pageshow', function (e) {
    if (e.persisted || cameFromBackForward()) {
      // bust de cache simples
      var url = new URL(location.href);
      url.searchParams.set('r', Date.now().toString());
      location.replace(url.toString());
    }
  }, { once: true });
})();