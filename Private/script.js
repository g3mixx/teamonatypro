document.addEventListener('DOMContentLoaded', () => {

    // =============================================
    // 1. SCROLL REVEAL
    // =============================================
    const reveals = document.querySelectorAll('.scroll-reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, { threshold: 0.15 });
    reveals.forEach(reveal => observer.observe(reveal));

    // =============================================
    // 2. BACK TO TOP (fix — faltaba el scroll listener)
    // =============================================
    const backToTop = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // =============================================
    // 3. CONTADORES DE TIEMPO EN EL HERO
    // =============================================
    const fechaAlgoMas = new Date('2025-11-24T00:00:00');
    const fechaNovios  = new Date('2026-04-09T00:00:00');

    function calcularTiempo(desde) {
        const ahora = new Date();
        let years  = ahora.getFullYear() - desde.getFullYear();
        let months = ahora.getMonth()    - desde.getMonth();
        let days   = ahora.getDate()     - desde.getDate();

        if (days < 0) {
            months--;
            const prevMonth = new Date(ahora.getFullYear(), ahora.getMonth(), 0);
            days += prevMonth.getDate();
        }
        if (months < 0) {
            years--;
            months += 12;
        }

        let partes = [];
        if (years > 0)  partes.push(`${years} ${years === 1 ? 'año' : 'años'}`);
        if (months > 0) partes.push(`${months} ${months === 1 ? 'mes' : 'meses'}`);
        if (days > 0)   partes.push(`${days} ${days === 1 ? 'día' : 'días'}`);
        if (partes.length === 0) partes.push('hoy empieza todo');

        return partes.join(', ');
    }

    function actualizarContadores() {
        const elAlgoMas = document.getElementById('counter-algo-mas');
        const elNovios  = document.getElementById('counter-novios');
        if (elAlgoMas) elAlgoMas.textContent = calcularTiempo(fechaAlgoMas);
        if (elNovios)  elNovios.textContent  = calcularTiempo(fechaNovios);
    }

    actualizarContadores();
    setInterval(actualizarContadores, 60000); // actualiza cada minuto

    // =============================================
    // 4. CUENTA REGRESIVA + CARTA
    // =============================================
    const fechaMeta = new Date('2026-05-09T00:00:00');

    const cdDays    = document.getElementById('cd-days');
    const cdHours   = document.getElementById('cd-hours');
    const cdMinutes = document.getElementById('cd-minutes');
    const cdSeconds = document.getElementById('cd-seconds');
    const cdGrid    = document.getElementById('countdown-grid');
    const cartaEl   = document.getElementById('carta-container');

    function pad(n) { return String(n).padStart(2, '0'); }

    function actualizarCountdown() {
        const ahora = new Date();
        const diff  = fechaMeta - ahora;

        if (diff <= 0) {
            // Llegó el día — ocultar números y mostrar carta
            if (cdGrid)  cdGrid.style.display  = 'none';
            if (cartaEl) {
                cartaEl.style.display = 'block';
                setTimeout(() => cartaEl.classList.add('carta-visible'), 50);
            }
            return;
        }

        const dias    = Math.floor(diff / (1000 * 60 * 60 * 24));
        const horas   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const segundos= Math.floor((diff % (1000 * 60)) / 1000);

        if (cdDays)    cdDays.textContent    = pad(dias);
        if (cdHours)   cdHours.textContent   = pad(horas);
        if (cdMinutes) cdMinutes.textContent = pad(minutos);
        if (cdSeconds) cdSeconds.textContent = pad(segundos);
    }

    actualizarCountdown();
    setInterval(actualizarCountdown, 1000);

    // =============================================
    // 5. REPRODUCTOR DE MÚSICA
    // =============================================
    const playlist = [];
    for (let i = 1; i <= 28; i++) {
        playlist.push({
            title: `Nuestra Canción ${i}`,
            file:  `cancion${i}.mp3`,
            img:   `foto${8 + i}.jpeg`
        });
    }

    let currentIndex = 0;
    let isShuffle = false;
    let isLoop    = false;

    const audio      = document.getElementById('main-audio');
    const playBtn    = document.getElementById('play-btn');
    const prevBtn    = document.getElementById('prev-btn');
    const nextBtn    = document.getElementById('next-btn');
    const shuffleBtn = document.getElementById('shuffle-btn');
    const loopBtn    = document.getElementById('loop-btn');
    const trackImg   = document.getElementById('track-img');
    const trackTitle = document.getElementById('track-title');
    const progressBar= document.getElementById('progress-bar');
    const currTimeText = document.getElementById('current-time');
    const durationText = document.getElementById('total-duration');
    const albumArtContainer = document.querySelector('.album-art');

    function loadTrack(index) {
        const track = playlist[index];
        trackTitle.textContent = track.title;
        trackImg.src = track.img;
        audio.src    = track.file;
    }

    function togglePlay() {
        if (audio.paused) {
            audio.play();
            playBtn.textContent = '⏸';
            albumArtContainer.classList.add('playing-art');
        } else {
            audio.pause();
            playBtn.textContent = '▶';
            albumArtContainer.classList.remove('playing-art');
        }
    }

    function nextTrack() {
        currentIndex = isShuffle
            ? Math.floor(Math.random() * playlist.length)
            : (currentIndex + 1) % playlist.length;
        loadTrack(currentIndex);
        audio.play();
        playBtn.textContent = '⏸';
        albumArtContainer.classList.add('playing-art');
    }

    progressBar.addEventListener('input', () => {
        if (audio.duration) {
            audio.currentTime = (progressBar.value / 100) * audio.duration;
        }
    });

    audio.addEventListener('timeupdate', () => {
        if (audio.duration) {
            progressBar.value = (audio.currentTime / audio.duration) * 100;

            let curMins = Math.floor(audio.currentTime / 60);
            let curSecs = Math.floor(audio.currentTime % 60);
            let durMins = Math.floor(audio.duration / 60);
            let durSecs = Math.floor(audio.duration % 60);

            if (curSecs < 10) curSecs = '0' + curSecs;
            if (durSecs < 10) durSecs = '0' + durSecs;

            currTimeText.textContent = `${curMins}:${curSecs}`;
            durationText.textContent = `${durMins}:${durSecs}`;
        }
    });

    audio.addEventListener('ended', () => {
        if (isLoop) { audio.play(); } else { nextTrack(); }
    });

    shuffleBtn.addEventListener('click', () => {
        isShuffle = !isShuffle;
        shuffleBtn.classList.toggle('active');
    });

    loopBtn.addEventListener('click', () => {
        isLoop = !isLoop;
        loopBtn.classList.toggle('active');
    });

    playBtn.addEventListener('click', togglePlay);
    nextBtn.addEventListener('click', nextTrack);
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
        loadTrack(currentIndex);
        audio.play();
        playBtn.textContent = '⏸';
        albumArtContainer.classList.add('playing-art');
    });

    loadTrack(currentIndex);
});
