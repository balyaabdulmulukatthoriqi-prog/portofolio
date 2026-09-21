/* =========================================================
   hero.js
   Hero: hujan kode, cahaya kursor, pemindai kartu ID, readout HUD, dan teks terminal.
   ========================================================= */
(function () {
  'use strict';
  var App = window.App;
  var $ = App.$, reduced = App.reduced;
  var canvas = $('#rain'), hero = $('#top');
  if (canvas && hero && !reduced && canvas.getContext) {
    var ctx = canvas.getContext('2d'), fs = 16, cols = 0, drops = [], visible = true;
    var glyphs = '01<>/{}[]();=+*#ABCDEF'.split('');
    function sizeRain() {
      var r = hero.getBoundingClientRect();
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(r.width * dpr); canvas.height = Math.floor(r.height * dpr);
      canvas.style.width = r.width + 'px'; canvas.style.height = r.height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.floor(r.width / fs); drops = [];
      for (var i = 0; i < cols; i++) drops.push(Math.random() * r.height / fs);
    }
    sizeRain(); window.addEventListener('resize', sizeRain);
    if ('IntersectionObserver' in window) new IntersectionObserver(function (e) { visible = e[0].isIntersecting; }).observe(hero);
    setInterval(function () {
      if (!visible) return;
      var r = hero.getBoundingClientRect();
      ctx.globalCompositeOperation = 'destination-out'; ctx.fillStyle = 'rgba(0,0,0,.14)'; ctx.fillRect(0, 0, r.width, r.height);
      ctx.globalCompositeOperation = 'source-over'; ctx.font = fs + 'px monospace';
      for (var i = 0; i < cols; i++) {
        ctx.fillStyle = Math.random() > 0.96 ? '#FF2A6D' : '#19F3FF';
        ctx.fillText(glyphs[Math.floor(Math.random() * glyphs.length)], i * fs, drops[i] * fs);
        if (drops[i] * fs > r.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    }, 55);
  }
  if (hero && !reduced) hero.addEventListener('pointermove', function (e) {
    var r = hero.getBoundingClientRect();
    hero.style.setProperty('--mx', (e.clientX - r.left) + 'px');
    hero.style.setProperty('--my', (e.clientY - r.top) + 'px');
  });
  var idCard = $('.id-card');
  function setScanHeight() { if (idCard) idCard.style.setProperty('--h', (idCard.offsetHeight - 10) + 'px'); }
  setScanHeight(); window.addEventListener('resize', setScanHeight); App.fontsReady.then(setScanHeight);
  var roA = $('#roA'), roB = $('#roB');
  if (roA && roB && !reduced) setInterval(function () {
    roA.textContent = 'lat ' + (9 + Math.floor(Math.random() * 9)) + 'ms';
    roB.textContent = 'mem ' + (58 + Math.floor(Math.random() * 12)) + '%';
  }, 1100);
  var typedEl = $('#typed');
  var phrases = ['membuat aplikasi mobile.', 'belajar Flutter dan Firebase.', 'merapikan proses lewat sistem.', 'mencari peluang pertama di IT.'];
  if (typedEl && !reduced) {
    var p = 0, c = 0, deleting = false;
    setTimeout(function tick() {
      var word = phrases[p]; typedEl.textContent = word.slice(0, c);
      if (!deleting && c === word.length) { deleting = true; return setTimeout(tick, 1700); }
      if (deleting && c === 0) { deleting = false; p = (p + 1) % phrases.length; return setTimeout(tick, 350); }
      c += deleting ? -1 : 1; setTimeout(tick, deleting ? 24 : 50);
    }, 2600);
  }
})();
