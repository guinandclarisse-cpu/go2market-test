(function () {
  var el = document.querySelector('.values-frieze');
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
  }, { threshold: 0.3 });

  observer.observe(el);
})();
