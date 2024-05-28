let items = [];

function addItem() {
    const itemInput = document.getElementById('itemInput');
    const itemText = itemInput.value.trim();
    if (itemText !== '') {
        items.push({ text: itemText, completed: false });
        itemInput.value = '';
        renderItems();
    } else {
        alert('Por favor, insira um item válido.');
    }
}

function toggleItem(index) {
    items[index].completed = !items[index].completed;
    renderItems();
}

function removeItem(index) {
    items.splice(index, 1);
    renderItems();
}

function renderItems() {
    const itemList = document.getElementById('itemList');
    itemList.innerHTML = '';
    items.forEach((item, index) => {
        const itemElement = document.createElement('li');
        itemElement.textContent = item.text;
        if (item.completed) {
            itemElement.classList.add('completed');
        }
        itemElement.addEventListener('click', () => toggleItem(index));
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remover';
        removeButton.addEventListener('click', (event) => {
            event.stopPropagation();
            removeItem(index);
        });
        itemElement.appendChild(removeButton);
        itemList.appendChild(itemElement);
    });
}

window.addEventListener('load', () => {
    registerServiceWorker();
});

function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('/lista_de_compras/service-worker.js')
                .then(function(registration) {
                    console.log('Service Worker registrado com sucesso:', registration);
                }, function(error) {
                    console.log('Falha ao registrar o Service Worker:', error);
                });
        });
    }
}
