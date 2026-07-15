(function () {
  var root = document.querySelector('.hero-logo-reveal');
  if (!root) return;

  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  var grid = root.querySelector('.hlr-grid');
  var COLS = 16, ROWS = 16;
  var COLORS = [
    'var(--color-primary)',
    'var(--color-primary)',
    'var(--color-white)',
    'var(--color-primary-hover)',
    'var(--color-dark)'
  ];

  var APPEAR_TRANSITION = 350;
  var REVEAL_TRANSITION = 500;

  var tiles = [];

  for (var r = 0; r < ROWS; r++) {
    for (var c = 0; c < COLS; c++) {
      var tile = document.createElement('div');
      tile.className = 'hlr-tile';
      tile.style.background = COLORS[Math.floor(Math.random() * COLORS.length)];
      grid.appendChild(tile);

      var cx = (c + 0.5) / COLS - 0.5;
      var cy = (r + 0.5) / ROWS - 0.5;
      var dist = Math.sqrt(cx * cx + cy * cy) / 0.7071;

      tiles.push({ el: tile, dist: dist });
    }
  }

  function play() {
    // Phase 1 : les tuiles s'allument progressivement (vague depuis le
    // centre). L'image réelle reste opacity:0 pendant toute cette phase :
    // aucun risque qu'elle soit visible avant d'être couverte.
    var maxAppearDelay = 0;

    tiles.forEach(function (t) {
      var appearDelay = 80 + t.dist * 1100 + Math.random() * 180;
      t.appearDelay = appearDelay;
      maxAppearDelay = Math.max(maxAppearDelay, appearDelay);

      setTimeout(function () {
        t.el.classList.add('hlr-tile--lit');
      }, appearDelay);
    });

    var appearPhaseEnd = maxAppearDelay + APPEAR_TRANSITION;

    // Phase 2 : une fois TOUTES les tuiles allumées (mosaïque opaque qui
    // recouvre entièrement la zone), on rend l'image réelle visible
    // instantanément. Comme elle est totalement cachée sous les tuiles à
    // cet instant précis, la bascule est invisible à l'écran.
    setTimeout(function () {
      root.classList.add('is-revealed');
    }, appearPhaseEnd + 60);

    // Phase 3 : les tuiles s'effacent une à une (même vague, depuis le
    // centre), démarrée seulement après la phase 2 — jamais avant —
    // révélant l'image réelle déjà en place derrière elles.
    var revealStart = appearPhaseEnd + 60 + 120;
    var maxRevealDelay = 0;

    tiles.forEach(function (t) {
      var revealDelay = revealStart + t.dist * 1900 + Math.random() * 280;
      maxRevealDelay = Math.max(maxRevealDelay, revealDelay);

      setTimeout(function () {
        t.el.classList.remove('hlr-tile--lit');
        t.el.classList.add('hlr-tile--gone');
      }, revealDelay);
    });

    setTimeout(function () {
      grid.style.display = 'none';
    }, maxRevealDelay + REVEAL_TRANSITION + 100);
  }

  if (!('IntersectionObserver' in window)) {
    play();
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        play();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.35 });

  observer.observe(root);
})();
