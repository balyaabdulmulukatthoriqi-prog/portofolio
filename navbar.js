/* =========================================================
   navbar.js
   Jam di navbar, progress bar scroll, status navbar, parallax, dan tombol ke atas.
   ========================================================= */
(function () {
  'use strict';
  var App = window.App;
  var $ = App.$, $$ = App.$$, reduced = App.reduced;

  /* ---------- Jam di navbar ---------- */
  var clock = $('#clock');
  function tickClock() {
    if (clock) clock.textContent = new Date().toLocaleTimeString('id-ID', { hour12: false });
  }
  tickClock();
  setInterval(tickClock, 1000);

  /* ---------- Progress, navbar, parallax, tombol ke atas ---------- */
  var prog = $('#prog'), nav = $('#nav'), toTop = $('#toTop'), spct = $('#scrollPct');
  var parallaxEls = $$('[data-speed]');
  var ticking = false;
  function onScroll() {
    var h = document.documentElement;
    var max = h.scrollHeight - h.clientHeight;
    var y = window.scrollY;
    var pct = max > 0 ? Math.min(y / max, 1) : 0;
    prog.style.width = (pct * 100) + '%';
    spct.textContent = Math.round(pct * 100) + '%';
    nav.classList.toggle('scrolled', y > 20);
    toTop.classList.toggle('show', y > 600);
    if (!reduced) {
      parallaxEls.forEach(function (el) {
        el.style.setProperty('--sy', (y * parseFloat(el.dataset.speed)).toFixed(1) + 'px');
      });
    }
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();
  toTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
  });
})();
