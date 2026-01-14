document.addEventListener('DOMContentLoaded', () => {
    const navButtons = document.querySelectorAll('.nav-button');
    const sections = document.querySelectorAll('.section');

    // Function to set the active state on the correct navigation button
    const setActiveLink = (id) => {
        navButtons.forEach(button => {
            button.classList.remove('active');
            // Check if the href matches the id
            if (button.getAttribute('href') === `#${id}`) {
                button.classList.add('active');
            }
        });
    };

    // Observer to detect which section is currently in the viewport
    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px', // Triggers exactly when section is in middle of screen
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setActiveLink(entry.target.id);
            }
        });
    }, observerOptions);

    // Attach the observer to all main sections
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
});