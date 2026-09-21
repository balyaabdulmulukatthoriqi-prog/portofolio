/* =========================================================
   reveal.js
   Efek muncul saat di-scroll: reveal, teks scramble, dan angka menghitung naik.
   ========================================================= */
(function () {
  'use strict';
  var App = window.App;
  var $ = App.$, $$ = App.$$, reduced = App.reduced;

  /* ---------- Teks "diterjemahkan" (scramble) ---------- */
  var glyph = '!<>-_\\/[]{}=+*^?#01';
  function scramble(el) {
    var text = el.getAttribute('data-text') || el.textContent;
    el.setAttribute('data-text', text);
    el.setAttribute('aria-label', text);
    var f = 0, total = text.length + 8;
    var timer = setInterval(function () {
      var s = '';
      for (var i = 0; i < text.length; i++) {
        var ch = text.charAt(i);
        s += (ch === ' ' || i < f - 6) ? ch : glyph.charAt(Math.floor(Math.random() * glyph.length));
      }
      el.textContent = s;
      if (++f > total) { clearInterval(timer); el.textContent = text; }
    }, 34);
  }

  /* ---------- Angka menghitung naik ---------- */
  function animateCount(el) {
    var end = parseFloat(el.dataset.count);
    var dec = parseInt(el.dataset.dec || '0', 10);
    var dur = 1400, t0 = performance.now();
    (function step(t) {
      var k = Math.min((t - t0) / dur, 1);
      var eased = 1 - Math.pow(1 - k, 3);
      el.textContent = (end * eased).toLocaleString('id-ID', { minimumFractionDigits: dec, maximumFractionDigits: dec });
      if (k < 1) requestAnimationFrame(step);
    })(t0);
  }

  /* ---------- Reveal saat di-scroll ---------- */
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var t = en.target;
        t.classList.add('in');
        $$('.bin', t).forEach(function (b) { b.classList.add('in'); });
        if (!reduced) {
          $$('[data-count]', t).forEach(animateCount);
          if (t.classList.contains('scramble')) scramble(t);
          $$('.scramble', t).forEach(scramble);
        }
        io.unobserve(t);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -6% 0px' });
    $$('.reveal').forEach(function (el) { io.observe(el); });
  } else {
    $$('.reveal, .bin').forEach(function (el) { el.classList.add('in'); });
  }
})();
