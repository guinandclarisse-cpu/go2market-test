(function () {
  var toggle = document.getElementById('nav-toggle');
  var sourceMenu = document.getElementById('nav-menu');
  var navbar = document.querySelector('.navbar');
  if (!toggle || !sourceMenu || !navbar) return;

  var overlay = document.createElement('div');
  overlay.className = 'nav-overlay';

  var panel = document.createElement('div');
  panel.className = 'nav-panel';

  var panelMenu = sourceMenu.cloneNode(true);
  panelMenu.removeAttribute('id');
  panel.appendChild(panelMenu);

  document.body.appendChild(overlay);
  document.body.appendChild(panel);

  function closeAccordions() {
    panelMenu.querySelectorAll('.nav-item.is-expanded').forEach(function (item) {
      item.classList.remove('is-expanded');
    });
  }

  function positionPanel() {
    var rect = navbar.getBoundingClientRect();
    panel.style.top = (rect.bottom + 8) + 'px';
  }

  function openMenu() {
    positionPanel();
    panel.classList.add('is-open');
    overlay.classList.add('is-visible');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('nav-open');
  }

  function closeMenu() {
    panel.classList.remove('is-open');
    overlay.classList.remove('is-visible');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('nav-open');
    closeAccordions();
  }

  toggle.addEventListener('click', function () {
    if (panel.classList.contains('is-open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  overlay.addEventListener('click', closeMenu);

  panelMenu.querySelectorAll('.nav-item').forEach(function (item) {
    var link = item.querySelector(':scope > .nav-link');
    var dropdown = item.querySelector(':scope > .dropdown');

    if (!link) return;

    if (dropdown) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        var isExpanded = item.classList.contains('is-expanded');
        panelMenu.querySelectorAll('.nav-item.is-expanded').forEach(function (other) {
          if (other !== item) other.classList.remove('is-expanded');
        });
        item.classList.toggle('is-expanded', !isExpanded);
      });
    } else {
      link.addEventListener('click', closeMenu);
    }
  });

  panelMenu.querySelectorAll('.dropdown a').forEach(function (a) {
    a.addEventListener('click', closeMenu);
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 900) {
      closeMenu();
    } else if (panel.classList.contains('is-open')) {
      positionPanel();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });
})();
