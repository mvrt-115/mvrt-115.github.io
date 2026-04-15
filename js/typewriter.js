// Typewriter effect for hero section
function initTypewriter() {
  const el = document.querySelector('.typewriter');
  if (!el) return;
  
  const texts = el.dataset.texts?.split(',') || ['MVRT'];
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  
  function type() {
    const current = texts[textIndex];
    const speed = isDeleting ? 50 : 100;
    
    if (isDeleting) {
      el.textContent = current.slice(0, --charIndex);
    } else {
      el.textContent = current.slice(0, ++charIndex);
    }
    
    if (!isDeleting && charIndex === current.length) {
      isDeleting = true;
      setTimeout(type, 2000);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      setTimeout(type, 500);
    } else {
      setTimeout(type, speed);
    }
  }
  
  setTimeout(type, 1000);
}

export { initTypewriter };
