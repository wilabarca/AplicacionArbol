import { Bst } from '../Models/Bts.mjs';
import { Product } from '../Models/Product.mjs';

const productBST = new Bst();
const output = document.getElementById('output');

document.addEventListener('DOMContentLoaded', () => {
    setupView(productBST);
});

function showAlert(message, type = 'info') {
    const alertOverlay = document.createElement('div');
    alertOverlay.classList.add('alert-overlay');

    const alertBox = document.createElement('div');
    alertBox.classList.add('alert-box');

    const alertMessage = document.createElement('p');
    alertMessage.textContent = message;

    alertBox.appendChild(alertMessage);
    alertOverlay.appendChild(alertBox);
    document.body.appendChild(alertOverlay);

    alertOverlay.addEventListener('click', () => {
        document.body.removeChild(alertOverlay);
    });
}

function clearOutput() {
    output.innerHTML = '';
}

function displayProductInTable(product) {
    clearOutput();
    const table = document.createElement('table');
    table.innerHTML = `
        <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
        </tr>
        <tr>
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
        </tr>
    `;
    output.appendChild(table);
}

function setupView(productBST) {
    document.getElementById('insertForm').addEventListener('submit', (event) => {
        event.preventDefault();
        const id = parseInt(document.getElementById('id').value);
        const name = document.getElementById('name').value;
        const price = parseFloat(document.getElementById('price').value);
        const product = new Product(id, name, price);
        productBST.insert(product, () => {
            showAlert(`Producto ${name} insertado.`);
        });
    });

    document.getElementById('searchForm').addEventListener('submit', (event) => {
        event.preventDefault();
        const searchId = parseInt(document.getElementById('searchId').value);
        productBST.search(searchId, (product) => {
            if (product) {
                displayProductInTable(product);
                showAlert(`Producto encontrado: ${product.name} - Precio: ${product.price}`);
            } else {
                showAlert('Producto no encontrado.', 'error');
            }
        });
    });

    document.getElementById('getMinBtn').addEventListener('click', () => {
        productBST.getMin((product) => {
            if (product) {
                displayProductInTable(product);
                showAlert(`Producto con el precio mínimo: ${product.name} - Precio: ${product.price}`);
            } else {
                showAlert('No hay productos disponibles.', 'warning');
            }
        });
    });

    document.getElementById('getMaxBtn').addEventListener('click', () => {
        productBST.getMax((product) => {
            if (product) {
                displayProductInTable(product);
                showAlert(`Producto con el precio máximo: ${product.name} - Precio: ${product.price}`);
            } else {
                showAlert('No hay productos disponibles.', 'warning');
            }
        });
    });

    document.getElementById('traverseBtn').addEventListener('click', () => {
        productBST.traverse((products) => {
            clearOutput();
            const table = document.createElement('table');
            table.innerHTML = `
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Precio</th>
                </tr>
            `;
            products.forEach(product => {
                table.innerHTML += `
                    <tr>
                        <td>${product.id}</td>
                        <td>${product.name}</td>
                        <td>${product.price}</td>
                    </tr>
                `;
            });
            output.appendChild(table);
            showAlert(`Recorriendo ${products.length} productos.`);
        });
    });
}
