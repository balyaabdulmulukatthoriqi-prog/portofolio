/* =========================================================
   hero.js
   Hero: hujan kode, cahaya kursor, pemindai kartu ID, readout HUD, dan teks terminal.
   ========================================================= */
(function () {
  'use strict';
  var App = window.App;
  var $ = App.$, $$ = App.$$, reduced = App.reduced;

  /* ---------- Hujan kode di hero ---------- */
  var canvas = $('#rain');
  var hero = $('#top');
  if (canvas && !reduced && canvas.getContext) {
    var ctx = canvas.getContext('2d');
    var fs = 16, cols = 0, drops = [], visible = true;
    var glyphs = '01<>/{}[]();=+*#ABCDEF'.split('');
    var sizeRain = function () {
      var r = hero.getBoundingClientRect();
      canvas.width = r.width;
      canvas.height = r.height;
      cols = Math.floor(canvas.width / fs);
      drops = [];
      for (var i = 0; i < cols; i++) drops.push(Math.random() * canvas.height / fs);
    };
    sizeRain();
    window.addEventListener('resize', sizeRain);
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (e) { visible = e[0].isIntersecting; }).observe(hero);
    }
    setInterval(function () {
      if (!visible) return;
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0,0,0,.14)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'source-over';
      ctx.font = fs + 'px monospace';
      for (var i = 0; i < cols; i++) {
        ctx.fillStyle = Math.random() > 0.96 ? '#FF2A6D' : '#19F3FF';
        ctx.fillText(glyphs[Math.floor(Math.random() * glyphs.length)], i * fs, drops[i] * fs);
        if (drops[i] * fs > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    }, 55);
  }

  /* ---------- Cahaya mengikuti kursor di hero ---------- */
  if (hero && !reduced) {
    hero.addEventListener('pointermove', function (e) {
      var r = hero.getBoundingClientRect();
      hero.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      hero.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  }

  /* ---------- Tinggi pemindai kartu ID ---------- */
  var idCard = $('.id-card');
  function setScanHeight() {
    if (idCard) idCard.style.setProperty('--h', (idCard.offsetHeight - 10) + 'px');
  }
  setScanHeight();
  window.addEventListener('resize', setScanHeight);
  App.fontsReady.then(setScanHeight);

  /* ---------- Readout berdenyut di HUD ---------- */
  var roA = $('#roA'), roB = $('#roB');
  if (roA && roB && !reduced) {
    setInterval(function () {
      roA.textContent = 'lat ' + (9 + Math.floor(Math.random() * 9)) + 'ms';
      roB.textContent = 'mem ' + (58 + Math.floor(Math.random() * 12)) + '%';
    }, 1100);
  }

  /* ---------- Terminal: teks status yang berganti ---------- */
  var typedEl = $('#typed');
  var phrases = [
    'membuat aplikasi mobile.',
    'belajar Flutter dan Firebase.',
    'merapikan proses lewat sistem.',
    'mencari peluang pertama di IT.'
  ];
  if (typedEl && !reduced) {
    var p = 0, c = 0, deleting = false;
    setTimeout(function tick() {
      var word = phrases[p];
      typedEl.textContent = word.slice(0, c);
      if (!deleting && c === word.length) { deleting = true; return setTimeout(tick, 1700); }
      if (deleting && c === 0) { deleting = false; p = (p + 1) % phrases.length; return setTimeout(tick, 350); }
      c += deleting ? -1 : 1;
      setTimeout(tick, deleting ? 24 : 50);
    }, 2600);
  }
})();
