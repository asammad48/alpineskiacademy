// Language switching functionality
document.addEventListener('DOMContentLoaded', function() {
  // Function to handle language switching
  function switchLanguage(lang) {
    const currentPath = window.location.pathname;
    let targetPage = 'index.html'; // Default to Spanish
    
    switch(lang) {
      case 'en':
        targetPage = 'en.html';
        break;
      case 'fr':
        targetPage = 'fr.html';
        break;
      case 'pt':
        targetPage = 'pt.html';
        break;
      case 'ca':
        targetPage = 'ca.html';
        break;
      default:
        targetPage = 'index.html'; // Spanish
    }
    
    // Store language preference
    localStorage.setItem('preferredLanguage', lang);
    
    // Redirect to the target page
    if (!window.location.pathname.includes(targetPage)) {
      window.location.href = targetPage;
    }
  }
  
  // Set up language option click handlers
  document.querySelectorAll('.language-option').forEach(option => {
    option.addEventListener('click', function(e) {
      e.preventDefault();
      const lang = this.getAttribute('data-lang');
      switchLanguage(lang);
    });
  });
  
  // Check for stored language preference
  const preferredLanguage = localStorage.getItem('preferredLanguage');
  if (preferredLanguage) {
    // Update UI to reflect preferred language
    const button = document.querySelector('.language-switcher .dropdown-toggle');
    if (button) {
      button.innerHTML = `<i class="fas fa-globe me-1"></i> ${preferredLanguage.toUpperCase()}`;
    }
    
    document.querySelectorAll('.language-option').forEach(option => {
      option.classList.remove('active');
      if (option.getAttribute('data-lang') === preferredLanguage) {
        option.classList.add('active');
      }
    });
  }
});