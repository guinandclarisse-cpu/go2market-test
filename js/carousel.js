(function () {
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function initCarousel(root) {
    var viewport = root.querySelector('.carousel-viewport');
    var track = root.querySelector('.carousel-track');
    var dotsWrap = root.querySelector('.carousel-dots');
    var prevBtn = root.querySelector('.carousel-arrow--prev');
    var nextBtn = root.querySelector('.carousel-arrow--next');
    if (!viewport || !track) return;

    var dotLabelPrefix = root.getAttribute('data-carousel-dot-label') || 'Aller à la carte';

    var realSlides = Array.prototype.slice.call(track.children);
    var N = realSlides.length;
    if (N < 2) return;

    var CLONE_COUNT = Math.min(2, N);

    function cloneSlide(el) {
      var c = el.cloneNode(true);
      c.classList.add('carousel-clone');
      c.setAttribute('aria-hidden', 'true');
      var links = c.querySelectorAll('a');
      for (var i = 0; i < links.length; i++) { links[i].tabIndex = -1; }
      return c;
    }

    // Boucle infinie : on entoure les cartes réelles de clones des cartes
    // opposées (fin -> avant le début, début -> après la fin), pour qu'un
    // défilement au-delà des bornes reste visuellement continu.
    var headClones = realSlides.slice(N - CLONE_COUNT).map(cloneSlide);
    var tailClones = realSlides.slice(0, CLONE_COUNT).map(cloneSlide);

    headClones.forEach(function (c) { track.insertBefore(c, track.firstChild); });
    tailClones.forEach(function (c) { track.appendChild(c); });

    var allSlides = Array.prototype.slice.call(track.children);
    var current = 0;

    // Transition animée à durée fixe (0,7s, entre les 0,6-0,8s demandés),
    // indépendante du défilement natif au doigt/à la souris (non concerné).
    var TRANSITION_DUR = 700;
    var scrollRaf = null;

    function easeInOutCubic(t) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function animateScrollTo(targetLeft, duration) {
      if (scrollRaf) cancelAnimationFrame(scrollRaf);
      var startLeft = viewport.scrollLeft;
      var delta = targetLeft - startLeft;
      var startTime = null;

      function step(ts) {
        if (startTime === null) startTime = ts;
        var t = Math.min(1, (ts - startTime) / duration);
        viewport.scrollLeft = startLeft + delta * easeInOutCubic(t);
        if (t < 1) {
          scrollRaf = requestAnimationFrame(step);
        } else {
          scrollRaf = null;
        }
      }
      scrollRaf = requestAnimationFrame(step);
    }

    function scrollToIndex(logicalIndex, smooth) {
      var domIndex = CLONE_COUNT + (((logicalIndex % N) + N) % N);
      var target = allSlides[domIndex];
      if (!target) return;
      var targetLeft = target.offsetLeft - (viewport.clientWidth - target.clientWidth) / 2;
      if (smooth === false || reduceMotion) {
        if (scrollRaf) { cancelAnimationFrame(scrollRaf); scrollRaf = null; }
        viewport.scrollLeft = targetLeft;
      } else {
        animateScrollTo(targetLeft, TRANSITION_DUR);
      }
    }

    var dots = [];
    function buildDots() {
      if (!dotsWrap) return;
      for (var i = 0; i < N; i++) {
        var dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'carousel-dot';
        dot.setAttribute('role', 'tab');
        dot.setAttribute('aria-label', dotLabelPrefix + ' ' + (i + 1));
        (function (idx) {
          dot.addEventListener('click', function () {
            scrollToIndex(idx);
          });
        })(i);
        dotsWrap.appendChild(dot);
        dots.push(dot);
      }
    }
    buildDots();

    function updateDots() {
      for (var i = 0; i < dots.length; i++) {
        dots[i].classList.toggle('is-active', i === current);
      }
    }

    var loopFixTimer = null;

    function updateActive() {
      var viewportCenter = viewport.scrollLeft + viewport.clientWidth / 2;
      var closestDomIndex = CLONE_COUNT;
      var closestDist = Infinity;

      allSlides.forEach(function (s, i) {
        var c = s.offsetLeft + s.clientWidth / 2;
        var d = Math.abs(c - viewportCenter);
        if (d < closestDist) { closestDist = d; closestDomIndex = i; }
      });

      allSlides.forEach(function (s) { s.classList.remove('is-active'); });
      if (allSlides[closestDomIndex]) allSlides[closestDomIndex].classList.add('is-active');

      current = ((closestDomIndex - CLONE_COUNT) % N + N) % N;
      updateDots();

      // Repositionnement invisible si le défilement s'est arrêté sur un clone
      // (clone identique à la carte réelle correspondante : aucune coupure
      // visible pour le visiteur).
      if (closestDomIndex < CLONE_COUNT || closestDomIndex >= CLONE_COUNT + N) {
        clearTimeout(loopFixTimer);
        loopFixTimer = setTimeout(function () {
          scrollToIndex(current, false);
        }, 60);
      }
    }

    var scrollDebounce = null;
    viewport.addEventListener('scroll', function () {
      clearTimeout(scrollDebounce);
      scrollDebounce = setTimeout(updateActive, 90);
    }, { passive: true });

    function next() { scrollToIndex(current + 1); }
    function prev() { scrollToIndex(current - 1); }

    if (nextBtn) nextBtn.addEventListener('click', next);
    if (prevBtn) prevBtn.addEventListener('click', prev);

    // Défilement automatique, en pause au survol et pendant une interaction
    // manuelle (glissement tactile ou souris) pour ne jamais gêner le clic.
    // ~3,5s d'affichage stable + 0,7s de transition = ~4,2s entre deux cartes.
    var AUTOPLAY_DELAY = 4200;
    var autoplayTimer = null;
    var isHovering = false;
    var isInteracting = false;

    function startAutoplay() {
      stopAutoplay();
      if (reduceMotion) return;
      autoplayTimer = setInterval(function () {
        if (!isHovering && !isInteracting) next();
      }, AUTOPLAY_DELAY);
    }

    function stopAutoplay() {
      if (autoplayTimer) { clearInterval(autoplayTimer); autoplayTimer = null; }
    }

    root.addEventListener('mouseenter', function () { isHovering = true; });
    root.addEventListener('mouseleave', function () { isHovering = false; });

    var interactionEndTimer = null;
    viewport.addEventListener('pointerdown', function () {
      isInteracting = true;
      clearTimeout(interactionEndTimer);
    });
    window.addEventListener('pointerup', function () {
      clearTimeout(interactionEndTimer);
      interactionEndTimer = setTimeout(function () { isInteracting = false; }, 400);
    });

    var resizeTimer = null;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        scrollToIndex(current, false);
      }, 200);
    });

    requestAnimationFrame(function () {
      scrollToIndex(0, false);
      updateActive();
      startAutoplay();
    });
  }

  var roots = document.querySelectorAll('.carousel');
  for (var r = 0; r < roots.length; r++) {
    initCarousel(roots[r]);
  }
})();
