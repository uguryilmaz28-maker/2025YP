self.addEventListener("install", e => {
  e.waitUntil(caches.open("dsiapp-2025-v1").then(c => c.addAll(["./","index.html","style.css","detay.html"])));
});
self.addEventListener("fetch", e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
