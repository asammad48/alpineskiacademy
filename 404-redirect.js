/**
 * 404 Error Handler - Redirects to index.html
 * Add this to your pages to automatically redirect to index.html if the current page returns 404
 */

(function() {
    // Check if the current page is a 404 error page
    if (window.location.pathname.includes('404.html') || document.title.includes('404')) {
        // Immediately redirect to index.html
        window.location.replace('/index.html');
        return;
    }
    
    // Listen for 404 errors in image loading
    document.addEventListener('error', function(e) {
        if (e.target.tagName === 'IMG') {
            console.log('Image not found:', e.target.src);
            // Optionally set a default image
            e.target.onerror = null;
            e.target.src = '/logo1.jpg'; // Fallback logo
        }
    }, true);
    
    // Handle fetch errors for AJAX requests
    if (typeof fetch !== 'undefined') {
        const originalFetch = window.fetch;
        window.fetch = function(url, options) {
            return originalFetch.apply(this, arguments)
                .catch(function(error) {
                    // If fetch fails, redirect to index after showing error
                    console.error('Failed to fetch:', url);
                    return Promise.reject(error);
                });
        };
    }
})();

