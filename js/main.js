/* =============================================================
   CoupoZ - main.js
   Vanilla JS only. No external dependencies.
   ============================================================= */

(function () {
  'use strict';

  /* ---- Dark mode ---- */
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;

  function applyTheme(dark) {
    if (dark) {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }

  // Initialise from saved preference or system preference
  const saved = localStorage.getItem('theme');
  if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    applyTheme(true);
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      applyTheme(!html.classList.contains('dark'));
    });
  }

  /* ---- Mobile menu ---- */
  const menuBtn  = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', function () {
      const isOpen = !mobileMenu.classList.contains('hidden');
      mobileMenu.classList.toggle('hidden', isOpen);
      menuBtn.setAttribute('aria-expanded', String(!isOpen));
    });

    // Close on nav link click
    mobileMenu.querySelectorAll('.mobile-nav-link, a[href="#contact"]').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.add('hidden');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---- Header scroll shadow ---- */
  var header = document.getElementById('site-header');
  if (header) {
    window.addEventListener('scroll', function () {
      header.classList.toggle('scrolled', window.scrollY > 10);
    }, { passive: true });
  }

  /* ---- Scroll-reveal (IntersectionObserver) ---- */
  var revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show all immediately
    revealEls.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* ---- FAQ accordion ---- */
  var faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(function (item) {
    var trigger = item.querySelector('.faq-trigger');
    var answer  = item.querySelector('.faq-answer');

    if (!trigger || !answer) return;

    // Wrap answer content for animation
    var inner = document.createElement('div');
    inner.className = 'faq-answer-inner';
    // Move children into inner wrapper
    while (answer.firstChild) {
      inner.appendChild(answer.firstChild);
    }
    answer.appendChild(inner);
    answer.removeAttribute('hidden');

    trigger.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');

      // Close all others
      faqItems.forEach(function (other) {
        if (other !== item) {
          other.classList.remove('open');
          var otherTrigger = other.querySelector('.faq-trigger');
          if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
        }
      });

      item.classList.toggle('open', !isOpen);
      trigger.setAttribute('aria-expanded', String(!isOpen));
    });
  });

  /* ---- Footer year ---- */
  var yearEl = document.getElementById('footer-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ---- Smooth active nav highlight ---- */
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav-link');

  if (sections.length && navLinks.length && 'IntersectionObserver' in window) {
    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute('id');
          navLinks.forEach(function (link) {
            var active = link.getAttribute('href') === '#' + id;
            link.classList.toggle('text-brand-500', active);
            link.classList.toggle('dark:text-brand-400', active);
            link.classList.toggle('text-gray-600', !active);
          });
        }
      });
    }, { rootMargin: '-30% 0px -60% 0px' });

    sections.forEach(function (section) {
      navObserver.observe(section);
    });
  }

})();
