document.querySelectorAll('.expertise-toggle').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var card = btn.closest('.card');
    var expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    card.classList.toggle('is-open', !expanded);
  });
});
