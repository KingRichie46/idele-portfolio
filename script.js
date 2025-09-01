// Professional Animations for IDDEVELOPER
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 IDDEVELOPER Portfolio Loaded');
    
    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Set initial theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', savedTheme);
    themeToggle.textContent = savedTheme === 'light' ? '🌙' : '☀️';
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        this.textContent = newTheme === 'light' ? '🌙' : '☀️';
        
        // Add animation to button
        this.style.transform = 'scale(1.2)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 300);
    });
    
    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
    
    // Scroll Animations
    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, 100);
            }
        });
    }, { threshold: 0.1 });
    
    // Observe all elements that should animate
    document.querySelectorAll('.service-card, .project-card, .testimonial-card, .section-title').forEach(el => {
        el.classList.add('animate-on-scroll');
        animateOnScroll.observe(el);
    });
    
    // Hero Text Typewriter Effect
    const heroText = document.querySelector('.hero-content h2');
    if (heroText) {
        heroText.style.overflow = 'hidden';
        heroText.style.borderRight = '3px solid var(--accent-color)';
        heroText.style.whiteSpace = 'nowrap';
        heroText.style.animation = 'typewriter 3s steps(30) 1s both, blink 0.8s infinite';
    }
    
    // Floating Animation for Hero Buttons
    const heroButtons = document.querySelector('.hero-buttons');
    if (heroButtons) {
        heroButtons.style.animation = 'float 4s ease-in-out infinite';
    }
    
    // Hover Effects
    const cards = document.querySelectorAll('.service-card, .project-card, .testimonial-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px)';
            card.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
        });
    });
    
    // Button Hover Effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'translateY(-3px)';
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translateY(0)';
        });
    });
    
    // Form Submission Animation
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button');
            const originalText = submitBtn.innerHTML;
            
            // Loading animation
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                // Success animation
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
                submitBtn.style.background = '#25D366';
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    this.reset();
                }, 2000);
            }, 1500);
        });
    }
    
    // Create Floating Particles in Hero Section
    createParticles();
});

// Create floating particles effect
function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${2 + Math.random() * 3}px;
            height: ${2 + Math.random() * 3}px;
            background: rgba(255, 255, 255, ${0.2 + Math.random() * 0.3});
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: floatParticle ${8 + Math.random() * 8}s ease-in-out infinite;
            animation-delay: ${Math.random() * 5}s;
            z-index: 1;
        `;
        hero.appendChild(particle);
    }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    /* Keyframe Animations */
    @keyframes typewriter {
        from { width: 0; }
        to { width: 100%; }
    }
    
    @keyframes blink {
        from, to { border-color: transparent; }
        50% { border-color: var(--accent-color); }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes float {
        0%, 100% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-10px);
        }
    }
    
    @keyframes floatParticle {
        0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0;
        }
        50% {
            opacity: 0.6;
        }
        100% {
            transform: translateY(-100vh) translateX(100px);
            opacity: 0;
        }
    }
    
    /* Scroll Animation Classes */
    .animate-on-scroll {
        opacity: 0;
        transform: translateY(50px);
        transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .animate-on-scroll.visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    /* Staggered Animations */
    .service-card:nth-child(1) { transition-delay: 0.1s; }
    .service-card:nth-child(2) { transition-delay: 0.2s; }
    .service-card:nth-child(3) { transition-delay: 0.3s; }
    .service-card:nth-child(4) { transition-delay: 0.4s; }
    
    .project-card:nth-child(1) { transition-delay: 0.1s; }
    .project-card:nth-child(2) { transition-delay: 0.2s; }
    .project-card:nth-child(3) { transition-delay: 0.3s; }
    
    .testimonial-card:nth-child(1) { transition-delay: 0.1s; }
    .testimonial-card:nth-child(2) { transition-delay: 0.2s; }
    .testimonial-card:nth-child(3) { transition-delay: 0.3s; }
    .testimonial-card:nth-child(4) { transition-delay: 0.4s; }
    
    /* Hero Text Animation */
    .hero-content h2 {
        overflow: hidden;
        border-right: 3px solid var(--accent-color);
        white-space: nowrap;
        margin: 0 auto;
        animation: typewriter 3s steps(30) 1s both, blink 0.8s infinite;
    }
    
    /* Button Transitions */
    .btn {
        transition: all 0.3s ease;
    }
    
    /* Card Transitions */
    .service-card, .project-card, .testimonial-card {
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(style);
// Mobile menu toggle (add this to your existing JS)
function setupMobileMenu() {
    const nav = document.querySelector('nav');
    const navLinks = document.querySelector('.nav-links');
    
    // Create mobile menu button
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.innerHTML = '☰';
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.style.cssText = `
        display: none;
        background: none;
        border: none;
        font-size: 1.5rem;
        color: var(--text-color);
        cursor: pointer;
    `;
    
    nav.querySelector('.nav-container').appendChild(mobileMenuBtn);
    
    // Toggle menu on click
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });
    
    // Show/hide based on screen size
    function checkScreenSize() {
        if (window.innerWidth <= 768) {
            mobileMenuBtn.style.display = 'block';
            navLinks.style.display = 'none';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.background = 'var(--card-bg)';
            navLinks.style.padding = '1rem';
        } else {
            mobileMenuBtn.style.display = 'none';
            navLinks.style.display = 'flex';
            navLinks.style.position = 'static';
        }
    }
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
}

// Call this in your DOMContentLoaded
setupMobileMenu();
// Enhanced contact form with dual submission
document.addEventListener('DOMContentLoaded', function() {
    // ... existing code ...
    
    // Contact Form Handling
    const contactForm = document.getElementById('contact-form');
    const whatsappBtn = document.getElementById('whatsapp-submit');
    
    if (contactForm) {
        // Email submission
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (e.submitter?.name === 'via-email') {
                submitViaEmail();
            }
        });
        
        // WhatsApp submission
        whatsappBtn.addEventListener('click', function() {
            if (contactForm.checkValidity()) {
                submitViaWhatsApp();
            } else {
                contactForm.reportValidity();
            }
        });
    }
    
    function submitViaEmail() {
        const formData = {
            name: document.getElementById('user-name').value,
            email: document.getElementById('user-email').value,
            company: document.getElementById('company').value,
            message: document.getElementById('user-message').value
        };
        
        // Create mailto link
        const subject = `Project Inquiry from ${formData.name}`;
        const body = `
Name: ${formData.name}
Email: ${formData.email}
Company: ${formData.company}

Message:
${formData.message}
        `.trim();
        
        window.location.href = `mailto:idele@iddeveloper.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        showSuccess('Email prepared! Please send it from your email client.');
        contactForm.reset();
    }
    
    function submitViaWhatsApp() {
        const formData = {
            name: document.getElementById('user-name').value,
            email: document.getElementById('user-email').value,
            company: document.getElementById('company').value,
            message: document.getElementById('user-message').value
        };
        
        const whatsappText = `
*IDDEVELOPER - PROJECT INQUIRY*%0A%0A
*Name:* ${formData.name}%0A
*Email:* ${formData.email}%0A
*Company:* ${formData.company}%0A%0A
*Message:*%0A${formData.message}%0A%0A
*Sent via Portfolio Website*
        `.trim();
        
        window.open(`https://wa.me/2348149357007?text=${encodeURIComponent(whatsappText)}`, '_blank');
        showSuccess('Opening WhatsApp...');
        contactForm.reset();
    }
    
    function showSuccess(message) {
        // Create success notification
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--success-color);
            color: white;
            padding: 1rem 2rem;
            border-radius: 10px;
            z-index: 10000;
            animation: slideInRight 0.3s ease;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
    
    // Create sprinkles
    createSprinkles();
    createTechPattern();
});

function createSprinkles() {
    const sprinklesContainer = document.createElement('div');
    sprinklesContainer.className = 'sprinkles';
    
    const colors = ['#8B0000', '#DC143C', '#FFD700', '#25D366', '#2563EB'];
    
    for (let i = 0; i < 50; i++) {
        const sprinkle = document.createElement('div');
        sprinkle.className = 'sprinkle';
        sprinkle.style.cssText = `
            left: ${Math.random() * 100}%;
            animation-duration: ${5 + Math.random() * 10}s;
            animation-delay: ${Math.random() * 5}s;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
        `;
        sprinklesContainer.appendChild(sprinkle);
    }
    
    document.body.appendChild(sprinklesContainer);
}

function createTechPattern() {
    const pattern = document.createElement('div');
    pattern.className = 'tech-pattern';
    document.body.appendChild(pattern);
}