(function () {
  var items = document.querySelectorAll('.faq-item');
  if (!items.length) return;

  function setOpen(item, open) {
    var button = item.querySelector('.faq-question');
    var answer = item.querySelector('.faq-answer');
    item.classList.toggle('is-open', open);
    button.setAttribute('aria-expanded', String(open));
    answer.style.maxHeight = open ? answer.scrollHeight + 'px' : '0px';
  }

  items.forEach(function (item) {
    var button = item.querySelector('.faq-question');
    button.addEventListener('click', function () {
      setOpen(item, !item.classList.contains('is-open'));
    });
  });

  var resizeTimer = null;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      items.forEach(function (item) {
        if (item.classList.contains('is-open')) {
          var answer = item.querySelector('.faq-answer');
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      });
    }, 150);
  });
})();
