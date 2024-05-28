let items = [];

// Função para adicionar um item à lista
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

// Função para alternar o status de um item entre completo e incompleto
function toggleItem(index) {
    items[index].completed = !items[index].completed;
    renderItems();
}

// Função para remover um item da lista
function removeItem(index) {
    items.splice(index, 1);
    renderItems();
}

// Função para renderizar os itens na lista
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

// Função que registra o Service Worker quando a página é carregada
window.addEventListener('load', () => {
    registerServiceWorker();
});

// Função para registrar o Service Worker
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/lista_de_compras/service-worker.js')
            .then(registration => {
                console.log('Service Worker registrado com sucesso:', registration);
            })
            .catch(error => {
                console.log('Falha ao registrar o Service Worker:', error);
            });
    }
}
