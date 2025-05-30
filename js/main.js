// Main JavaScript File
import './navigation.js';
import './animations.js';

// Initialize all components
document.addEventListener('DOMContentLoaded', () => {
  console.log('Ausum Group website loaded');
  
  // Show all animations on initial load
  setTimeout(() => {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
      observeSection(section);
    });
  }, 100);
});

// Function to handle newsletter form submission
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = newsletterForm.querySelector('input[type="email"]');
    const email = emailInput.value;
    
    if (email) {
      // Here you would typically send this to a server
      console.log(`Newsletter subscription for: ${email}`);
      
      // Show success message
      const formContainer = newsletterForm.parentElement;
      newsletterForm.style.display = 'none';
      
      const successMessage = document.createElement('p');
      successMessage.textContent = 'Thank you for subscribing to our newsletter!';
      successMessage.className = 'fade-in';
      formContainer.appendChild(successMessage);
    }
  });
}

// Observer for section animations
function observeSection(section) {
  const header = section.querySelector('.section-header');
  if (header) {
    header.classList.add('animated');
  }
  
  const staggeredItems = section.querySelectorAll('.staggered-item');
  staggeredItems.forEach((item, index) => {
    setTimeout(() => {
      item.classList.add('visible');
    }, 100 * (index + 1));
  });
}

// Track scroll position for animations
window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY;
  
  // Get all sections for scroll-based animations
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
    const sectionHeight = section.offsetHeight;
    const windowHeight = window.innerHeight;
    
    if (scrollPosition > (sectionTop - windowHeight + 200) && 
        scrollPosition < (sectionTop + sectionHeight)) {
      observeSection(section);
    }
  });
});