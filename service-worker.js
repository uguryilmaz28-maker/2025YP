const CACHE = 'dsiapp-2025-v4';

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) =>
      c.addAll([
        './',
        '/index.html',
        '/style.css',
        '/detay.html',
        '/manifest.json'
      ])
    )
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((k) => (k !== CACHE ? caches.delete(k) : null)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  const { request } = e;
  const sameOrigin = new URL(request.url).origin === self.location.origin;

  // Harici kaynakları (Google Sheets CSV, CDN’ler, GeoJSON) asla SW ile cache'leme
  if (!sameOrigin) return;

  // Sadece GET isteklerini cache’le
  if (request.method !== 'GET') return;

  e.respondWith(
    caches.match(request).then((cached) => {
      return (
        cached ||
        fetch(request).then((resp) => {
          const copy = resp.clone();
          caches.open(CACHE).then((c) => c.put(request, copy));
          return resp;
        })
      );
    })
  );
});
