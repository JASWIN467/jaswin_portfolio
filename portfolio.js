// Smooth scrolling function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Animated counter for coding profile stats
function animateCounters() {
    document.querySelectorAll('.profile-stat-number').forEach(el => {
        const target = parseInt(el.getAttribute('data-target'), 10);
        const duration = 1400;
        const step = Math.ceil(target / (duration / 16));
        let current = 0;
        const timer = setInterval(() => {
            current = Math.min(current + step, target);
            el.textContent = current;
            if (current >= target) clearInterval(timer);
        }, 16);
    });
}

let countersAnimated = false;

// Navbar toggle for mobile
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Scroll reveal animation
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

// Animate skill bars
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-fill');
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });
}

// Form validation and submission
document.addEventListener('DOMContentLoaded', function () {
    // Add reveal class to sections for scroll animation
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('reveal');
    });

    // Add reveal class to other elements
    const revealElements = document.querySelectorAll('.education-item, .skill-category, .project-card, .certification-item, .achievement-item');
    revealElements.forEach(element => {
        element.classList.add('reveal');
    });

    const form = document.querySelector('.contact-form form');
    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            const name = form.querySelector('input[type="text"]').value.trim();
            const email = form.querySelector('input[type="email"]').value.trim();
            const message = form.querySelector('textarea').value.trim();

            if (name === '' || email === '' || message === '') {
                alert('Please fill in all fields.');
                return;
            }

            // Simple email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // Simulate form submission (in a real scenario, send to server)
            alert('Thank you for your message! I will get back to you soon.');
            form.reset();
        });
    }

    // Add active class to navbar links on scroll
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', function () {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });

        // Trigger scroll reveal
        revealOnScroll();

        // Trigger counter animation when coding profiles section is visible
        if (!countersAnimated) {
            const profilesSection = document.getElementById('achievements');
            if (profilesSection) {
                const rect = profilesSection.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    animateCounters();
                    countersAnimated = true;
                }
            }
        }
    });

    // Add scroll effect to navbar
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
        } else {
            navbar.style.backgroundColor = 'rgba(10, 10, 10, 0.9)';
        }
    });

    // Animate skill bars when skills section is visible
    const skillsSection = document.getElementById('skills');
    let skillsAnimated = false;

    function checkSkillsVisibility() {
        if (!skillsAnimated) {
            const rect = skillsSection.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                animateSkillBars();
                skillsAnimated = true;
            }
        }
    }

    window.addEventListener('scroll', checkSkillsVisibility);
    checkSkillsVisibility(); // Check on load

    // Initial reveal check
    revealOnScroll();
});
