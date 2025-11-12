
// Bootstrap & jQuery JS
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
  // Toggle FAQ answers - Fixed version
function toggleFaq(element) {
    // Get the answer element
    const answer = element.nextElementSibling;
    
    // Toggle answer visibility
    if (answer.style.display === 'block') {
        answer.style.display = 'none';
    } else {
        answer.style.display = 'block';
    }
    
    // Toggle chevron icon
    const icon = element.querySelector('i');
    icon.classList.toggle('fa-chevron-down');
    icon.classList.toggle('fa-chevron-up');
}

// Initialize FAQ items when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Make sure all FAQ answers start as hidden
    document.querySelectorAll('.faq-answer').forEach(answer => {
        answer.style.display = 'none';
    });
});
    
    // Navbar scroll effect
    $(window).scroll(function() {
        if ($(window).scrollTop() > 50) {
            $('.navbar').addClass('shadow-sm').css('padding', '10px 0');
            $('.navbar-brand img').css('height', '40px');
        } else {
            $('.navbar').removeClass('shadow-sm').css('padding', '15px 0');
            $('.navbar-brand img').css('height', '50px');
        }
        
        // Check if why-us section is in view for counter animation
        checkCounterAnimation();
    });
    
    // Smooth scrolling for anchor links
    $('a[href*="#"]').on('click', function(e) {
        e.preventDefault();
        
        $('html, body').animate(
            {
                scrollTop: $($(this).attr('href')).offset().top - 70,
            },
            500,
            'linear'
        );
    });

let countersAnimated = false;

$(document).ready(function() {
    function checkCounterAnimation() {
        if (countersAnimated) return;

        const $whyUs = $('#why-us');
        if ($whyUs.length === 0) return; // element must exist

        const scrollPos = $(window).scrollTop();
        const whyUsPos = $whyUs.offset().top; // safe now
        const windowHeight = $(window).height();

        if (scrollPos > whyUsPos - windowHeight + 200) {
            animateCounters();
            countersAnimated = true;
        }
    }

    // Run on scroll
    $(window).on('scroll', checkCounterAnimation);

    // Also run once on page load
    checkCounterAnimation();
});


    
    function animateCounters() {
        $('.counter-number').each(function() {
            const $this = $(this);
            const target = parseInt($this.data('target'));
            const duration = 300; // 0.3 seconds
            const steps = 30; // Number of animation steps
            const increment = target / steps;
            let current = 0;
            let step = 0;
            
            const timer = setInterval(() => {
                current += increment;
                step++;
                
                if (step >= steps) {
                    $this.text(target.toLocaleString());
                    clearInterval(timer);
                } else {
                    $this.text(Math.round(current).toLocaleString());
                }
            }, duration / steps);
        });
    }
    
    // Initial check in case page is loaded with section already in view
    setTimeout(checkCounterAnimation, 500);
});

// Hover dropdown functionality
document.addEventListener('DOMContentLoaded', function() {
    // Function to handle dropdowns on hover
    function initHoverDropdowns() {
        const dropdowns = document.querySelectorAll('.nav-item.dropdown, .language-switcher');
        
        dropdowns.forEach(dropdown => {
            // Desktop - hover behavior
            if (window.innerWidth > 991) {
                dropdown.addEventListener('mouseenter', function() {
                    this.classList.add('show');
                    const menu = this.querySelector('.dropdown-menu');
                    if (menu) {
                        menu.classList.add('show');
                    }
                });
                
                dropdown.addEventListener('mouseleave', function() {
                    this.classList.remove('show');
                    const menu = this.querySelector('.dropdown-menu');
                    if (menu) {
                        menu.classList.remove('show');
                    }
                });
            }
            
            // Mobile - keep click behavior
            else {
                // Remove any hover event listeners if they exist
                dropdown.onmouseenter = null;
                dropdown.onmouseleave = null;
            }
        });
    }
    
    // Initialize on page load
    initHoverDropdowns();
    
    // Re-initialize when window is resized
    window.addEventListener('resize', initHoverDropdowns);
    
    // Close dropdowns when clicking elsewhere
    document.addEventListener('click', function(e) {
        if (window.innerWidth > 991) {
            const dropdowns = document.querySelectorAll('.nav-item.dropdown, .language-switcher');
            dropdowns.forEach(dropdown => {
                if (!dropdown.contains(e.target)) {
                    dropdown.classList.remove('show');
                    const menu = dropdown.querySelector('.dropdown-menu');
                    if (menu) {
                        menu.classList.remove('show');
                    }
                }
            });
        }
    });
    
    // Allow "Clases Esquí" dropdown link to navigate when clicked directly
    // This overrides Bootstrap's default dropdown behavior for direct clicks on the link
    // BUT only on desktop - on mobile, let Bootstrap handle the dropdown toggle
    const skiLessonsDropdown = document.getElementById('skiLessonsDropdown');
    if (skiLessonsDropdown) {
        // Handle click on the main link (not on dropdown items)
        skiLessonsDropdown.addEventListener('click', function(e) {
            // On mobile, let Bootstrap handle the dropdown toggle - don't interfere at all
            if (window.innerWidth <= 991) {
                // Don't prevent default or stop propagation - let Bootstrap handle it
                return;
            }
            
            // Desktop only: Only navigate if clicking directly on the link text, not on dropdown menu items
            const clickedElement = e.target;
            const dropdownMenu = this.nextElementSibling;
            
            // Don't navigate if clicking on dropdown menu items
            if (dropdownMenu && dropdownMenu.contains(clickedElement)) {
                return;
            }
            
            // Check if the click was on the link itself (not a child element that's part of the menu)
            const isDirectClick = clickedElement === this || 
                                 clickedElement.closest('a#skiLessonsDropdown') === this;
            
            // Navigate if it's a direct click on the link (desktop only)
            if (isDirectClick) {
                const href = this.getAttribute('href');
                if (href && href !== '#') {
                    e.preventDefault();
                    e.stopPropagation();
                    window.location.href = href;
                }
            }
        }, false); // Use bubble phase instead of capture to avoid interfering with Bootstrap
    }
});