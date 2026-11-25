/* ============================================
   MAIN.JS — Animaciones compartidas
   ============================================ */

// ---- Hojas cayendo estilo Heartstopper ----
(function crearHojas() {
  const hojas = ['🍂', '🍁', '🍃', '🌿', '🍁', '🍂'];
  for (let i = 0; i < 26; i++) {
    const hoja = document.createElement('div');
    hoja.className = 'leaf';
    hoja.textContent = hojas[Math.floor(Math.random() * hojas.length)];
    hoja.style.left = Math.random() * 100 + 'vw';
    hoja.style.animationDuration = (7 + Math.random() * 9) + 's';
    hoja.style.animationDelay = (Math.random() * 10) + 's';
    hoja.style.fontSize = (18 + Math.random() * 22) + 'px';
    document.body.appendChild(hoja);
  }
})();

// ---- Corazones flotantes (solo carta) ----
function lanzarCorazones() {
  const corazones = ['💙', '💛', '🤍', '💜', '💗', '❤️'];
  for (let i = 0; i < 28; i++) {
    setTimeout(() => {
      const c = document.createElement('div');
      c.className = 'heart';
      c.textContent = corazones[Math.floor(Math.random() * corazones.length)];
      c.style.left = Math.random() * 100 + 'vw';
      c.style.animationDuration = (4 + Math.random() * 4) + 's';
      c.style.fontSize = (16 + Math.random() * 22) + 'px';
      document.body.appendChild(c);
      setTimeout(() => c.remove(), 8000);
    }, i * 180);
  }
}

if (document.body.classList.contains('page-carta')) {
  window.addEventListener('load', lanzarCorazones);
}