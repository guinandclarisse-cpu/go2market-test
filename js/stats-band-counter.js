(function () {
  var grid = document.querySelector('.stats-band-grid');
  if (!grid) return;

  var counters = Array.prototype.slice.call(grid.querySelectorAll('.stat-number[data-counter-target]'));
  if (!counters.length) return;

  var DURATION = 1900;
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function formatValue(value, decimals) {
    if (decimals > 0) {
      return value.toFixed(decimals).replace('.', ',');
    }
    return Math.round(value).toString();
  }

  function setFinal(el) {
    var target = parseFloat(el.getAttribute('data-counter-target'));
    var decimals = parseInt(el.getAttribute('data-counter-decimals') || '0', 10);
    var span = el.querySelector('.stat-counter');
    if (span) span.textContent = formatValue(target, decimals);
  }

  if (reduceMotion) {
    counters.forEach(setFinal);
    return;
  }

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function animateCounter(el) {
    var target = parseFloat(el.getAttribute('data-counter-target'));
    var decimals = parseInt(el.getAttribute('data-counter-decimals') || '0', 10);
    var span = el.querySelector('.stat-counter');
    if (!span) return;

    span.textContent = formatValue(0, decimals);
    var start = null;

    function step(timestamp) {
      if (!start) start = timestamp;
      var progress = Math.min((timestamp - start) / DURATION, 1);
      var eased = easeOutCubic(progress);
      span.textContent = formatValue(target * eased, decimals);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        span.textContent = formatValue(target, decimals);
      }
    }

    requestAnimationFrame(step);
  }

  function runAll() {
    counters.forEach(animateCounter);
  }

  if (!('IntersectionObserver' in window)) {
    runAll();
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        runAll();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  observer.observe(grid);
})();
