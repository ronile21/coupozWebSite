/* =============================================================
   CoupoZ — Accessibility Toolbar
   Standalone, no external dependencies.
   Injected via <script src="js/a11y-toolbar.js" defer> on every page.

   Features:
     • Text size  (−3 → +5 steps, 10 % each)
     • High contrast
     • Underline links
     • Reduce motion
     • Comfortable text spacing
     • Readable font (Verdana)
     • Reset all

   State persisted in localStorage under key 'cz-a11y'.
   Labels update when main.js fires the 'cz:langchange' event.
   ============================================================= */
(function () {
  'use strict';

  var A11Y_KEY = 'cz-a11y';
  var MIN_STEP = -3;   /* 70 % */
  var MAX_STEP = 5;    /* 150 % */

  /* -------------------------------------------------------
     State
  ------------------------------------------------------- */
  var state = {
    textSize:       0,
    highContrast:   false,
    underlineLinks: false,
    reduceMotion:   false,
    readableText:   false,
    readableFont:   false
  };

  function loadState() {
    try {
      var raw = localStorage.getItem(A11Y_KEY);
      if (!raw) return;
      var parsed = JSON.parse(raw);
      Object.keys(state).forEach(function (k) {
        if (Object.prototype.hasOwnProperty.call(parsed, k)) {
          state[k] = parsed[k];
        }
      });
    } catch (e) { /* ignore corrupt data */ }
  }

  function saveState() {
    try { localStorage.setItem(A11Y_KEY, JSON.stringify(state)); } catch (e) {}
  }

  /* -------------------------------------------------------
     Apply state to <html> element
  ------------------------------------------------------- */
  var htmlEl = document.documentElement;

  function applyAll() {
    var pct = 100 + state.textSize * 10;
    htmlEl.style.fontSize = state.textSize === 0 ? '' : pct + '%';
    htmlEl.classList.toggle('a11y-high-contrast',   !!state.highContrast);
    htmlEl.classList.toggle('a11y-underline-links',  !!state.underlineLinks);
    htmlEl.classList.toggle('a11y-reduce-motion',    !!state.reduceMotion);
    htmlEl.classList.toggle('a11y-readable-text',    !!state.readableText);
    htmlEl.classList.toggle('a11y-readable-font',    !!state.readableFont);
    saveState();
    syncUI();
  }

  /* Run once immediately (before DOMContentLoaded) so saved state
     is re-applied synchronously — mirrors the early-apply <script>
     in <head> but keeps the IIFE self-contained as a fallback. */
  loadState();

  /* -------------------------------------------------------
     Labels (EN + TH)
  ------------------------------------------------------- */
  var LABELS = {
    en: {
      btnLabel:       'Open accessibility options',
      title:          'Display options',
      close:          'Close panel',
      textSize:       'Text size',
      decrease:       'Decrease text size',
      increase:       'Increase text size',
      highContrast:   'High contrast',
      underlineLinks: 'Underline links',
      reduceMotion:   'Reduce motion',
      readableText:   'Comfortable spacing',
      readableFont:   'Readable font',
      reset:          'Reset all'
    },
    th: {
      btnLabel:       'เปิดตัวเลือกการแสดงผล',
      title:          'ตัวเลือกการแสดงผล',
      close:          'ปิดแผง',
      textSize:       'ขนาดตัวอักษร',
      decrease:       'ลดขนาดตัวอักษร',
      increase:       'เพิ่มขนาดตัวอักษร',
      highContrast:   'คอนทราสต์สูง',
      underlineLinks: 'ขีดเส้นใต้ลิงก์',
      reduceMotion:   'ลดการเคลื่อนไหว',
      readableText:   'ระยะห่างที่อ่านง่าย',
      readableFont:   'แบบอักษรที่อ่านง่าย',
      reset:          'รีเซ็ตทั้งหมด'
    }
  };

  function getLabels() {
    /* Prefer html[lang] (set by applyLang in main.js) */
    var lang = htmlEl.getAttribute('lang') ||
               (typeof localStorage !== 'undefined' && localStorage.getItem('lang')) ||
               'en';
    return LABELS[lang] || LABELS.en;
  }

  function escHtml(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  /* -------------------------------------------------------
     Checkbox → state key map
  ------------------------------------------------------- */
  var CB_MAP = {
    'a11y-high-contrast':   'highContrast',
    'a11y-underline-links': 'underlineLinks',
    'a11y-reduce-motion':   'reduceMotion',
    'a11y-readable-text':   'readableText',
    'a11y-readable-font':   'readableFont'
  };

  /* -------------------------------------------------------
     Sync UI controls → current state (safe to call before inject)
  ------------------------------------------------------- */
  function syncUI() {
    var el;

    el = document.getElementById('a11y-size-display');
    if (el) el.textContent = (100 + state.textSize * 10) + '%';

    el = document.getElementById('a11y-text-dec');
    if (el) el.disabled = state.textSize <= MIN_STEP;

    el = document.getElementById('a11y-text-inc');
    if (el) el.disabled = state.textSize >= MAX_STEP;

    Object.keys(CB_MAP).forEach(function (id) {
      el = document.getElementById(id);
      if (el) el.checked = !!state[CB_MAP[id]];
    });
  }

  /* -------------------------------------------------------
     Build toggle-row HTML string
  ------------------------------------------------------- */
  function buildRow(id, labelText) {
    return (
      '<label class="a11y-toggle-row" for="' + id + '">' +
        '<span class="a11y-toggle-label">' + escHtml(labelText) + '</span>' +
        '<span class="a11y-switch">' +
          '<input type="checkbox" id="' + id + '" />' +
          '<span class="a11y-switch-track" aria-hidden="true"></span>' +
        '</span>' +
      '</label>'
    );
  }

  /* -------------------------------------------------------
     Inject toolbar DOM into document.body
  ------------------------------------------------------- */
  function injectToolbar() {
    var L = getLabels();

    /* --- Floating toggle button --- */
    var btn = document.createElement('button');
    btn.type      = 'button';
    btn.id        = 'a11y-toggle-btn';
    btn.className = 'a11y-btn';
    btn.setAttribute('aria-label',    L.btnLabel);
    btn.setAttribute('aria-controls', 'a11y-panel');
    btn.setAttribute('aria-expanded', 'false');
    /* Accessibility / person silhouette icon */
    btn.innerHTML =
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none"' +
      '     aria-hidden="true" focusable="false">' +
        '<circle cx="12" cy="4.5" r="1.75" stroke="currentColor" stroke-width="2"/>' +
        '<path d="M6 10h12M12 10v11M8.5 15.5l3.5 2.5 3.5-2.5"' +
        '      stroke="currentColor" stroke-width="2"' +
        '      stroke-linecap="round" stroke-linejoin="round"/>' +
      '</svg>';

    /* --- Panel --- */
    var panel = document.createElement('div');
    panel.id        = 'a11y-panel';
    panel.className = 'a11y-panel';
    panel.setAttribute('role',            'region');
    panel.setAttribute('aria-labelledby', 'a11y-panel-title');
    panel.setAttribute('aria-hidden',     'true');

    panel.innerHTML = [
      '<div class="a11y-panel-header">',
      '  <span class="a11y-panel-title" id="a11y-panel-title">' + escHtml(L.title) + '</span>',
      '  <button type="button" class="a11y-close" id="a11y-close-btn"',
      '          aria-label="' + escHtml(L.close) + '">',
      '    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"',
      '         aria-hidden="true" focusable="false">',
      '      <path d="M1 1l12 12M13 1L1 13" stroke="currentColor"',
      '            stroke-width="2" stroke-linecap="round"/>',
      '    </svg>',
      '  </button>',
      '</div>',

      '<div class="a11y-panel-body">',

      /* Text size controls */
      '  <div class="a11y-text-row">',
      '    <span class="a11y-text-label">' + escHtml(L.textSize) + '</span>',
      '    <button type="button" class="a11y-step-btn" id="a11y-text-dec"',
      '            aria-label="' + escHtml(L.decrease) + '">&minus;</button>',
      '    <span id="a11y-size-display" class="a11y-size-display"',
      '          aria-live="polite" aria-atomic="true">100%</span>',
      '    <button type="button" class="a11y-step-btn" id="a11y-text-inc"',
      '            aria-label="' + escHtml(L.increase) + '">+</button>',
      '  </div>',

      '  <div class="a11y-divider" role="separator"></div>',

      buildRow('a11y-high-contrast',   L.highContrast),
      buildRow('a11y-underline-links', L.underlineLinks),
      buildRow('a11y-reduce-motion',   L.reduceMotion),
      buildRow('a11y-readable-text',   L.readableText),
      buildRow('a11y-readable-font',   L.readableFont),

      '  <div class="a11y-divider" role="separator"></div>',

      '  <button type="button" class="a11y-reset-btn" id="a11y-reset">',
      '    ' + escHtml(L.reset),
      '  </button>',

      '</div>'
    ].join('\n');

    /* --- Backdrop overlay --- */
    var backdrop = document.createElement('div');
    backdrop.id        = 'a11y-backdrop';
    backdrop.className = 'a11y-backdrop';
    backdrop.setAttribute('aria-hidden', 'true');

    document.body.appendChild(backdrop);
    document.body.appendChild(panel);
    document.body.appendChild(btn);
  }

  /* -------------------------------------------------------
     Panel open / close
  ------------------------------------------------------- */
  var panelOpen = false;

  function openPanel() {
    var panel    = document.getElementById('a11y-panel');
    var btn      = document.getElementById('a11y-toggle-btn');
    var backdrop = document.getElementById('a11y-backdrop');
    if (!panel || !btn) return;
    panelOpen = true;
    panel.setAttribute('aria-hidden', 'false');
    btn.setAttribute('aria-expanded', 'true');
    if (backdrop) backdrop.classList.add('is-visible');
    /* Prevent page scroll while drawer is open */
    document.body.style.overflow = 'hidden';
    var closeBtn = document.getElementById('a11y-close-btn');
    if (closeBtn) closeBtn.focus();
  }

  function closePanel() {
    var panel    = document.getElementById('a11y-panel');
    var btn      = document.getElementById('a11y-toggle-btn');
    var backdrop = document.getElementById('a11y-backdrop');
    if (!panel || !btn) return;
    panelOpen = false;
    panel.setAttribute('aria-hidden', 'true');
    btn.setAttribute('aria-expanded', 'false');
    if (backdrop) backdrop.classList.remove('is-visible');
    document.body.style.overflow = '';
    btn.focus();
  }

  /* -------------------------------------------------------
     Keyboard: Escape closes, Tab cycles within panel
  ------------------------------------------------------- */
  function onKeydown(e) {
    if (!panelOpen) return;
    var panel = document.getElementById('a11y-panel');
    if (!panel) return;

    if (e.key === 'Escape') {
      closePanel();
      return;
    }

    if (e.key === 'Tab') {
      var focusable = Array.from(
        panel.querySelectorAll('button:not([disabled]), input:not([disabled])')
      );
      if (focusable.length < 2) return;
      var first = focusable[0];
      var last  = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  /* -------------------------------------------------------
     Update labels after language change
     Called when main.js fires the 'cz:langchange' event.
  ------------------------------------------------------- */
  function updateLabels() {
    var L = getLabels();
    var el;

    el = document.getElementById('a11y-toggle-btn');
    if (el) el.setAttribute('aria-label', L.btnLabel);

    el = document.getElementById('a11y-panel-title');
    if (el) el.textContent = L.title;

    el = document.getElementById('a11y-close-btn');
    if (el) el.setAttribute('aria-label', L.close);

    el = document.querySelector('.a11y-text-label');
    if (el) el.textContent = L.textSize;

    el = document.getElementById('a11y-text-dec');
    if (el) el.setAttribute('aria-label', L.decrease);

    el = document.getElementById('a11y-text-inc');
    if (el) el.setAttribute('aria-label', L.increase);

    el = document.getElementById('a11y-reset');
    if (el) el.textContent = L.reset;

    /* Individual toggle labels */
    var LABEL_KEY = {
      'a11y-high-contrast':   'highContrast',
      'a11y-underline-links': 'underlineLinks',
      'a11y-reduce-motion':   'reduceMotion',
      'a11y-readable-text':   'readableText',
      'a11y-readable-font':   'readableFont'
    };
    Object.keys(LABEL_KEY).forEach(function (id) {
      var span = document.querySelector('label[for="' + id + '"] .a11y-toggle-label');
      if (span) span.textContent = L[LABEL_KEY[id]];
    });
  }

  /* -------------------------------------------------------
     Wire up all event listeners
  ------------------------------------------------------- */
  function wireEvents() {
    var el;

    /* Toggle panel */
    el = document.getElementById('a11y-toggle-btn');
    if (el) el.addEventListener('click', function () {
      if (panelOpen) closePanel(); else openPanel();
    });

    /* Backdrop click closes drawer */
    el = document.getElementById('a11y-backdrop');
    if (el) el.addEventListener('click', closePanel);

    /* Close button */
    el = document.getElementById('a11y-close-btn');
    if (el) el.addEventListener('click', closePanel);

    /* Text size − */
    el = document.getElementById('a11y-text-dec');
    if (el) el.addEventListener('click', function () {
      if (state.textSize > MIN_STEP) { state.textSize -= 1; applyAll(); }
    });

    /* Text size + */
    el = document.getElementById('a11y-text-inc');
    if (el) el.addEventListener('click', function () {
      if (state.textSize < MAX_STEP) { state.textSize += 1; applyAll(); }
    });

    /* Toggle checkboxes */
    Object.keys(CB_MAP).forEach(function (id) {
      var checkbox = document.getElementById(id);
      if (checkbox) {
        checkbox.addEventListener('change', function () {
          state[CB_MAP[id]] = checkbox.checked;
          applyAll();
        });
      }
    });

    /* Reset all */
    el = document.getElementById('a11y-reset');
    if (el) el.addEventListener('click', function () {
      state.textSize       = 0;
      state.highContrast   = false;
      state.underlineLinks = false;
      state.reduceMotion   = false;
      state.readableText   = false;
      state.readableFont   = false;
      applyAll();
    });

    /* Keyboard handling (Escape + Tab trap) */
    document.addEventListener('keydown', onKeydown);

    /* Language change emitted by main.js */
    document.addEventListener('cz:langchange', updateLabels);
  }

  /* -------------------------------------------------------
     Initialise on DOM ready
  ------------------------------------------------------- */
  function init() {
    injectToolbar();
    applyAll();   /* re-applies state + syncs UI checkboxes / size display */
    wireEvents();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

}());
