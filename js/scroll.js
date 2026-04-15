// Scroll effects - Header shadow, reveal animations
function initScrollEffects() {
  const header = document.querySelector('.site-header');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header?.style.setProperty('box-shadow', 'var(--shadow)');
    } else {
      header?.style.setProperty('box-shadow', 'none');
    }
  }, { passive: true });
}

// Intersection Observer for reveal animations
function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, { threshold: 0.1 });
  
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

export { initScrollEffects, initReveal };
