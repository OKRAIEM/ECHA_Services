/* scroll-reveal.js — Intersection Observer */
document.addEventListener('DOMContentLoaded', function () {

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up').forEach(function (el) {
    observer.observe(el);
  });

});
