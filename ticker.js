/* =========================================================
   ticker.js
   Ticker teknologi yang berjalan otomatis.
   ========================================================= */
(function () {
  'use strict';
  var App = window.App;
  var $ = App.$, $$ = App.$$, reduced = App.reduced;

  /* ---------- Ticker: gandakan isi sampai memenuhi layar ---------- */
  var track = $('.ticker-track');
  var firstList = track && $('.tick-list', track);
  function buildTicker() {
    if (!track || !firstList || reduced) return;
    $$('.tick-list[data-clone]', track).forEach(function (n) { n.remove(); });
    track.classList.remove('run');
    var w = firstList.offsetWidth;
    if (!w) return;
    var copies = Math.ceil(window.innerWidth / w) + 1;
    for (var i = 0; i < copies; i++) {
      var clone = firstList.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      clone.setAttribute('data-clone', '');
      track.appendChild(clone);
    }
    track.style.setProperty('--belt-w', w + 'px');
    track.style.animationDuration = (w / 60) + 's';
    track.classList.add('run');
  }
  App.fontsReady.then(buildTicker);
  var resizeTimer;
  window.addEventListener('resize', function () { clearTimeout(resizeTimer); resizeTimer = setTimeout(buildTicker, 250); });
})();
