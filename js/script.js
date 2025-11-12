// Import components
import './components/header.js';
import './components/language.js';

// Common functionality used across all pages
document.addEventListener('DOMContentLoaded', function() {
  // Current year for copyright
  document.getElementById('currentYear').textContent = new Date().getFullYear();
  
  // Initialize page-specific scripts if they exist
  if (typeof initClassesPage === 'function') {
    initClassesPage();
  }
});