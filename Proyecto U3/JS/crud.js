// Verificar si el usuario está en el almacenamiento local al cargar la página
window.onload = function() {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
        const userData = JSON.parse(storedUserData);
        if (userData.username === 'admin' && userData.password === '12345') {
            // Si el usuario está autenticado, permitirle acceder a la tienda
            validarFormulario();
            return;
        }
    }else{
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


//---------------------------------------------------------------------------------------


let listaUsuarios = [];

const objUsuario = {
    user: '',
    pass: ''
}

let editando = false;

const formulario = document.querySelector('#formulario');
const usuarioInput = document.querySelector('#usuario');
const passwordInput = document.querySelector('#password');
const btnAgregarInput = document.querySelector('#btnAgregar');

formulario.addEventListener('submit', validarFormulario);

function validarFormulario(e) {
    e.preventDefault();

    if(usuarioInput.value === '' || passwordInput.value === '') {
        alert('Todos los campos se deben llenar');
        return;
    }

    if(editando) {
        editarUsuario();
        editando = false;
    } else {
        
        objUsuario.user = usuarioInput.value;
        objUsuario.pass = passwordInput.value;

        agregarUsuario();
    }
}

// Al cargar la página, intenta obtener los usuarios guardados en el localStorage
document.addEventListener('DOMContentLoaded', () => {
    const usuariosGuardados = localStorage.getItem('usuarios');
    if (usuariosGuardados) {
        listaUsuarios = JSON.parse(usuariosGuardados);
        mostrarUsuarios();
    }
});

function agregarUsuario() {

    listaUsuarios.push({...objUsuario});

    mostrarUsuarios();

    formulario.reset();
    limpiarObjeto();
}

function limpiarObjeto() {
    
    objUsuario.user = '';
    objUsuario.pass = '';
}

function mostrarUsuarios() {
    limpiarHTML();

    const divUsuarios = document.querySelector('.div-usuarios');
    
    listaUsuarios.forEach(usuario => {
        const {user, pass} = usuario;

        const parrafo = document.createElement('p');
        parrafo.textContent = `${user} - ${pass} - `;
        parrafo.dataset.user = user;

        const editarBoton = document.createElement('button');
        editarBoton.onclick = () => cargarUsuario(usuario);
        editarBoton.textContent = 'Editar';
        editarBoton.classList.add('btn', 'btn-editar');
        parrafo.append(editarBoton);

        const eliminarBoton = document.createElement('button');
        eliminarBoton.onclick = () => eliminarUsuario(user);
        eliminarBoton.textContent = 'Eliminar';
        eliminarBoton.classList.add('btn', 'btn-eliminar');
        parrafo.append(eliminarBoton);

        const hr = document.createElement('hr');

        divUsuarios.appendChild(parrafo);
        divUsuarios.appendChild(hr);
    });
}


function cargarUsuario(usuario) {
    const {user, pass} = usuario;

    usuarioInput.value = user;
    passwordInput.value = pass;

    

    formulario.querySelector('button[type="submit"]').textContent = 'Actualizar';
    
    editando = true;
}

function editarUsuario() {

    objUsuario.user = usuarioInput.value;
    objUsuario.pass = passwordInput.value;

    listaUsuarios.map(usuario => {

        usuario.user = objUsuario.user;
        usuario.pass = objUsuario.pass;

    });

    limpiarHTML();
    mostrarUsuarios();
    formulario.reset();

    formulario.querySelector('button[type="submit"]').textContent = 'Agregar';
    
    editando = false;
}

function eliminarUsuario(user) {

    listaUsuarios = listaUsuarios.filter(usuario => usuario.user !== user);

    limpiarHTML();
    mostrarUsuarios();
}

function limpiarHTML() {
    const divUsuarios = document.querySelector('.div-usuarios');
    while(divUsuarios.firstChild) {
        divUsuarios.removeChild(divUsuarios.firstChild);
    }
}
