document.addEventListener('DOMContentLoaded', () => {
    // Seleccionamos todos los elementos con la clase scroll-reveal
    const reveals = document.querySelectorAll('.scroll-reveal');

    // Configuramos el observador
    const observerOptions = {
        root: document.querySelector('.snap-container'), // Observamos dentro del contenedor de scroll
        threshold: 0.5 // Se activa cuando el 50% de la sección es visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Añade la clase active para iniciar la animación CSS
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    // Le decimos al observador que vigile cada sección
    reveals.forEach(reveal => {
        observer.observe(reveal);
    });
});
