(function () {
  var section = document.querySelector('.methodology');
  if (!section) return;

  var circles = Array.prototype.slice.call(section.querySelectorAll('.milestone-circle'));
  if (!circles.length) return;

  var STEP_DELAY = 420;

  function activateSequentially() {
    circles.forEach(function (circle, i) {
      setTimeout(function () {
        circle.classList.add('is-active');
      }, i * STEP_DELAY);
    });
  }

  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    circles.forEach(function (circle) { circle.classList.add('is-active'); });
    return;
  }

  if (!('IntersectionObserver' in window)) {
    activateSequentially();
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        activateSequentially();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  observer.observe(section);
})();
