// Professional Portfolio Animations for IDDEVELOPER Company
class ProfessionalPortfolio {
    constructor() {
        this.init();
    }

    init() {
        this.setupTheme();
        this.setupSmoothScrolling();
        this.setupScrollProgress();
        this.setupAnimations();
        this.setupContactForm();
        this.setupProfessionalEffects();
        
        console.log('IDDEVELOPER Portfolio - Professional Edition Loaded 🚀');
    }

    setupTheme() {
        const themeToggle = document.getElementById('theme-toggle');
        const body = document.body;

        // Check for saved theme preference or use 'light' as default
        const savedTheme = localStorage.getItem('theme') || 'light';
        body.setAttribute('data-theme', savedTheme);
        this.updateToggleButton(savedTheme);

        themeToggle.addEventListener('click', () => {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            // Add smooth transition class
            body.classList.add('theme-transition');
            
            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            this.updateToggleButton(newTheme);

            // Remove transition class after animation
            setTimeout(() => {
                body.classList.remove('theme-transition');
            }, 300);
        });
    }

    updateToggleButton(theme) {
        const themeToggle = document.getElementById('theme-toggle');
        themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
        themeToggle.style.animation = 'rotateIn 0.5s ease';
        
        setTimeout(() => {
            themeToggle.style.animation = '';
        }, 500);
    }

    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    setupScrollProgress() {
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.offsetHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            const progressBar = document.querySelector('.progress-bar');
            if (progressBar) {
                progressBar.style.width = scrollPercent + '%';
            }
        });
    }

    setupAnimations() {
        // Set up Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, 100);
                }
            });
        }, observerOptions);

        // Observe all animate-on-scroll elements
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });

        // Observe sections
        document.querySelectorAll('.section').forEach(section => {
            observer.observe(section);
        });

        // Hero text animation
        this.animateHeroText();
    }

    animateHeroText() {
        const heroText = document.querySelector('.hero-content h2');
        if (!heroText) return;

        // Add typewriter effect
        heroText.style.overflow = 'hidden';
        heroText.style.borderRight = '3px solid var(--accent-color)';
        heroText.style.whiteSpace = 'nowrap';
        heroText.style.animation = 'typewriter 2.5s steps(25) 1s both, blink 0.8s infinite';
    }

    setupContactForm() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('user-name').value,
                email: document.getElementById('user-email').value,
                company: document.getElementById('company').value,
                message: document.getElementById('user-message').value
            };

            this.handleFormSubmission(formData, form);
        });
    }

    handleFormSubmission(formData, form) {
        const submitBtn = form.querySelector('button');
        const originalText = submitBtn.innerHTML;

        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        submitBtn.style.animation = 'pulse 1s infinite';

        // Simulate form submission
        setTimeout(() => {
            // Success message
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent Successfully!';
            submitBtn.style.background = 'var(--success-color)';
            submitBtn.style.animation = 'bounce 0.6s ease';
            
            // Reset form
            form.reset();
            
            // Reset button after delay
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
                submitBtn.style.animation = '';
            }, 3000);
        }, 2000);
    }

    setupProfessionalEffects() {
        // Add hover effects to cards
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

        // Add floating animation to hero buttons
        const heroButtons = document.querySelector('.hero-buttons');
        if (heroButtons) {
            heroButtons.style.animation = 'float 4s ease-in-out infinite';
        }

        // Add particle effect to hero section
        this.createParticles();
    }

    createParticles() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        for (let i = 0; i < 15; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
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
}

// Add required CSS animations
const animationStyles = document.createElement('style');
animationStyles.textContent = `
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
    
    @keyframes rotateIn {
        from {
            transform: rotate(0deg) scale(0.8);
            opacity: 0;
        }
        to {
            transform: rotate(360deg) scale(1);
            opacity: 1;
        }
    }
    
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
            opacity: 1;
        }
        50% {
            transform: scale(1.05);
            opacity: 0.8;
        }
    }
    
    @keyframes bounce {
        0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
        }
        40% {
            transform: translateY(-15px);
        }
        60% {
            transform: translateY(-7px);
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
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0;
        }
        50% {
            opacity: 0.6;
        }
        100% {
            transform: translateY(-100vh) translateX(100px) rotate(360deg);
            opacity: 0;
        }
    }
    
    .theme-transition * {
        transition: all 0.3s ease !important;
    }
    
    /* Scroll animation classes */
    .animate-on-scroll {
        opacity: 0;
        transform: translateY(50px);
        transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .animate-on-scroll.visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    .section {
        opacity: 0;
        transform: translateY(50px);
        transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .section.visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    /* Staggered animations */
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
    
    /* Hero text animation */
    .hero-content h2 {
        overflow: hidden;
        border-right: 3px solid var(--accent-color);
        white-space: nowrap;
        animation: typewriter 2.5s steps(25) 1s both, blink 0.8s infinite;
    }
`;

document.head.appendChild(animationStyles);

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Small delay to ensure all elements are rendered
    setTimeout(() => {
        new ProfessionalPortfolio();
    }, 100);
});

// Also initialize when window is fully loaded (images, etc.)
window.addEventListener('load', function() {
    console.log('Page fully loaded - animations active');
});