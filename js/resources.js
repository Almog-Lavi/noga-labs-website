(function () {
  'use strict';

  function initYear() {
    var y = document.getElementById('year');
    if (y) y.textContent = String(new Date().getFullYear());
  }

  function initCategoryFilter() {
    var chips = document.querySelectorAll('.hero-category-chips .chip');
    var cards = document.querySelectorAll('#resources-list .resource-card');
    if (!chips.length || !cards.length) return;

    function filterCards(category) {
      cards.forEach(function (card) {
        var match = category === 'all' || card.dataset.category === category;
        if (match) {
          card.removeAttribute('hidden');
        } else {
          card.setAttribute('hidden', '');
        }
      });
    }

    chips.forEach(function (chip) {
      chip.addEventListener('click', function (e) {
        e.preventDefault();
        var filter = chip.dataset.filter || 'all';

        chips.forEach(function (c) {
          c.classList.remove('chip--active');
          c.removeAttribute('aria-pressed');
        });
        chip.classList.add('chip--active');
        chip.setAttribute('aria-pressed', 'true');

        filterCards(filter);
      });
    });
  }

  function initCookieConsent() {
    var banner  = document.getElementById('cookie-consent-banner');
    var dialog  = document.getElementById('cookie-preferences-dialog');
    var acceptBtn  = document.getElementById('cookie-accept-all');
    var rejectBtn  = document.getElementById('cookie-reject-all');
    var manageBtn  = document.getElementById('cookie-manage');
    var saveBtn    = document.getElementById('cookie-prefs-save');
    var cancelBtn  = document.getElementById('cookie-prefs-cancel');
    var analyticsChk = document.getElementById('pref-analytics');
    var marketingChk = document.getElementById('pref-marketing');

    if (!banner || !window.NogaConsent) return;

    var stored = window.NogaConsent.getStored();
    if (stored) return;

    banner.removeAttribute('hidden');
    banner.setAttribute('aria-hidden', 'false');

    function save(analytics, marketing) {
      var exp = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString();
      document.cookie = window.NogaConsent.COOKIE_NAME + '=' +
        encodeURIComponent(JSON.stringify({ analytics: analytics, marketing: marketing })) +
        '; expires=' + exp + '; path=/; SameSite=Lax';
      window.NogaConsent.applyGtagUpdate(analytics, marketing);
      window.NogaConsent.pushConsentEvent(analytics, marketing);
      banner.setAttribute('hidden', '');
      banner.setAttribute('aria-hidden', 'true');
      if (dialog && dialog.open) dialog.close();
    }

    if (acceptBtn) acceptBtn.addEventListener('click', function () { save(true, true); });
    if (rejectBtn) rejectBtn.addEventListener('click', function () { save(false, false); });

    if (manageBtn && dialog) {
      manageBtn.addEventListener('click', function () {
        var s = window.NogaConsent.getStored();
        if (analyticsChk) analyticsChk.checked = s ? s.analytics : false;
        if (marketingChk) marketingChk.checked = s ? s.marketing : false;
        dialog.showModal();
      });
    }

    if (saveBtn && dialog) {
      saveBtn.addEventListener('click', function () {
        save(
          analyticsChk ? analyticsChk.checked : false,
          marketingChk ? marketingChk.checked : false
        );
      });
    }

    if (cancelBtn && dialog) {
      cancelBtn.addEventListener('click', function () { dialog.close(); });
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    initYear();
    initCategoryFilter();
    initCookieConsent();
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  });
})();
