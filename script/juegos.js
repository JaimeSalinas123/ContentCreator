document.addEventListener('DOMContentLoaded', function() {
    const botonesJugar = document.querySelectorAll('.boton[data-path]');
    
    botonesJugar.forEach(boton => {
        boton.addEventListener('click', function(e) {
            e.preventDefault();
            const urlJuego = this.getAttribute('data-path');
            
            // Crea un iframe para el juego
            const iframe = document.createElement('iframe');
            iframe.src = urlJuego;
            iframe.style.width = '100%';
            iframe.style.height = '100%';
            iframe.style.border = 'none';
            
            // Configura el modal
            const modal = document.getElementById('contenedor-juego');
            modal.innerHTML = `
                <div class="ventana-juego">
                    <button id="cerrar-juego" class="boton-cerrar">×</button>
                </div>
            `;
            
            // Agrega el iframe al modal
            document.querySelector('.ventana-juego').appendChild(iframe);
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            
            // Botón para cerrar
            document.getElementById('cerrar-juego').addEventListener('click', function() {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
                iframe.remove(); // Elimina el iframe al cerrar
            });
        });
    });
});