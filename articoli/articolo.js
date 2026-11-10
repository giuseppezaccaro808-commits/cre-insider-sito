(function () {
  var bar = document.getElementById('bar');
  function upd() {
    var h = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + '%';
  }
  window.addEventListener('scroll', upd, { passive: true });
  upd();
})();
