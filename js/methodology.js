document.querySelectorAll('.milestone-circle').forEach(function (circle) {
  var num = circle.querySelector('.milestone-num');
  circle.addEventListener('mouseenter', function () {
    circle.classList.add('is-active');
    if (!num) return;
    num.classList.remove('is-spinning');
    void num.offsetWidth;
    num.classList.add('is-spinning');
  });
});
