const CACHE_NAME = 'lista_de_compras-v3';
const urlsToCache = [
    '/lista_de_compras/',
    '/lista_de_compras/index.html',
    '/lista_de_compras/styles.css',
    '/lista_de_compras/script.js',
    '/lista_de_compras/manifest.json',
    '/lista_de_compras/carrinho_celular.png',
    '/lista_de_compras/carrinho_desktop.png'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request);
            })
    );
});
