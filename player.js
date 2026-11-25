/* ============================================
   PLAYER.JS — Reproductor estilo Spotify
   ============================================ */

// ⚠️ EDITA AQUÍ tus canciones
const canciones = [
  { titulo: "Sin Avisar", artista: "Tu humilde servidor", archivo: "music/Canción1.mp3", cover: "🎸" },
  { titulo: "Moments In The Sun", artista: "Sunflower Bean", archivo: "music/moments-in-the-sun.mp3", cover: "🌻" },
  { titulo: "505", artista: "Arctic Monkeys", archivo: "music/505.mp3", cover: "🏨" },
  { titulo: "Why'd You Only Call Me When You're High", artista: "Arctic Monkeys", archivo: "music/Arctic Monkeys - Why'd You Only Call Me When You're High.mp3", cover: "🌙" },
  { titulo: "Clearest Blue", artista: "CHVRCHES", archivo: "music/CHVRCHES - Clearest Blue.mp3", cover: "💎" },
  { titulo: "Nada Fue Un Error", artista: "Coti", archivo: "music/Coti - Nada Fue Un Error.mp3", cover: "🎈" },
  { titulo: "Do I Wanna Know?", artista: "Arctic Monkeys", archivo: "music/Do I Wanna Know.mp3", cover: "❓" },
  { titulo: "El No Lo Mato", artista: "El Haragán y Compañía", archivo: "music/El No Lo Mato.mp3", cover: "🎺" },
  { titulo: "Devuélveme a mi chica", artista: "Hombres G", archivo: "music/Hombres G - Devuélveme a mi chica.mp3", cover: "💔" },
  { titulo: "La Flaca", artista: "Jarabe De Palo", archivo: "music/Jarabe De Palo - La Flaca (Letra Lyrics).mp3", cover: "🌴" },
  { titulo: "La Camisa Negra", artista: "Juanes", archivo: "music/Juanes - La Camisa Negra (Letra).mp3", cover: "👔" },
  { titulo: "Mil Horas", artista: "Los Abuelos De La Nada", archivo: "music/Los Abuelos De La Nada – Mil Horas [Letra].mp3", cover: "⏳" },
  { titulo: "Lamento Boliviano", artista: "Los Enanitos Verdes", archivo: "music/Los Enanitos Verdes - Lamento Boliviano (Letra Lyrics).mp3", cover: "🇧🇴" },
  { titulo: "Clavado En Un Bar", artista: "Maná", archivo: "music/Maná - Clavado En Un Bar.mp3", cover: "🍻" },
  { titulo: "Me Vale", artista: "Maná", archivo: "music/Maná - ME VALE (Letra Oficial Official Lyrics).mp3", cover: "🤷‍♂️" },
  { titulo: "Matador", artista: "Los Fabulosos Cadillacs", archivo: "music/Matador - Los Fabulosos Cadillacs (Letra).mp3", cover: "🐂" },
  { titulo: "I Wanna Be Your Slave", artista: "Måneskin", archivo: "music/Måneskin - I WANNA BE YOUR SLAVE (Traducida al Español) live version.mp3", cover: "🎤" },
  { titulo: "De Música Ligera", artista: "Soda Stereo", archivo: "music/Soda Stereo - De Música Ligera (Lyrics).mp3", cover: "🎶" },
  { titulo: "Sweater Weather", artista: "The Neighbourhood", archivo: "music/Sweater Weather.mp3", cover: "🧥" },
  { titulo: "Wanna Be Yours", artista: "Arctic Monkeys", archivo: "music/Wanna be yours - Arctic Monkeys (lyrics).mp3", cover: "💭" },
  { titulo: "Don't Delete The Kisses", artista: "Wolf Alice", archivo: "music/Wolf Alice - Don't Delete the Kisses (Official Video).mp3", cover: "📱" }
];

const audio       = document.getElementById('audio');
const songList    = document.getElementById('songList');
const playBtn     = document.getElementById('playBtn');
const prevBtn     = document.getElementById('prevBtn');
const nextBtn     = document.getElementById('nextBtn');
const progressBar = document.getElementById('progressBar');
const volumeBar   = document.getElementById('volumeBar');
const currentTime = document.getElementById('currentTime');
const totalTime   = document.getElementById('totalTime');
const nowTitle    = document.getElementById('nowTitle');
const nowArtist   = document.getElementById('nowArtist');
const nowCover    = document.getElementById('nowCover');

let indexActual = 0;

function renderizarLista() {
  songList.innerHTML = '';
  canciones.forEach((c, i) => {
    const li = document.createElement('li');
    li.className = 'song-item';
    li.dataset.index = i;
    li.innerHTML = `
      <span class="song-num">${i + 1}</span>
      <div class="song-cover">${c.cover}</div>
      <div class="song-meta">
        <p class="song-title">${c.titulo}</p>
        <p class="song-artist">${c.artista}</p>
      </div>
      <span class="song-duration">--:--</span>
    `;
    li.addEventListener('click', () => cargarCancion(i, true));
    songList.appendChild(li);
  });
}

function cargarCancion(i, autoplay = false) {
  indexActual = i;
  const c = canciones[i];
  audio.src = c.archivo;
  nowTitle.textContent = c.titulo;
  nowArtist.textContent = c.artista;
  nowCover.textContent = c.cover;

  document.querySelectorAll('.song-item').forEach(el => el.classList.remove('active'));
  const item = songList.querySelector(`[data-index="${i}"]`);
  if (item) item.classList.add('active');

  progressBar.value = 0;
  currentTime.textContent = '0:00';

  if (autoplay) audio.play().then(() => actualizarBotonPlay(true)).catch(() => {});
}

function actualizarBotonPlay(reproduciendo) {
  playBtn.textContent = reproduciendo ? '⏸' : '▶';
}

function formatearTiempo(seg) {
  if (isNaN(seg)) return '0:00';
  const m = Math.floor(seg / 60);
  const s = Math.floor(seg % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

playBtn.addEventListener('click', () => {
  if (!audio.src) { cargarCancion(0, true); return; }
  audio.paused ? audio.play() : audio.pause();
});

prevBtn.addEventListener('click', () => {
  cargarCancion((indexActual - 1 + canciones.length) % canciones.length, true);
});

nextBtn.addEventListener('click', () => {
  cargarCancion((indexActual + 1) % canciones.length, true);
});

audio.addEventListener('play',  () => actualizarBotonPlay(true));
audio.addEventListener('pause', () => actualizarBotonPlay(false));

audio.addEventListener('loadedmetadata', () => {
  totalTime.textContent = formatearTiempo(audio.duration);
});

audio.addEventListener('timeupdate', () => {
  if (audio.duration) {
    progressBar.value = (audio.currentTime / audio.duration) * 100;
    currentTime.textContent = formatearTiempo(audio.currentTime);
  }
});

audio.addEventListener('ended', () => {
  cargarCancion((indexActual + 1) % canciones.length, true);
});

progressBar.addEventListener('input', () => {
  if (audio.duration) audio.currentTime = (progressBar.value / 100) * audio.duration;
});

volumeBar.addEventListener('input', () => {
  audio.volume = volumeBar.value / 100;
});

renderizarLista();
audio.volume = 0.7;