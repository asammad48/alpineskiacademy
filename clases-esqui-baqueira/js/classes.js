// Classes Page Specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize FAQ functionality
    initFAQ();
    
    // Initialize smooth scrolling for anchor links
    initSmoothScrolling();
    
    // Add animation to elements when they come into view
    initScrollAnimations();
    
    // Update active nav link
    updateActiveNavLink();
});

// FAQ Accordion Functionality
function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const answer = this.nextElementSibling;
            const icon = this.querySelector('i');
            
            // Close all other FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== faqItem) {
                    item.classList.remove('active');
                    item.querySelector('.faq-answer').classList.remove('active');
                    item.querySelector('.faq-question i').style.transform = 'rotate(0deg)';
                }
            });
            
            // Toggle current item
            faqItem.classList.toggle('active');
            answer.classList.toggle('active');
            
            // Rotate icon
            if (faqItem.classList.contains('active')) {
                icon.style.transform = 'rotate(180deg)';
            } else {
                icon.style.transform = 'rotate(0deg)';
            }
        });
    });
    
    // Open first FAQ by default
    if (faqQuestions.length > 0) {
        faqQuestions[0].click();
    }
}

// Smooth Scrolling for Anchor Links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 100; // Adjust for fixed header
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll Animations for Elements
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.modalidad-card, .feature-box, .img-container');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Set initial state for animated elements
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Update Active Navigation Link
function updateActiveNavLink() {
    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage || 
            (currentPage.includes('clases-esqui') && link.getAttribute('href').includes('clases-esqui'))) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Image Loading Optimization
function optimizeImages() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // Add loading lazy for better performance
        if (!img.loading) {
            img.loading = 'lazy';
        }
        
        // Add error handling
        img.addEventListener('error', function() {
            this.style.display = 'none';
            console.warn('Image failed to load:', this.src);
        });
    });
}

// Form Handling for Contact CTAs
function initFormHandling() {
    const contactButtons = document.querySelectorAll('a[href*="contacto"], a[href*="wa.me"]');
    
    contactButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Track contact button clicks (you can integrate with analytics here)
            const buttonText = this.textContent.trim();
            console.log('Contact button clicked:', buttonText);
            
            // You can add analytics tracking here
            // gtag('event', 'contact_click', { 'button_text': buttonText });
        });
    });
}

// Initialize when page loads
window.addEventListener('load', function() {
    optimizeImages();
    initFormHandling();
    
    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Export functions for potential use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initFAQ,
        initSmoothScrolling,
        initScrollAnimations,
        updateActiveNavLink
    };
}