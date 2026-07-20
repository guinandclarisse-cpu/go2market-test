(function () {
  var section = document.querySelector('.journey');
  if (!section) return;

  if (!('IntersectionObserver' in window)) {
    section.classList.add('journey-inview');
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('journey-inview');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  observer.observe(section);
})();
