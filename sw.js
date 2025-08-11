// sw.js v34 — desregista antigos, sem cache agressiva
const VERSION = 'v34';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    // Limpa caches
    if (self.caches) {
      const names = await caches.keys();
      await Promise.all(names.map((n) => caches.delete(n)));
    }
    // Desregista este SW na próxima navegação (opcional: comentar para manter)
    try { const reg = await self.registration.unregister(); } catch (_) {}
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request, { cache: 'no-store' }));
});
