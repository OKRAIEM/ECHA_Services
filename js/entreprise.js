/**
 * entreprise.js
 * Carrousel photos — Page L'Entreprise
 * PNS Echafaudages
 * À placer dans : js/entreprise.js
 */

(function () {
  'use strict';

  // ── Sélecteurs ──────────────────────────────────────────
  const slides    = document.querySelectorAll('.ent-carousel-slide');
  const dots      = document.querySelectorAll('.ent-dot');
  const btnPrev   = document.getElementById('carouselPrev');
  const btnNext   = document.getElementById('carouselNext');

  if (!slides.length) return; // sortie si pas de carrousel

  let current      = 0;
  let autoplayTimer = null;
  const AUTOPLAY_DELAY = 4000; // ms entre chaque slide

  // ── Fonctions ────────────────────────────────────────────

  function goTo(index) {
    // Désactiver l'ancien slide et dot
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');

    // Calculer le nouvel index (boucle)
    current = (index + slides.length) % slides.length;

    // Activer le nouveau slide et dot
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(next, AUTOPLAY_DELAY);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  // ── Événements ───────────────────────────────────────────

  // Bouton suivant
  btnNext.addEventListener('click', function () {
    next();
    startAutoplay(); // reset du timer après clic
  });

  // Bouton précédent
  btnPrev.addEventListener('click', function () {
    prev();
    startAutoplay();
  });

  // Clic sur les dots
  dots.forEach(function (dot) {
    dot.addEventListener('click', function () {
      goTo(parseInt(this.dataset.index, 10));
      startAutoplay();
    });
  });

  // Pause au survol du carrousel
  const carousel = document.getElementById('entCarousel');
  if (carousel) {
    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);
  }

  // Support swipe tactile (mobile)
  let touchStartX = 0;
  let touchEndX   = 0;

  carousel.addEventListener('touchstart', function (e) {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  carousel.addEventListener('touchend', function (e) {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {           // seuil de 50px
      diff > 0 ? next() : prev();
      startAutoplay();
    }
  }, { passive: true });

  // Support clavier (accessibilité)
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') { next(); startAutoplay(); }
    if (e.key === 'ArrowLeft')  { prev(); startAutoplay(); }
  });

  // ── Démarrage ────────────────────────────────────────────
  startAutoplay();

})();
