
document.addEventListener('DOMContentLoaded', function() {
    // Dynamically adjust navbar position based on top-info-bar height
    function adjustLayoutForTopBar() {
        const topBar = document.querySelector('.top-info-bar');
        const navbar = document.querySelector('.navbar.fixed-top');
        const heroSection = document.querySelector('.hero-section');

        if (topBar && navbar) {
            const topBarHeight = topBar.offsetHeight;
            navbar.style.top = `${topBarHeight}px`;

            const navbarHeight = navbar.offsetHeight;
            const totalOffset = topBarHeight + navbarHeight;
            document.body.style.paddingTop = `${totalOffset}px`;

            // Adjust hero section margin if it exists
            if (heroSection) {
                // The hero section's negative margin was pulling it under the old navbar setup.
                // With dynamic positioning, it should start right after the navbar.
                heroSection.style.marginTop = '0';
            }
        }
    }

    // Run on initial load
    adjustLayoutForTopBar();
    // Rerun on resize to handle orientation changes or browser resizing
    window.addEventListener('resize', adjustLayoutForTopBar);

    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Toggle FAQ answers
    window.toggleFaq = function(element) {
        const answer = element.nextElementSibling;
        const icon = element.querySelector('i');

        // Close other open FAQs
        document.querySelectorAll('.faq-item').forEach(item => {
            if (item.querySelector('.faq-question') !== element) {
                const otherAnswer = item.querySelector('.faq-answer');
                const otherIcon = item.querySelector('.faq-question i');
                if (otherAnswer.classList.contains('active')) {
                    otherAnswer.classList.remove('active');
                    otherIcon.style.transform = 'rotate(0deg)';
                }
            }
        });

        // Toggle the clicked FAQ
        if (answer.classList.contains('active')) {
            answer.classList.remove('active');
            icon.style.transform = 'rotate(0deg)';
        } else {
            answer.classList.add('active');
            icon.style.transform = 'rotate(180deg)';
        }
    };
    
    // Navbar scroll effect
    $(window).scroll(function() {
        if ($(window).scrollTop() > 50) {
            $('.navbar').addClass('shadow-sm');
        } else {
            $('.navbar').removeClass('shadow-sm');
        }
        checkCounterAnimation();
    });
    
    // Smooth scrolling for anchor links
    $('a[href*="#"]').on('click', function(e) {
        e.preventDefault();
        
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top - 100 // Adjusted offset for fixed navbar
        }, 500, 'linear');
    });

    let countersAnimated = false;

    function checkCounterAnimation() {
        if (countersAnimated) return;

        const $statsSection = $('.stats-info-section');
        if ($statsSection.length === 0) return;

        const scrollPos = $(window).scrollTop();
        const statsPos = $statsSection.offset().top;
        const windowHeight = $(window).height();

        if (scrollPos > statsPos - windowHeight + 200) {
            animateCounters();
            countersAnimated = true;
        }
    }

    function animateCounters() {
        // Years of Experience
        $({ value: 0 }).animate({ value: 20 }, {
            duration: 2000,
            easing: 'swing',
            step: function() { $('#yearsExperience').text(Math.ceil(this.value)); }
        });

        // Satisfied Clients
        $({ value: 0 }).animate({ value: 5000 }, {
            duration: 2000,
            easing: 'swing',
            step: function() { $('#satisfiedClients').text(Math.ceil(this.value) + '+'); }
        });

        // Satisfaction Rate
        $({ value: 0 }).animate({ value: 100 }, {
            duration: 2000,
            easing: 'swing',
            step: function() { $('#satisfactionRate').text(Math.ceil(this.value) + '%'); }
        });
    }

    // Run check on load and scroll
    checkCounterAnimation();
});
