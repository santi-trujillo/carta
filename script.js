// Manejo moderno del DOM, evitando eventos en línea
document.addEventListener('DOMContentLoaded', () => {
  const envelope = document.getElementById('envelope-wrap');
  const overlay = document.getElementById('overlay');
  const paperModal = document.getElementById('paper-modal');
  const closeBtn = document.getElementById('close-btn');
  
  // Abrir carta
  if (envelope) {
    envelope.addEventListener('click', () => {
      if (!envelope.classList.contains('open')) {
        // 1. Abre el sobre (solapa)
        envelope.classList.add('open');
        
        // 2. Esperar a que la solapa se abra y mostrar el modal
        setTimeout(() => {
          if (paperModal) paperModal.classList.add('active');
          if (overlay) overlay.classList.add('active');
        }, 500);
      }
    });
  }

  // Cerrar carta
  const closeLetter = (e) => {
    if (e) e.stopPropagation(); // Evitar propagaciones innecesarias
    
    // 1. Remover active del modal y overlay
    if (paperModal) paperModal.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    
    // 2. Esperar la animación de salida (0.4s) y cerrar el sobre
    setTimeout(() => {
      if (envelope) envelope.classList.remove('open');
    }, 400);
  };

  if (closeBtn) closeBtn.addEventListener('click', closeLetter);
  if (overlay) overlay.addEventListener('click', closeLetter);

  // Corazones flotantes dinámicos y optimizados
  const heartsContainer = document.getElementById('hearts');
  const heartEmojis = ['💖', '💕', '🌸', '💗', '💞'];
  
  const spawnHeart = () => {
    if (!heartsContainer) return;
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    
    // Cálculos de tamaño y posición
    const size = 12 + Math.random() * 28;
    heart.style.fontSize = `${size}px`;
    heart.style.left = `${Math.random() * 100}vw`;
    heart.style.animationDuration = `${5 + Math.random() * 6}s`;
    
    heartsContainer.appendChild(heart);
    
    // Limpieza segura del DOM
    setTimeout(() => {
      if (heart.parentNode) {
        heart.parentNode.removeChild(heart);
      }
    }, 12000);
  };

  // Generar corazones periódicamente
  setInterval(spawnHeart, 700);

  // Ocultar pantalla de bienvenida suavemente
  setTimeout(() => {
    const welcome = document.getElementById('welcome');
    if (welcome) {
      welcome.classList.add('fade-out');
      
      // Removerlo del flujo del DOM luego de la transición de 1s
      setTimeout(() => {
        welcome.style.display = 'none';
        welcome.setAttribute('aria-hidden', 'true');
      }, 1000);
    }
  }, 3500);
});
