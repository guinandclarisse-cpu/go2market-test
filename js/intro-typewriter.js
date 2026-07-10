(function () {
  var container = document.querySelector('.intro--typewriter');
  if (!container) return;

  var lines = Array.prototype.slice.call(container.querySelectorAll('.intro-line'));
  if (!lines.length) return;

  var typedEls = lines.map(function (line) {
    return line.querySelector('.intro-line-typed');
  });
  var fullTexts = lines.map(function (line) {
    return line.getAttribute('data-full') || '';
  });

  var reduceMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion) {
    typedEls.forEach(function (el, i) { el.textContent = fullTexts[i]; });
    return;
  }

  var CHARS_PER_TICK = 3;
  var TICK_MS = 10;
  var PARAGRAPH_PAUSE = 350;
  var CURSOR_HOLD = 1200;
  var CURSOR_FADE = 500;

  function typeLine(index, onDone) {
    var el = typedEls[index];
    var text = fullTexts[index];
    var cursor = document.createElement('span');
    cursor.className = 'uc-typewriter-cursor';

    var pos = 0;
    function tick() {
      pos = Math.min(pos + CHARS_PER_TICK, text.length);
      el.textContent = text.slice(0, pos);
      el.appendChild(cursor);
      if (pos < text.length) {
        setTimeout(tick, TICK_MS);
      } else {
        setTimeout(function () {
          cursor.remove();
          onDone();
        }, PARAGRAPH_PAUSE);
      }
    }
    tick();
  }

  function typeAll(index) {
    if (index >= typedEls.length) {
      var lastEl = typedEls[typedEls.length - 1];
      var cursor = document.createElement('span');
      cursor.className = 'uc-typewriter-cursor';
      lastEl.appendChild(cursor);
      setTimeout(function () {
        cursor.classList.add('is-fading');
        setTimeout(function () { cursor.remove(); }, CURSOR_FADE);
      }, CURSOR_HOLD);
      return;
    }
    typeLine(index, function () { typeAll(index + 1); });
  }

  function start() {
    typeAll(0);
  }

  if (!('IntersectionObserver' in window)) {
    start();
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        start();
        observer.unobserve(container);
      }
    });
  }, { threshold: 0.3 });

  observer.observe(container);
})();
