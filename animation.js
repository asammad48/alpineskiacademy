document.addEventListener('DOMContentLoaded', function() {
            // Counter animation function
            function animateValue(element, start, end, duration) {
                let startTimestamp = null;
                const step = (timestamp) => {
                    if (!startTimestamp) startTimestamp = timestamp;
                    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                    const value = Math.floor(progress * (end - start) + start);
                    element.textContent = value.toLocaleString() + (element.id === 'satisfactionRate' ? '%' : '+');
                    
                    if (progress < 1) {
                        window.requestAnimationFrame(step);
                    }
                };
                window.requestAnimationFrame(step);
                
                // Add animation class
                element.classList.add('animated');
            }
            
            // Create snowflake elements
            function createSnowflakes() {
                const section = document.querySelector('.why-us-section');
                const snowflakes = ['❄', '❅', '❆'];
                
                for (let i = 0; i < 15; i++) {
                    const snowflake = document.createElement('div');
                    snowflake.className = 'snowflake';
                    snowflake.textContent = snowflakes[Math.floor(Math.random() * snowflakes.length)];
                    snowflake.style.left = Math.random() * 100 + '%';
                    snowflake.style.top = Math.random() * 100 + '%';
                    snowflake.style.opacity = Math.random() * 0.5 + 0.3;
                    snowflake.style.fontSize = (Math.random() * 12 + 10) + 'px';
                    section.appendChild(snowflake);
                }
            }
            
            // Intersection Observer to trigger animation when section is in view
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Animate the counters
                        animateValue(document.getElementById('yearsExperience'), 0, 20, 2000);
                        animateValue(document.getElementById('satisfiedClients'), 0, 20000, 2000);
                        animateValue(document.getElementById('satisfactionRate'), 0, 98, 2000);
                        
                        // Stop observing after animation
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.3 });
            
            // Observe the stats container
            const statsContainer = document.querySelector('.stats-container');
            if (statsContainer) {
                observer.observe(statsContainer);
            }
            
            // Create decorative snowflakes
            createSnowflakes();
        });