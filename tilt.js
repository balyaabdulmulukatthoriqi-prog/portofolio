/* =========================================================
   tilt.js
   Efek miring 3D dan kilau holografik mengikuti kursor.
   ========================================================= */
(function () {
  'use strict';
  var App = window.App;
  var $ = App.$, $$ = App.$$, reduced = App.reduced;

  /* ---------- Miring 3D + kilau holografik ---------- */
  if (!reduced && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    $$('[data-tilt]').forEach(function (el) {
      var max = parseFloat(el.dataset.tilt) || 8;
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        el.style.setProperty('--rx', (-py * max).toFixed(2) + 'deg');
        el.style.setProperty('--ry', (px * max).toFixed(2) + 'deg');
        el.style.setProperty('--gx', ((px + 0.5) * 100).toFixed(1) + '%');
        el.style.setProperty('--gy', ((py + 0.5) * 100).toFixed(1) + '%');
      });
      el.addEventListener('pointerleave', function () {
        el.style.setProperty('--rx', '0deg');
        el.style.setProperty('--ry', '0deg');
      });
    });
  }
})();
