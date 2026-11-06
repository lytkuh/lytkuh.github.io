/* FORGEAI HUB — page interactions */
(function () {
  'use strict';

  var FA_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

  function toFa(num) {
    return String(num).replace(/\d/g, function (d) { return FA_DIGITS[+d]; });
  }
  function pad2(n) { return (n < 10 ? '0' : '') + n; }

  /* ── countdown: ۳ روز · HH:MM:SS ─────────────────────────── */
  var remaining = ((3 * 24 + 10) * 60 + 35) * 60 + 41; // 3d 10:35:41
  var countdownEl = document.getElementById('countdown');

  function renderCountdown() {
    if (!countdownEl) return;
    var d = Math.floor(remaining / 86400);
    var h = Math.floor((remaining % 86400) / 3600);
    var m = Math.floor((remaining % 3600) / 60);
    var s = remaining % 60;
    countdownEl.textContent = toFa(d) + ' روز · ' + toFa(pad2(h)) + ':' + toFa(pad2(m)) + ':' + toFa(pad2(s));
  }
  renderCountdown();
  setInterval(function () {
    if (remaining > 0) { remaining--; renderCountdown(); }
  }, 1000);

  /* ── copy promo code ─────────────────────────────────────── */
  var copyBtn = document.getElementById('copyCode');
  if (copyBtn) {
    var copyLabel = copyBtn.textContent;
    copyBtn.addEventListener('click', function () {
      function done() {
        copyBtn.classList.add('copied');
        copyBtn.textContent = 'کپی شد!';
        setTimeout(function () {
          copyBtn.classList.remove('copied');
          copyBtn.textContent = copyLabel;
        }, 1400);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText('OPEN45').then(done, done);
      } else {
        var ta = document.createElement('textarea');
        ta.value = 'OPEN45';
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); } catch (e) { /* noop */ }
        document.body.removeChild(ta);
        done();
      }
    });
  }

  /* ── panel tabs (visual state) ───────────────────────────── */
  var tabs = document.querySelectorAll('.tab');
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) { t.classList.remove('is-active'); });
      tab.classList.add('is-active');
    });
  });

  /* ── panel menu + nav pills: active state ────────────────── */
  document.querySelectorAll('.panel-menu .pm-item').forEach(function (item) {
    item.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelectorAll('.panel-menu .pm-item').forEach(function (i) { i.classList.remove('is-active'); });
      item.classList.add('is-active');
    });
  });

  /* ── hero scroll chevron ─────────────────────────────────── */
  var heroScroll = document.getElementById('heroScroll');
  if (heroScroll) {
    heroScroll.addEventListener('click', function () {
      var target = document.getElementById('features');
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  /* ── reveal on scroll ────────────────────────────────────── */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ── nav shadow after scroll ─────────────────────────────── */
  var nav = document.getElementById('navbar');
  if (nav) {
    var onScroll = function () {
      nav.classList.toggle('is-scrolled', window.scrollY > 24);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── footer newsletter (demo submit) ─────────────────────── */
  var newsForm = document.getElementById('newsForm');
  if (newsForm) {
    newsForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = newsForm.querySelector('.f3-input');
      var btn = newsForm.querySelector('.f3-sub');
      if (!input || !btn || !input.value || !input.checkValidity()) { if (input) input.focus(); return; }
      if (btn.classList.contains('is-done')) return;
      var original = btn.innerHTML;
      btn.classList.add('is-done');
      btn.innerHTML = 'عضو شدی &#10003;';
      setTimeout(function () {
        btn.classList.remove('is-done');
        btn.innerHTML = original;
        if (input) input.value = '';
      }, 2600);
    });
  }
})();
