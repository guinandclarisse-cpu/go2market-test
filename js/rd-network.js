(function () {
  var reduceMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  var cards = document.querySelectorAll('.rd-feature-card');
  if (!cards.length) return;

  var ACTIVE_DURATION = 2500;

  cards.forEach(function (card) {
    var timeoutId = null;

    card.addEventListener('touchstart', function () {
      card.classList.add('rd-net-active');
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(function () {
        card.classList.remove('rd-net-active');
      }, ACTIVE_DURATION);
    }, { passive: true });
  });
})();
