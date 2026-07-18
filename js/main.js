/* =============================================================
   ActIntent - main.js
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
      'nav.how':          'Platform overview',
      'nav.usecases':     'Use cases',
      'nav.faq':          'FAQ',
      'nav.demo':         'Request a demo',

      /* HERO */ // change$$$
      'hero.badge':       'Real-time offer activation for physical venues',
      'hero.h1a':         'Real-time offer activation',
      'hero.h1b':         'for',
      'hero.h1c':         'physical venues',
      'hero.h1d':         '',
      'hero.sub':         'ActIntent helps malls, retailers, hotels, restaurants and commercial venues activate nearby customer intent through time-and-location-aware offers - with measurable, privacy-conscious business insights.',
      'hero.sub2':        'Turn nearby customer intent into measurable visits and sales.',
      'hero.cta.demo':    'Request a demo',
      'hero.cta.how':     'Platform overview',
      'hero.trust':       'Trusted by malls and retailers',

      /* PROBLEM */ // change$$$
      'prob.label':       'The Problem',
      'prob.h2':          'Nearby customer intent goes unmet - until now',
      'prob.sub':         'Physical venues have always struggled to prove the real business value of promotions. The data never connects.',
      'prob.1.h3':        'Hard to measure results',
      'prob.1.p':         'Traditional print coupons and flyers offer limited visibility. Venues often struggle to connect promotional activity with business outcomes.',
      'prob.2.h3':        'Disconnected promotion operations',
      'prob.2.p':         'Print, signage, and digital channels often sit in separate workflows, making promotion operations harder to manage across venues.',
      'prob.3.h3':        'Shoppers miss offers',
      'prob.3.p':         'Shoppers walk past stores every day without knowing about relevant nearby offers. Disconnected channels make timely offer visibility difficult.',

      /* SOLUTION */ // change$$$
      'sol.label':        'The Solution',
      'sol.h2a':          'Real-time activation,',
      'sol.h2b':          'measurable results',
      'sol.p':            'ActIntent enables physical venues to activate time-and-location-aware offers - reaching nearby customers at relevant moments and providing aggregated business insights.',
      'sol.b1.h':         'Physical venue activation layer',
      'sol.b1.p':         'Supports offer activity for malls, retailers, hotels, restaurants and commercial areas.',
      'sol.b2.h':         'Relevant nearby discovery',
      'sol.b2.p':         'Helps surface relevant nearby offers while keeping detailed discovery mechanics private.',
      'sol.b3.h':         'Aggregated outcome indicators',
      'sol.b3.p':         'Supports business-facing performance indicators while keeping measurement methods private.',
      'sol.b4.h':         'AI-assisted campaign support',
      'sol.b4.p':         'Support for campaign wording, offer content, creative enhancement and future recommendation workflows - designed to help business users move faster while keeping product details private.',
      'sol.badge.title':  'Venue-ready',
      'sol.badge.sub':    'Demo available',

      /* PLATFORM OVERVIEW */ // change$$$
      'how.label':        'Platform overview',
      'how.h2':           'A business-facing activation platform for physical venues',
      'how.sub':          'This page keeps detailed product workflows private for NDA discussions.',
      'how.1.h3':         'Physical venue focus',
      'how.1.p':          'Built for malls, retail environments, hotels, restaurants and commercial areas.',
      'how.2.h3':         'Offer activation layer',
      'how.2.p':          'Supports structured offer activity for venue and business teams without exposing operational workflows publicly.',
      'how.3.h3':         'Customer experience layer',
      'how.3.p':          'Designed to make nearby offers easy to discover without publishing customer-flow mechanics.',
      'how.4.h3':         'Aggregated outcome visibility',
      'how.4.p':          'Business reporting focuses on aggregated outcome indicators, with detailed measurement discussions handled under NDA.',

      /* USE CASES */ // change$$$
      'uc.label':         'Use Cases',
      'uc.h2':            'Built for physical venues and the teams that run them',
      'uc.sub':           'Multiple audience types, one platform - each with a tailored experience.',
      'uc.mall.h3':       'Malls & Commercial Venues',
      'uc.mall.p':        'A venue-level view of business performance, operational readiness, and tenant support needs.',
      'uc.mall.b1':       'Aggregated venue indicators',
      'uc.mall.b2':       'Business performance summaries',
      'uc.mall.b3':       'Operational support visibility',
      'uc.mall.b4':       'Compare performance across time periods',
      'uc.store.h3':      'Stores and Retail Chains',
      'uc.store.p':       'Support structured offer activity while keeping detailed workflows private until product discussions.',
      'uc.store.b1':      'Offer content support',
      'uc.store.b2':      'Aggregated performance insights',
      'uc.store.b3':      'Business group support',
      'uc.store.b4':      'Aggregated outcome indicators',
      'uc.consumer.h3':   'Consumers',
      'uc.consumer.p':    'A simple way for customers to discover relevant nearby offers without relying on paper coupons.',
      'uc.consumer.b1':   'Relevant nearby offers',
      'uc.consumer.b2':   'Simple customer experience',
      'uc.consumer.b3':   'Privacy-conscious discovery',
      'uc.consumer.b4':   'No paper coupon dependency',
      'uc.hotel.h3':      'Hotels & Hospitality',
      'uc.hotel.p':       'Support offer visibility for hospitality venues and partner experiences without publishing detailed workflows.',
      'uc.hotel.b1':      'Guest and visitor offer visibility',
      'uc.hotel.b2':      'Hospitality venue support',
      'uc.hotel.b3':      'Partner experience support',
      'uc.hotel.b4':      'Aggregated performance insights',

      /* METRICS */ // change$$$
      'met.h2':           'What you can measure',
      'met.sub':          'Track the business performance indicators that matter for your venue.',
      'met.note':         '',
      'met.1.label':      'Offer reach and visibility',
      'met.2.label':      'Customer engagement',
      'met.3.label':      'Aggregated outcome indicators',
      'met.4.label':      'Aggregated business performance',
      'met.disclaimer':   '',

      /* PRIVACY */ // change$$$
      'priv.h2':          'Built for privacy',
      'priv.p':           'Location access is consent-based. Business reporting is designed around aggregated insights, with detailed privacy and data-processing terms handled in commercial/legal documentation.',
      'priv.1.h':         'Consent-based location access',
      'priv.1.p':         'Location access is consent-based.',
      'priv.2.h':         'Aggregated business reporting',
      'priv.2.p':         'Business reporting is designed around aggregated insights.',
      'priv.3.h':         'Commercial and legal documentation',
      'priv.3.p':         'Detailed privacy and data-processing terms are handled in commercial/legal documentation.',

      /* FAQ */ // change$$$
      'faq.label':        'FAQ',
      'faq.h2':           'Common questions, clear answers',
      'faq.1.q':          'What types of businesses can use ActIntent?',
      'faq.1.a':          'ActIntent is designed for physical venue operators and businesses - including malls and commercial areas, retail stores and chains, hotels and hospitality venues, restaurants, and end consumers who want to discover nearby offers. If you operate or manage a physical venue where customer engagement matters, ActIntent is built for you.',
      'faq.2.q':          'How does ActIntent approach privacy?',
      'faq.2.a':          'Location access is consent-based. Business reporting is designed around aggregated insights, with detailed privacy and data-processing terms handled in commercial/legal documentation.',
      'faq.3.q':          'How are venue and business roles separated?',
      'faq.3.a':          'ActIntent is designed with separate role boundaries for venue operators and business users. Detailed permission models and operational controls are covered under NDA.',
      'faq.4.q':          'Where can we discuss setup and workflow details?',
      'faq.4.a':          'Detailed setup, onboarding, and operational workflow information is available in product discussions under NDA.',
      'faq.5.q':          'What metrics can stores and malls track?',
      'faq.5.a':          'Business users can review aggregated outcome indicators and performance summaries. Detailed reporting capabilities are covered in product discussions under NDA.',
      'faq.6.q':          'Is there a free trial or pilot program?',
      'faq.6.a':          'We support structured pilot discussions for selected physical venues and commercial partners. Pilot scope, commercial terms and operational details are discussed directly.',
      'faq.7.q':          'How does AI fit into ActIntent?',
      'faq.7.a':          'ActIntent is designed to support AI-assisted campaign creation, offer wording, image/content optimisation and future business recommendation workflows. The public site intentionally keeps AI architecture, model choices, data flows and automation logic private. Detailed AI capability discussions are available under NDA.',

      /* CONTACT */ // change$$$
      'contact.label':    'Get in touch',
      'contact.h2':       'Ready to learn more about ActIntent?',
      'contact.sub':      'Detailed product discussions and demos are available under NDA.',
      'contact.email':    'Request a demo by email',
      'contact.or':       'Or email us directly at',

      /* FOOTER */ // change$$$
      'footer.tagline':   'Real-time offer activation for physical venues - malls, retailers, hotels, restaurants and commercial areas.',
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
      'nav.how':          'ภาพรวมแพลตฟอร์ม',
      'nav.usecases':     'กรณีการใช้งาน',
      'nav.faq':          'คำถามที่พบบ่อย',
      'nav.demo':         'ขอสาธิต',

      /* HERO */ // change$$$
      'hero.badge':       'การเปิดใช้งานข้อเสนอแบบเรียลไทม์สำหรับสถานที่เชิงพาณิชย์',
      'hero.h1a':         'การเปิดใช้งานข้อเสนอแบบเรียลไทม์',
      'hero.h1b':         'สำหรับ',
      'hero.h1c':         'สถานที่เชิงพาณิชย์',
      'hero.h1d':         '',
      'hero.sub':         'ActIntent ช่วยห้างสรรพสินค้า ผู้ค้าปลีก โรงแรม ร้านอาหาร และสถานที่เชิงพาณิชย์เปิดใช้งานความตั้งใจซื้อของลูกค้าใกล้เคียงผ่านข้อเสนอที่รับรู้เวลาและตำแหน่ง - พร้อมข้อมูลเชิงลึกทางธุรกิจที่วัดได้และใส่ใจความเป็นส่วนตัว',
      'hero.sub2':        'เปลี่ยนความตั้งใจซื้อของลูกค้าใกล้เคียงให้เป็นการเข้าชมและยอดขายที่วัดได้',
      'hero.cta.demo':    'ขอสาธิต',
      'hero.cta.how':     'ภาพรวมแพลตฟอร์ม',
      'hero.trust':       'ได้รับความไว้วางใจจากห้างสรรพสินค้าและผู้ค้าปลีก',

      /* PROBLEM */ // change$$$
      'prob.label':       'ปัญหา',
      'prob.h2':          'ความตั้งใจซื้อของลูกค้าใกล้เคียงถูกมองข้าม - จนกว่าจะถึงตอนนี้',
      'prob.sub':         'สถานที่เชิงพาณิชย์มักพยายามพิสูจน์มูลค่าทางธุรกิจที่แท้จริงของโปรโมชันมาโดยตลอด ข้อมูลไม่เคยเชื่อมต่อกัน',
      'prob.1.h3':        'วัดผลลัพธ์ได้ยาก',
      'prob.1.p':         'คูปองกระดาษและใบปลิวแบบดั้งเดิมให้การมองเห็นที่จำกัด สถานที่มักเชื่อมโยงกิจกรรมโปรโมชันกับผลลัพธ์ทางธุรกิจได้ยาก',
      'prob.2.h3':        'การดำเนินงานโปรโมชันกระจัดกระจาย',
      'prob.2.p':         'สื่อสิ่งพิมพ์ ป้ายโฆษณา และช่องทางดิจิทัลมักอยู่คนละกระบวนการ ทำให้การดำเนินงานโปรโมชันในหลายสถานที่จัดการได้ยากขึ้น',
      'prob.3.h3':        'นักช้อปพลาดข้อเสนอ',
      'prob.3.p':         'นักช้อปเดินผ่านร้านค้าทุกวันโดยไม่รู้ว่ามีข้อเสนอใกล้ตัวที่เกี่ยวข้อง ช่องทางที่กระจัดกระจายทำให้การมองเห็นข้อเสนอในเวลาที่เหมาะสมทำได้ยาก',

      /* SOLUTION */ // change$$$
      'sol.label':        'โซลูชัน',
      'sol.h2a':          'การเปิดใช้งานแบบเรียลไทม์',
      'sol.h2b':          'ผลลัพธ์ที่วัดได้',
      'sol.p':            'ActIntent ช่วยให้สถานที่เชิงพาณิชย์เปิดใช้งานข้อเสนอที่รับรู้เวลาและตำแหน่ง - เข้าถึงลูกค้าใกล้เคียงในช่วงเวลาที่เกี่ยวข้องและมอบข้อมูลเชิงลึกทางธุรกิจแบบรวม',
      'sol.b1.h':         'ชั้นการเปิดใช้งานสำหรับสถานที่จริง',
      'sol.b1.p':         'รองรับกิจกรรมข้อเสนอสำหรับห้างสรรพสินค้า ผู้ค้าปลีก โรงแรม ร้านอาหาร และพื้นที่เชิงพาณิชย์',
      'sol.b2.h':         'การค้นพบข้อเสนอใกล้ตัวที่เกี่ยวข้อง',
      'sol.b2.p':         'ช่วยแสดงข้อเสนอใกล้ตัวที่เกี่ยวข้อง พร้อมเก็บรายละเอียดกลไกการค้นพบไว้เป็นข้อมูลส่วนตัว',
      'sol.b3.h':         'ตัวชี้วัดผลลัพธ์แบบรวม',
      'sol.b3.p':         'รองรับตัวชี้วัดประสิทธิภาพสำหรับธุรกิจ พร้อมเก็บวิธีการวัดผลไว้เป็นข้อมูลส่วนตัว',
      'sol.b4.h':         'การสนับสนุนแคมเปญด้วย AI',
      'sol.b4.p':         'รองรับการเขียนข้อความแคมเปญ เนื้อหาข้อเสนอ การปรับปรุงครีเอทีฟ และเวิร์กโฟลว์คำแนะนำในอนาคต - ออกแบบมาเพื่อช่วยให้ผู้ใช้งานธุรกิจทำงานได้เร็วขึ้น โดยยังคงเก็บรายละเอียดผลิตภัณฑ์ไว้เป็นข้อมูลส่วนตัว',
      'sol.badge.title':  'พร้อมสำหรับสถานที่',
      'sol.badge.sub':    'ขอสาธิตได้',

      /* PLATFORM OVERVIEW */ // change$$$
      'how.label':        'ภาพรวมแพลตฟอร์ม',
      'how.h2':           'แพลตฟอร์มการเปิดใช้งานสำหรับธุรกิจในสถานที่เชิงพาณิชย์',
      'how.sub':          'หน้านี้เก็บรายละเอียดเวิร์กโฟลว์ผลิตภัณฑ์ไว้สำหรับการพูดคุยภายใต้ NDA',
      'how.1.h3':         'โฟกัสสถานที่จริง',
      'how.1.p':          'สร้างมาสำหรับห้างสรรพสินค้า สภาพแวดล้อมค้าปลีก โรงแรม ร้านอาหาร และพื้นที่เชิงพาณิชย์',
      'how.2.h3':         'ชั้นการเปิดใช้งานข้อเสนอ',
      'how.2.p':          'รองรับกิจกรรมข้อเสนอที่มีโครงสร้างสำหรับทีมสถานที่และทีมธุรกิจ โดยไม่เปิดเผยเวิร์กโฟลว์การดำเนินงานต่อสาธารณะ',
      'how.3.h3':         'ชั้นประสบการณ์ลูกค้า',
      'how.3.p':          'ออกแบบมาให้ข้อเสนอใกล้ตัวค้นพบได้ง่าย โดยไม่เผยแพร่กลไกการใช้งานของลูกค้า',
      'how.4.h3':         'การมองเห็นผลลัพธ์แบบรวม',
      'how.4.p':          'การรายงานธุรกิจมุ่งเน้นตัวชี้วัดผลลัพธ์แบบรวม โดยมีการพูดคุยรายละเอียดการวัดผลภายใต้ NDA',

      /* USE CASES */ // change$$$
      'uc.label':         'กรณีการใช้งาน',
      'uc.h2':            'สร้างมาสำหรับสถานที่เชิงพาณิชย์และทีมที่บริหารจัดการ',
      'uc.sub':           'หลากหลายกลุ่มผู้ใช้ หนึ่งแพลตฟอร์ม - แต่ละกลุ่มได้รับประสบการณ์ที่ปรับแต่งเฉพาะ',
      'uc.mall.h3':       'ห้างสรรพสินค้าและพื้นที่เชิงพาณิชย์',
      'uc.mall.p':        'มุมมองระดับสถานที่ของประสิทธิภาพทางธุรกิจ ความพร้อมในการดำเนินงาน และความต้องการสนับสนุนผู้เช่า',
      'uc.mall.b1':       'ตัวชี้วัดสถานที่แบบรวม',
      'uc.mall.b2':       'สรุปประสิทธิภาพทางธุรกิจ',
      'uc.mall.b3':       'การมองเห็นการสนับสนุนการดำเนินงาน',
      'uc.mall.b4':       'เปรียบเทียบประสิทธิภาพในช่วงเวลาต่างๆ',
      'uc.store.h3':      'ร้านค้าและเชนค้าปลีก',
      'uc.store.p':       'รองรับกิจกรรมข้อเสนอที่มีโครงสร้าง พร้อมเก็บเวิร์กโฟลว์โดยละเอียดไว้สำหรับการพูดคุยผลิตภัณฑ์',
      'uc.store.b1':      'การสนับสนุนเนื้อหาข้อเสนอ',
      'uc.store.b2':      'ข้อมูลเชิงลึกประสิทธิภาพแบบรวม',
      'uc.store.b3':      'การสนับสนุนกลุ่มธุรกิจ',
      'uc.store.b4':      'ตัวชี้วัดผลลัพธ์แบบรวม',
      'uc.consumer.h3':   'ผู้บริโภค',
      'uc.consumer.p':    'วิธีง่ายๆ สำหรับลูกค้าในการค้นพบข้อเสนอใกล้ตัวที่เกี่ยวข้องโดยไม่ต้องพึ่งคูปองกระดาษ',
      'uc.consumer.b1':   'ข้อเสนอใกล้ตัวที่เกี่ยวข้อง',
      'uc.consumer.b2':   'ประสบการณ์ลูกค้าที่เรียบง่าย',
      'uc.consumer.b3':   'การค้นพบที่ใส่ใจความเป็นส่วนตัว',
      'uc.consumer.b4':   'ไม่ต้องพึ่งคูปองกระดาษ',
      'uc.hotel.h3':      'โรงแรมและการบริการ',
      'uc.hotel.p':       'รองรับการมองเห็นข้อเสนอสำหรับสถานที่บริการและประสบการณ์พันธมิตร โดยไม่เผยแพร่เวิร์กโฟลว์โดยละเอียด',
      'uc.hotel.b1':      'การมองเห็นข้อเสนอสำหรับแขกและผู้เยี่ยมชม',
      'uc.hotel.b2':      'การสนับสนุนสถานที่บริการ',
      'uc.hotel.b3':      'การสนับสนุนประสบการณ์พันธมิตร',
      'uc.hotel.b4':      'ข้อมูลเชิงลึกด้านประสิทธิภาพแบบรวม',

      /* METRICS */ // change$$$
      'met.h2':           'สิ่งที่คุณสามารถวัดได้',
      'met.sub':          'ติดตามตัวชี้วัดประสิทธิภาพทางธุรกิจที่สำคัญสำหรับสถานที่ของคุณ',
      'met.note':         '',
      'met.1.label':      'การเข้าถึงข้อเสนอและการมองเห็น',
      'met.2.label':      'การมีส่วนร่วมของลูกค้า',
      'met.3.label':      'ตัวชี้วัดผลลัพธ์แบบรวม',
      'met.4.label':      'ประสิทธิภาพธุรกิจแบบรวม',
      'met.disclaimer':   '',

      /* PRIVACY */ // change$$$
      'priv.h2':          'สร้างมาเพื่อความเป็นส่วนตัว',
      'priv.p':           'การเข้าถึงตำแหน่งที่ตั้งเป็นไปตามความยินยอม การรายงานธุรกิจออกแบบรอบข้อมูลเชิงลึกแบบรวม โดยมีรายละเอียดความเป็นส่วนตัวและข้อกำหนดการประมวลผลข้อมูลจัดการผ่านเอกสารเชิงพาณิชย์และกฎหมาย',
      'priv.1.h':         'การเข้าถึงตำแหน่งที่ตั้งตามความยินยอม',
      'priv.1.p':         'การเข้าถึงตำแหน่งที่ตั้งเป็นไปตามความยินยอม',
      'priv.2.h':         'การรายงานธุรกิจแบบรวม',
      'priv.2.p':         'การรายงานธุรกิจออกแบบรอบข้อมูลเชิงลึกแบบรวม',
      'priv.3.h':         'เอกสารเชิงพาณิชย์และกฎหมาย',
      'priv.3.p':         'รายละเอียดความเป็นส่วนตัวและข้อกำหนดการประมวลผลข้อมูลจัดการผ่านเอกสารเชิงพาณิชย์และกฎหมาย',

      /* FAQ */ // change$$$
      'faq.label':        'คำถามที่พบบ่อย',
      'faq.h2':           'คำถามทั่วไป คำตอบที่ชัดเจน',
      'faq.1.q':          'ธุรกิจประเภทใดที่สามารถใช้ ActIntent ได้?',
      'faq.1.a':          'ActIntent ออกแบบมาสำหรับผู้ดำเนินการสถานที่เชิงพาณิชย์และธุรกิจ - รวมถึงห้างสรรพสินค้าและพื้นที่เชิงพาณิชย์ ร้านค้าและเชนค้าปลีก โรงแรมและสถานที่บริการ ร้านอาหาร และผู้บริโภคที่ต้องการค้นพบข้อเสนอใกล้ตัว หากคุณดำเนินการหรือบริหารสถานที่เชิงพาณิชย์ที่การมีส่วนร่วมของลูกค้ามีความสำคัญ ActIntent สร้างมาเพื่อคุณ',
      'faq.2.q':          'ActIntent มีแนวทางด้านความเป็นส่วนตัวอย่างไร?',
      'faq.2.a':          'การเข้าถึงตำแหน่งที่ตั้งเป็นไปตามความยินยอม การรายงานธุรกิจออกแบบรอบข้อมูลเชิงลึกแบบรวม โดยมีรายละเอียดความเป็นส่วนตัวและข้อกำหนดการประมวลผลข้อมูลจัดการผ่านเอกสารเชิงพาณิชย์และกฎหมาย',
      'faq.3.q':          'บทบาทของสถานที่และธุรกิจแยกจากกันอย่างไร?',
      'faq.3.a':          'ActIntent ออกแบบให้มีขอบเขตบทบาทแยกกันสำหรับผู้ดำเนินการสถานที่และผู้ใช้งานธุรกิจ รายละเอียดโมเดลสิทธิ์และการควบคุมการดำเนินงานครอบคลุมภายใต้ NDA',
      'faq.4.q':          'เราจะพูดคุยรายละเอียดการตั้งค่าและเวิร์กโฟลว์ได้ที่ไหน?',
      'faq.4.a':          'ข้อมูลการตั้งค่า การเริ่มต้นใช้งาน และเวิร์กโฟลว์การดำเนินงานโดยละเอียดมีให้ในการพูดคุยเกี่ยวกับผลิตภัณฑ์ภายใต้ NDA',
      'faq.5.q':          'ร้านค้าและห้างฯ สามารถติดตามเมตริกใดได้บ้าง?',
      'faq.5.a':          'ผู้ใช้งานธุรกิจสามารถดูตัวชี้วัดผลลัพธ์แบบรวมและสรุปประสิทธิภาพ ความสามารถในการรายงานโดยละเอียดครอบคลุมในการพูดคุยเกี่ยวกับผลิตภัณฑ์ภายใต้ NDA',
      'faq.6.q':          'มีการทดลองใช้ฟรีหรือโปรแกรมนำร่องหรือไม่?',
      'faq.6.a':          'เรารองรับการพูดคุยนำร่องที่มีโครงสร้างสำหรับสถานที่จริงและพันธมิตรเชิงพาณิชย์ที่คัดเลือก ขอบเขตนำร่อง เงื่อนไขเชิงพาณิชย์ และรายละเอียดการดำเนินงานจะพูดคุยกันโดยตรง',
      'faq.7.q':          'AI เข้ากับ ActIntent อย่างไร?',
      'faq.7.a':          'ActIntent ออกแบบมาเพื่อรองรับการสร้างแคมเปญด้วย AI การเขียนข้อความข้อเสนอ การปรับแต่งรูปภาพ/เนื้อหา และเวิร์กโฟลว์คำแนะนำทางธุรกิจในอนาคต เว็บไซต์สาธารณะตั้งใจเก็บสถาปัตยกรรม AI ตัวเลือกโมเดล กระแสข้อมูล และตรรกะอัตโนมัติไว้เป็นข้อมูลส่วนตัว การพูดคุยรายละเอียดความสามารถด้าน AI มีให้ภายใต้ NDA',

      /* CONTACT */ // change$$$
      'contact.label':    'ติดต่อเรา',
      'contact.h2':       'พร้อมเรียนรู้เพิ่มเติมเกี่ยวกับ ActIntent แล้วหรือยัง?',
      'contact.sub':      'การพูดคุยเกี่ยวกับผลิตภัณฑ์โดยละเอียดและการสาธิตมีให้บริการภายใต้ NDA',
      'contact.email':    'ขอสาธิตทางอีเมล',
      'contact.or':       'หรือส่งอีเมลถึงเราโดยตรงที่',

      /* FOOTER */ // change$$$
      'footer.tagline':   'การเปิดใช้งานข้อเสนอแบบเรียลไทม์สำหรับสถานที่เชิงพาณิชย์ - ห้างสรรพสินค้า ผู้ค้าปลีก โรงแรม ร้านอาหาร และพื้นที่เชิงพาณิชย์',
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
