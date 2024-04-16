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
