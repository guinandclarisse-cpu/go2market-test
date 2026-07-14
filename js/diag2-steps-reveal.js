(function () {
  var lists = document.querySelectorAll('.diag2-steps-list');
  if (!lists.length) return;

  if (!('IntersectionObserver' in window)) {
    lists.forEach(function (l) { l.classList.add('is-inview'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-inview');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  lists.forEach(function (l) { observer.observe(l); });
})();
