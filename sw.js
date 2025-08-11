const CACHE_NAME = 'entre-mundos-dia1-v7';
const ASSETS = [
  './',
  './index.html',
  './style.css?v=4',
  './script.js?v=4',
  './manifest.json',
  './assets/icon-192.png',
  './assets/IMG_2247.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(c => c.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// network-first para navegação (garante apanhar HTML novo)
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req)
        .then(res => {
          const copy = res.clone();
          caches.open(CACHE_NAME).then(c => c.put(req, copy));
          return res;
        })
        .catch(() => caches.match('./index.html'))
    );
  } else {
    e.respondWith(caches.match(req).then(res => res || fetch(req)));
  }
});
