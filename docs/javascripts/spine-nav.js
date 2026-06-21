/* Binder spine nav helper (Task 1).
   Material's free tier can't render icons in nav labels, and the spine hides
   the text label, so this adds two things per primary-nav link:
     - data-tip: the full chapter name (CSS shows it as the hover tooltip)
     - a small chapter-number span (CSS shows it under the icon on the spine)
   No instant-loading is enabled, so this runs once per real page load. */
(function () {
  function decorate() {
    var links = document.querySelectorAll('.md-nav--primary .md-nav__link');
    links.forEach(function (a) {
      if (a.dataset.tipDone) return;
      var name = (a.textContent || '').trim();
      if (name) {
        a.setAttribute('data-tip', name);
        if (!a.getAttribute('title')) a.setAttribute('title', name);
      }
      var href = a.getAttribute('href') || '';
      var m = href.match(/\/(\d{2})-[^\/]*\/?$/);
      if (m) {
        // genuine chapter link: tag it so the CSS shows the icon-tab + number,
        // and gates the white "active tab" to these only (no blob on Home/stubs).
        a.classList.add('pag-spine-tab');
        var span = document.createElement('span');
        span.className = 'pag-num';
        span.textContent = m[1];
        a.appendChild(span);
      }
      a.dataset.tipDone = '1';
    });
    // flag pages with no chapters so the CSS can hide the empty spine rail
    var hasChapters = document.querySelector('.md-nav--primary .pag-spine-tab');
    document.body.classList.toggle('pag-no-chapters', !hasChapters);
  }
  if (document.readyState !== 'loading') decorate();
  else document.addEventListener('DOMContentLoaded', decorate);
})();
