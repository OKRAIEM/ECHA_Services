/**
 * main.js — Vanilla JS (sans jQuery)
 * ECHA-Services
 * Remplace : custom.js + init.js + jquery.backstretch.min.js + modernizr.js
 */
(function () {
  'use strict';

  /* ──────────────────────────────────────────
     1. SLIDESHOW HERO — même comportement que backstretch
     Injecte des <img> absolus derrière le contenu,
     avec fondu cross-fade entre chaque image.
  ────────────────────────────────────────── */
  const heroImages = [
    'images/slideshow/chantier4.png',
    // 'images/slideshow/chantier2.png',
    'images/slideshow/chantier1.jpg',
    'images/slideshow/chantier6.jfif',
  ];

  function initHeroSlideshow() {
    const hero = document.querySelector('.hero-section');
    if (!hero || !heroImages.length) return;

    // Styles communs aux slides
    const baseStyle = [
      'position:absolute',
      'inset:0',
      'width:100%',
      'height:100%',
      'object-fit:cover',
      'object-position:center',
      'transition:opacity 0.75s ease',
      'pointer-events:none',
      'z-index:0',
    ].join(';');

    // Créer un <img> par image et les injecter AVANT l'overlay
    const overlay = hero.querySelector('.section-overlay');
    const slides = heroImages.map(function (src, i) {
      const img = document.createElement('img');
      img.src = src;
      img.alt = '';
      img.setAttribute('aria-hidden', 'true');
      img.style.cssText = baseStyle;
      img.style.opacity = i === 0 ? '1' : '0';
      // Insérer avant l'overlay pour rester derrière le contenu
      hero.insertBefore(img, overlay || hero.firstChild);
      return img;
    });

    let current = 0;

    setInterval(function () {
      slides[current].style.opacity = '0';
      current = (current + 1) % slides.length;
      slides[current].style.opacity = '1';
    }, 2000);
  }

  /* ──────────────────────────────────────────
     2. SMOOTH SCROLL (remplace jQuery scroll)
  ────────────────────────────────────────── */
  function initSmoothScroll() {
    document.querySelectorAll('a.smoothscroll').forEach(function (link) {
      link.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        if (!target) return;
        e.preventDefault();

        const navbar = document.querySelector('.navbar');
        const navHeight = navbar ? navbar.offsetHeight : 0;
        const top = target.getBoundingClientRect().top + window.scrollY - navHeight;

        window.scrollTo({ top: top, behavior: 'smooth' });
      });
    });
  }

  /* ──────────────────────────────────────────
     3. COMPTEUR VISITEURS
     (inchangé, déjà en JS natif dans index.html
      — on le centralise ici si besoin)
  ────────────────────────────────────────── */
  function initVisitorCounter() {
    const el = document.getElementById('visit-counter');
    if (!el) return;
    const KEY = 'echa_visits';
    const SESSION_KEY = 'echa_visited';
    let count = parseInt(localStorage.getItem(KEY) || '0', 10);
    if (!sessionStorage.getItem(SESSION_KEY)) {
      count += 1;
      localStorage.setItem(KEY, count);
      sessionStorage.setItem(SESSION_KEY, '1');
    }
    el.textContent = count.toLocaleString('fr-FR');
  }

  /* ──────────────────────────────────────────
     INIT
  ────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    initHeroSlideshow();
    initSmoothScroll();
    initVisitorCounter();
  });

})();
