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

// Color Theme Picker
const colorPickerBtn = document.getElementById('color-picker-btn');
const themePicker = document.getElementById('theme-picker');
const themeButtons = document.querySelectorAll('.theme-btn');

colorPickerBtn.addEventListener('click', () => {
    themePicker.style.right = themePicker.style.right === '0px' ? '-35px' : '0px';
});

themeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const themeColor = btn.getAttribute('data-theme');
        changeThemeColor(themeColor);
    });
});

function changeThemeColor(theme) {
    const root = document.documentElement;
    
    const themes = {
        blue: { primary: '#2563eb', secondary: '#1e40af', accent: '#3b82f6' },
        green: { primary: '#16a34a', secondary: '#15803d', accent: '#22c55e' },
        purple: { primary: '#9333ea', secondary: '#7c3aed', accent: '#a855f7' },
        red: { primary: '#dc2626', secondary: '#b91c1c', accent: '#ef4444' },
        orange: { primary: '#ea580c', secondary: '#c2410c', accent: '#f97316' }
    };
    
    const colors = themes[theme] || themes.blue;
    
    root.style.setProperty('--primary-color', colors.primary);
    root.style.setProperty('--secondary-color', colors.secondary);
    root.style.setProperty('--accent-color', colors.accent);
    
    localStorage.setItem('themeColor', theme);
}

// Load saved theme color
const savedThemeColor = localStorage.getItem('themeColor');
if (savedThemeColor) {
    changeThemeColor(savedThemeColor);
}

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
            
            // Close mobile menu if open
            mobileMenu.classList.add('mobile-menu-hidden');
        }
    });
});

// Mobile Menu
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('mobile-menu-hidden');
    mobileMenu.classList.toggle('mobile-menu-visible');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        mobileMenu.classList.add('mobile-menu-hidden');
        mobileMenu.classList.remove('mobile-menu-visible');
    }
});

// Gallery Filter
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

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

// Back to Top Button
const backToTopBtn = document.getElementById('back-to-top');

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

// Toast notification function (for external use)
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    
    toastMessage.textContent = message;
    toast.className = type === 'error' ? 'toast toast-error' : 'toast toast-success';
    
    setTimeout(() => {
        hideToast();
    }, 5000);
}

function hideToast() {
    const toast = document.getElementById('toast');
    toast.className = 'toast-hidden';
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

// Form validation
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    const inputs = contactForm.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (input.value.trim() === '') {
                input.style.borderColor = 'var(--error-color)';
            } else {
                input.style.borderColor = 'var(--border-color)';
            }
        });
    });
}

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    // Add animation classes to elements
    const animatedElements = document.querySelectorAll('.skill-level, .project-card, .review-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
    });
    
    // Animate elements when they come into view
    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(el => {
        animateOnScroll.observe(el);
    });
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // ESC to close mobile menu
    if (e.key === 'Escape') {
        mobileMenu.classList.add('mobile-menu-hidden');
        mobileMenu.classList.remove('mobile-menu-visible');

// Force hide loading spinner on page load
document.addEventListener('DOMContentLoaded', function() {
    const loadingSpinner = document.getElementById('loading-spinner');
    if (loadingSpinner) {
        loadingSpinner.style.display = 'none';
    }
});

// And also hide it when window finishes loading
window.addEventListener('load', function() {
    const loadingSpinner = document.getElementById('loading-spinner');
    if (loadingSpinner) {
        loadingSpinner.style.display = 'none';
    }
    console.log("Page fully loaded - spinner hidden");
});