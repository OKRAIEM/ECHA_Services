/**
 * animated-headline.js — Vanilla JS (sans jQuery)
 * ECHA-Services — effet rotate-1 uniquement
 */
(function () {
  'use strict';

  const ANIMATION_DELAY = 2500; // ms entre chaque mot

  function animateHeadline(headline) {
    const words = headline.querySelectorAll('.cd-words-wrapper b');
    if (!words.length) return;

    let currentIndex = 0;

    // Trouver le mot visible au départ
    words.forEach(function (w, i) {
      if (w.classList.contains('is-visible')) currentIndex = i;
    });

    function switchWord() {
      const current = words[currentIndex];
      const nextIndex = (currentIndex + 1) % words.length;
      const next = words[nextIndex];

      current.classList.remove('is-visible');
      current.classList.add('is-hidden');

      next.classList.remove('is-hidden');
      next.classList.add('is-visible');

      currentIndex = nextIndex;
    }

    setInterval(switchWord, ANIMATION_DELAY);
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.cd-headline').forEach(animateHeadline);
  });
})();
