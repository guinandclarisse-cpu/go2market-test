document.querySelectorAll('.paves--linked .pave').forEach(function (pave) {
  pave.addEventListener('mouseenter', function () {
    pave.classList.add('is-linked');
  });
});
