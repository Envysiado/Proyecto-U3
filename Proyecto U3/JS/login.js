const username = document.getElementById('username');
const password = document.getElementById('password');
const button = document.getElementById('button');

button.addEventListener('click', (e) => {
    e.preventDefault();
    const data = {
        username: username.value,
        password: password.value
    };

    // Guardar los datos del usuario en el almacenamiento local
    localStorage.setItem('userData', JSON.stringify(data));

    console.log(data);

    if (data.username === 'admin' && data.password === '12345' ||data.username === 'usuario' && data.password === '12345') {
        // Redireccionar a otra página HTML si el usuario y la contraseña son correctos
        window.location.href = '../inicio.html';
    } else {
        // Buscar el div con la clase "error"
        const errorDiv = document.querySelector('.error');

        // Crear un párrafo con el mensaje de error
        const errorMessage = document.createElement('p');
        errorMessage.textContent = "Usuario o contraseña incorrectos";
        errorMessage.style.color = "red";

        // Insertar el párrafo dentro del div de error
        errorDiv.appendChild(errorMessage);

        // Log para indicar el error en la consola
        console.log("Usuario o contraseña incorrectos");
    }
});

