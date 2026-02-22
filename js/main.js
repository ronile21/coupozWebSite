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

      /* HERO */
      'hero.badge':       'Real-time in-mall coupon activation',
      'hero.h1a':         'Turn Mall Foot Traffic',
      'hero.h1b':         'Into',
      'hero.h1c':         'Measurable',
      'hero.h1d':         'Sales',
      'hero.sub':         'CoupoZ drives measurable in-mall foot traffic using time and location-based coupon activation - giving malls, stores, and shoppers a smarter way to connect.',
      'hero.cta.demo':    'Request a demo',
      'hero.cta.how':     'See how it works',
      'hero.trust':       'Trusted by malls and retailers',

      /* PROBLEM */
      'prob.label':       'The Problem',
      'prob.h2':          'Foot traffic is invisible - until now',
      'prob.sub':         'Malls and stores have always struggled to prove the real business value of promotions. The data never connects.',
      'prob.1.h3':        'No measurable ROI',
      'prob.1.p':         'Traditional print coupons and flyers offer zero insight. Malls cannot tell which promotions drove visits or purchases - and stores cannot prove their campaigns work.',
      'prob.2.h3':        'Slow campaign launches',
      'prob.2.p':         'Setting up a promotional campaign can take days or weeks when coordinated across print, signage, and email channels - too slow for dynamic retail environments.',
      'prob.3.h3':        'Shoppers miss offers',
      'prob.3.p':         'Shoppers walk past stores every day without knowing about active deals. Without real-time, location-aware delivery, promotions never reach the right person at the right moment.',

      /* SOLUTION */
      'sol.label':        'The Solution',
      'sol.h2a':          'Real-time activation,',
      'sol.h2b':          'measurable results',
      'sol.p':            'CoupoZ connects malls, stores, and shoppers through a smart platform that activates coupons based on time and location - the moment a shopper is physically nearby and ready to act.',
      'sol.b1.h':         'Launch campaigns in minutes',
      'sol.b1.p':         'Stores create and activate time-scheduled coupons instantly - no IT support required.',
      'sol.b2.h':         'Aggregated mall-level insights',
      'sol.b2.p':         'Mall management sees anonymized, aggregated performance data - never individual store content.',
      'sol.b3.h':         'Right offer, right moment',
      'sol.b3.p':         'Shoppers discover deals when they are nearby - turning browsing intent into actual store visits.',
      'sol.badge.title':  'Campaign live',
      'sol.badge.sub':    '3 min ago',

      /* HOW IT WORKS */
      'how.label':        'How it works',
      'how.h2':           'Four steps, from setup to sale',
      'how.sub':          'CoupoZ is designed to be fast and intuitive for everyone in the ecosystem.',
      'how.1.h3':         'Store creates a campaign',
      'how.1.p':          'Retailers define the offer, select a time window, and publish - directly from the CoupoZ dashboard. No technical skills needed.',
      'how.2.h3':         'Location activates the offer',
      'how.2.p':          'When a shopper enters the mall or passes by a store, CoupoZ detects proximity and unlocks relevant coupons in real time.',
      'how.3.h3':         'Shopper redeems the coupon',
      'how.3.p':          'The consumer taps to claim the deal and shows it at the register for instant redemption - no printing, no hassle.',
      'how.4.h3':         'Everyone sees the results',
      'how.4.p':          'Stores see their campaign stats. Malls see anonymized, aggregated traffic and redemption trends. Clear, actionable, privacy-safe.',

      /* USE CASES */
      'uc.label':         'Use Cases',
      'uc.h2':            'Built for every player in the mall ecosystem',
      'uc.sub':           'Three audiences, one platform - each with a tailored experience.',
      'uc.mall.h3':       'Mall Management',
      'uc.mall.p':        'Get aggregated foot traffic data, accountability metrics, and operational controls - without ever seeing individual store campaign content.',
      'uc.mall.b1':       'Aggregated traffic and redemption dashboards',
      'uc.mall.b2':       'Accountability reporting per zone',
      'uc.mall.b3':       'Operational controls without store content access',
      'uc.mall.b4':       'Compare performance across time periods',
      'uc.store.h3':      'Stores and Retail Chains',
      'uc.store.p':       'Create and schedule targeted promotions in minutes, then track exactly how many visits and redemptions each campaign generates.',
      'uc.store.b1':      'Campaign builder with scheduling',
      'uc.store.b2':      'Real-time performance metrics',
      'uc.store.b3':      'Multi-location management for chains',
      'uc.store.b4':      'Redemption and visit attribution',
      'uc.consumer.h3':   'Consumers',
      'uc.consumer.p':    'Discover relevant deals nearby, right when you are ready to shop - no hunting through emails or clipping paper coupons.',
      'uc.consumer.b1':   'Real-time nearby offers',
      'uc.consumer.b2':   'One-tap coupon redemption',
      'uc.consumer.b3':   'Personalized deal feed',
      'uc.consumer.b4':   'No printing or sign-up friction',

      /* METRICS */
      'met.h2':           'Results you can measure',
      'met.sub':          'Track the KPIs that matter most for your business.',
      'met.note':         'Sample metrics shown below.',
      'met.1.label':      'Monthly impressions',
      'met.2.label':      'Coupon open rate',
      'met.3.label':      'Visit conversion',
      'met.4.label':      'Average campaign ROI',
      'met.disclaimer':   '* Sample metrics for illustration. Actual results will vary by location, campaign type, and sector.',

      /* PRIVACY */
      'priv.h2':          'Built for privacy',
      'priv.p':           'Privacy is not a feature we added later - it is foundational to how CoupoZ is engineered.',
      'priv.1.h':         'Aggregated only',
      'priv.1.p':         'Malls see group-level insights - no individual shopper is ever identified or tracked.',
      'priv.2.h':         'No personal data shared',
      'priv.2.p':         'Consumer identities are never shared between stores, malls, or third parties.',
      'priv.3.h':         'Consent-first',
      'priv.3.p':         'Location access is always opt-in. Shoppers control what they share and when.',

      /* FAQ */
      'faq.label':        'FAQ',
      'faq.h2':           'Common questions, clear answers',
      'faq.1.q':          'What types of businesses can use CoupoZ?',
      'faq.1.a':          'CoupoZ is designed for three groups: mall operators who want aggregated performance insights, retail stores and chains that want to create and measure promotional campaigns, and end consumers who want to discover deals near them. If you operate a physical retail space or manage a shopping centre, CoupoZ is built for you.',
      'faq.2.q':          'How does location detection work without invading privacy?',
      'faq.2.a':          'CoupoZ uses passive, on-device location signals that require explicit consumer opt-in. No personal identification is ever stored or transmitted. Mall operators and stores only ever see aggregated, anonymized data - they cannot identify or track individual shoppers at any point.',
      'faq.3.q':          'Can mall management edit a store\'s campaign content?',
      'faq.3.a':          'No. Mall management has operational controls such as activating or pausing campaigns in bulk for emergency situations - but they cannot view or edit any individual store\'s campaign content. Creative, offers, and copy remain fully controlled by each retail tenant.',
      'faq.4.q':          'How long does it take to launch a campaign?',
      'faq.4.a':          'Most campaigns can be created and scheduled in under five minutes using the CoupoZ store dashboard. No technical background is required. You set your offer details, pick a time window, choose your location scope, and hit publish - CoupoZ handles the rest automatically.',
      'faq.5.q':          'What metrics can stores and malls track?',
      'faq.5.a':          'Stores can track impressions, coupon opens, visits attributed to a campaign, and redemptions. Mall operators see aggregated versions of these metrics across zones and time periods - understanding overall mall health and which areas are most active, without any store-level detail.',
      'faq.6.q':          'Is there a free trial or pilot program?',
      'faq.6.a':          'Yes - we offer a structured pilot program for malls and retail chains that want to validate CoupoZ in their environment before committing. Reach out via the contact section below or send us a message at <a href="mailto:info@coupoz.com" class="text-brand-500 hover:underline">info@coupoz.com</a> to get started.',

      /* CONTACT */
      'contact.label':    'Get in touch',
      'contact.h2':       'Ready to activate your first campaign?',
      'contact.sub':      'No commitment needed. Tell us about your mall or store and we will show you what CoupoZ can do for you.',
      'contact.email':    'Request a demo by email',
      'contact.wa':       'Chat on WhatsApp',
      'contact.tg':       'Message on Telegram',
      'contact.line':     'Chat on Line',
      'contact.coming':   'Coming soon',
      'contact.or':       'Or email us directly at',

      /* FOOTER */
      'footer.tagline':   'Driving measurable in-mall foot traffic using time and location-based coupon activation.',
      'footer.nav':       'Navigate',
      'footer.contact':   'Contact',
      'footer.linkedin':  'LinkedIn (coming soon)',
      'footer.copy':      'All rights reserved.',
      'footer.built':     'Built for malls, stores, and shoppers.'
    },

    th: {
      /* NAV */
      'nav.problem':      'ปัญหา',
      'nav.solution':     'โซลูชัน',
      'nav.how':          'วิธีการทำงาน',
      'nav.usecases':     'กรณีการใช้งาน',
      'nav.faq':          'คำถามที่พบบ่อย',
      'nav.demo':         'ขอสาธิต',

      /* HERO */
      'hero.badge':       'การเปิดใช้งานคูปองในห้างสรรพสินค้าแบบเรียลไทม์',
      'hero.h1a':         'เปลี่ยนผู้เข้าชมห้างฯ',
      'hero.h1b':         'เป็น',
      'hero.h1c':         'ยอดขายที่วัดได้',
      'hero.h1d':         '',
      'hero.sub':         'CoupoZ ขับเคลื่อนการเข้าชมห้างสรรพสินค้าที่วัดผลได้ด้วยการเปิดใช้งานคูปองตามเวลาและตำแหน่งที่ตั้ง — มอบวิธีเชื่อมต่อที่ชาญฉลาดกว่าสำหรับห้างฯ ร้านค้า และนักช้อป',
      'hero.cta.demo':    'ขอสาธิต',
      'hero.cta.how':     'ดูวิธีการทำงาน',
      'hero.trust':       'ได้รับความไว้วางใจจากห้างสรรพสินค้าและผู้ค้าปลีก',

      /* PROBLEM */
      'prob.label':       'ปัญหา',
      'prob.h2':          'การเข้าชมมองไม่เห็น — จนกว่าจะถึงตอนนี้',
      'prob.sub':         'ห้างสรรพสินค้าและร้านค้าต่างพยายามพิสูจน์มูลค่าทางธุรกิจที่แท้จริงของโปรโมชันมาโดยตลอด ข้อมูลไม่เคยเชื่อมต่อกัน',
      'prob.1.h3':        'ไม่มี ROI ที่วัดได้',
      'prob.1.p':         'คูปองกระดาษและใบปลิวแบบดั้งเดิมไม่ให้ข้อมูลเชิงลึกใดๆ ห้างฯ ไม่สามารถบอกได้ว่าโปรโมชันใดที่ดึงดูดการเข้าชมหรือการซื้อ และร้านค้าก็พิสูจน์ไม่ได้ว่าแคมเปญของตนได้ผล',
      'prob.2.h3':        'การเปิดตัวแคมเปญช้า',
      'prob.2.p':         'การตั้งค่าแคมเปญโปรโมชันอาจใช้เวลาหลายวันหรือหลายสัปดาห์เมื่อประสานงานผ่านช่องทางสื่อสิ่งพิมพ์ ป้ายโฆษณา และอีเมล — ช้าเกินไปสำหรับสภาพแวดล้อมค้าปลีกที่เปลี่ยนแปลงอยู่เสมอ',
      'prob.3.h3':        'นักช้อปพลาดข้อเสนอ',
      'prob.3.p':         'นักช้อปเดินผ่านร้านค้าทุกวันโดยไม่รู้ว่ามีดีลที่ใช้งานอยู่ หากไม่มีการส่งข้อมูลแบบเรียลไทม์ที่รับรู้ตำแหน่ง โปรโมชันจะไม่เคยเข้าถึงคนที่ใช่ในเวลาที่ใช่',

      /* SOLUTION */
      'sol.label':        'โซลูชัน',
      'sol.h2a':          'การเปิดใช้งานแบบเรียลไทม์',
      'sol.h2b':          'ผลลัพธ์ที่วัดได้',
      'sol.p':            'CoupoZ เชื่อมต่อห้างสรรพสินค้า ร้านค้า และนักช้อปผ่านแพลตฟอร์มอัจฉริยะที่เปิดใช้งานคูปองตามเวลาและตำแหน่งที่ตั้ง — ในขณะที่นักช้อปอยู่ใกล้ๆ และพร้อมจะดำเนินการ',
      'sol.b1.h':         'เปิดตัวแคมเปญในไม่กี่นาที',
      'sol.b1.p':         'ร้านค้าสร้างและเปิดใช้งานคูปองตามกำหนดเวลาได้ทันที — ไม่ต้องการการสนับสนุนด้านไอที',
      'sol.b2.h':         'ข้อมูลเชิงลึกระดับห้างสรรพสินค้าแบบรวม',
      'sol.b2.p':         'ฝ่ายบริหารห้างฯ เห็นข้อมูลประสิทธิภาพแบบไม่ระบุตัวตนและรวมกลุ่ม — ไม่เคยเห็นเนื้อหาแคมเปญของร้านค้าแต่ละราย',
      'sol.b3.h':         'ข้อเสนอที่ใช่ ในเวลาที่ใช่',
      'sol.b3.p':         'นักช้อปค้นพบดีลเมื่ออยู่ใกล้ๆ — เปลี่ยนความตั้งใจซื้อให้เป็นการเข้าชมร้านจริง',
      'sol.badge.title':  'แคมเปญเริ่มทำงาน',
      'sol.badge.sub':    '3 นาทีที่แล้ว',

      /* HOW IT WORKS */
      'how.label':        'วิธีการทำงาน',
      'how.h2':           'สี่ขั้นตอน จากการตั้งค่าสู่การขาย',
      'how.sub':          'CoupoZ ออกแบบมาให้รวดเร็วและใช้งานง่ายสำหรับทุกคนในระบบนิเวศ',
      'how.1.h3':         'ร้านค้าสร้างแคมเปญ',
      'how.1.p':          'ผู้ค้าปลีกกำหนดข้อเสนอ เลือกช่วงเวลา และเผยแพร่ — โดยตรงจากแดชบอร์ด CoupoZ ไม่ต้องมีทักษะด้านเทคนิค',
      'how.2.h3':         'ตำแหน่งที่ตั้งเปิดใช้งานข้อเสนอ',
      'how.2.p':          'เมื่อนักช้อปเข้าสู่ห้างฯ หรือผ่านหน้าร้าน CoupoZ จะตรวจจับระยะใกล้และปลดล็อคคูปองที่เกี่ยวข้องแบบเรียลไทม์',
      'how.3.h3':         'นักช้อปแลกคูปอง',
      'how.3.p':          'ผู้บริโภคแตะเพื่อรับดีลและแสดงที่แคชเชียร์เพื่อแลกทันที — ไม่ต้องพิมพ์ ไม่ยุ่งยาก',
      'how.4.h3':         'ทุกคนเห็นผลลัพธ์',
      'how.4.p':          'ร้านค้าเห็นสถิติแคมเปญของตน ห้างฯ เห็นแนวโน้มการเข้าชมและการแลกคูปองแบบไม่ระบุตัวตนและรวมกลุ่ม ชัดเจน นำไปปฏิบัติได้ ปลอดภัยต่อความเป็นส่วนตัว',

      /* USE CASES */
      'uc.label':         'กรณีการใช้งาน',
      'uc.h2':            'สร้างมาสำหรับทุกผู้เล่นในระบบนิเวศห้างสรรพสินค้า',
      'uc.sub':           'สามกลุ่มผู้ใช้ หนึ่งแพลตฟอร์ม — แต่ละคนได้รับประสบการณ์ที่ปรับแต่งเฉพาะ',
      'uc.mall.h3':       'ฝ่ายบริหารห้างสรรพสินค้า',
      'uc.mall.p':        'รับข้อมูลการเข้าชมแบบรวมกลุ่ม เมตริกความรับผิดชอบ และการควบคุมการดำเนินงาน — โดยไม่เคยเห็นเนื้อหาแคมเปญของร้านค้าแต่ละราย',
      'uc.mall.b1':       'แดชบอร์ดการเข้าชมและการแลกคูปองแบบรวมกลุ่ม',
      'uc.mall.b2':       'รายงานความรับผิดชอบแยกตามโซน',
      'uc.mall.b3':       'การควบคุมการดำเนินงานโดยไม่เข้าถึงเนื้อหาร้านค้า',
      'uc.mall.b4':       'เปรียบเทียบประสิทธิภาพในช่วงเวลาต่างๆ',
      'uc.store.h3':      'ร้านค้าและเชนค้าปลีก',
      'uc.store.p':       'สร้างและกำหนดเวลาโปรโมชันเป้าหมายในไม่กี่นาที จากนั้นติดตามจำนวนการเข้าชมและการแลกคูปองที่แคมเปญแต่ละรายการสร้างขึ้น',
      'uc.store.b1':      'ตัวสร้างแคมเปญพร้อมระบบกำหนดเวลา',
      'uc.store.b2':      'เมตริกประสิทธิภาพแบบเรียลไทม์',
      'uc.store.b3':      'การจัดการหลายสาขาสำหรับเชน',
      'uc.store.b4':      'การระบุแหล่งที่มาของการแลกคูปองและการเข้าชม',
      'uc.consumer.h3':   'ผู้บริโภค',
      'uc.consumer.p':    'ค้นพบดีลที่เกี่ยวข้องใกล้ๆ ตอนที่คุณพร้อมจะช้อป — ไม่ต้องค้นในอีเมลหรือตัดคูปองกระดาษ',
      'uc.consumer.b1':   'ข้อเสนอใกล้ๆ แบบเรียลไทม์',
      'uc.consumer.b2':   'แลกคูปองด้วยการแตะครั้งเดียว',
      'uc.consumer.b3':   'ฟีดดีลส่วนตัว',
      'uc.consumer.b4':   'ไม่ต้องพิมพ์หรือลงทะเบียน',

      /* METRICS */
      'met.h2':           'ผลลัพธ์ที่คุณสามารถวัดได้',
      'met.sub':          'ติดตาม KPI ที่สำคัญที่สุดสำหรับธุรกิจของคุณ',
      'met.note':         'แสดงเมตริกตัวอย่างด้านล่าง',
      'met.1.label':      'ยอดแสดงผลต่อเดือน',
      'met.2.label':      'อัตราการเปิดคูปอง',
      'met.3.label':      'การแปลงการเข้าชม',
      'met.4.label':      'ROI แคมเปญเฉลี่ย',
      'met.disclaimer':   '* เมตริกตัวอย่างเพื่อการอธิบาย ผลลัพธ์จริงจะแตกต่างกันตามสถานที่ ประเภทแคมเปญ และภาคส่วน',

      /* PRIVACY */
      'priv.h2':          'สร้างมาเพื่อความเป็นส่วนตัว',
      'priv.p':           'ความเป็นส่วนตัวไม่ใช่ฟีเจอร์ที่เราเพิ่มในภายหลัง — มันเป็นรากฐานของวิธีที่ CoupoZ ถูกออกแบบ',
      'priv.1.h':         'รวมกลุ่มเท่านั้น',
      'priv.1.p':         'ห้างฯ เห็นข้อมูลเชิงลึกระดับกลุ่ม — ไม่มีนักช้อปรายบุคคลที่ถูกระบุหรือติดตาม',
      'priv.2.h':         'ไม่แบ่งปันข้อมูลส่วนบุคคล',
      'priv.2.p':         'ตัวตนของผู้บริโภคไม่เคยถูกแบ่งปันระหว่างร้านค้า ห้างฯ หรือบุคคลที่สาม',
      'priv.3.h':         'ความยินยอมมาก่อน',
      'priv.3.p':         'การเข้าถึงตำแหน่งที่ตั้งเป็นแบบเลือกเข้าร่วมเสมอ นักช้อปควบคุมสิ่งที่แบ่งปันและเมื่อไหร่',

      /* FAQ */
      'faq.label':        'คำถามที่พบบ่อย',
      'faq.h2':           'คำถามทั่วไป คำตอบที่ชัดเจน',
      'faq.1.q':          'ธุรกิจประเภทใดที่สามารถใช้ CoupoZ ได้?',
      'faq.1.a':          'CoupoZ ออกแบบมาสำหรับสามกลุ่ม: ผู้ดำเนินการห้างฯ ที่ต้องการข้อมูลเชิงลึกด้านประสิทธิภาพแบบรวมกลุ่ม ร้านค้าและเชนค้าปลีกที่ต้องการสร้างและวัดผลแคมเปญโปรโมชัน และผู้บริโภคที่ต้องการค้นพบดีลใกล้ตัว หากคุณดำเนินการพื้นที่ค้าปลีกทางกายภาพหรือบริหารศูนย์การค้า CoupoZ สร้างมาเพื่อคุณ',
      'faq.2.q':          'การตรวจจับตำแหน่งทำงานอย่างไรโดยไม่ละเมิดความเป็นส่วนตัว?',
      'faq.2.a':          'CoupoZ ใช้สัญญาณตำแหน่งแบบพาสซีฟบนอุปกรณ์ที่ต้องการการยินยอมจากผู้บริโภคอย่างชัดเจน ไม่มีการระบุตัวตนส่วนบุคคลที่ถูกจัดเก็บหรือส่งผ่าน ผู้ดำเนินการห้างฯ และร้านค้าเห็นเฉพาะข้อมูลแบบรวมกลุ่มและไม่ระบุตัวตน — ไม่สามารถระบุหรือติดตามนักช้อปรายบุคคลได้',
      'faq.3.q':          'ฝ่ายบริหารห้างฯ สามารถแก้ไขเนื้อหาแคมเปญของร้านค้าได้หรือไม่?',
      'faq.3.a':          'ไม่ได้ ฝ่ายบริหารห้างฯ มีการควบคุมการดำเนินงาน เช่น การเปิดใช้งานหรือหยุดแคมเปญเป็นกลุ่มสำหรับสถานการณ์ฉุกเฉิน — แต่ไม่สามารถดูหรือแก้ไขเนื้อหาแคมเปญของร้านค้าแต่ละรายได้ ความคิดสร้างสรรค์ ข้อเสนอ และสำเนาถูกควบคุมโดยผู้เช่าค้าปลีกแต่ละรายอย่างเต็มที่',
      'faq.4.q':          'ใช้เวลานานแค่ไหนในการเปิดตัวแคมเปญ?',
      'faq.4.a':          'แคมเปญส่วนใหญ่สามารถสร้างและกำหนดเวลาได้ในเวลาไม่ถึงห้านาทีโดยใช้แดชบอร์ดร้านค้า CoupoZ ไม่ต้องมีพื้นฐานด้านเทคนิค คุณตั้งค่ารายละเอียดข้อเสนอ เลือกช่วงเวลา เลือกขอบเขตตำแหน่ง และกดเผยแพร่ — CoupoZ จัดการส่วนที่เหลือโดยอัตโนมัติ',
      'faq.5.q':          'ร้านค้าและห้างฯ สามารถติดตามเมตริกใดได้บ้าง?',
      'faq.5.a':          'ร้านค้าสามารถติดตามยอดแสดงผล การเปิดคูปอง การเข้าชมที่เกิดจากแคมเปญ และการแลกคูปอง ผู้ดำเนินการห้างฯ เห็นเวอร์ชันรวมกลุ่มของเมตริกเหล่านี้ในโซนและช่วงเวลาต่างๆ — เข้าใจสุขภาพโดยรวมของห้างฯ และพื้นที่ที่ใช้งานมากที่สุดโดยไม่มีรายละเอียดระดับร้านค้า',
      'faq.6.q':          'มีการทดลองใช้ฟรีหรือโปรแกรมนำร่องหรือไม่?',
      'faq.6.a':          'มี — เรามีโปรแกรมนำร่องที่มีโครงสร้างสำหรับห้างสรรพสินค้าและเชนค้าปลีกที่ต้องการตรวจสอบ CoupoZ ในสภาพแวดล้อมของตนก่อนตัดสินใจ ติดต่อผ่านส่วนติดต่อด้านล่างหรือส่งข้อความถึงเราที่ <a href="mailto:info@coupoz.com" class="text-brand-500 hover:underline">info@coupoz.com</a> เพื่อเริ่มต้น',

      /* CONTACT */
      'contact.label':    'ติดต่อเรา',
      'contact.h2':       'พร้อมเปิดใช้งานแคมเปญแรกของคุณแล้วหรือยัง?',
      'contact.sub':      'ไม่มีข้อผูกมัด บอกเราเกี่ยวกับห้างฯ หรือร้านค้าของคุณ และเราจะแสดงให้คุณเห็นว่า CoupoZ สามารถทำอะไรได้บ้างสำหรับคุณ',
      'contact.email':    'ขอสาธิตทางอีเมล',
      'contact.wa':       'แชทบน WhatsApp',
      'contact.tg':       'ส่งข้อความบน Telegram',
      'contact.line':     'แชทบน Line',
      'contact.coming':   'เร็วๆ นี้',
      'contact.or':       'หรือส่งอีเมลถึงเราโดยตรงที่',

      /* FOOTER */
      'footer.tagline':   'ขับเคลื่อนการเข้าชมห้างสรรพสินค้าที่วัดผลได้ด้วยการเปิดใช้งานคูปองตามเวลาและตำแหน่งที่ตั้ง',
      'footer.nav':       'นำทาง',
      'footer.contact':   'ติดต่อ',
      'footer.linkedin':  'LinkedIn (เร็วๆ นี้)',
      'footer.copy':      'สงวนลิขสิทธิ์',
      'footer.built':     'สร้างมาสำหรับห้างฯ ร้านค้า และนักช้อป'
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
    // Persist choice
    localStorage.setItem('lang', lang);
    // Update button label
    var btn = document.getElementById('lang-toggle');
    if (btn) {
      btn.textContent = lang === 'en' ? 'ไทย' : 'EN';
      btn.setAttribute('aria-label', lang === 'en' ? 'Switch to Thai' : 'Switch to English');
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
