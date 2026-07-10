(function () {
  var cards = document.querySelectorAll('.rd-step-card');
  if (!cards.length) return;

  var canHover = window.matchMedia &&
    window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  cards.forEach(function (card) {
    var trigger = card.querySelector('.rd-step-more');
    if (!trigger) return;

    if (canHover) {
      trigger.addEventListener('mouseenter', function () {
        card.classList.add('is-flipped');
      });
      trigger.addEventListener('focus', function () {
        card.classList.add('is-flipped');
      });
      card.addEventListener('mouseleave', function () {
        card.classList.remove('is-flipped');
      });
      trigger.addEventListener('blur', function () {
        card.classList.remove('is-flipped');
      });
    } else {
      trigger.addEventListener('click', function (e) {
        e.preventDefault();
        card.classList.toggle('is-flipped');
      });
    }

    trigger.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.classList.toggle('is-flipped');
      }
    });
  });
})();
