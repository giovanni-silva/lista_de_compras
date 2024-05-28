const CACHE_NAME = 'lista_de_compras-v1';

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll([
                    '/lista_de_compras/', // Raiz do PWA
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
                // Retorna a resposta do cache, se disponível
                if (response) {
                    return response;
                }

                // Se a resposta não estiver em cache, faz uma requisição de rede
                return fetch(event.request)
                    .then(response => {
                        // Abre o cache e armazena a nova resposta
                        return caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, response.clone());
                                return response;
                            });
                    });
            })
    );
});

// Atualiza o cache quando uma nova versão do Service Worker estiver disponível
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
