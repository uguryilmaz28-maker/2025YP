// service-worker.js içeriği (minimal)

self.addEventListener('install', (event) => {
    console.log('Service Worker: Kurulum tamamlandı.');
});

self.addEventListener('activate', (event) => {
    console.log('Service Worker: Aktivasyon tamamlandı.');
});