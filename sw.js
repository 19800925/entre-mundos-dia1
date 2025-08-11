
// Entre Mundos — Service Worker (v1754939180)
const CACHE_NAME = 'entre-mundos-v1754939180';
const PRECACHE_URLS = [
  './',
  './index.html',
  './oraculo.html',
  './oraculo.json',
  './debug-oraculo.html',
  './assets/icon-192.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE_URLS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => k !== CACHE_NAME && caches.delete(k))))
  );
  self.clients.claim();
});

// Network first, cache fallback (evita prender em ficheiros antigos)
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).then(response => {
      const copy = response.clone();
      caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
      return response;
    }).catch(() => caches.match(event.request))
  );
});
