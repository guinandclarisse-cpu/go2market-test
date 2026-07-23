(function () {
  var root = document.querySelector('.hero-logo-reveal');
  if (!root) return;

  // Le logo est visible par défaut en CSS ; on ne le repasse à l'état
  // "prêt à animer" (clip-path:0%) qu'une fois certain que ce script
  // s'exécute réellement, pour ne jamais rester bloqué invisible si JS
  // est désactivé ou si ce fichier échoue à charger.
  root.classList.add('js-armed');

  function revealInstantly() {
    root.classList.add('is-revealed');
  }

  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    revealInstantly();
    return;
  }

  var canvas = root.querySelector('.hlr-canvas');
  var ctx = canvas ? canvas.getContext('2d') : null;
  if (!ctx) {
    revealInstantly();
    return;
  }

  // Palette "bleu ciel / bleu nuit" reprise du design system (var(--color-
  // primary), var(--color-primary-hover)), du plus clair au plus profond.
  var COLORS = ['#BFE6FF', '#56B6E8', '#2E86C1', '#154C79'];
  var COUNT = 80;
  var AMBIENT_COUNT = 9;

  var DPR = Math.min(window.devicePixelRatio || 1, 2);
  var canvasW = 0, canvasH = 0, centerX = 0, centerY = 0, ringR = 0;
  var particles = [];

  function rand(min, max) { return min + Math.random() * (max - min); }

  function measure() {
    var canvasRect = canvas.getBoundingClientRect();
    canvasW = canvasRect.width;
    canvasH = canvasRect.height;
    canvas.width = Math.max(1, Math.round(canvasW * DPR));
    canvas.height = Math.max(1, Math.round(canvasH * DPR));
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

    centerX = canvasW / 2;
    centerY = canvasH / 2;
    ringR = root.getBoundingClientRect().width / 2;
  }

  function buildParticles() {
    particles = [];
    var maxScatter = Math.max(canvasW, canvasH) / 2 * 0.98;
    for (var i = 0; i < COUNT; i++) {
      var angle = rand(0, Math.PI * 2);
      var scatterDist = rand(ringR * 0.85, maxScatter);
      var sx = centerX + Math.cos(angle) * scatterDist;
      var sy = centerY + Math.sin(angle) * scatterDist;

      var targetAngle = rand(0, Math.PI * 2);
      var targetDist = ringR * rand(0.9, 1.1);
      var tx = centerX + Math.cos(targetAngle) * targetDist;
      var ty = centerY + Math.sin(targetAngle) * targetDist;

      particles.push({
        sx: sx, sy: sy, tx: tx, ty: ty,
        x: sx, y: sy,
        r: rand(1.1, 2.6),
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        appearAt: rand(0, 470),
        convergeAt: rand(1530, 1955),
        convergeDur: rand(1275, 1870),
        opacity: 0,
        ambient: i < AMBIENT_COUNT,
        ambientPhase: rand(0, Math.PI * 2),
        ambientSpeed: rand(0.00006, 0.00014) * (Math.random() < 0.5 ? 1 : -1),
        ambientWobble: rand(0.06, 0.16)
      });
    }
  }

  measure();
  buildParticles();

  var resizeTimer = null;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      measure();
    }, 150);
  });

  function easeInOutSine(t) { return -(Math.cos(Math.PI * t) - 1) / 2; }

  var FADE_START = 5100;
  var FADE_DUR = 640;
  var AMBIENT_START = FADE_START + FADE_DUR;

  function drawBuilding(elapsed) {
    ctx.clearRect(0, 0, canvasW, canvasH);

    var fadeK = 1;
    if (elapsed > FADE_START) {
      fadeK = Math.max(0, 1 - (elapsed - FADE_START) / FADE_DUR);
    }

    var linkDist = ringR * 0.55;
    var visible = [];

    particles.forEach(function (p) {
      var t = elapsed - p.appearAt;
      if (t < 0) { p.opacity = 0; return; }
      p.opacity = Math.min(1, t / 400) * 0.85 * fadeK;

      var ct = elapsed - p.convergeAt;
      if (ct <= 0) {
        p.x = p.sx; p.y = p.sy;
      } else if (ct >= p.convergeDur) {
        p.x = p.tx; p.y = p.ty;
      } else {
        var k = easeInOutSine(ct / p.convergeDur);
        p.x = p.sx + (p.tx - p.sx) * k;
        p.y = p.sy + (p.ty - p.sy) * k;
      }

      if (p.opacity > 0.02) visible.push(p);
    });

    if (fadeK > 0.02) {
      ctx.lineWidth = 0.6;
      for (var i = 0; i < visible.length; i++) {
        for (var j = i + 1; j < visible.length; j++) {
          var a = visible[i], b = visible[j];
          var dx = a.x - b.x, dy = a.y - b.y;
          var d = Math.sqrt(dx * dx + dy * dy);
          if (d < linkDist) {
            var lo = (1 - d / linkDist) * Math.min(a.opacity, b.opacity) * 0.5;
            if (lo > 0.02) {
              ctx.strokeStyle = 'rgba(143,211,255,' + lo.toFixed(3) + ')';
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }
        }
      }
    }

    visible.forEach(function (p) {
      ctx.beginPath();
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.opacity;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;
  }

  function drawAmbient(elapsed) {
    ctx.clearRect(0, 0, canvasW, canvasH);
    var t = elapsed - AMBIENT_START;

    particles.forEach(function (p) {
      if (!p.ambient) return;
      var angle = p.ambientPhase + t * p.ambientSpeed;
      var dist = ringR * (1 + p.ambientWobble * Math.sin(t * 0.0007 + p.ambientPhase));
      var x = centerX + Math.cos(angle) * dist;
      var y = centerY + Math.sin(angle) * dist;
      var op = 0.22 + 0.14 * Math.sin(t * 0.0009 + p.ambientPhase * 2);

      ctx.beginPath();
      ctx.fillStyle = p.color;
      ctx.globalAlpha = Math.max(0, op);
      ctx.arc(x, y, p.r * 0.85, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;
  }

  var startTime = null;

  function loop(ts) {
    if (startTime === null) startTime = ts;
    var elapsed = ts - startTime;

    if (elapsed < AMBIENT_START) {
      drawBuilding(elapsed);
    } else {
      drawAmbient(elapsed);
    }

    requestAnimationFrame(loop);
  }

  function play() {
    requestAnimationFrame(loop);

    setTimeout(function () { root.classList.add('is-building'); }, 2550);
    setTimeout(function () { root.classList.add('is-spark-two'); }, 4590);
    setTimeout(function () { root.classList.add('is-spark-text'); }, 4845);
    setTimeout(function () { root.classList.add('is-revealed'); }, 5100);
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
