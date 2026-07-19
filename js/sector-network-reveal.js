(function () {
  var el = document.querySelector('.sector-network');
  if (!el) return;

  if (!('IntersectionObserver' in window)) {
    el.classList.add('is-inview');
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-inview');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.25 });

  observer.observe(el);
})();
