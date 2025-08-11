// Força recarregar a página quando voltas pelo histórico (iOS/Safari bfcache)
(function () {
  function shouldReloadOnBack(e) {
    // 1) pageshow com persisted=true → veio do bfcache
    if (e && e.persisted) return true;
    // 2) Navigation Timing Level 2
    try {
      var nav = performance.getEntriesByType && performance.getEntriesByType('navigation');
      if (nav && nav[0] && nav[0].type === 'back_forward') return true;
    } catch (_) {}
    return false;
  }

  window.addEventListener('pageshow', function (e) {
    if (shouldReloadOnBack(e)) {
      // Adiciona um bust de cache simples
      var url = new URL(window.location.href);
      url.searchParams.set('r', String(Date.now()));
      window.location.replace(url.toString());
    }
  }, { once: true });
})();