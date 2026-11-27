(function () {
  var bar = document.getElementById('bar');
  function upd() {
    var h = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + '%';
  }
  window.addEventListener('scroll', upd, { passive: true });
  upd();
})();

(function () {
  var form = document.getElementById('signup');
  if (!form) return;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var btn = form.querySelector('button');
    btn.disabled = true;
    btn.firstElementChild.textContent = 'Un attimo…';
    fetch(form.action, { method: 'POST', body: new FormData(form), mode: 'no-cors' })
      .then(function () {
        form.hidden = true;
        document.getElementById('grazie').hidden = false;
      })
      .catch(function () { form.submit(); });
  });
})();
