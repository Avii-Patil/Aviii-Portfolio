/* ============================================================
   PORTFOLIO — main.js
   Features: Preloader, Custom Cursor, Typewriter, Particles,
   Counters, Skills Filter, Projects Filter, Timeline,
   Testimonials Slider, Scroll Animations, Theme Toggle,
   Contact Form, Navbar Scroll, Scroll To Top
   ============================================================ */

/* ============================================================
   1. PRELOADER
============================================================ */
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add('hidden');
      // Trigger AOS after preloader
      AOS.refresh();
    }, 1900);
  }
});

/* ============================================================
   2. AOS — SCROLL ANIMATIONS
============================================================ */
AOS.init({
  duration: 700,
  easing: 'ease-out-quart',
  once: true,
  offset: 60
});

/* ============================================================
   3. CUSTOM CURSOR
============================================================ */
const dot = document.getElementById('cursor-dot');
const outline = document.getElementById('cursor-outline');

if (dot && outline && window.matchMedia('(pointer: fine)').matches) {
  let mouseX = 0, mouseY = 0;
  let outX = 0, outY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
  });

  // Smooth outline follow
  const animateCursor = () => {
    outX += (mouseX - outX) * 0.12;
    outY += (mouseY - outY) * 0.12;
    outline.style.left = outX + 'px';
    outline.style.top = outY + 'px';
    requestAnimationFrame(animateCursor);
  };
  animateCursor();

  // Hover effects
  const hoverEls = document.querySelectorAll('a, button, .skill-card, .project-card, .cert-card, .blog-card, .filter-btn');
  hoverEls.forEach(el => {
    el.addEventListener('mouseenter', () => outline.classList.add('hovered'));
    el.addEventListener('mouseleave', () => outline.classList.remove('hovered'));
  });
}

/* ============================================================
   4. NAVBAR — Scroll Shrink + Active Link Highlight
============================================================ */
const mainNav = document.getElementById('mainNav');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  // Shrink navbar
  if (window.scrollY > 60) {
    mainNav.classList.add('scrolled');
  } else {
    mainNav.classList.remove('scrolled');
  }

  // Active link highlight
  let current = '';
  sections.forEach(sec => {
    const sectionTop = sec.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = sec.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active-link');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active-link');
    }
  });

  // Scroll to top button
  const scrollTopBtn = document.getElementById('scrollTop');
  if (scrollTopBtn) {
    if (window.scrollY > 500) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }
});

// Scroll to top click
const scrollTopBtn = document.getElementById('scrollTop');
if (scrollTopBtn) {
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ============================================================
   5. THEME TOGGLE
============================================================ */

// For 2 Themes JS
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const html = document.documentElement;

// Load saved theme
const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
html.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle && themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('portfolio-theme', next);
  updateThemeIcon(next);
});

function updateThemeIcon(theme) {
  if (!themeIcon) return;
  themeIcon.className = theme === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-fill';
}





/* ============================================================
   6. TYPEWRITER EFFECT
   EDIT: Change the roles array to your own roles
============================================================ */
const typewriterEl = document.getElementById('typewriter');
// EDIT: Replace these strings with your own roles/skills
const roles = [
  'scalable web apps.',
  'beautiful UIs.',
  'dynamic websites.',
  'real world problem solutions.',
  'products people love.'
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWrite() {
  if (!typewriterEl) return;
  const current = roles[roleIndex];

  if (isDeleting) {
    typewriterEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typewriterEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  let delay = isDeleting ? 60 : 100;

  if (!isDeleting && charIndex === current.length) {
    delay = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    delay = 400;
  }

  setTimeout(typeWrite, delay);
}
setTimeout(typeWrite, 1000);

/* ============================================================
   7. PARTICLES BACKGROUND (tsParticles)
============================================================ */
if (typeof tsParticles !== 'undefined') {
  tsParticles.load('particles-canvas', {
    fullScreen: { enable: false },
    background: { color: { value: 'transparent' } },
    fpsLimit: 60,
    particles: {
      number: { value: 60, density: { enable: true, area: 900 } },
      color: { value: '#e94560' },
      shape: { type: 'circle' },
      opacity: { value: 0.15, random: true },
      size: { value: { min: 1, max: 3 } },
      links: {
        enable: true,
        distance: 130,
        color: '#e94560',
        opacity: 0.08,
        width: 1
      },
      move: {
        enable: true,
        speed: 0.8,
        direction: 'none',
        random: true,
        outModes: { default: 'bounce' }
      }
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: 'grab' },
        onClick: { enable: true, mode: 'push' }
      },
      modes: {
        grab: { distance: 140, links: { opacity: 0.3 } },
        push: { quantity: 2 }
      }
    },
    detectRetina: true
  });
}

/* ============================================================
   8. ANIMATED COUNTERS
============================================================ */
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-count'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        counter.textContent = target;
        clearInterval(timer);
      } else {
        counter.textContent = Math.floor(current);
      }
    }, 16);
  });
}

// Trigger counters when stats section is visible
const statsSection = document.getElementById('stats');
if (statsSection) {
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        counterObserver.disconnect();
      }
    });
  }, { threshold: 0.4 });
  counterObserver.observe(statsSection);
}

/* ============================================================
   9. SKILLS FILTER + PROGRESS BARS
============================================================ */
const skillFilterBtns = document.querySelectorAll('.filter-btn[data-filter]');
const skillCards = document.querySelectorAll('.skill-card');

skillFilterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    skillFilterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');
    skillCards.forEach(card => {
      const cat = card.getAttribute('data-category');
      if (filter === 'all' || cat === filter) {
        card.classList.remove('hidden');
        card.style.animation = 'none';
        requestAnimationFrame(() => {
          card.style.animation = '';
        });
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// Animate skill bars on scroll into view
const skillsSection = document.getElementById('skills');
if (skillsSection) {
  const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll('.skill-fill').forEach(bar => {
          bar.style.width = bar.getAttribute('data-width') + '%';
        });
        skillsObserver.disconnect();
      }
    });
  }, { threshold: 0.2 });
  skillsObserver.observe(skillsSection);
}

/* ============================================================
   10. PROJECTS FILTER
============================================================ */
const projFilterBtns = document.querySelectorAll('.filter-btn[data-project-filter]');
const projectItems = document.querySelectorAll('.project-item');

projFilterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    projFilterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-project-filter');
    projectItems.forEach(item => {
      const cat = item.getAttribute('data-project-category');
      if (filter === 'all' || cat === filter) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    });
  });
});

/* ============================================================
   11. TESTIMONIALS SLIDER
============================================================ */
const track = document.getElementById('testimonialsTrack');
const dotsContainer = document.getElementById('tDots');
const prevBtn = document.getElementById('tPrev');
const nextBtn = document.getElementById('tNext');

if (track && dotsContainer) {
  const cards = track.querySelectorAll('.testimonial-card');
  let currentIndex = 0;
  let itemsVisible = getVisibleCount();
  let autoSlideTimer;

  function getVisibleCount() {
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 992) return 2;
    return 3;
  }

  function buildDots() {
    dotsContainer.innerHTML = '';
    const totalDots = Math.max(1, cards.length - itemsVisible + 1);
    for (let i = 0; i < totalDots; i++) {
      const dot = document.createElement('div');
      dot.className = 't-dot' + (i === currentIndex ? ' active' : '');
      dot.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(dot);
    }
  }

  function goTo(index) {
    const maxIndex = Math.max(0, cards.length - itemsVisible);
    currentIndex = Math.max(0, Math.min(index, maxIndex));
    const cardWidth = cards[0].offsetWidth + 24; // 24 = gap
    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

    document.querySelectorAll('.t-dot').forEach((d, i) => {
      d.classList.toggle('active', i === currentIndex);
    });
  }

  function startAutoSlide() {
    autoSlideTimer = setInterval(() => {
      const maxIndex = Math.max(0, cards.length - itemsVisible);
      goTo(currentIndex >= maxIndex ? 0 : currentIndex + 1);
    }, 4000);
  }

  function stopAutoSlide() { clearInterval(autoSlideTimer); }

  prevBtn && prevBtn.addEventListener('click', () => {
    stopAutoSlide();
    goTo(currentIndex - 1);
    startAutoSlide();
  });

  nextBtn && nextBtn.addEventListener('click', () => {
    stopAutoSlide();
    goTo(currentIndex + 1);
    startAutoSlide();
  });

  window.addEventListener('resize', () => {
    itemsVisible = getVisibleCount();
    buildDots();
    goTo(Math.min(currentIndex, Math.max(0, cards.length - itemsVisible)));
  });

  buildDots();
  startAutoSlide();
}

/* ============================================================
   12. CONTACT FORM
   ============================================================
   By default this is a demo (shows success after 1.5s).
   To make it real, choose ONE of these options:

   OPTION A - Formspree:
     1. Sign up at formspree.io
     2. Get your form ID
     3. Change form action to: https://formspree.io/f/YOUR_FORM_ID
     4. Change form method to: POST
     5. Remove the fetch() block below, keep the button state logic

   OPTION B - EmailJS (no backend needed):
     1. Sign up at emailjs.com
     2. Create a service + template
     3. Set the 3 constants below
     4. Uncomment the EmailJS block

   OPTION C - Netlify Forms:
     1. Deploy to Netlify
     2. Add netlify attribute to <form> tag
============================================================ */

// EDIT if using EmailJS:
const EMAILJS_PUBLIC_KEY = '0Ty1YH5juLkffoxMX';
const EMAILJS_SERVICE_ID = 'service_Avi_Portfolio';
const EMAILJS_TEMPLATE_ID = 'template_ldlcrh8';

const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const btnText = document.getElementById('btnText');
const btnLoading = document.getElementById('btnLoading');
const formSuccess = document.getElementById('formSuccess');
const formError = document.getElementById('formError');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Show loading
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline-flex';
    submitBtn.disabled = true;
    formSuccess.classList.add('d-none');
    formError.classList.add('d-none');

    // /* ---- DEMO MODE (remove this block when using real backend) ---- */
    // setTimeout(() => {
    //   btnText.style.display = 'inline-flex';
    //   btnLoading.style.display = 'none';
    //   submitBtn.disabled = false;
    //   formSuccess.classList.remove('d-none');
    //   contactForm.reset();
    // }, 1500);
    // /* ---- END DEMO MODE ---- */

    //  ---- UNCOMMENT for EMAILJS ----
    try {
      await emailjs.init(EMAILJS_PUBLIC_KEY);
      await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, contactForm);
      btnText.style.display = 'inline-flex';
      btnLoading.style.display = 'none';
      submitBtn.disabled = false;
      formSuccess.classList.remove('d-none');
      contactForm.reset();
    } catch (err) {
      btnText.style.display = 'inline-flex';
      btnLoading.style.display = 'none';
      submitBtn.disabled = false;
      formError.classList.remove('d-none');
      console.error('EmailJS error:', err);
    }
    //  ---- END EMAILJS ---- 
  });
}

/* ============================================================
   13. SMOOTH SCROLL for anchor links
============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const targetId = anchor.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
      // Close mobile nav
      const navCollapse = document.getElementById('navMenu');
      if (navCollapse && navCollapse.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
        bsCollapse && bsCollapse.hide();
      }
    }
  });
});

/* ============================================================
   14. LAZY LOAD IMAGES
============================================================ */
if ('IntersectionObserver' in window) {
  const imgObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        imgObserver.unobserve(img);
      }
    });
  }, { rootMargin: '0px 0px 200px 0px' });

  document.querySelectorAll('img[data-src]').forEach(img => imgObserver.observe(img));
}

/* ============================================================
   END OF main.js
============================================================ */
