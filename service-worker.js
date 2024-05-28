const CACHE_NAME = 'lista_de_compras-v1'; // Nome do cache

// Evento de instalação do Service Worker
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                // Adiciona os recursos ao cache durante a instalação
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
                console.error('Erro ao adicionar recursos ao cache:', error); // Log de erro, caso ocorra algum problema ao adicionar recursos ao cache
            })
    );
});

// Evento de fetch para interceptar requisições de rede
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Retorna a resposta do cache, se disponível
                if (response) {
                    return response;
                }

                // Se a resposta não estiver em cache, faz uma requisição de rede e armazena no cache para uso futuro
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

// Evento de ativação para limpar caches antigos
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName); // Deleta caches antigos, exceto o cache atual
                    }
                })
            );
        })
    );
});
