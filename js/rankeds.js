// js/rankeds.js

async function cargarRankings() {
    const contenedor = document.getElementById('contenedor-rankings');
    const loading = document.getElementById('loading-rankings');
    const error = document.getElementById('error-rankings');

    // Verificar que los elementos existen
    if (!contenedor || !loading || !error) {
        console.error('No se encontraron los elementos del DOM para rankings');
        return;
    }

    try {
        // Mostrar loading y ocultar error
        loading.classList.remove('hidden');
        error.classList.add('hidden');
        contenedor.innerHTML = '';

        console.log('Cargando rankings...');
        
        // Cargar el JSON de rankings
        const response = await fetch('./json/rankeds.json');
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();
        console.log('Datos de rankings cargados:', data);

        // Ocultar loading
        loading.classList.add('hidden');

        // Verificar que hay usuarios
        if (!data.usuarios || data.usuarios.length === 0) {
            throw new Error('No hay datos de rankings disponibles');
        }

        // Generar la tabla de rankings
        const tabla = crearTablaRankings(data.usuarios);
        contenedor.appendChild(tabla);

        console.log(`Se cargaron ${data.usuarios.length} usuarios en el ranking`);

    } catch (err) {
        console.error('Error cargando rankings:', err);
        loading.classList.add('hidden');
        error.classList.remove('hidden');
        
        // Mostrar mensaje de error específico
        const errorMessage = error.querySelector('p');
        if (errorMessage) {
            errorMessage.textContent = `Error: ${err.message}`;
        }
    }
}

function crearTablaRankings(usuarios) {
    const table = document.createElement('table');
    table.className = 'w-full bg-gray-800 rounded-xl overflow-hidden shadow-2xl';
    
    // Ordenar usuarios por puntos (descendente)
    const usuariosOrdenados = [...usuarios].sort((a, b) => b.puntos - a.puntos);
    
    table.innerHTML = `
        <thead>
            <tr class="bg-purple-600 text-white">
                <th class="py-4 px-6 text-left">#</th>
                <th class="py-4 px-6 text-left">Jugador</th>
                <th class="py-4 px-6 text-right">Puntos</th>
                <th class="py-4 px-6 text-center">Nivel</th>
            </tr>
        </thead>
        <tbody>
            ${usuariosOrdenados.map((usuario, index) => {
                const nivelInfo = obtenerNivelInfo(index + 1);
                return `
                <tr class="border-b border-gray-700 hover:bg-gray-750 transition duration-200">
                    <td class="py-4 px-6">
                        <div class="flex items-center">
                            <span class="w-8 h-8 flex items-center justify-center rounded-full ${
                                index === 0 ? 'bg-yellow-500 text-black' : 
                                index === 1 ? 'bg-gray-400 text-black' : 
                                index === 2 ? 'bg-orange-800 text-white' : 
                                'bg-gray-700 text-gray-300'
                            } font-bold">
                                ${index + 1}
                            </span>
                        </div>
                    </td>
                    <td class="py-4 px-6">
                        <div class="flex items-center space-x-3">
                            <div class="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center">
                                <i class="fas fa-user text-gray-400"></i>
                            </div>
                            <span class="font-semibold ${usuario.nombre === 'Chorge85' ? 'text-purple-400' : 'text-white'}">${usuario.nombre}</span>
                            ${usuario.nombre === 'Chorge85' ? '<i class="fas fa-star text-yellow-400"></i>' : ''}
                        </div>
                    </td>
                    <td class="py-4 px-6 text-right">
                        <span class="text-purple-400 font-bold text-lg">${usuario.puntos}</span>
                    </td>
                    <td class="py-4 px-6 text-center">
                        <div class="flex items-center justify-center space-x-2 ${nivelInfo.color}">
                            <i class="${nivelInfo.icono} text-lg"></i>
                            <span class="px-3 py-1 rounded-full text-xs font-bold ${nivelInfo.bgColor}">
                                ${nivelInfo.nombre}
                            </span>
                        </div>
                    </td>
                </tr>
                `;
            }).join('')}
        </tbody>
    `;
    
    return table;
}

function obtenerNivelInfo(posicion) {
    // Diamante 1
    if (posicion === 1) {
        return {
            nombre: 'DIAMANTE I',
            icono: 'fas fa-gem',
            color: 'text-blue-400',
            bgColor: 'bg-blue-600 text-white'
        };
    } 
    // Platino 2, 3, 4 (ahora en orden III, II, I)
    else if (posicion >= 2 && posicion <= 4) {
        let nivelPlatino = '';
        if (posicion === 2) {
            nivelPlatino = 'I';
        } else if (posicion === 3) {
            nivelPlatino = 'II';
        } else {
            nivelPlatino = 'III';
        }
        
        return {
            nombre: `PLATINO ${nivelPlatino}`,
            icono: 'fas fa-shield-alt',
            color: 'text-gray-300',
            bgColor: 'bg-gray-500 text-white'
        };
    }
    // Oro 5, 6, 7
    else if (posicion >= 5 && posicion <= 7) {
        return {
            nombre: `ORO ${posicion === 5 ? 'I' : posicion === 6 ? 'II' : 'III'}`,
            icono: 'fas fa-crown',
            color: 'text-yellow-400',
            bgColor: 'bg-yellow-600 text-white'
        };
    }
    // Bronce 8, 9, 10
    else {
        return {
            nombre: `BRONCE ${posicion === 8 ? 'I' : posicion === 9 ? 'II' : 'III'}`,
            icono: 'fas fa-shield',
            color: 'text-orange-400',
            bgColor: 'bg-orange-700 text-white'
        };
    }
}

// Función para actualizar rankings (puedes llamarla periódicamente)
function actualizarRankings() {
    console.log('Actualizando rankings...');
    cargarRankings();
}

// Inicializar rankings cuando la página esté lista
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM cargado, inicializando rankings...');
    cargarRankings();
    
    // Actualizar cada 30 segundos (opcional)
    // setInterval(actualizarRankings, 30000);
});