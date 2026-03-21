document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Animaciones al hacer scroll (Intersection Observer)
    const reveals = document.querySelectorAll('.scroll-reveal');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    reveals.forEach(reveal => {
        observer.observe(reveal);
    });

    // 2. Lógica del botón de música
    const musica = document.getElementById('musica-amor');
    const musicBtn = document.getElementById('music-control');
    const musicIcon = document.getElementById('music-icon');

    if (musicBtn && musica) {
        musicBtn.addEventListener('click', () => {
            if (musica.paused) {
                musica.play();
                musicIcon.textContent = '⏸'; // Cambia a pausa
                musicBtn.classList.add('playing');
            } else {
                musica.pause();
                musicIcon.textContent = '▶'; // Cambia a play
                musicBtn.classList.remove('playing');
            }
        });
    }

    // 3. Lógica del botón "Volver arriba"
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
