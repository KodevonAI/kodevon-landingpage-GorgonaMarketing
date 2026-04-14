/* ─────────────────────────────────────────
   GORGONA MARKETING — Main JS
   ───────────────────────────────────────── */

(function () {
  'use strict';

  // ── NAVBAR SCROLL ──
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });

  // ── MOBILE MENU ──
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  // Close mobile menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });

  // ── AOS LITE (scroll animations) ──
  function initAOS() {
    const elements = document.querySelectorAll('[data-aos]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('aos-animate');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    elements.forEach(el => observer.observe(el));
  }
  initAOS();

  // ── COUNTER ANIMATION ──
  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1800;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = target;
    }
    requestAnimationFrame(update);
  }

  const statNumbers = document.querySelectorAll('.stat-card__number');
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  statNumbers.forEach(el => statsObserver.observe(el));

  // ── PROJECT FILTERS ──
  const filterBtns  = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      projectCards.forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.classList.toggle('hidden', !match);
        if (match) {
          card.style.animation = 'fadeIn 0.4s ease forwards';
        }
      });
    });
  });

  // ── TESTIMONIALS CAROUSEL ──
  const track    = document.getElementById('testimonialsTrack');
  const cards    = track ? Array.from(track.children) : [];
  const prevBtn  = document.getElementById('testPrev');
  const nextBtn  = document.getElementById('testNext');
  const dotsWrap = document.getElementById('testDots');

  if (cards.length && window.innerWidth < 768) {
    // Mobile: show one card at a time
    let current = 0;

    // Create dots
    cards.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.className = 'dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    });

    function goTo(index) {
      cards.forEach((c, i) => {
        c.style.display = i === index ? 'flex' : 'none';
      });
      dotsWrap.querySelectorAll('.dot').forEach((d, i) => {
        d.classList.toggle('active', i === index);
      });
      current = index;
    }

    prevBtn && prevBtn.addEventListener('click', () => {
      goTo((current - 1 + cards.length) % cards.length);
    });
    nextBtn && nextBtn.addEventListener('click', () => {
      goTo((current + 1) % cards.length);
    });

    goTo(0);

    // Auto-advance
    setInterval(() => goTo((current + 1) % cards.length), 5000);

  } else if (dotsWrap) {
    // Desktop: just add dots as indicators
    const pairs = Math.ceil(cards.length / 2);
    for (let i = 0; i < pairs; i++) {
      const dot = document.createElement('div');
      dot.className = 'dot' + (i === 0 ? ' active' : '');
      dotsWrap.appendChild(dot);
    }
  }

  // ── CONTACT FORM ──
  const form        = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const nombre  = form.querySelector('#nombre').value.trim();
      const email   = form.querySelector('#email').value.trim();
      const mensaje = form.querySelector('#mensaje').value.trim();

      if (!nombre || !email || !mensaje) {
        // Simple validation highlight
        [form.querySelector('#nombre'), form.querySelector('#email'), form.querySelector('#mensaje')].forEach(el => {
          if (!el.value.trim()) {
            el.style.borderColor = '#ef4444';
            el.addEventListener('input', () => el.style.borderColor = '', { once: true });
          }
        });
        return;
      }

      // Simulate submission (replace with actual endpoint)
      const submitBtn = form.querySelector('[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Enviando...';

      setTimeout(() => {
        form.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Enviar mensaje <i class="fas fa-paper-plane"></i>';
        formSuccess.style.display = 'flex';
        setTimeout(() => formSuccess.style.display = 'none', 5000);
      }, 1200);
    });
  }

  // ── NEWSLETTER FOOTER ──
  const newsletterBtn = document.querySelector('.footer__newsletter button');
  const newsletterInput = document.querySelector('.footer__newsletter input');
  if (newsletterBtn && newsletterInput) {
    newsletterBtn.addEventListener('click', () => {
      if (!newsletterInput.value.trim()) return;
      newsletterBtn.textContent = '¡Suscrito!';
      newsletterInput.value = '';
      setTimeout(() => newsletterBtn.textContent = 'Suscribirse', 3000);
    });
  }

  // ── SMOOTH SCROLL (fallback for older browsers) ──
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ── CSS ANIMATION for project filter ──
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; transform: scale(0.96); }
      to   { opacity: 1; transform: scale(1); }
    }
  `;
  document.head.appendChild(style);

})();
