const username = document.getElementById('username');
const password = document.getElementById('password');
const button = document.getElementById('button');

button.addEventListener('click', (e) => {
    e.preventDefault();
    const inputUsername = username.value;
    const inputPassword = password.value;

    // Si el usuario es "admin", verificar las credenciales existentes
    if (inputUsername === 'admin') {
        if (inputPassword === '12345') {
            // Guardar los datos del usuario en el almacenamiento local
            const data = { username: inputUsername, password: inputPassword };
            localStorage.setItem('userData', JSON.stringify(data));
            // Redireccionar a otra página HTML si el usuario y la contraseña son correctos
            window.location.href = '../inicio.html';
        } else {
            // Mostrar mensaje de error si la contraseña es incorrecta
            const errorDiv = document.querySelector('.error');
            const errorMessage = document.createElement('p');
            errorMessage.textContent = "Contraseña incorrecta para el usuario 'admin'";
            errorMessage.style.color = "red";
            errorDiv.appendChild(errorMessage);
            console.log("Contraseña incorrecta para el usuario 'admin'");
        }
    } else {
        // Obtener los usuarios del almacenamiento local
        const storedUsers = localStorage.getItem('usuarios');
        if (storedUsers) {
            const users = JSON.parse(storedUsers);
            // Buscar si existe un usuario con el nombre de usuario ingresado
            const foundUser = users.find(user => user.user === inputUsername && user.pass === inputPassword);
            if (foundUser) {
                // Guardar los datos del usuario en el almacenamiento local
                localStorage.setItem('userData', JSON.stringify(foundUser));
                // Redireccionar a otra página HTML si el usuario y la contraseña son correctos
                window.location.href = '../inicio.html';
                return; // Salir de la función después de redirigir
            }
        }
        // Si no se encuentra el usuario o la contraseña es incorrecta, mostrar mensaje de error
        const errorDiv = document.querySelector('.error');
        const errorMessage = document.createElement('p');
        errorMessage.textContent = "Usuario o contraseña incorrectos";
        errorMessage.style.color = "red";
        errorDiv.appendChild(errorMessage);
        console.log("Usuario o contraseña incorrectos");
    }
});
