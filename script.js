function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
  const page = document.getElementById('page-' + id);
  if (page) { page.classList.add('active'); }
  const navLink = document.getElementById('nav-' + id);
  if (navLink) { navLink.classList.add('active'); }
  window.scrollTo({ top: 0, behavior: 'smooth' });
  document.getElementById('navlinks').classList.remove('open');
  // re-observe new page elements
  observeElements();
  return false;
}

// Scroll effects
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 24);
});

// Intersection Observer for fade-in
function observeElements() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.fade-in:not(.visible)').forEach(el => observer.observe(el));
}
observeElements();

// Hamburger menu
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('navlinks').classList.toggle('open');
});

// Animated counter for stats
function animateCounter(el, target, suffix, duration) {
  const start = performance.now();
  const isFloat = target % 1 !== 0;
  const update = (now) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    const current = isFloat
      ? (ease * target).toFixed(1)
      : Math.round(ease * target);
    el.textContent = current + suffix;
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

// Observe stats bar
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-num').forEach(el => {
        const target = parseFloat(el.dataset.target);
        const suffix = el.dataset.suffix || '';
        animateCounter(el, target, suffix, 1600);
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const statsBar = document.querySelector('.stats-bar');
if (statsBar) statsObserver.observe(statsBar);
