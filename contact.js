/* =========================================================
   contact.js
   Tombol salin email dan toast Bootstrap.
   ========================================================= */
(function () {
  'use strict';
  var App = window.App;
  var $ = App.$;
  var copyBtn = $('#copyEmail');
  if (!copyBtn) return;
  copyBtn.addEventListener('click', function () {
    var email = copyBtn.dataset.email;
    function notify(ok) {
      var text = $('#copyToastText');
      if (text) text.textContent = ok ? 'email tersalin.' : 'gagal menyalin. alamatnya: ' + email;
      var toast = $('#copyToast');
      if (toast && window.bootstrap) window.bootstrap.Toast.getOrCreateInstance(toast).show();
    }
    function fallback() {
      var ta = document.createElement('textarea');
      ta.value = email;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      var ok = false;
      try { ok = document.execCommand('copy'); } catch (e) {}
      ta.remove(); notify(ok);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email).then(function () { notify(true); }, fallback);
    } else fallback();
  });
})();
