// DigitNotes – takoj nastavi temo (svetla / temna / samodejno), da ni utripanja ob nalaganju
(function () {
  var t = 'auto'; try { t = localStorage.getItem('dn2_theme') || 'auto'; } catch (e) { }
  if (t === 'light' || t === 'dark') document.documentElement.setAttribute('data-theme', t);
  var dark = t === 'dark' || (t === 'auto' && window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches);
  var m = document.querySelector('meta[name=theme-color]'); if (m) m.setAttribute('content', dark ? '#08100e' : '#f2f5f4');
})();
