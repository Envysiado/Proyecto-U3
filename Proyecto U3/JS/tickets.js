// Función para generar el ticket de compra
function generarTicket() {
    const ticket = document.getElementById('ticket');
    ticket.innerHTML = '<h2>Felicidades por tu compra</h2>';
    const carrito = JSON.parse(localStorage.getItem('carrito'));
    if (!carrito || carrito.length === 0) {
        ticket.innerHTML += '<p>No hay productos en el carrito</p>';
        return;
    }
    let total = 0;
    carrito.forEach(item => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;
        const li = document.createElement('li');
        li.textContent = `${item.nombre} x ${item.cantidad} = $${subtotal}`;
        ticket.appendChild(li);
    });
    const totalElement = document.createElement('p');
    totalElement.textContent = `Total: $${total}`;
    ticket.appendChild(totalElement);

    // Limpiar el carrito después de generar el ticket
    localStorage.removeItem('carrito');
}

// Generar el ticket al cargar la página
document.addEventListener('DOMContentLoaded', generarTicket);