(function () {
  var grid = document.querySelector('.ref-cards-grid');
  var buttons = document.querySelectorAll('.ref-filter-btn');
  if (!grid || !buttons.length) return;

  var cards = Array.prototype.slice.call(grid.querySelectorAll('.ref-card'));
  var current = 'all';
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var LEAVE_MS = 250;
  var ENTER_MS = 450;
  var STAGGER_MS = 80;

  function matches(card, filter) {
    return filter === 'all' || card.getAttribute('data-sector') === filter;
  }

  function applyFilter(filter) {
    if (filter === current) return;

    var toHide = [];
    var toShow = [];

    cards.forEach(function (card) {
      var wasVisible = matches(card, current);
      var willBeVisible = matches(card, filter);
      if (wasVisible && !willBeVisible) toHide.push(card);
      else if (!wasVisible && willBeVisible) toShow.push(card);
    });

    current = filter;

    if (reduceMotion) {
      toHide.forEach(function (card) { card.classList.add('ref-card--hidden'); });
      toShow.forEach(function (card) { card.classList.remove('ref-card--hidden'); });
      return;
    }

    toHide.forEach(function (card) {
      card.classList.add('ref-card--leaving');
    });

    var hideDelay = toHide.length ? LEAVE_MS : 0;

    window.setTimeout(function () {
      toHide.forEach(function (card) {
        card.classList.remove('ref-card--leaving');
        card.classList.add('ref-card--hidden');
      });

      toShow.forEach(function (card) {
        card.classList.remove('ref-card--hidden');
        card.classList.add('ref-card--enter-prep');
      });

      // Force reflow so the "prep" (initial) state is committed before animating in.
      void grid.offsetWidth;

      toShow.forEach(function (card, i) {
        card.style.transitionDelay = (i * STAGGER_MS) + 'ms';
        card.classList.remove('ref-card--enter-prep');
        card.classList.add('ref-card--entering');
      });

      var enterDuration = toShow.length ? (ENTER_MS + (toShow.length - 1) * STAGGER_MS) : 0;

      window.setTimeout(function () {
        toShow.forEach(function (card) {
          card.classList.remove('ref-card--entering');
          card.style.transitionDelay = '';
        });
      }, enterDuration + 60);
    }, hideDelay);
  }

  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (btn.classList.contains('is-active')) return;

      buttons.forEach(function (b) {
        var active = b === btn;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-pressed', active ? 'true' : 'false');
      });

      applyFilter(btn.getAttribute('data-filter'));
    });
  });
})();
