
document.addEventListener('DOMContentLoaded', function() {
    function adjustLayout() {
        const topBar = document.querySelector('.top-info-bar');
        const navbar = document.querySelector('.navbar.fixed-top');
        if (topBar && navbar) {
            const topBarHeight = topBar.offsetHeight;
            navbar.style.top = `${topBarHeight}px`;
            document.body.style.paddingTop = `${topBarHeight}px`;
        }
    }

    // Adjust layout on DOMContentLoaded
    adjustLayout();

    // Adjust layout on window load
    window.addEventListener('load', adjustLayout);

    // Adjust layout on window resize
    window.addEventListener('resize', adjustLayout);

    // Use ResizeObserver for more reliable adjustments
    const topBar = document.querySelector('.top-info-bar');
    if (topBar) {
        const observer = new ResizeObserver(adjustLayout);
        observer.observe(topBar);
    }

    // Set current year in footer
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
});
