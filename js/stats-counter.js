(function () {
  var row = document.querySelector('.stats-row');
  if (!row) return;

  var counters = Array.prototype.slice.call(row.querySelectorAll('.stat-number[data-counter-target]'));
  if (!counters.length) return;

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
    var duration = parseInt(el.getAttribute('data-counter-duration') || '950', 10);
    var span = el.querySelector('.stat-counter');
    if (!span) return;

    var start = null;

    function step(timestamp) {
      if (!start) start = timestamp;
      var progress = Math.min((timestamp - start) / duration, 1);
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

  function runSequence() {
    var cumulative = 0;
    var gap = 200;
    counters.forEach(function (el) {
      var duration = parseInt(el.getAttribute('data-counter-duration') || '950', 10);
      setTimeout(function () {
        animateCounter(el);
      }, cumulative);
      cumulative += duration + gap;
    });
  }

  if (!('IntersectionObserver' in window)) {
    runSequence();
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        runSequence();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  observer.observe(row);
})();
