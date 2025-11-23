document.addEventListener('DOMContentLoaded', () => {
    const navButtons = document.querySelectorAll('.nav-button');
    const sections = document.querySelectorAll('.section');

    // Function to set the active state on the correct navigation button
    const setActiveLink = (id) => {
        navButtons.forEach(button => {
            button.classList.remove('active');
            if (button.getAttribute('href') === `#${id}`) {
                button.classList.add('active');
            }
        });
    };

    // Observer to detect which section is currently in the viewport
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        // Trigger the callback when 50% of the section is visible
        threshold: 0.5 
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // When a section enters the viewport, set its corresponding nav link as active
                setActiveLink(entry.target.id);
            }
        });
    }, observerOptions);

    // Attach the observer to all main sections
    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Initialize the active link when the page loads (for the Home section)
    if (sections.length > 0) {
        setActiveLink(sections[0].id);
    }
});