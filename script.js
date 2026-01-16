document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar a');
    const menuIcon = document.querySelector('#menu-icon');
    const navbar = document.querySelector('.navbar');
    const header = document.querySelector('.header');
    const scrollTop = document.querySelector('.scroll-top');
    const contactForm = document.querySelector('.contact-form');
    
    // --- Mobile Menu Toggle ---
    menuIcon.onclick = () => {
        menuIcon.classList.toggle('fa-times');
        navbar.classList.toggle('active'); 
    };

    // --- Throttle function for scroll performance (Recommended) ---
    const throttle = (func, delay) => {
        let lastCall = 0;
        return function(...args) {
            const now = new Date().getTime();
            if (now - lastCall < delay) {
                return;
            }
            lastCall = now;
            return func(...args);
        };
    };

    // --- Main Scroll Handler (Combined all scroll logic) ---
    const handleScroll = () => {
        let current = '';
        const scrollY = window.scrollY;

        // 1. Active Nav Link Highlighting
        sections.forEach(sec => {
            const secTop = sec.offsetTop - 150;
            const secHeight = sec.offsetHeight;

            if (scrollY >= secTop && scrollY < secTop + secHeight) {
                current = sec.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });

        // 2. Hide mobile menu on scroll (optional/intentional feature)
        menuIcon.classList.remove('fa-times');
        navbar.classList.remove('active');

        // 3. Sticky Header Effect
        header.classList.toggle('sticky', scrollY > 100);

        // 4. Scroll Top Button Visibility
        // Using class toggle (requires CSS updates from our review)
        scrollTop.classList.toggle('show-scroll', scrollY > 500);

    };
    
    // Use the throttled handler for the main scroll event
    window.addEventListener('scroll', throttle(handleScroll, 100));
    
    // --- Intersection Observer for Animations (Highly Recommended) ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Triggers when 15% of the element is visible
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-animate');
                // If you only want the animation to happen once:
                // observer.unobserve(entry.target); 
            } else {
                // If you want the animation to replay on scroll out/in:
                // entry.target.classList.remove('show-animate'); 
            }
        });
    }, observerOptions);

    sections.forEach(sec => {
        sec.classList.add('animate-target');
        sectionObserver.observe(sec);
    });

    // --- Form Validation ---
    contactForm.addEventListener('submit', (e) => {
        const name = contactForm.querySelector('input[name="name"]').value.trim();
        const email = contactForm.querySelector('input[name="email"]').value.trim();
        const message = contactForm.querySelector('textarea[name="message"]').value.trim();
        
        if (name === '' || email === '' || message === '') {
            alert('Please fill in all required fields (Name, Email, Message).');
            e.preventDefault();
        } 
    });
});