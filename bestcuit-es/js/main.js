/* BESTCUIT — Shared JS */

// Parallax scrolling effect
const parallaxElements = document.querySelectorAll('[data-parallax]');
if (parallaxElements.length) {
  window.addEventListener('scroll', () => {
    parallaxElements.forEach(el => {
      const speed = el.dataset.parallax || 0.5;
      el.style.transform = `translateY(${window.scrollY * speed}px)`;
    });
  });
}

// Nav scroll behavior
const nav = document.querySelector('.nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  });
}

// Stagger children
document.querySelectorAll('[data-stagger]').forEach(parent => {
  Array.from(parent.children).forEach((child, i) => {
    child.dataset.delay = i * 15;
    child.classList.add('reveal');
  });
});

// Reveal on scroll with advanced effects
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-zoom, .reveal-blur');
if (revealEls.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        const baseDelay = parseInt(entry.target.dataset.staggerDelay || 0);
        setTimeout(() => {
          entry.target.classList.add('revealed');
          
        }, delay + baseDelay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => observer.observe(el));
}

// Smooth scroll reveal with momentum
window.addEventListener('scroll', () => {
  const scrollProgress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
  // Can be used for subtle background changes or animations
  document.documentElement.style.setProperty('--scroll-progress', scrollProgress);
}, { passive: true });

// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (toggle && navLinks) {
  toggle.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? '' : 'flex';
  });
}

// Active nav link
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// Counter animation
function animateCounter(el) {
  const target = parseFloat(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const duration = 1800;
  const start = performance.now();
  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 4);
    const value = target * eased;
    el.textContent = (Number.isInteger(target) ? Math.floor(value) : value.toFixed(1)) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}
const counterEls = document.querySelectorAll('[data-target]');
if (counterEls.length) {
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  counterEls.forEach(el => counterObserver.observe(el));
}

/* Web 10/10 Micro-UX: Magnetic Buttons */
const magneticEls = document.querySelectorAll('.magnetic-btn');
magneticEls.forEach(el => {
  el.addEventListener('mousemove', (e) => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  });
  el.addEventListener('mouseleave', () => {
    el.style.transform = 'translate(0, 0)';
  });
});

