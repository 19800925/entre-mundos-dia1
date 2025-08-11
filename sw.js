// Entre Mundos — Service Worker (v3)
const CACHE_VERSION = 'em-cache-v3';
const CORE_ASSETS = [
  './',
  './index.html',
  './index-fase2.html',
  './oraculo.html',
  './manifest.json',
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => cache.addAll(CORE_ASSETS)).catch(()=>{})
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const names = await caches.keys();
      await Promise.all(names.map((n) => n !== CACHE_VERSION && caches.delete(n)));
      await self.clients.claim();
    })()
  );
});

async function networkFirst(event) {
  try {
    const res = await fetch(event.request, { cache: 'no-store' });
    const cache = await caches.open(CACHE_VERSION);
    cache.put(event.request, res.clone());
    return res;
  } catch (err) {
    const cache = await caches.open(CACHE_VERSION);
    const cached = await cache.match(event.request);
    if (cached) return cached;
    return new Response('Offline', { status: 503, statusText: 'Offline' });
  }
}

async function staleWhileRevalidate(event) {
  const cache = await caches.open(CACHE_VERSION);
  const cached = await cache.match(event.request);
  const networkPromise = fetch(event.request).then((res) => {
    cache.put(event.request, res.clone());
    return res;
  }).catch(()=>cached);
  return cached || networkPromise;
}

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.mode === 'navigate' || (req.headers.get('accept') || '').includes('text/html')) {
    event.respondWith(networkFirst(event));
    return;
  }
  event.respondWith(staleWhileRevalidate(event));
});
