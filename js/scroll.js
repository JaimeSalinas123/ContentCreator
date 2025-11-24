// js/scrollTop.js

function crearBotonScrollTop() {
    // Crear el botón
    const boton = document.createElement('button');
    boton.innerHTML = '<i class="fas fa-chevron-up"></i>';
    boton.id = 'scrollTopBtn';
    boton.className = 'fixed bottom-8 right-8 w-14 h-14 bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 opacity-0 scale-50 z-50';
    
    // Agregar el botón al body
    document.body.appendChild(boton);
    
    // Función para animar el botón
    function animarBoton(mostrar) {
        const btn = document.getElementById('scrollTopBtn');
        if (btn) {
            if (mostrar) {
                btn.classList.remove('opacity-0', 'scale-50');
                btn.classList.add('opacity-100', 'scale-100');
            } else {
                btn.classList.remove('opacity-100', 'scale-100');
                btn.classList.add('opacity-0', 'scale-50');
            }
        }
    }
    
    // Función para hacer scroll suave al top
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    // Event listener para el botón
    boton.addEventListener('click', scrollToTop);
    
    // Mostrar/ocultar botón según el scroll
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            animarBoton(true);
        } else {
            animarBoton(false);
        }
    });
    
    // Efecto hover adicional con JavaScript
    boton.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px) scale(1.1)';
    });
    
    boton.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    crearBotonScrollTop();
});