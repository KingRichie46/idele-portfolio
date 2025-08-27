
// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.setAttribute('data-theme', savedTheme);
    updateToggleButton(savedTheme);
}

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateToggleButton(newTheme);
});

function updateToggleButton(theme) {
    themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
}

// Color Theme Picker - FIXED VERSION
const colorPickerBtn = document.getElementById('color-picker-btn');
const themePicker = document.getElementById('theme-picker');
const themeButtons = document.querySelectorAll('.theme-btn');

// Show/hide theme picker
if (colorPickerBtn && themePicker) {
    colorPickerBtn.addEventListener('click', () => {
        const currentRight = themePicker.style.right;
        themePicker.style.right = currentRight === '0px' ? '-35px' : '0px';
    });
}

// Change theme colors
if (themeButtons.length > 0) {
    themeButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent event bubbling

            const theme = btn.getAttribute('data-theme');
            changeThemeColor(theme);

            // Hide picker after selection
            if (themePicker) {
                themePicker.style.right = '-35px';
            }
        });
    });
}

function changeThemeColor(theme) {
    const root = document.documentElement;

    const themes = {
        blue: {
            primary: '#2563eb',
            secondary: '#1e40af',
            accent: '#3b82f6'
        },
        green: {
            primary: '#16a34a',
            secondary: '#15803d',
            accent: '#22c55e'
        },
        purple: {
            primary: '#9333ea',
            secondary: '#7c3aed',
            accent: '#a855f7'
        },
        red: {
            primary: '#dc2626',
            secondary: '#b91c1c',
            accent: '#ef4444'
        },
        orange: {
            primary: '#ea580c',
            secondary: '#c2410c',
            accent: '#f97316'
        }
    };

    const colors = themes[theme] || themes.blue;

    root.style.setProperty('--primary-color', colors.primary);
    root.style.setProperty('--secondary-color', colors.secondary);
    root.style.setProperty('--accent-color', colors.accent);

    // Save to localStorage
    localStorage.setItem('themeColor', theme);
}

// Load saved theme color
document.addEventListener('DOMContentLoaded', function() {
    const savedThemeColor = localStorage.getItem('themeColor');
    if (savedThemeColor) {
        changeThemeColor(savedThemeColor);
    }
});

// Smooth Scrolling for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile Menu
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('mobile-menu-hidden');
        mobileMenu.classList.toggle('mobile-menu-visible');
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (mobileMenu && mobileMenuBtn &&
        !mobileMenu.contains(e.target) &&
        !mobileMenuBtn.contains(e.target) &&
        mobileMenu.classList.contains('mobile-menu-visible')) {
        mobileMenu.classList.add('mobile-menu-hidden');
        mobileMenu.classList.remove('mobile-menu-visible');
    }
});

// Gallery Filter
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

if (filterButtons.length > 0 && galleryItems.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            button.classList.add('active');

            // Get filter value
            const filterValue = button.getAttribute('data-filter');

            // Filter gallery items
            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');

                if (filterValue === 'all' || filterValue === category) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
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
}

// Back to Top Button
const backToTopBtn = document.getElementById('back-to-top');

if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Netlify Forms - Simple success message
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        // Netlify will handle the submission automatically
        // Just show a success message after a short delay
        setTimeout(() => {
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        }, 1000);
    });
}

// Animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe all sections for animation
document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
});

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log("Portfolio website loaded successfully! 🚀");

    // Load any saved preferences
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.setAttribute('data-theme', savedTheme);
        updateToggleButton(savedTheme);
    }

    const savedThemeColor = localStorage.getItem('themeColor');
    if (savedThemeColor) {
        changeThemeColor(savedThemeColor);
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // ESC to close mobile menu and theme picker
    if (e.key === 'Escape') {
        if (mobileMenu && mobileMenu.classList.contains('mobile-menu-visible')) {
            mobileMenu.classList.add('mobile-menu-hidden');
            mobileMenu.classList.remove('mobile-menu-visible');
        }
        if (themePicker && themePicker.style.right === '0px') {
            themePicker.style.right = '-35px';
        }
    }
});
