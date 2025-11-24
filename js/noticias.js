// js/noticias.js

async function cargarNoticias() {
    const contenedor = document.getElementById('contenedor-noticias');
    const loading = document.getElementById('loading');
    const error = document.getElementById('error');
    const errorMessage = document.getElementById('error-message');

    // Verificar que los elementos existen
    if (!contenedor || !loading || !error) {
        console.error('No se encontraron los elementos del DOM');
        return;
    }

    try {
        // Mostrar loading y ocultar error
        loading.classList.remove('hidden');
        error.classList.add('hidden');
        contenedor.innerHTML = '';

        console.log('Cargando noticias...');
        
        // Ruta CORRECTA desde vistas/noticias.html
        const response = await fetch('../json/noticias.json');
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();
        console.log('Datos cargados:', data);

        // Ocultar loading
        loading.classList.add('hidden');

        // Verificar que hay noticias
        if (!data.noticias || data.noticias.length === 0) {
            throw new Error('No hay noticias disponibles en el JSON');
        }

        // Generar las tarjetas de noticias
        data.noticias.forEach((noticia, index) => {
            const tarjeta = crearTarjetaNoticia(noticia);
            contenedor.appendChild(tarjeta);
        });

        console.log(`Se cargaron ${data.noticias.length} noticias`);

    } catch (err) {
        console.error('Error cargando noticias:', err);
        loading.classList.add('hidden');
        error.classList.remove('hidden');
        
        // Mostrar mensaje de error específico
        if (errorMessage) {
            errorMessage.textContent = `Error: ${err.message}`;
        }
    }
}

function crearTarjetaNoticia(noticia) {
    const article = document.createElement('article');
    article.className = 'bg-gray-800 rounded-xl overflow-hidden shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 hover:scale-105';
    
    article.innerHTML = `
        <div class="h-48 bg-gray-700 overflow-hidden">
            <img 
                src="${noticia.imagen}" 
                alt="${noticia.titulo}"
                class="w-full h-full object-cover hover:scale-110 transition duration-500"
                loading="lazy"
                onerror="this.src='https://via.placeholder.com/400x200/4B5563/9CA3AF?text=Imagen+No+Disponible'"
            >
        </div>
        <div class="p-6">
            <h3 class="text-xl font-bold text-purple-400 mb-3 line-clamp-2">${noticia.titulo}</h3>
            <p class="text-gray-300 leading-relaxed">${noticia.descripcion}</p>
        </div>
    `;
    
    return article;
}

// Función para verificar si estamos en la página correcta
function inicializarNoticias() {
    const contenedor = document.getElementById('contenedor-noticias');
    if (contenedor) {
        console.log('Inicializando noticias...');
        cargarNoticias();
    } else {
        console.log('No está en la página de noticias');
    }
}

// Cargar noticias cuando la página esté lista
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM cargado, inicializando noticias...');
    inicializarNoticias();
});