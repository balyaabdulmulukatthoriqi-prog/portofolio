/* =========================================================
   skills.js
   Membuat segmen level pada tiap skill.
   ========================================================= */
(function () {
  'use strict';
  var App = window.App;
  var $ = App.$, $$ = App.$$, reduced = App.reduced;

  /* ---------- Segmen level skill ---------- */
  $$('.segs').forEach(function (el) {
    var lv = parseInt(el.getAttribute('data-lv'), 10) || 0;
    el.setAttribute('role', 'img');
    el.setAttribute('aria-label', 'Level ' + lv + ' dari 5');
    for (var i = 1; i <= 5; i++) {
      var seg = document.createElement('i');
      seg.style.setProperty('--i', i);
      if (i <= lv) seg.className = 'on';
      el.appendChild(seg);
    }
  });
})();
