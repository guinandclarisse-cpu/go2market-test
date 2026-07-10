(function () {
  var containers = document.querySelectorAll('.uc-stats');
  if (!containers.length) return;

  var CARD_STAGGER = 150;
  var COUNT_DELAY_AFTER_CARD = 150;
  var COUNT_DURATION = 900;
  var ARROW_PART_STAGGER = 220;

  var reduceMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function parseSimpleNumber(text) {
    var m = text.match(/^([~≈+\-–><]*\s*)(\d+(?:[.,]\d+)?)(\s*.*)$/);
    if (!m) return null;
    var rawValue = m[2].replace(',', '.');
    var decimals = rawValue.indexOf('.') !== -1 ? rawValue.split('.')[1].length : 0;
    return {
      prefix: m[1],
      value: parseFloat(rawValue),
      suffix: m[3],
      decimals: decimals
    };
  }

  function formatValue(target, value) {
    var display = target.decimals > 0 ? value.toFixed(target.decimals) : String(Math.round(value));
    return target.prefix + display + target.suffix;
  }

  function animateCount(el, target) {
    if (reduceMotion) {
      el.textContent = formatValue(target, target.value);
      return;
    }
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var progress = Math.min((ts - start) / COUNT_DURATION, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = formatValue(target, target.value * eased);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = formatValue(target, target.value);
      }
    }
    requestAnimationFrame(step);
  }

  function buildCheckSVG() {
    return '<svg class="uc-stat-check" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<path d="M5 12.5l4.5 4.5L19 7" stroke="var(--uc-bg)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"></path>' +
      '</svg>';
  }

  function setupCard(card) {
    var numberEl = card.querySelector('.uc-stat-number');
    if (!numberEl) return function () {};

    var raw = numberEl.textContent.trim();
    var isCheck = raw === '✓';
    var arrowMatch = !isCheck && raw.match(/^(.+?)\s*(?:→|->)\s*(.+)$/);
    var simple = !isCheck && !arrowMatch ? parseSimpleNumber(raw) : null;

    if (isCheck) {
      numberEl.innerHTML = buildCheckSVG();
    } else if (arrowMatch) {
      var v1 = arrowMatch[1].trim();
      var v2 = arrowMatch[2].trim();
      numberEl.innerHTML =
        '<span class="uc-stat-arrow-part uc-stat-arrow-part--from">' + v1 + '</span> ' +
        '<span class="uc-stat-arrow-part uc-stat-arrow-part--sep">→</span> ' +
        '<span class="uc-stat-arrow-part uc-stat-arrow-part--to">' + v2 + '</span>';
    } else if (simple) {
      numberEl.textContent = reduceMotion ? raw : formatValue(simple, 0);
    }

    return function trigger() {
      if (isCheck) {
        var path = numberEl.querySelector('path');
        if (path && path.getTotalLength) {
          var len = path.getTotalLength();
          if (reduceMotion) return;
          path.style.strokeDasharray = len;
          path.style.strokeDashoffset = len;
          // Force reflow so the browser registers the starting offset before transitioning.
          path.getBoundingClientRect();
          path.style.transition = 'stroke-dashoffset 0.55s ease';
          requestAnimationFrame(function () {
            path.style.strokeDashoffset = '0';
          });
        }
      } else if (arrowMatch) {
        var parts = numberEl.querySelectorAll('.uc-stat-arrow-part');
        Array.prototype.forEach.call(parts, function (p, i) {
          setTimeout(function () { p.classList.add('is-visible'); }, reduceMotion ? 0 : i * ARROW_PART_STAGGER);
        });
      } else if (simple) {
        setTimeout(function () { animateCount(numberEl, simple); }, reduceMotion ? 0 : COUNT_DELAY_AFTER_CARD);
      }
    };
  }

  function setupContainer(container) {
    var cards = Array.prototype.slice.call(container.querySelectorAll('.uc-stat-card'));
    if (!cards.length) return;

    var triggers = cards.map(setupCard);

    function revealAll() {
      cards.forEach(function (card, i) {
        setTimeout(function () {
          card.classList.add('uc-inview');
          triggers[i]();
        }, reduceMotion ? 0 : i * CARD_STAGGER);
      });
    }

    if (!('IntersectionObserver' in window)) {
      revealAll();
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          revealAll();
          observer.unobserve(container);
        }
      });
    }, { threshold: 0.2 });

    observer.observe(container);
  }

  Array.prototype.forEach.call(containers, setupContainer);
})();
