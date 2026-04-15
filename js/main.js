// Main JavaScript entry point
import { initNav, setActiveNav } from './nav.js';
import { initTypewriter } from './typewriter.js';
import { initScrollEffects, initReveal } from './scroll.js';
import { initSlideshow } from './slideshow.js';
import { initLeadershipFromConfig } from './configLoader.js';

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  setActiveNav();
  initTypewriter();
  initScrollEffects();
  initReveal();
  initSlideshow();
  initLeadershipFromConfig();
  
  console.log('MVRT website loaded');
});
