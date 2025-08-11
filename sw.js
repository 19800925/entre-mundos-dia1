self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('entre-mundos-v7').then(cache => {
      return cache.addAll([
        '/entre-mundos-dia1/',
        '/entre-mundos-dia1/index.html',
        '/entre-mundos-dia1/assets/icon-192.png',
        '/entre-mundos-dia1/assets/icon-512.png',
        '/entre-mundos-dia1/manifest.json'
      ]);
    })
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});
