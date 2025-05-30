// Animations JavaScript
document.addEventListener('DOMContentLoaded', () => {
  // Add animation classes to elements
  const animateElements = () => {
    // Section headers
    document.querySelectorAll('.section-header').forEach(header => {
      if (isElementInViewport(header) && !header.classList.contains('animated')) {
        header.classList.add('animated');
      }
    });
    
    // Staggered items
    document.querySelectorAll('.staggered-item').forEach((item, index) => {
      if (isElementInViewport(item) && !item.classList.contains('visible')) {
        setTimeout(() => {
          item.classList.add('visible');
        }, 100 * index);
      }
    });
    
    // Pillar cards
    document.querySelectorAll('.pillar-card').forEach((card, index) => {
      if (isElementInViewport(card) && !card.classList.contains('staggered-item')) {
        card.classList.add('staggered-item');
        setTimeout(() => {
          card.classList.add('visible');
        }, 150 * index);
      }
    });
    
    // Benefit cards
    document.querySelectorAll('.benefit-card').forEach((card, index) => {
      if (isElementInViewport(card) && !card.classList.contains('staggered-item')) {
        card.classList.add('staggered-item');
        setTimeout(() => {
          card.classList.add('visible');
        }, 150 * index);
      }
    });
    
    // Milestone timeline
    document.querySelectorAll('.milestone').forEach((milestone, index) => {
      if (isElementInViewport(milestone) && !milestone.classList.contains('staggered-item')) {
        milestone.classList.add('staggered-item');
        setTimeout(() => {
          milestone.classList.add('visible');
        }, 200 * index);
      }
    });
  };
  
  // Helper function to check if element is in viewport
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
      rect.bottom >= 0
    );
  }
  
  // Add animation to hero section on load
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    heroContent.classList.add('fade-in');
  }
  
  // Run animations on page load and scroll
  animateElements();
  window.addEventListener('scroll', animateElements);
  
  // Add hover effects to pillar cards
  const pillarCards = document.querySelectorAll('.pillar-card');
  pillarCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      const overlay = card.querySelector('.pillar-overlay');
      if (overlay) {
        overlay.style.opacity = '1';
      }
    });
    
    card.addEventListener('mouseleave', () => {
      const overlay = card.querySelector('.pillar-overlay');
      if (overlay) {
        overlay.style.opacity = '0';
      }
    });
  });
  
  // Initialize all elements with staggered animation classes
  document.querySelectorAll('.about-content > *, .mission-content > *, .traction-list li, .invest-list li')
    .forEach(el => {
      el.classList.add('staggered-item');
    });
  
  // Add animation to all lists
  const lists = document.querySelectorAll('.mission-list, .traction-list, .invest-list');
  lists.forEach(list => {
    const items = list.querySelectorAll('li');
    items.forEach((item, index) => {
      item.style.transitionDelay = `${index * 0.1}s`;
    });
  });
});