window.onload = function() {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
        const userData = JSON.parse(storedUserData);
        if(userData.username !== 'admin'){
            window.location.href = '../login.html';
        }
    } else {
        window.location.href = '../login.html';
    }

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

    // Obtener la lista de artículos del almacenamiento local
    let articles = JSON.parse(localStorage.getItem('articles')) || [];
    
    // Variable para almacenar el último ID asignado
    let lastId = articles.length > 0 ? articles[articles.length - 1].id : 3; // Inicia en 3 si hay artículos existentes

    // Función para mostrar la lista de artículos en la página
    function renderArticles() {
        const articleList = document.getElementById('articleList');
        articleList.innerHTML = '';
        articles.forEach(function(article, index) {
            const articleDiv = document.createElement('div');
            articleDiv.innerHTML = `
                <br>
                <p><strong>ID:</strong> ${article.id}</p><br>
                <p><strong>Nombre:</strong> ${article.name}</p><br>
                <p><strong>Imagen:</strong> <img src="${article.image}" alt="${article.name}"></p>
                <p><strong>Precio:</strong> ${article.price}</p>
                <button onclick="editArticle(${article.id})">Editar</button>
                <button onclick="deleteArticle(${article.id})">Eliminar</button>
            `;
            articleList.appendChild(articleDiv);
        });
    }

    // Función para agregar un nuevo artículo desde el formulario y guardarlo en localStorage
    document.getElementById('articleForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const image = document.getElementById('image').value;
        const price = parseFloat(document.getElementById('price').value);

        // Validar que los campos no estén vacíos
        if (name.trim() && image.trim() && !isNaN(price)) {
            const newArticle = {
                id: ++lastId, // Incrementa el último ID asignado y lo usa para el nuevo artículo
                name: name,
                image: image,
                price: price
            };
            articles.push(newArticle); // Agregar el nuevo artículo al array
            localStorage.setItem('articles', JSON.stringify(articles)); // Guardar el array actualizado en localStorage
            renderArticles(); // Volver a renderizar los artículos en la página
            document.getElementById('articleForm').reset(); // Limpiar el formulario
        } else {
            alert('Por favor, completa todos los campos correctamente.');
        }
    });

    // Función para eliminar un artículo
    window.deleteArticle = function(id) {
        if (confirm('¿Estás seguro de que deseas eliminar este artículo?')) {
            articles = articles.filter(article => article.id !== id);
            localStorage.setItem('articles', JSON.stringify(articles));
            renderArticles();
        }
    };

    // Función para editar un artículo (solo el precio en este ejemplo)
    window.editArticle = function(id) {
        const article = articles.find(article => article.id === id);
        if (article) {
            const newPrice = parseFloat(prompt('Ingrese el nuevo precio del artículo:'));
            if (!isNaN(newPrice)) {
                article.price = newPrice;
                localStorage.setItem('articles', JSON.stringify(articles));
                renderArticles();
            } else {
                alert('Por favor, ingresa un precio válido.');
            }
        }
    };

    // Mostrar los artículos al cargar la página
    renderArticles();
};
