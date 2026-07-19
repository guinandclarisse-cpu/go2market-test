(function () {
  var rotator = document.querySelector('[data-rotator]');
  if (!rotator) return;

  var items = Array.prototype.slice.call(rotator.querySelectorAll('.stat-rotator-item'));
  if (items.length < 2) return;

  var DISPLAY_MS = 2800;
  var TRANSITION_MS = 450;
  var current = 0;

  items[0].classList.add('is-active');

  function goToNext() {
    var next = (current + 1) % items.length;
    var currentEl = items[current];
    var nextEl = items[next];

    currentEl.classList.remove('is-active');
    currentEl.classList.add('is-leaving');
    nextEl.classList.add('is-active');

    setTimeout(function () {
      currentEl.classList.remove('is-leaving');
    }, TRANSITION_MS);

    current = next;
  }

  setInterval(goToNext, DISPLAY_MS);
})();
