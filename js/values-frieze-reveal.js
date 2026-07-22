(function () {
  var el = document.querySelector('.values-frieze');
  if (!el) return;

  var items = el.querySelectorAll('.values-frieze-item');

  if (!('IntersectionObserver' in window)) {
    el.classList.add('is-inview');
    items.forEach(function (item) { item.classList.add('is-inview'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-inview');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  observer.observe(el);

  // Bordure de l'icône + titre en bleu ciel : déclenchés par valeur, à son
  // propre passage dans le viewport (indépendamment du cascade ci-dessus,
  // qui reste basé sur l'ensemble du bloc "Nos valeurs").
  var itemObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-inview');
        itemObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  items.forEach(function (item) { itemObserver.observe(item); });
})();
