// Hero Slideshow functionality
export function initSlideshow() {
  const slides = document.querySelectorAll('.slideshow-img');
  const dots = document.querySelectorAll('.dot');
  
  if (!slides.length || !dots.length) return;
  
  let currentSlide = 0;
  const totalSlides = slides.length;
  
  function showSlide(index) {
    // Remove active class from all slides and dots
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Add active class to current slide and dot
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    
    currentSlide = index;
  }
  
  function nextSlide() {
    const next = (currentSlide + 1) % totalSlides;
    showSlide(next);
  }
  
  // Auto-advance every 5 seconds
  setInterval(nextSlide, 5000);
  
  // Click handlers for dots
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => showSlide(index));
  });
}
