document.addEventListener('DOMContentLoaded', () => {
    // 1. REVELAR ANIMACIONES (Mantener lo anterior)
    const reveals = document.querySelectorAll('.scroll-reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('active'); });
    }, { threshold: 0.15 });
    reveals.forEach(reveal => observer.observe(reveal));

    // 2. CONFIGURACIÓN DE 22 CANCIONES
    const playlist = [];
    for (let i = 1; i <= 23; i++) {
        playlist.push({
            title: `Nuestra Canción ${i}`,
            file: `cancion${i}.mp3`,
            img: `foto${8 + i}.jpeg` // Esto hará que cancion1 use foto9, cancion2 foto10...
        });
    }

    let currentIndex = 0;
    let isShuffle = false;
    let isLoop = false;

    const audio = document.getElementById('main-audio');
    const playBtn = document.getElementById('play-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const shuffleBtn = document.getElementById('shuffle-btn');
    const loopBtn = document.getElementById('loop-btn');
    const trackImg = document.getElementById('track-img');
    const trackTitle = document.getElementById('track-title');
    const progressBar = document.getElementById('progress-bar');
    const currTimeText = document.getElementById('current-time');
    const durationText = document.getElementById('total-duration');
    const albumArtContainer = document.querySelector('.album-art');

    function loadTrack(index) {
        const track = playlist[index];
        trackTitle.textContent = track.title;
        trackImg.src = track.img;
        audio.src = track.file;
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

    // Lógica Siguiente (Spotify Style)
    function nextTrack() {
        if (isShuffle) {
            currentIndex = Math.floor(Math.random() * playlist.length);
        } else {
            currentIndex = (currentIndex + 1) % playlist.length;
        }
        loadTrack(currentIndex);
        audio.play();
        playBtn.textContent = '⏸';
    }

    // Barra de progreso interactiva
    progressBar.addEventListener('input', () => {
        const seekTime = (progressBar.value / 100) * audio.duration;
        audio.currentTime = seekTime;
    });

    audio.addEventListener('timeupdate', () => {
        if (audio.duration) {
            // Actualizar barra
            const progress = (audio.currentTime / audio.duration) * 100;
            progressBar.value = progress;

            // Actualizar tiempos (Minutos:Segundos)
            let curMins = Math.floor(audio.currentTime / 60);
            let curSecs = Math.floor(audio.currentTime % 60);
            let durMins = Math.floor(audio.duration / 60);
            let durSecs = Math.floor(audio.duration % 60);

            if (curSecs < 10) curSecs = "0" + curSecs;
            if (durSecs < 10) durSecs = "0" + durSecs;

            currTimeText.textContent = `${curMins}:${curSecs}`;
            durationText.textContent = `${durMins}:${durSecs}`;
        }
    });

    // Botones Shuffle y Loop
    shuffleBtn.addEventListener('click', () => {
        isShuffle = !isShuffle;
        shuffleBtn.classList.toggle('active');
    });

    loopBtn.addEventListener('click', () => {
        isLoop = !isLoop;
        loopBtn.classList.toggle('active');
    });

    // Cuando termina la canción
    audio.addEventListener('ended', () => {
        if (isLoop) {
            audio.play();
        } else {
            nextTrack();
        }
    });

    playBtn.addEventListener('click', togglePlay);
    nextBtn.addEventListener('click', nextTrack);
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
        loadTrack(currentIndex);
        audio.play();
    });

    loadTrack(currentIndex);
});