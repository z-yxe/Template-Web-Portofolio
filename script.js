// DOM Elements
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const hamburger = document.querySelector('.hamburger');
const closeMenu = document.querySelector('.close-menu');
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('i');
const backToTop = document.getElementById('backToTop');
const sections = document.querySelectorAll('section');
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');
const contactForm = document.getElementById('contactForm');
const skillBars = document.querySelectorAll('.skill-percentage');
const revealElements = document.querySelectorAll('.reveal');

// ===== MENU TOGGLE =====
hamburger.addEventListener('click', () => {
    navMenu.classList.add('active');
});

closeMenu.addEventListener('click', () => {
    navMenu.classList.remove('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !hamburger.contains(e.target) && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
    }
});

// ===== ACTIVE LINK ON SCROLL =====
function highlightActiveLink() {
    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// ===== SMOOTH SCROLL FOR NAV LINKS =====
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetElement.offsetTop - 70,
            behavior: 'smooth'
        });
        
        // Close the mobile menu if open
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
    });
});

// ===== DARK MODE TOGGLE =====
// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeIcon.classList.replace('fa-moon', 'fa-sun');
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    // Update icon
    if (document.body.classList.contains('dark-mode')) {
        themeIcon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        themeIcon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'light');
    }
});

// ===== BACK TO TOP BUTTON =====
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.classList.add('active');
    } else {
        backToTop.classList.remove('active');
    }
    
    // Update active link
    highlightActiveLink();
    
    // Reveal elements on scroll
    revealOnScroll();
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== PORTFOLIO FILTER =====
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(filterBtn => {
            filterBtn.classList.remove('active');
        });
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        
        // Filter portfolio items
        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 100);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// ===== CONTACT FORM =====
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Here you would typically send the form data to a server
        // For demo purposes, let's log it to console
        console.log('Form submitted:', { name, email, subject, message });
        
        // Reset form
        contactForm.reset();
        
        // Show success message (you could add a more sophisticated alert)
        alert('Thank you for your message! I will get back to you soon.');
    });
}

// ===== REVEAL ELEMENTS ON SCROLL =====
function revealOnScroll() {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

// ===== ANIMATE SKILL BARS =====
function animateSkillBars() {
    skillBars.forEach(bar => {
        // Initially set width to 0
        bar.style.width = '0';
        
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animate to the percentage width
                    const percentage = bar.parentElement.previousElementSibling.lastElementChild.textContent;
                    setTimeout(() => {
                        bar.style.width = percentage;
                    }, 200);
                    
                    // Unobserve after animation
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(bar);
    });
}

// ===== TYPED EFFECT FOR HERO SECTION =====
function createTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.innerHTML = '';
        
        let i = 0;
        const typingEffect = setInterval(() => {
            if (i < text.length) {
                heroTitle.innerHTML += text.charAt(i);
                i++;
            } else {
                clearInterval(typingEffect);
            }
        }, 100);
    }
}

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', () => {
    // Set active link based on current section
    highlightActiveLink();
    
    // Start animations
    revealOnScroll();
    animateSkillBars();
    
    // Optional typing effect (uncomment if you want to use it)
    createTypingEffect();
    
    // Add fade-in animation to all reveal elements initially on page load
    setTimeout(() => {
        revealElements.forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight) {
                el.classList.add('active');
            }
        });
    }, 300);
});

// ===== PRELOADER =====
window.addEventListener('load', () => {
    // If you want to add a preloader, you can uncomment and modify this code
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 100);
        }, 200);
    }
});