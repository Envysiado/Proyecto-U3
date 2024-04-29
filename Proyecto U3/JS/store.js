// Verificar si el usuario está en el almacenamiento local al cargar la página
window.onload = function() {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
        const userData = JSON.parse(storedUserData);
        if (userData.username === 'admin' && userData.password === '12345') {
            // Si el usuario está autenticado, permitirle acceder a la tienda
            generarTarjetas();
            return;
        }
    }else{
        window.location.href = '../login.html';
    }

    // Si el usuario no está en el almacenamiento local o los credenciales no coinciden, redirigirlo a otro HTML

};

// Función para limpiar el almacenamiento local
function limpiarAlmacenamientoLocal() {
    localStorage.removeItem('userData');
    window.location.href = '../login.html';
}

// Obtener el botón con el ID "cerrar"
const botonCerrar = document.getElementById('cerrar');

// Agregar evento al botón "cerrar" para limpiar el almacenamiento local al hacer clic
botonCerrar.addEventListener('click', function() {
    // Limpiar el almacenamiento local
    limpiarAlmacenamientoLocal();
});



// Datos de ejemplo para los productos
const productos = [
    { id: 1, nombre: 'Camiseta "Forma Final"', precio: 30, imagen: 'https://bungiestore.com/media/catalog/product/f/i/final_shape_tee_men_front_1000x1000.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=600&width=600&canvas=600:600' },
    { id: 2, nombre: 'Sombrero de pesca de Destiny ', precio: 25, imagen: 'https://bungiestore.com/media/catalog/product/s/2/s21_fishing_hat_front.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=400&width=340&canvas=340:400' },
    { id: 3, nombre: 'El Yelmo de Saint-14', precio: 45, imagen: 'https://bungiestore.com/media/catalog/product/h/e/helmofsaint-14_destiny_replicahelmet_wb_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=600&width=600&canvas=600:600' }
];

// Carrito de compras
let carrito = [];

function generarTarjetas() {
    const catalogo = document.getElementById('catalogo');
    catalogo.innerHTML = '';
    productos.forEach(producto => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <h3>${producto.nombre}</h3>
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <p>Precio: $${producto.precio}</p>
            <button onclick="agregarAlCarrito(${producto.id})">Agregar al Carrito</button>
        `;
        catalogo.appendChild(card);
    });
}

// Función para agregar un producto al carrito
function agregarAlCarrito(id) {
    const productoExistente = carrito.find(item => item.id === id);
    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        const producto = productos.find(item => item.id === id);
        carrito.push({ id: producto.id, nombre: producto.nombre, precio: producto.precio, cantidad: 1 });
    }
    actualizarResumenCompra();
}

// Función para actualizar el resumen de la compra
function actualizarResumenCompra() {
    const listaResumen = document.getElementById('lista-resumen');
    listaResumen.innerHTML = '';
    let total = 0;
    carrito.forEach(item => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;
        const li = document.createElement('li');
        li.innerHTML = `${item.nombre} x ${item.cantidad} = $${subtotal}`;
        listaResumen.appendChild(li);
    });
    document.getElementById('total').textContent = total;
}

// Inicializar la tienda
generarTarjetas();

//Función para finalizar la compra
function finalizarCompra() {
    // Guardar el carrito en el almacenamiento local
    localStorage.setItem('carrito', JSON.stringify(carrito));
    // Redirigir a la página de tickets
    window.location.href = 'tickets.html';
}

// Agregar evento al botón "Finalizar Compra"
document.getElementById('finalizar-compra').addEventListener('click', finalizarCompra);


// Función para abrir la ventana emergente
function abrirVentana() {
    // Abre una nueva ventana
    
    var nuevaVentana = window.open("calculadora.html", "_blank", "width=400, height=500");

}
