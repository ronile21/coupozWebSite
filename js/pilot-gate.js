/* =============================================================
   CoupoZ - Temporary B2B/B2C pilot gate (shared)
   Client-side only, hard-coded demo code for a short pilot period.
   This is NOT a security mechanism. Real authentication starts at
   the respective (business/consumer) login page and backend JWT
   authorization.
   Safe to delete this file plus its markup/CSS after the pilot.
   ============================================================= */

(function () {
  'use strict';

  var PILOT_CODE = 'roni0408';
  var DEFAULT_REDIRECT_TARGET = '/business/';
  var SESSION_KEY = 'coupoz_pilot_gate';

  var modal = document.getElementById('pilot-gate-modal');
  var input = document.getElementById('pilot-gate-input');
  var error = document.getElementById('pilot-gate-error');
  var submitBtn = document.getElementById('pilot-gate-submit');
  var closeBtn = document.getElementById('pilot-gate-close');
  var overlay = document.getElementById('pilot-gate-overlay');
  var title = document.getElementById('pilot-gate-title');
  var openBtns = document.querySelectorAll('[data-pilot-target]');

  if (!modal || !input || !error || !submitBtn || openBtns.length === 0) return;

  var activeTarget = DEFAULT_REDIRECT_TARGET;

  function openModal(event) {
    var btn = event.currentTarget;
    activeTarget = btn.getAttribute('data-pilot-target') || DEFAULT_REDIRECT_TARGET;
    if (title) {
      title.textContent = btn.textContent.trim() + ' Access';
    }
    modal.classList.remove('hidden');
    modal.setAttribute('aria-hidden', 'false');
    error.classList.add('hidden');
    input.value = '';
    input.focus();
  }

  function closeModal() {
    modal.classList.add('hidden');
    modal.setAttribute('aria-hidden', 'true');
  }

  function submitCode() {
    if (input.value === PILOT_CODE) {
      sessionStorage.setItem(SESSION_KEY, 'passed');
      window.location.href = activeTarget;
    } else {
      error.classList.remove('hidden');
    }
  }

  openBtns.forEach(function (btn) {
    btn.addEventListener('click', openModal);
  });

  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);
  submitBtn.addEventListener('click', submitCode);

  input.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      submitCode();
    }
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });
}());
