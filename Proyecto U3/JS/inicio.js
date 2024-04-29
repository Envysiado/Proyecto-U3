// Verificar si el usuario está en el almacenamiento local al cargar la página
window.onload = function() {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
        const userData = JSON.parse(storedUserData);
        if (userData.username === 'admin' && userData.password === '12345') {
            // Si el usuario es 'admin', no hacemos nada especial
        } else if (userData.username !== 'admin' ) {
            
            // Si el usuario es 'usuario', ocultamos el elemento con id 'admin'
            var elemento = document.getElementById("admin");
            elemento.style.display = "none";

            var elemento2 = document.getElementById("admin2");
            elemento2.style.display = "none";


        } else {
            // Si los credenciales no coinciden, redirigir al usuario a la página de inicio de sesión
            window.location.href = '../login.html';
        }
    } else {
        // Si no hay datos de usuario en el almacenamiento local, redirigir al usuario a la página de inicio de sesión
        window.location.href = '../login.html';
    }
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


