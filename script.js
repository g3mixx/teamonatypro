document.addEventListener('DOMContentLoaded', () => {
    // Seleccionamos todos los elementos a animar
    const reveals = document.querySelectorAll('.scroll-reveal');

    // Configuramos el observador
    const observerOptions = {
        root: null, // Usa el viewport del navegador
        rootMargin: '0px',
        threshold: 0.15 // Se activa cuando el 15% del elemento es visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Añade la clase que dispara la animación CSS
                entry.target.classList.add('active');
                
                // Opcional: Descomenta la siguiente línea si quieres que la animación 
                // ocurra solo una vez (que no se vuelva a ocultar al subir)
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Vigilar cada sección
    reveals.forEach(reveal => {
        observer.observe(reveal);
    });
});
