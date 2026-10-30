/* Small progressive enhancements. The page reads fine without any of this. */
(function () {
  'use strict';

  var root = document.documentElement;
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  /* ---- theme toggle (follows the system until the visitor picks one) ---- */
  var themeBtn = $('#theme-toggle');
  function isDark() {
    var t = root.getAttribute('data-theme');
    if (t) { return t === 'dark'; }
    return !!(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
  }
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var next = isDark() ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) { /* storage may be unavailable */ }
    });
  }

  /* ---- mobile menu ---- */
  var bar = $('.bar');
  var menuBtn = $('#menu-btn');
  var nav = $('#nav');
  function closeMenu() {
    if (!bar) { return; }
    bar.classList.remove('open');
    if (menuBtn) { menuBtn.setAttribute('aria-expanded', 'false'); }
  }
  if (bar && menuBtn && nav) {
    menuBtn.addEventListener('click', function () {
      var open = bar.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.addEventListener('click', function (e) {
      if (e.target && e.target.tagName === 'A') { closeMenu(); }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { closeMenu(); }
    });
  }

  /* ---- highlight the current section in the navigation ---- */
  if (nav && 'IntersectionObserver' in window) {
    var links = {};
    $$('a[href^="#"]', nav).forEach(function (a) { links[a.getAttribute('href').slice(1)] = a; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting || !links[en.target.id]) { return; }
        Object.keys(links).forEach(function (k) { links[k].removeAttribute('aria-current'); });
        links[en.target.id].setAttribute('aria-current', 'true');
      });
    }, { rootMargin: '-35% 0px -60% 0px' });
    $$('section[id]').forEach(function (s) { if (links[s.id]) { io.observe(s); } });
  }

  /* ---- images: only use a file that exists, so there is never a broken icon ---- */
  function probe(src, done) {
    var im = new Image();
    im.onload = function () { done(im); };
    im.src = src;
  }

  var portrait = $('#portrait');
  if (portrait && portrait.getAttribute('data-photo')) {
    probe(portrait.getAttribute('data-photo'), function (im) {
      im.alt = portrait.getAttribute('data-alt') || '';
      portrait.appendChild(im);
    });
  }

  $$('.shot').forEach(function (shot) {
    var frame = $('.shot-frame', shot);
    if (!frame) { return; }
    var alt = shot.getAttribute('data-alt') || '';

    /* until a real file exists, the tile shows the project pictogram */
    var artId = shot.getAttribute('data-art');
    var art = artId ? $('#' + artId + ' .card-art svg') : null;
    if (art) { frame.appendChild(art.cloneNode(true)); }

    var src = shot.getAttribute('data-src');
    if (src) {
      probe(src, function (im) {
        im.alt = alt;
        im.decoding = 'async';
        frame.appendChild(im);
        shot.classList.add('is-photo');
        frame.tabIndex = 0;
        frame.setAttribute('role', 'button');
        frame.setAttribute('aria-label', 'Enlarge image: ' + alt);
      });
    }

    var vsrc = shot.getAttribute('data-video');
    if (vsrc) {
      var v = document.createElement('video');
      v.controls = true;
      v.preload = 'metadata';
      v.setAttribute('playsinline', '');
      v.setAttribute('aria-label', alt);
      if (shot.getAttribute('data-poster')) { v.poster = shot.getAttribute('data-poster'); }
      v.addEventListener('loadedmetadata', function () { shot.classList.add('is-video'); });
      v.addEventListener('error', function () { if (v.parentNode) { v.parentNode.removeChild(v); } });
      /* #t=0.001 makes Safari on iPhone show the first frame instead of a black box */
      v.src = vsrc + (vsrc.indexOf('#') < 0 ? '#t=0.001' : '');
      frame.appendChild(v);
    }
  });

  /* ---- lightbox ---- */
  var box = $('#lightbox');
  function openBox(shot) {
    var img = $('img', shot);
    if (!box || !img || typeof box.showModal !== 'function') { return; }
    var big = $('img', box);
    big.src = img.src;
    big.alt = img.alt;
    $('figcaption', box).textContent = $('figcaption', shot).textContent;
    box.showModal();
  }
  if (box) {
    document.addEventListener('click', function (e) {
      var frame = e.target && e.target.closest ? e.target.closest('.shot.is-photo .shot-frame') : null;
      if (frame) { openBox(frame.parentNode); }
    });
    document.addEventListener('keydown', function (e) {
      var el = document.activeElement;
      if ((e.key === 'Enter' || e.key === ' ') && el && el.matches && el.matches('.shot.is-photo .shot-frame')) {
        e.preventDefault();
        openBox(el.parentNode);
      }
    });
    box.addEventListener('click', function (e) {
      var closer = e.target && e.target.closest ? e.target.closest('[data-close]') : null;
      if (e.target === box || closer) { box.close(); }
    });
  }

  /* ---- contact: profile links are copied from the top of the page ---- */
  var cp = $('#contact-profiles');
  var heroProfiles = $('#about .profiles');
  if (cp && heroProfiles) {
    var copy = heroProfiles.cloneNode(true);
    $$('[id]', copy).forEach(function (n) { n.removeAttribute('id'); });
    cp.appendChild(copy);
  }

  /* ---- contact: email assembled from two parts, with a copy button ---- */
  var em = $('#email');
  function copyText(text, btn) {
    function done(ok) {
      btn.textContent = ok ? 'Copied' : 'Select and copy';
      window.setTimeout(function () { btn.textContent = 'Copy'; }, 1800);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { done(true); }, function () { done(false); });
    } else {
      done(false);
    }
  }
  if (em) {
    var user = em.getAttribute('data-user');
    var domain = em.getAttribute('data-domain');
    if (user && domain) {
      var addr = user + '@' + domain;
      em.textContent = '';
      var a = document.createElement('a');
      a.className = 'addr';
      a.href = 'mailto:' + addr;
      a.textContent = addr;
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'copy';
      b.textContent = 'Copy';
      b.addEventListener('click', function () { copyText(addr, b); });
      em.appendChild(a);
      em.appendChild(b);
    } else {
      em.classList.add('is-empty');
    }
  }
})();
