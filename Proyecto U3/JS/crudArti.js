// Verificar si el usuario está en el almacenamiento local al cargar la página


//------------------------------------------------------------------------------------

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

    // Función para mostrar la lista de artículos en la página
    function renderArticles() {
        const articleList = document.getElementById('articleList');
        articleList.innerHTML = '';
        articles.forEach(function(article, index) {
            const articleDiv = document.createElement('div');
            articleDiv.innerHTML = `
                <p><strong>Nombre:</strong> ${article.name}</p>
                <p><strong>Imagen:</strong> <img src="${article.image}" alt="${article.name}"></p>
                <p><strong>Precio:</strong> ${article.price}</p>
                <button onclick="editArticle(${index})">Editar</button>
                <button onclick="deleteArticle(${index})">Eliminar</button>
            `;
            articleList.appendChild(articleDiv);
        });
    }

    // Función para agregar un nuevo artículo
    document.getElementById('articleForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const image = document.getElementById('image').value;
        const price = parseFloat(document.getElementById('price').value);

        // Validar que los campos no estén vacíos
        if (name.trim() && image.trim() && !isNaN(price)) {
            const newArticle = {
                name: name,
                image: image,
                price: price
            };
            articles.push(newArticle);
            localStorage.setItem('articles', JSON.stringify(articles));
            renderArticles();
            document.getElementById('articleForm').reset();
        } else {
            alert('Por favor, completa todos los campos correctamente.');
        }
    });

    // Función para eliminar un artículo
    window.deleteArticle = function(index) {
        if (confirm('¿Estás seguro de que deseas eliminar este artículo?')) {
            articles.splice(index, 1);
            localStorage.setItem('articles', JSON.stringify(articles));
            renderArticles();
        }
    };

    // Función para editar un artículo (solo el precio en este ejemplo)
    window.editArticle = function(index) {
        const newPrice = parseFloat(prompt('Ingrese el nuevo precio del artículo:'));
        if (!isNaN(newPrice)) {
            articles[index].price = newPrice;
            localStorage.setItem('articles', JSON.stringify(articles));
            renderArticles();
        } else {
            alert('Por favor, ingresa un precio válido.');
        }
    };

    // Mostrar los artículos al cargar la página
    renderArticles();
};
