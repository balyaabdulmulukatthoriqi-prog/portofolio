/* =========================================================
   utils.js
   Fungsi bantu yang dipakai semua file JS lain.
   Harus dimuat PALING PERTAMA di index.html.
   ========================================================= */
window.App = (function () {
  'use strict';
  return {
    // true kalau pengguna mengaktifkan "kurangi gerakan" di perangkatnya
    reduced: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    // pemilih elemen singkat: $('#id') dan $$('.kelas')
    $: function (s, c) { return (c || document).querySelector(s); },
    $$: function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); },
    // promise yang selesai setelah font web selesai dimuat
    fontsReady: (document.fonts && document.fonts.ready) ? document.fonts.ready : Promise.resolve()
  };
})();
