/* Shared site navigation — inject into <div id="nav-root"></div> on every page */
(function () {
  'use strict';

  var LOGO_MOBILE  = 'https://pub-c5f2ee2659d345f8afa5562b9261ffc2.r2.dev/LandingSite/logo-white-n.png';
  var LOGO_DESKTOP = 'https://pub-c5f2ee2659d345f8afa5562b9261ffc2.r2.dev/LandingSite/logo-white.png';

  // Detect depth from pathname — works for both file:// and http://.
  var pathname = window.location.pathname.replace(/\\/g, '/');
  // Article pages: /resources/{slug}/index.html  → 2 levels deep → root = ../../
  // Listing page:  /resources/index.html          → 1 level deep  → root = ../
  // Home:          /index.html                    → 0 levels deep → root = ./
  var isArticle   = /\/resources\/[^/]+\//.test(pathname);
  var inResources = !isArticle && pathname.indexOf('/resources') !== -1;
  var root = isArticle ? '../../' : inResources ? '../' : './';

  var NAV_LINKS = [
    { label: 'Resources', href: root + 'resources/index.html', active: inResources || isArticle }
  ];

  var LOGO_HREF = root + 'index.html';

  function renderLinks(cls) {
    return NAV_LINKS.map(function (link) {
      var classes = link.active ? cls + ' is-current' : cls;
      var current = link.active ? ' aria-current="page"' : '';
      return '      <a class="' + classes + '" href="' + link.href + '"' + current + '>' + link.label + '</a>';
    }).join('\n');
  }

  function buildHtml() {
    return [
      '<header class="site-header glass-header">',
      '  <div class="container header-inner">',
      '    <a href="' + LOGO_HREF + '" class="logo-link" aria-label="Noga Labs — Home">',
      '      <img class="logo-img logo-img--mobile" src="' + LOGO_MOBILE + '" width="44" height="44" alt="" />',
      '      <img class="logo-img logo-img--desktop" src="' + LOGO_DESKTOP + '" width="180" height="48" alt="Noga Labs" />',
      '    </a>',
      '    <nav class="header-nav" aria-label="Primary">',
      renderLinks('nav-link'),
      '    </nav>',
      '    <button type="button" class="nav-toggle" id="nav-toggle" aria-controls="mobile-nav-drawer" aria-expanded="false" aria-label="Open menu">',
      '      <span class="nav-toggle-bar" aria-hidden="true"></span>',
      '      <span class="nav-toggle-bar" aria-hidden="true"></span>',
      '      <span class="nav-toggle-bar" aria-hidden="true"></span>',
      '    </button>',
      '  </div>',
      '</header>',
      '<div class="mobile-nav-drawer" id="mobile-nav-drawer" role="dialog" aria-modal="true" aria-label="Site navigation" aria-hidden="true">',
      '  <nav class="mobile-nav-inner" aria-label="Mobile">',
      renderLinks('mobile-nav-link'),
      '  </nav>',
      '</div>'
    ].join('\n');
  }

  function injectNav() {
    var placeholder = document.getElementById('nav-root');
    if (!placeholder) return;
    var temp = document.createElement('div');
    temp.innerHTML = buildHtml();
    var parent = placeholder.parentNode;
    while (temp.firstChild) {
      parent.insertBefore(temp.firstChild, placeholder);
    }
    parent.removeChild(placeholder);
  }

  function initMobileNav() {
    var toggle = document.getElementById('nav-toggle');
    var drawer = document.getElementById('mobile-nav-drawer');
    if (!toggle || !drawer) return;

    function setOpen(open) {
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      drawer.setAttribute('aria-hidden', open ? 'false' : 'true');
      drawer.classList.toggle('is-open', open);
      document.body.classList.toggle('nav-open', open);
    }

    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });

    drawer.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () { setOpen(false); });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setOpen(false);
    });
  }

  function init() {
    injectNav();
    initMobileNav();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
