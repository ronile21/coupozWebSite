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
    // Keep aria-label in sync with the action the button will perform next
    if (themeToggle) {
      themeToggle.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
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
      menuBtn.setAttribute('aria-label', isOpen ? 'Open menu' : 'Close menu');
    });

    // Close on nav link click
    mobileMenu.querySelectorAll('.mobile-nav-link, a[href="#contact"]').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.add('hidden');
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.setAttribute('aria-label', 'Open menu');
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
  var prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    // CSS already makes .reveal immediately visible; this ensures JS state is consistent
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  } else if (revealEls.length && 'IntersectionObserver' in window) {
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

    if (trigger && answer) {
      // Wrap answer content for animation
      var inner = document.createElement('div');
      inner.className = 'faq-answer-inner';
      // Move children into inner wrapper
      while (answer.firstChild) {
        inner.appendChild(answer.firstChild);
      }
      answer.appendChild(inner);
      answer.removeAttribute('hidden');
      // Panel content starts hidden from AT (max-height:0 alone is not AT-hidden)
      answer.setAttribute('aria-hidden', 'true');

      trigger.addEventListener('click', function () {
        var isOpen = item.classList.contains('open');

        // Close all others
        faqItems.forEach(function (other) {
          if (other !== item) {
            other.classList.remove('open');
            var otherTrigger = other.querySelector('.faq-trigger');
            var otherAnswer  = other.querySelector('.faq-answer');
            if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
            if (otherAnswer)  otherAnswer.setAttribute('aria-hidden', 'true');
          }
        });

        item.classList.toggle('open', !isOpen);
        trigger.setAttribute('aria-expanded', String(!isOpen));
        answer.setAttribute('aria-hidden', String(isOpen)); // isOpen=true means we are closing
      });
    }
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

  /* ============================================================
     LANGUAGE / i18n
  ============================================================ */

  var translations = {
    en: {
      /* NAV */
      'nav.problem':      'Problem',
      'nav.solution':     'Solution',
      'nav.how':          'How it works',
      'nav.usecases':     'Use cases',
      'nav.faq':          'FAQ',
      'nav.demo':         'Request a demo',

      /* HERO */ // change$$$
      'hero.badge':       'Real-time offer activation for physical venues',
      'hero.h1a':         'Real-time offer activation',
      'hero.h1b':         'for',
      'hero.h1c':         'physical venues',
      'hero.h1d':         '',
      'hero.sub':         'CoupoZ helps malls, retailers, hotels, restaurants and commercial venues activate nearby customer intent through time-and-location-aware offers — with measurable, privacy-conscious business insights.',
      'hero.sub2':        'Turn nearby customer intent into measurable visits and sales.',
      'hero.cta.demo':    'Request a demo',
      'hero.cta.how':     'See how it works',
      'hero.trust':       'Trusted by malls and retailers',

      /* PROBLEM */ // change$$$
      'prob.label':       'The Problem',
      'prob.h2':          'Nearby customer intent goes unmet — until now',
      'prob.sub':         'Physical venues have always struggled to prove the real business value of promotions. The data never connects.',
      'prob.1.h3':        'No measurable ROI',
      'prob.1.p':         'Traditional print coupons and flyers offer zero insight. Venues cannot tell which promotions drove visits or purchases — and businesses cannot prove their campaigns work.',
      'prob.2.h3':        'Slow campaign launches',
      'prob.2.p':         'Setting up a promotional campaign can take days or weeks when coordinated across print, signage, and email channels - too slow for dynamic retail environments.',
      'prob.3.h3':        'Shoppers miss offers',
      'prob.3.p':         'Shoppers walk past stores every day without knowing about active deals. Without real-time, location-aware delivery, promotions never reach the right person at the right moment.',

      /* SOLUTION */ // change$$$
      'sol.label':        'The Solution',
      'sol.h2a':          'Real-time activation,',
      'sol.h2b':          'measurable results',
      'sol.p':            'CoupoZ enables physical venues to activate time-and-location-aware offers — reaching nearby customers at relevant moments and providing aggregated business insights.',
      'sol.b1.h':         'Launch structured offers for physical locations',
      'sol.b1.p':         'Business users set up and activate time-and-location-aware offers directly from the platform.',
      'sol.b2.h':         'Reach nearby customers at relevant moments',
      'sol.b2.p':         'Venue operators and business users receive aggregated insights — never individual customer data.',
      'sol.b3.h':         'Support measurable visits and redemptions',
      'sol.b3.p':         'Designed to connect nearby customer intent with measurable business outcomes.',
      'sol.b4.h':         'Aggregated business insights for business users',
      'sol.b4.p':         'Understand offer performance through aggregated, privacy-conscious reporting.',
      'sol.badge.title':  'Campaign live',
      'sol.badge.sub':    '3 min ago',

      /* HOW IT WORKS */ // change$$$
      'how.label':        'How it works',
      'how.h2':           'From offer setup to business results',
      'how.sub':          'CoupoZ is designed to be intuitive for businesses and relevant for customers.',
      'how.1.h3':         'Business sets up an offer',
      'how.1.p':          'Businesses define and schedule time-and-location-aware offers directly on the platform.',
      'how.2.h3':         'Offer reaches nearby customers',
      'how.2.p':          'Customers near the venue can discover time-and-location-relevant offers.',
      'how.3.h3':         'Customer acts on the offer',
      'how.3.p':          'Customers discover and benefit from offers at relevant moments.',
      'how.4.h3':         'Results are tracked and reported',
      'how.4.p':          'All parties receive relevant, aggregated insights through privacy-conscious reporting.',

      /* USE CASES */ // change$$$
      'uc.label':         'Use Cases',
      'uc.h2':            'Built for physical venues and the teams that run them',
      'uc.sub':           'Multiple audience types, one platform — each with a tailored experience.',
      'uc.mall.h3':       'Malls & Commercial Venues',
      'uc.mall.p':        'Access aggregated business insights, performance reporting, and operational controls — without accessing individual business campaign content.',
      'uc.mall.b1':       'Aggregated traffic and engagement insights',
      'uc.mall.b2':       'Performance reporting by area or zone',
      'uc.mall.b3':       'Operational controls without business content access',
      'uc.mall.b4':       'Compare performance across time periods',
      'uc.store.h3':      'Stores and Retail Chains',
      'uc.store.p':       'Create and schedule structured offers, then track measurable performance through aggregated reporting.',
      'uc.store.b1':      'Campaign builder with scheduling',
      'uc.store.b2':      'Aggregated performance insights',
      'uc.store.b3':      'Multi-location management for chains',
      'uc.store.b4':      'Measurable business outcomes',
      'uc.consumer.h3':   'Consumers',
      'uc.consumer.p':    'Discover relevant deals nearby, right when you are ready to shop - no hunting through emails or clipping paper coupons.',
      'uc.consumer.b1':   'Real-time nearby offers',
      'uc.consumer.b2':   'One-tap coupon redemption',
      'uc.consumer.b3':   'Personalized deal feed',
      'uc.consumer.b4':   'No printing or sign-up friction',
      'uc.hotel.h3':      'Hotels & Hospitality',
      'uc.hotel.p':       'Activate timely offers for guests and nearby visitors — including restaurants, bars, spa services, events, retail corners, partner offers and local experiences.',
      'uc.hotel.b1':      'Offers for guests and nearby visitors',
      'uc.hotel.b2':      'Restaurants, bars, spa, events and retail',
      'uc.hotel.b3':      'Partner offers and local experiences',
      'uc.hotel.b4':      'Aggregated performance insights',

      /* METRICS */ // change$$$
      'met.h2':           'What you can measure',
      'met.sub':          'Track the business performance indicators that matter for your venue.',
      'met.note':         '',
      'met.1.label':      'Offer reach and visibility',
      'met.2.label':      'Customer engagement',
      'met.3.label':      'Visit and redemption attribution',
      'met.4.label':      'Aggregated business performance',
      'met.disclaimer':   '',

      /* PRIVACY */ // change$$$
      'priv.h2':          'Built for privacy',
      'priv.p':           'Designed around privacy-first principles, consent-based location access, and aggregated reporting for business users. Detailed privacy, compliance and data-processing terms are handled in commercial/legal documentation.',
      'priv.1.h':         'Aggregated only',
      'priv.1.p':         'Business users receive group-level, aggregated insights — individual customer identification is by design not part of the reporting model.',
      'priv.2.h':         'Privacy by design',
      'priv.2.p':         'CoupoZ is built around aggregated, consent-based data flows. Individual consumer identities are not shared across business accounts.',
      'priv.3.h':         'Consent-based',
      'priv.3.p':         'Location access requires explicit consumer opt-in. Consent-based design governs how the platform handles customer data.',

      /* FAQ */ // change$$$
      'faq.label':        'FAQ',
      'faq.h2':           'Common questions, clear answers',
      'faq.1.q':          'What types of businesses can use CoupoZ?',
      'faq.1.a':          'CoupoZ is designed for physical venue operators and businesses — including malls and commercial areas, retail stores and chains, hotels and hospitality venues, restaurants, and end consumers who want to discover nearby offers. If you operate or manage a physical venue where customer engagement matters, CoupoZ is built for you.',
      'faq.2.q':          'How does location detection work without invading privacy?',
      'faq.2.a':          'CoupoZ is built around consent-based location access. Location data requires explicit customer opt-in and is not used to build individual profiles. Business users receive only aggregated, anonymised insights — individual customer identification is not part of the reporting model.',
      'faq.3.q':          'Can mall management edit a store\'s campaign content?',
      'faq.3.a':          'No. Mall management has operational controls such as activating or pausing campaigns in bulk for emergency situations - but they cannot view or edit any individual store\'s campaign content. Creative, offers, and copy remain fully controlled by each retail tenant.',
      'faq.4.q':          'How long does it take to launch a campaign?',
      'faq.4.a':          'Businesses can create and schedule offers quickly using the platform — no technical background required. Detailed onboarding and workflow information is available in product discussions under NDA.',
      'faq.5.q':          'What metrics can stores and malls track?',
      'faq.5.a':          'Business users can track offer performance, visit attribution, and engagement through aggregated reporting. Detailed reporting capabilities are covered in product discussions under NDA.',
      'faq.6.q':          'Is there a free trial or pilot program?',
      'faq.6.a':          'Yes - we offer a structured pilot program for malls and retail chains that want to validate CoupoZ in their environment before committing. Reach out via the contact section below or send us a message at <a href="mailto:info@coupoz.com" class="text-brand-500 hover:underline">info@coupoz.com</a> to get started.',
      'faq.7.q':          'Is AI part of the CoupoZ product?',
      'faq.7.a':          'Future roadmap: AI-assisted campaign creation and content optimisation for business users. Current product discussions and demonstrations are available under NDA.',

      /* CONTACT */ // change$$$
      'contact.label':    'Get in touch',
      'contact.h2':       'Ready to learn more about CoupoZ?',
      'contact.sub':      'Detailed product discussions and demos are available under NDA.',
      'contact.email':    'Request a demo by email',
      'contact.wa':       'Chat on WhatsApp',
      'contact.tg':       'Message on Telegram',
      'contact.line':     'Chat on Line',
      'contact.coming':   'Coming soon',
      'contact.or':       'Or email us directly at',

      /* FOOTER */ // change$$$
      'footer.tagline':   'Real-time offer activation for physical venues — malls, retailers, hotels, restaurants and commercial areas.',
      'footer.nav':       'Navigate',
      'footer.contact':   'Contact',
      'footer.linkedin':  'LinkedIn (coming soon)',
      'footer.copy':      'All rights reserved.',
      'footer.built':     'Built for physical venues and the people they serve.',
      'footer.a11y':      'Accessibility'
    },

    th: {
      /* NAV */
      'nav.problem':      'ปัญหา',
      'nav.solution':     'โซลูชัน',
      'nav.how':          'วิธีการทำงาน',
      'nav.usecases':     'กรณีการใช้งาน',
      'nav.faq':          'คำถามที่พบบ่อย',
      'nav.demo':         'ขอสาธิต',

      /* HERO */ // change$$$
      'hero.badge':       'การเปิดใช้งานข้อเสนอแบบเรียลไทม์สำหรับสถานที่เชิงพาณิชย์',
      'hero.h1a':         'การเปิดใช้งานข้อเสนอแบบเรียลไทม์',
      'hero.h1b':         'สำหรับ',
      'hero.h1c':         'สถานที่เชิงพาณิชย์',
      'hero.h1d':         '',
      'hero.sub':         'CoupoZ ช่วยห้างสรรพสินค้า ผู้ค้าปลีก โรงแรม ร้านอาหาร และสถานที่เชิงพาณิชย์เปิดใช้งานความตั้งใจซื้อของลูกค้าใกล้เคียงผ่านข้อเสนอที่รับรู้เวลาและตำแหน่ง — พร้อมข้อมูลเชิงลึกทางธุรกิจที่วัดได้และใส่ใจความเป็นส่วนตัว',
      'hero.sub2':        'เปลี่ยนความตั้งใจซื้อของลูกค้าใกล้เคียงให้เป็นการเข้าชมและยอดขายที่วัดได้',
      'hero.cta.demo':    'ขอสาธิต',
      'hero.cta.how':     'ดูวิธีการทำงาน',
      'hero.trust':       'ได้รับความไว้วางใจจากห้างสรรพสินค้าและผู้ค้าปลีก',

      /* PROBLEM */ // change$$$
      'prob.label':       'ปัญหา',
      'prob.h2':          'ความตั้งใจซื้อของลูกค้าใกล้เคียงถูกมองข้าม — จนกว่าจะถึงตอนนี้',
      'prob.sub':         'สถานที่เชิงพาณิชย์มักพยายามพิสูจน์มูลค่าทางธุรกิจที่แท้จริงของโปรโมชันมาโดยตลอด ข้อมูลไม่เคยเชื่อมต่อกัน',
      'prob.1.h3':        'ไม่มี ROI ที่วัดได้',
      'prob.1.p':         'คูปองกระดาษและใบปลิวแบบดั้งเดิมไม่ให้ข้อมูลเชิงลึกใดๆ สถานที่ไม่สามารถบอกได้ว่าโปรโมชันใดที่ดึงดูดการเข้าชมหรือการซื้อ — และธุรกิจก็พิสูจน์ไม่ได้ว่าแคมเปญของตนได้ผล',
      'prob.2.h3':        'การเปิดตัวแคมเปญช้า',
      'prob.2.p':         'การตั้งค่าแคมเปญโปรโมชันอาจใช้เวลาหลายวันหรือหลายสัปดาห์เมื่อประสานงานผ่านช่องทางสื่อสิ่งพิมพ์ ป้ายโฆษณา และอีเมล — ช้าเกินไปสำหรับสภาพแวดล้อมค้าปลีกที่เปลี่ยนแปลงอยู่เสมอ',
      'prob.3.h3':        'นักช้อปพลาดข้อเสนอ',
      'prob.3.p':         'นักช้อปเดินผ่านร้านค้าทุกวันโดยไม่รู้ว่ามีดีลที่ใช้งานอยู่ หากไม่มีการส่งข้อมูลแบบเรียลไทม์ที่รับรู้ตำแหน่ง โปรโมชันจะไม่เคยเข้าถึงคนที่ใช่ในเวลาที่ใช่',

      /* SOLUTION */ // change$$$
      'sol.label':        'โซลูชัน',
      'sol.h2a':          'การเปิดใช้งานแบบเรียลไทม์',
      'sol.h2b':          'ผลลัพธ์ที่วัดได้',
      'sol.p':            'CoupoZ ช่วยให้สถานที่เชิงพาณิชย์เปิดใช้งานข้อเสนอที่รับรู้เวลาและตำแหน่ง — เข้าถึงลูกค้าใกล้เคียงในช่วงเวลาที่เกี่ยวข้องและมอบข้อมูลเชิงลึกทางธุรกิจแบบรวม',
      'sol.b1.h':         'เปิดตัวข้อเสนอที่มีโครงสร้างสำหรับสถานที่จริง',
      'sol.b1.p':         'ผู้ใช้งานธุรกิจตั้งค่าและเปิดใช้งานข้อเสนอที่รับรู้เวลาและตำแหน่งโดยตรงจากแพลตฟอร์ม',
      'sol.b2.h':         'เข้าถึงลูกค้าใกล้เคียงในช่วงเวลาที่เกี่ยวข้อง',
      'sol.b2.p':         'ผู้ดำเนินการสถานที่และผู้ใช้งานธุรกิจได้รับข้อมูลเชิงลึกแบบรวม — ไม่เคยเป็นข้อมูลลูกค้ารายบุคคล',
      'sol.b3.h':         'สนับสนุนการเข้าชมและการแลกรับที่วัดได้',
      'sol.b3.p':         'ออกแบบมาเพื่อเชื่อมต่อความตั้งใจซื้อของลูกค้าใกล้เคียงกับผลลัพธ์ทางธุรกิจที่วัดได้',
      'sol.b4.h':         'ข้อมูลเชิงลึกทางธุรกิจแบบรวมสำหรับผู้ใช้งานธุรกิจ',
      'sol.b4.p':         'เข้าใจประสิทธิภาพข้อเสนอผ่านการรายงานแบบรวมที่ใส่ใจความเป็นส่วนตัว',
      'sol.badge.title':  'แคมเปญเริ่มทำงาน',
      'sol.badge.sub':    '3 นาทีที่แล้ว',

      /* HOW IT WORKS */ // change$$$
      'how.label':        'วิธีการทำงาน',
      'how.h2':           'จากการตั้งค่าข้อเสนอสู่ผลลัพธ์ทางธุรกิจ',
      'how.sub':          'CoupoZ ออกแบบมาให้ใช้งานง่ายสำหรับธุรกิจและเกี่ยวข้องสำหรับลูกค้า',
      'how.1.h3':         'ธุรกิจตั้งค่าข้อเสนอ',
      'how.1.p':          'ธุรกิจกำหนดและกำหนดเวลาข้อเสนอที่รับรู้เวลาและตำแหน่งโดยตรงบนแพลตฟอร์ม',
      'how.2.h3':         'ข้อเสนอเข้าถึงลูกค้าใกล้เคียง',
      'how.2.p':          'ลูกค้าที่อยู่ใกล้เคียงสามารถค้นพบข้อเสนอที่เกี่ยวข้องตามเวลาและตำแหน่งที่ตั้ง',
      'how.3.h3':         'ลูกค้าดำเนินการกับข้อเสนอ',
      'how.3.p':          'ลูกค้าค้นพบและได้รับประโยชน์จากข้อเสนอในช่วงเวลาที่เกี่ยวข้อง',
      'how.4.h3':         'ผลลัพธ์ถูกติดตามและรายงาน',
      'how.4.p':          'ทุกฝ่ายได้รับข้อมูลเชิงลึกที่เกี่ยวข้องผ่านการรายงานแบบรวมและปลอดภัยต่อความเป็นส่วนตัว',

      /* USE CASES */ // change$$$
      'uc.label':         'กรณีการใช้งาน',
      'uc.h2':            'สร้างมาสำหรับสถานที่เชิงพาณิชย์และทีมที่บริหารจัดการ',
      'uc.sub':           'หลากหลายกลุ่มผู้ใช้ หนึ่งแพลตฟอร์ม — แต่ละกลุ่มได้รับประสบการณ์ที่ปรับแต่งเฉพาะ',
      'uc.mall.h3':       'ห้างสรรพสินค้าและพื้นที่เชิงพาณิชย์',
      'uc.mall.p':        'เข้าถึงข้อมูลเชิงลึกทางธุรกิจแบบรวม รายงานประสิทธิภาพ และการควบคุมการดำเนินงาน — โดยไม่เข้าถึงเนื้อหาแคมเปญของธุรกิจแต่ละราย',
      'uc.mall.b1':       'ข้อมูลเชิงลึกด้านการเข้าชมและการมีส่วนร่วมแบบรวม',
      'uc.mall.b2':       'รายงานประสิทธิภาพแยกตามพื้นที่หรือโซน',
      'uc.mall.b3':       'การควบคุมการดำเนินงานโดยไม่เข้าถึงเนื้อหาธุรกิจ',
      'uc.mall.b4':       'เปรียบเทียบประสิทธิภาพในช่วงเวลาต่างๆ',
      'uc.store.h3':      'ร้านค้าและเชนค้าปลีก',
      'uc.store.p':       'สร้างและกำหนดเวลาข้อเสนอที่มีโครงสร้าง จากนั้นติดตามประสิทธิภาพที่วัดได้ผ่านการรายงานแบบรวม',
      'uc.store.b1':      'ตัวสร้างแคมเปญพร้อมระบบกำหนดเวลา',
      'uc.store.b2':      'ข้อมูลเชิงลึกประสิทธิภาพแบบรวม',
      'uc.store.b3':      'การจัดการหลายสาขาสำหรับเชน',
      'uc.store.b4':      'ผลลัพธ์ทางธุรกิจที่วัดได้',
      'uc.consumer.h3':   'ผู้บริโภค',
      'uc.consumer.p':    'ค้นพบดีลที่เกี่ยวข้องใกล้ๆ ตอนที่คุณพร้อมจะช้อป — ไม่ต้องค้นในอีเมลหรือตัดคูปองกระดาษ',
      'uc.consumer.b1':   'ข้อเสนอใกล้ๆ แบบเรียลไทม์',
      'uc.consumer.b2':   'แลกคูปองด้วยการแตะครั้งเดียว',
      'uc.consumer.b3':   'ฟีดดีลส่วนตัว',
      'uc.consumer.b4':   'ไม่ต้องพิมพ์หรือลงทะเบียน',
      'uc.hotel.h3':      'โรงแรมและการบริการ',
      'uc.hotel.p':       'เปิดใช้งานข้อเสนอที่ทันท่วงทีสำหรับแขกและผู้เยี่ยมชมใกล้เคียง — รวมถึงร้านอาหาร บาร์ สปา กิจกรรม มุมค้าปลีก ข้อเสนอพันธมิตร และประสบการณ์ท้องถิ่น',
      'uc.hotel.b1':      'ข้อเสนอสำหรับแขกและผู้เยี่ยมชมใกล้เคียง',
      'uc.hotel.b2':      'ร้านอาหาร บาร์ สปา กิจกรรม และมุมค้าปลีก',
      'uc.hotel.b3':      'ข้อเสนอพันธมิตรและประสบการณ์ท้องถิ่น',
      'uc.hotel.b4':      'ข้อมูลเชิงลึกด้านประสิทธิภาพแบบรวม',

      /* METRICS */ // change$$$
      'met.h2':           'สิ่งที่คุณสามารถวัดได้',
      'met.sub':          'ติดตามตัวชี้วัดประสิทธิภาพทางธุรกิจที่สำคัญสำหรับสถานที่ของคุณ',
      'met.note':         '',
      'met.1.label':      'การเข้าถึงข้อเสนอและการมองเห็น',
      'met.2.label':      'การมีส่วนร่วมของลูกค้า',
      'met.3.label':      'การระบุการเข้าชมและการแลกรับ',
      'met.4.label':      'ประสิทธิภาพธุรกิจแบบรวม',
      'met.disclaimer':   '',

      /* PRIVACY */ // change$$$
      'priv.h2':          'สร้างมาเพื่อความเป็นส่วนตัว',
      'priv.p':           'ออกแบบตามหลักการความเป็นส่วนตัวเป็นอันดับแรก การเข้าถึงตำแหน่งที่ตั้งบนพื้นฐานความยินยอม และการรายงานแบบรวมสำหรับผู้ใช้งานธุรกิจ รายละเอียดความเป็นส่วนตัว การปฏิบัติตามกฎระเบียบ และข้อกำหนดการประมวลผลข้อมูลจัดการผ่านเอกสารเชิงพาณิชย์และกฎหมาย',
      'priv.1.h':         'รวมกลุ่มเท่านั้น',
      'priv.1.p':         'ผู้ใช้งานธุรกิจได้รับข้อมูลเชิงลึกระดับกลุ่มแบบรวม — การระบุตัวตนลูกค้ารายบุคคลไม่ใช่ส่วนหนึ่งของโมเดลการรายงานโดยการออกแบบ',
      'priv.2.h':         'ความเป็นส่วนตัวโดยการออกแบบ',
      'priv.2.p':         'CoupoZ สร้างขึ้นบนกระบวนการข้อมูลแบบรวมและบนพื้นฐานความยินยอม ตัวตนผู้บริโภครายบุคคลไม่ถูกแบ่งปันระหว่างบัญชีธุรกิจ',
      'priv.3.h':         'ยินยอมเป็นหลัก',
      'priv.3.p':         'การเข้าถึงตำแหน่งที่ตั้งต้องการการยินยอมจากผู้บริโภคอย่างชัดเจน การออกแบบบนพื้นฐานความยินยอมกำกับดูแลวิธีที่แพลตฟอร์มจัดการข้อมูลลูกค้า',

      /* FAQ */ // change$$$
      'faq.label':        'คำถามที่พบบ่อย',
      'faq.h2':           'คำถามทั่วไป คำตอบที่ชัดเจน',
      'faq.1.q':          'ธุรกิจประเภทใดที่สามารถใช้ CoupoZ ได้?',
      'faq.1.a':          'CoupoZ ออกแบบมาสำหรับผู้ดำเนินการสถานที่เชิงพาณิชย์และธุรกิจ — รวมถึงห้างสรรพสินค้าและพื้นที่เชิงพาณิชย์ ร้านค้าและเชนค้าปลีก โรงแรมและสถานที่บริการ ร้านอาหาร และผู้บริโภคที่ต้องการค้นพบข้อเสนอใกล้ตัว หากคุณดำเนินการหรือบริหารสถานที่เชิงพาณิชย์ที่การมีส่วนร่วมของลูกค้ามีความสำคัญ CoupoZ สร้างมาเพื่อคุณ',
      'faq.2.q':          'การตรวจจับตำแหน่งทำงานอย่างไรโดยไม่ละเมิดความเป็นส่วนตัว?',
      'faq.2.a':          'CoupoZ สร้างขึ้นบนพื้นฐานการเข้าถึงตำแหน่งที่ตั้งด้วยความยินยอม ข้อมูลตำแหน่งต้องการการยินยอมจากลูกค้าอย่างชัดเจนและไม่ถูกใช้เพื่อสร้างโปรไฟล์รายบุคคล ผู้ใช้งานธุรกิจได้รับเฉพาะข้อมูลเชิงลึกแบบรวมและไม่ระบุตัวตน — การระบุตัวตนลูกค้ารายบุคคลไม่ใช่ส่วนหนึ่งของโมเดลการรายงาน',
      'faq.3.q':          'ฝ่ายบริหารห้างฯ สามารถแก้ไขเนื้อหาแคมเปญของร้านค้าได้หรือไม่?',
      'faq.3.a':          'ไม่ได้ ฝ่ายบริหารห้างฯ มีการควบคุมการดำเนินงาน เช่น การเปิดใช้งานหรือหยุดแคมเปญเป็นกลุ่มสำหรับสถานการณ์ฉุกเฉิน — แต่ไม่สามารถดูหรือแก้ไขเนื้อหาแคมเปญของร้านค้าแต่ละรายได้ ความคิดสร้างสรรค์ ข้อเสนอ และสำเนาถูกควบคุมโดยผู้เช่าค้าปลีกแต่ละรายอย่างเต็มที่',
      'faq.4.q':          'ใช้เวลานานแค่ไหนในการเปิดตัวแคมเปญ?',
      'faq.4.a':          'ธุรกิจสามารถสร้างและกำหนดเวลาข้อเสนอได้อย่างรวดเร็วโดยใช้แพลตฟอร์ม — ไม่ต้องมีพื้นฐานด้านเทคนิค ข้อมูลการเตรียมความพร้อมและขั้นตอนการทำงานโดยละเอียดมีให้ในการพูดคุยเกี่ยวกับผลิตภัณฑ์ภายใต้ NDA',
      'faq.5.q':          'ร้านค้าและห้างฯ สามารถติดตามเมตริกใดได้บ้าง?',
      'faq.5.a':          'ผู้ใช้งานธุรกิจสามารถติดตามประสิทธิภาพข้อเสนอ การระบุการเข้าชม และการมีส่วนร่วมผ่านการรายงานแบบรวม ความสามารถในการรายงานโดยละเอียดครอบคลุมในการพูดคุยเกี่ยวกับผลิตภัณฑ์ภายใต้ NDA',
      'faq.6.q':          'มีการทดลองใช้ฟรีหรือโปรแกรมนำร่องหรือไม่?',
      'faq.6.a':          'มี — เรามีโปรแกรมนำร่องที่มีโครงสร้างสำหรับห้างสรรพสินค้าและเชนค้าปลีกที่ต้องการตรวจสอบ CoupoZ ในสภาพแวดล้อมของตนก่อนตัดสินใจ ติดต่อผ่านส่วนติดต่อด้านล่างหรือส่งข้อความถึงเราที่ <a href="mailto:info@coupoz.com" class="text-brand-500 hover:underline">info@coupoz.com</a> เพื่อเริ่มต้น',
      'faq.7.q':          'AI เป็นส่วนหนึ่งของผลิตภัณฑ์ CoupoZ หรือไม่?',
      'faq.7.a':          'แผนงานในอนาคต: การสร้างแคมเปญด้วย AI และการปรับแต่งเนื้อหาสำหรับผู้ใช้งานธุรกิจ การพูดคุยเกี่ยวกับผลิตภัณฑ์และการสาธิตปัจจุบันมีให้บริการภายใต้ NDA',

      /* CONTACT */ // change$$$
      'contact.label':    'ติดต่อเรา',
      'contact.h2':       'พร้อมเรียนรู้เพิ่มเติมเกี่ยวกับ CoupoZ แล้วหรือยัง?',
      'contact.sub':      'การพูดคุยเกี่ยวกับผลิตภัณฑ์โดยละเอียดและการสาธิตมีให้บริการภายใต้ NDA',
      'contact.email':    'ขอสาธิตทางอีเมล',
      'contact.wa':       'แชทบน WhatsApp',
      'contact.tg':       'ส่งข้อความบน Telegram',
      'contact.line':     'แชทบน Line',
      'contact.coming':   'เร็วๆ นี้',
      'contact.or':       'หรือส่งอีเมลถึงเราโดยตรงที่',

      /* FOOTER */ // change$$$
      'footer.tagline':   'การเปิดใช้งานข้อเสนอแบบเรียลไทม์สำหรับสถานที่เชิงพาณิชย์ — ห้างสรรพสินค้า ผู้ค้าปลีก โรงแรม ร้านอาหาร และพื้นที่เชิงพาณิชย์',
      'footer.nav':       'นำทาง',
      'footer.contact':   'ติดต่อ',
      'footer.linkedin':  'LinkedIn (เร็วๆ นี้)',
      'footer.copy':      'สงวนลิขสิทธิ์',
      'footer.built':     'สร้างมาสำหรับสถานที่เชิงพาณิชย์และผู้ใช้บริการ',
      'footer.a11y':      'การเข้าถึง'
    }
  };

  /* ---- Apply translations to DOM ---- */
  function applyLang(lang) {
    var t = translations[lang] || translations.en;
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (t[key] !== undefined) {
        el.innerHTML = t[key];
      }
    });
    // Update html lang attribute
    document.documentElement.setAttribute('lang', lang);
    // Notify the accessibility toolbar so it can update its labels
    document.dispatchEvent(new CustomEvent('cz:langchange'));
    // Persist choice
    localStorage.setItem('lang', lang);
    // Update active language indicator
    var enSpan = document.getElementById('lang-en');
    var thSpan = document.getElementById('lang-th');
    if (enSpan && thSpan) {
      enSpan.className = lang === 'en' ? 'text-brand-500 font-bold' : 'text-gray-400 dark:text-gray-500';
      thSpan.className = lang === 'th' ? 'text-brand-500 font-bold' : 'text-gray-400 dark:text-gray-500';
    }
    // Update lang-toggle aria-label to reflect current state and next action
    var langToggleBtn = document.getElementById('lang-toggle');
    if (langToggleBtn) {
      langToggleBtn.setAttribute('aria-label',
        lang === 'en' ? 'Language: English. Switch to Thai' : 'ภาษา: ไทย. Switch to English');
    }
    // Announce the language change to screen readers via the live region
    var announcement = document.getElementById('lang-announcement');
    if (announcement) {
      announcement.textContent = lang === 'en' ? 'Language changed to English' : 'เปลี่ยนภาษาเป็นภาษาไทย';
    }
  }

  /* ---- Language toggle ---- */
  var langToggle = document.getElementById('lang-toggle');
  var currentLang = localStorage.getItem('lang') || 'en';

  // Apply saved language on load
  if (currentLang === 'th') {
    applyLang('th');
  } else {
    applyLang('en');
  }

  if (langToggle) {
    langToggle.addEventListener('click', function () {
      currentLang = (currentLang === 'en') ? 'th' : 'en';
      applyLang(currentLang);
    });
  }

})();
