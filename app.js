(function () {
  var oggi = document.getElementById('oggi');
  if (oggi) try {
    var s = new Date().toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    oggi.textContent = s.charAt(0).toUpperCase() + s.slice(1);
  } catch (e) {}

  var els = document.querySelectorAll('.rv');
  var ape = document.getElementById('ape');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add(e.target === ape ? 'go' : 'in');
        io.unobserve(e.target);
      });
    }, { threshold: 0.15 });
    els.forEach(function (el) { io.observe(el); });
    if (ape) io.observe(ape);
  } else {
    els.forEach(function (el) { el.classList.add('in'); });
  }

  var form = document.getElementById('signup');
  if (form) form.addEventListener('submit', function (e) {
    e.preventDefault();
    var btn = form.querySelector('button');
    btn.disabled = true;
    btn.firstElementChild.textContent = 'Un attimo…';
    fetch(form.action, { method: 'POST', body: new FormData(form), mode: 'no-cors' })
      .then(function () {
        form.hidden = true;
        document.getElementById('card-intro').hidden = true;
        document.getElementById('grazie').hidden = false;
      })
      .catch(function () { form.submit(); });
  });

  var sp = document.getElementById('sponsor-form');
  if (sp) sp.addEventListener('submit', function (e) {
    e.preventDefault();
    var btn = sp.querySelector('button');
    btn.disabled = true;
    btn.firstElementChild.textContent = 'Invio…';
    var d = new FormData(sp);
    var body = 'Nome: ' + (d.get('nome') || '') + '\nAzienda: ' + (d.get('azienda') || '') + '\nEmail: ' + (d.get('email') || '') + '\n\n' + (d.get('messaggio') || '');
    window.location.href = 'mailto:giuseppezaccaro808@gmail.com?subject=' + encodeURIComponent('Richiesta media kit CRE Insider - ' + (d.get('azienda') || '')) + '&body=' + encodeURIComponent(body);
    sp.hidden = true;
    document.getElementById('sponsor-grazie').hidden = false;
  });
})();
