// sw.js — cache incluindo Oráculo
const CACHE = 'entre-mundos-dia1-v8';
const ASSETS = [
  './','./index.html','./manifest.json',
  './oraculo.html','./oraculo.json',
  './assets/icon-192.png','./assets/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.map(k => k !== CACHE && caches.delete(k)))
  ));
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => {
      const fetchPromise = fetch(e.request).then(resp => {
        const copy = resp.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy));
        return resp;
      }).catch(()=>cached);
      return cached || fetchPromise;
    })
  );
});
