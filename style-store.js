// Shared appearance settings for the generated QR code: colour, logo and logo size.
//
// Kept in localStorage so the generator page and the appearance page agree without either
// knowing about the other, and so a chosen look survives a reload. Like everything else here
// it never leaves the browser - an uploaded logo is stored as a data URL in that same local
// storage, not uploaded anywhere.
window.QR_STYLE = (function () {
  'use strict';

  var KEY = 'enrollment-qr-style';

  function defaults() {
    return { color: '#1e1b2e', logoMode: 'none', logoData: '', logoScale: 18 };
  }

  function load() {
    var style = defaults();
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) { return style; }
      var saved = JSON.parse(raw);

      // Every field is checked separately: a stored entry from an older version, or one
      // someone edited by hand, must not be able to produce an unusable code.
      if (typeof saved.color === 'string' && /^#[0-9a-fA-F]{6}$/.test(saved.color)) { style.color = saved.color; }
      if (saved.logoMode === 'builtin' || saved.logoMode === 'own') { style.logoMode = saved.logoMode; }
      if (typeof saved.logoData === 'string' && saved.logoData.indexOf('data:image') === 0) { style.logoData = saved.logoData; }
      if (typeof saved.logoScale === 'number' && saved.logoScale >= 8 && saved.logoScale <= 28) { style.logoScale = saved.logoScale; }

      // "Own image" with nothing stored would silently render no logo at all - fall back to
      // none, which is at least what the page then shows.
      if (style.logoMode === 'own' && !style.logoData) { style.logoMode = 'none'; }
    } catch (e) {
      return defaults();
    }
    return style;
  }

  function save(style) {
    try { localStorage.setItem(KEY, JSON.stringify(style)); } catch (e) { /* private mode */ }
  }

  function clear() {
    try { localStorage.removeItem(KEY); } catch (e) { /* private mode */ }
  }

  function source(style) {
    if (style.logoMode === 'builtin') { return 'logo.png'; }
    if (style.logoMode === 'own') { return style.logoData || null; }
    return null;
  }

  return { defaults: defaults, load: load, save: save, clear: clear, source: source };
})();
