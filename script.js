document.addEventListener('DOMContentLoaded', () => {
    
    // --- PART 1: SMOOTH SCROLLING ON CLICK ---
    // This forces the browser to scroll smoothly when you click a link
    const links = document.querySelectorAll('.nav-button, .btn');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only applies to links starting with '#'
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault(); // Stop the immediate jump

                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);

                if (targetSection) {
                    // Calculate the position to scroll to
                    // We subtract 80px to account for the fixed header height
                    const headerOffset = 80;
                    const elementPosition = targetSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                }
            }
        });
    });

    // --- PART 2: ACTIVE LINK HIGHLIGHTING ---
    // This highlights the menu item as you scroll down
    const navButtons = document.querySelectorAll('.nav-button');
    const sections = document.querySelectorAll('.section');

    const setActiveLink = (id) => {
        navButtons.forEach(button => {
            button.classList.remove('active');
            if (button.getAttribute('href') === `#${id}`) {
                button.classList.add('active');
            }
        });
    };

    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px', // Trigger when section is in the middle of screen
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setActiveLink(entry.target.id);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
});