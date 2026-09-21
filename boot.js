/* =========================================================
   boot.js
   Layar boot di awal halaman.
   ========================================================= */
(function () {
  'use strict';
  var App = window.App;
  var $ = App.$, $$ = App.$$, reduced = App.reduced;

  /* ---------- Layar boot ---------- */
  var boot = $('#boot');
  if (boot) {
    if (reduced) {
      boot.remove();
    } else {
      var lines = [
        '> memuat profil pengguna...',
        '> memasang modul flutter, firebase...',
        '> membuka saluran aman...',
        '> siap.'
      ];
      var out = $('#bootLines'), li = 0;
      (function addLine() {
        if (li < lines.length) {
          out.textContent += (li ? '\n' : '') + lines[li++];
          setTimeout(addLine, 330);
        }
      })();
      var fill = $('#bootFill'), pctEl = $('#bootPct'), pct = 0;
      var bootTimer = setInterval(function () {
        pct = Math.min(100, pct + 3 + Math.random() * 3);
        fill.style.width = pct + '%';
        pctEl.textContent = Math.floor(pct) + '%';
        if (pct >= 100) {
          clearInterval(bootTimer);
          setTimeout(function () {
            boot.classList.add('done');
            setTimeout(function () { boot.remove(); }, 800);
          }, 150);
        }
      }, 45);
    }
  }
})();
