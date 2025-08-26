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
            } else {
                item.style.display = 'none';
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

// Netlify Forms - Simple success message
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        // Let Netlify handle the submission
        // Just show a success message
        setTimeout(() => {
            alert('Thank you for your message! I will get back to you soon.');
        }, 1000);
    });
}

console.log("Website loaded successfully!");