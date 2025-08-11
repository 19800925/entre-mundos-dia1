// sw-nuke.js — desregista qualquer service worker e limpa caches
(function(){
  if (!('serviceWorker' in navigator)) return;
  // 1) Desregistar todos
  navigator.serviceWorker.getRegistrations().then(function(regs){
    regs.forEach(function(reg){ reg.unregister(); });
  });
  // 2) Limpar todos os caches
  if (window.caches && caches.keys) {
    caches.keys().then(function(keys){
      keys.forEach(function(k){ caches.delete(k); });
    });
  }
  // 3) Marca no localStorage que foi feito reset (útil para debug)
  try { localStorage.setItem('sw_nuked_at', Date.now().toString()); } catch(_){}
})();