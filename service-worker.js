const CACHE_NAME = 'lista_de_compras-v1';

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll([
                    '/lista_de_compras/', // Mudança aqui: Incluindo a raiz do PWA
                    '/lista_de_compras/index.html',
                    '/lista_de_compras/styles.css',
                    '/lista_de_compras/script.js',
                    '/lista_de_compras/manifest.json',
                    '/lista_de_compras/carrinho_celular.png',
                    '/lista_de_compras/carrinho_desktop.png',
                    '/lista_de_compras/favicon.png'
                ]);
            })
            .catch(error => {
                console.error('Erro ao adicionar recursos ao cache:', error);
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
