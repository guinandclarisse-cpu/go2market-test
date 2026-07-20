(function () {
  var cards = document.querySelectorAll('.rd-step-card');
  if (!cards.length) return;

  var canHover = window.matchMedia &&
    window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  var clickCards = [];

  cards.forEach(function (card) {
    if (card.classList.contains('rd-step-card--click')) {
      clickCards.push(card);
      return;
    }

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

  // Cartes à retournement au clic uniquement (une seule carte ouverte à la
  // fois), avec un bouton de fermeture explicite sur la face arrière.
  clickCards.forEach(function (card) {
    var openTrigger = card.querySelector('.rd-flip-front .rd-step-more');
    var closeTrigger = card.querySelector('.rd-step-close');
    if (!openTrigger || !closeTrigger) return;

    function openCard() {
      clickCards.forEach(function (other) {
        if (other !== card) other.classList.remove('is-flipped');
      });
      card.classList.add('is-flipped');
    }

    function closeCard() {
      card.classList.remove('is-flipped');
    }

    openTrigger.addEventListener('click', function (e) {
      e.preventDefault();
      openCard();
    });
    openTrigger.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openCard();
      }
    });

    closeTrigger.addEventListener('click', function (e) {
      e.preventDefault();
      closeCard();
    });
    closeTrigger.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        closeCard();
      }
    });
  });
})();
