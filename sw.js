// purge caches + network-first to evitar versões antigas
self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});
self.addEventListener('fetch', e => {
  e.respondWith(fetch(e.request, {cache:'no-store'}).catch(() => caches.match(e.request)));
});
