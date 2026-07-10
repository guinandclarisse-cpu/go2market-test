(function () {
  var BREAKPOINT = 900;

  var content = document.querySelector('.uc-hero-content');
  var visual = document.querySelector('.uc-hero-visual');
  if (!content || !visual) return;

  function sync() {
    if (window.innerWidth <= BREAKPOINT) {
      visual.style.height = '';
      return;
    }
    visual.style.height = content.getBoundingClientRect().height + 'px';
  }

  // ResizeObserver réagit à tout changement de hauteur du bloc de texte
  // (chargement différé des polices web, redimensionnement, contenu modifié)
  // au lieu de dépendre d'événements ponctuels qui peuvent se déclencher
  // avant que la mise en page finale (police réelle chargée) soit connue.
  if (window.ResizeObserver) {
    new ResizeObserver(sync).observe(content);
  }

  window.addEventListener('resize', sync);
  window.addEventListener('load', sync);
  document.addEventListener('DOMContentLoaded', sync);
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(sync);
  }
  sync();
})();
