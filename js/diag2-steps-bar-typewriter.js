(function () {
  var list = document.querySelector('.diag2-steps-list');
  var bar = document.querySelector('.diag2-steps-bar');
  if (!list || !bar) return;

  var textEl = bar.querySelector('.diag2-steps-bar-text');
  var chevrons = Array.prototype.slice.call(bar.querySelectorAll('.diag2-steps-bar-chevrons span'));
  if (!textEl) return;

  var fullText = textEl.getAttribute('data-full') || '';
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Départ calé sur la fin de l'animation de l'étape 03 (~7.65s, voir
     diag2-steps-reveal côté CSS) + un délai d'environ 0.4s. */
  var START_DELAY = 8050;
  var TYPE_DURATION = 2200;
  var CHEVRON_STAGGER = 80;

  function showChevrons() {
    chevrons.forEach(function (el, i) {
      setTimeout(function () {
        el.classList.add('is-visible');
      }, i * CHEVRON_STAGGER);
    });
  }

  function typeText() {
    var start = null;
    function step(timestamp) {
      if (!start) start = timestamp;
      var progress = Math.min((timestamp - start) / TYPE_DURATION, 1);
      var count = Math.floor(fullText.length * progress);
      textEl.textContent = fullText.slice(0, count);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        textEl.textContent = fullText;
        showChevrons();
      }
    }
    requestAnimationFrame(step);
  }

  function runSequence() {
    if (reduceMotion) {
      textEl.textContent = fullText;
      chevrons.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    setTimeout(typeText, START_DELAY);
  }

  if (!('IntersectionObserver' in window)) {
    runSequence();
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        runSequence();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  observer.observe(list);
})();
