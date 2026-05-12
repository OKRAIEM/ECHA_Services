/**
 * realisations.js — Interaction cartes + filtres
 * ECHA-Services
 */
(function () {
    'use strict';

    /* ──────────────────────────────────────
       1. RÉVÉLATION AU CLIC / TAP
    ────────────────────────────────────── */
    function initCardReveal() {
        const cards = document.querySelectorAll('.rl-card');

        cards.forEach(function (card) {
            card.addEventListener('click', function () {
                const isRevealed = card.classList.contains('revealed');

                // Fermer toutes les autres cartes
                cards.forEach(function (c) {
                    if (c !== card) c.classList.remove('revealed');
                });

                // Toggle la carte cliquée
                card.classList.toggle('revealed', !isRevealed);
            });

            // Support tactile : éviter le double déclenchement
            card.addEventListener('touchend', function (e) {
                e.preventDefault();
                card.click();
            });
        });

        // Cliquer ailleurs referme tout
        document.addEventListener('click', function (e) {
            if (!e.target.closest('.rl-card')) {
                cards.forEach(function (c) { c.classList.remove('revealed'); });
            }
        });
    }

    /* ──────────────────────────────────────
       2. FILTRES PAR CATÉGORIE
    ────────────────────────────────────── */
    function initFilters() {
        const filterBtns = document.querySelectorAll('.rl-filter-btn');
        const cards = document.querySelectorAll('.rl-card');

        filterBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                const filter = btn.getAttribute('data-filter');

                // Activer le bouton
                filterBtns.forEach(function (b) { b.classList.remove('active'); });
                btn.classList.add('active');

                // Fermer les overlays ouverts
                cards.forEach(function (c) { c.classList.remove('revealed'); });

                // Filtrer avec animation
                cards.forEach(function (card) {
                    const category = card.getAttribute('data-category');
                    if (filter === 'all' || category === filter) {
                        card.style.display = '';
                        // Petit délai pour l'animation d'entrée
                        setTimeout(function () {
                            card.style.opacity = '1';
                            card.style.transform = '';
                        }, 30);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.95)';
                        setTimeout(function () {
                            card.style.display = 'none';
                        }, 280);
                    }
                });
            });
        });
    }

    /* ──────────────────────────────────────
       INIT
    ────────────────────────────────────── */
    document.addEventListener('DOMContentLoaded', function () {
        initCardReveal();
        initFilters();
    });

})();