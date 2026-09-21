/* =========================================================
   contact.js
   Tombol salin email dan toast Bootstrap.
   ========================================================= */
(function () {
  'use strict';
  var App = window.App;
  var $ = App.$, $$ = App.$$, reduced = App.reduced;

  /* ---------- Salin email + toast Bootstrap ---------- */
  var copyBtn = $('#copyEmail');
  if (!copyBtn) return; 
  copyBtn.addEventListener('click', function () {
    var email = copyBtn.dataset.email;
    function notify(ok) {
      $('#copyToastText').textContent = ok ? 'email tersalin.' : 'gagal menyalin. alamatnya: ' + email;
      if (window.bootstrap) { window.bootstrap.Toast.getOrCreateInstance($('#copyToast')).show(); }
    }
    function fallback() {
      var ta = document.createElement('textarea');
      ta.value = email;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      var ok = false;
      try { ok = document.execCommand('copy'); } catch (e) {}
      ta.remove();
      notify(ok);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email).then(function () { notify(true); }, fallback);
    } else {
      fallback();
    }
  });
})();
