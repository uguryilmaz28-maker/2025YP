self.addEventListener("install", e => {
  e.waitUntil(caches.open("dsiapp-2025").then(cache => cache.addAll(["./", "index.html", "style.css"])));
});
self.addEventListener("fetch", e => {
  e.respondWith(caches.match(e.request).then(resp => resp || fetch(e.request)));
});
