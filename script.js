
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
