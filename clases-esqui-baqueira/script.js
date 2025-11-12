
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

    // Counter animation functionality
    let countersAnimated = false;
    
    function checkCounterAnimation() {
        if (countersAnimated) return;
        
        const whyUsSection = $('#why-us');
        const scrollPos = $(window).scrollTop();
        const whyUsPos = whyUsSection.offset().top;
        const windowHeight = $(window).height();
        
        // If why-us section is in viewport
        if (scrollPos > whyUsPos - windowHeight + 200) {
            animateCounters();
            countersAnimated = true;
        }
    }
    
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

// Hover dropdown functionality for "Clases Esquí" navigation
document.addEventListener('DOMContentLoaded', function() {
    const skiLessonsDropdown = document.getElementById('skiLessonsDropdown');
    
    if (skiLessonsDropdown) {
        const dropdownParent = skiLessonsDropdown.closest('.nav-item.dropdown');
        const skiDropdownMenu = dropdownParent ? dropdownParent.querySelector('.dropdown-menu[aria-labelledby="skiLessonsDropdown"]') : null;
        
        if (skiDropdownMenu) {
            // Desktop - hover behavior (link still navigates on click)
            if (window.innerWidth > 991) {
                // Hover to show dropdown
                dropdownParent.addEventListener('mouseenter', function() {
                    skiDropdownMenu.style.display = 'block';
                    skiDropdownMenu.style.opacity = '1';
                    skiDropdownMenu.style.visibility = 'visible';
                });
                
                dropdownParent.addEventListener('mouseleave', function() {
                    skiDropdownMenu.style.display = 'none';
                    skiDropdownMenu.style.opacity = '0';
                    skiDropdownMenu.style.visibility = 'hidden';
                });
                
                // Allow link to navigate normally on desktop
                skiLessonsDropdown.addEventListener('click', function(e) {
                    // Link will navigate normally, no preventDefault
                });
            }
            
            // Mobile - click to toggle dropdown
            else {
                skiLessonsDropdown.addEventListener('click', function(e) {
                    e.preventDefault();
                    const isVisible = skiDropdownMenu.style.display === 'block' || skiDropdownMenu.classList.contains('show');
                    
                    // Close all other dropdowns
                    document.querySelectorAll('.dropdown-menu').forEach(menu => {
                        if (menu !== skiDropdownMenu) {
                            menu.style.display = 'none';
                            menu.classList.remove('show');
                        }
                    });
                    
                    // Toggle this dropdown
                    if (isVisible) {
                        skiDropdownMenu.style.display = 'none';
                        skiDropdownMenu.classList.remove('show');
                    } else {
                        skiDropdownMenu.style.display = 'block';
                        skiDropdownMenu.classList.add('show');
                    }
                });
            }
            
            // Handle window resize
            let resizeTimer;
            window.addEventListener('resize', function() {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(function() {
                    if (window.innerWidth <= 991) {
                        // Mobile: reset to hidden
                        skiDropdownMenu.style.display = 'none';
                        skiDropdownMenu.style.opacity = '';
                        skiDropdownMenu.style.visibility = '';
                    }
                }, 100);
            });
            
            // Close dropdowns when clicking elsewhere (mobile)
            document.addEventListener('click', function(e) {
                if (window.innerWidth <= 991) {
                    if (skiDropdownMenu && !e.target.closest('.nav-item.dropdown')) {
                        skiDropdownMenu.style.display = 'none';
                        skiDropdownMenu.classList.remove('show');
                    }
                }
            });
        }
    }
});