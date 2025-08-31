// Enhanced Portfolio Animations
class PortfolioAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.setupTheme();
        this.setupSmoothScrolling();
        this.setupAnimations();
        this.setupWhatsAppIntegration();
        this.setupParallaxEffects();
        this.setupPageTransition();
    }

    setupTheme() {
        const themeToggle = document.getElementById('theme-toggle');
        const body = document.body;

        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            body.setAttribute('data-theme', savedTheme);
            this.updateToggleButton(savedTheme);
        }

        themeToggle.addEventListener('click', () => {
            const currentTheme = body.getAttribute('data-theme') || 'light';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            // Add transition class for smooth theme change
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

    setupAnimations() {
        console.log('🚀 Portfolio animations loaded successfully!');

        // Typewriter effect for hero text
        const heroText = document.querySelector('.hero-content h2');
        if (heroText) {
            heroText.style.animation = 'typewriter 2.5s steps(25) 1s both, blink 0.8s infinite';
        }

        // Scroll animations with Intersection Observer
        this.setupScrollAnimations();

        // Floating effects
        this.setupFloatingAnimations();

        // Staggered animations
        this.setupStaggeredAnimations();

        // Background particles
        this.createParticles();
    }

    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        const elementObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, 100);
                }
            });
        }, { threshold: 0.1 });

        // Observe sections
        document.querySelectorAll('.section').forEach(section => {
            sectionObserver.observe(section);
        });

        // Observe individual elements
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            elementObserver.observe(el);
        });
    }

    setupFloatingAnimations() {
        const floatingElements = document.querySelectorAll('.hero-buttons, .project-card');
        
        floatingElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                el.style.animation = 'float 2s ease-in-out infinite';
            });
            
            el.addEventListener('mouseleave', () => {
                el.style.animation = '';
            });
        });
    }

    setupStaggeredAnimations() {
        // Add random slight delays for natural feel
        const skills = document.querySelectorAll('.skill');
        const projects = document.querySelectorAll('.project-card');
        
        skills.forEach((skill, index) => {
            skill.style.transitionDelay = `${0.1 + (index * 0.1)}s`;
        });
        
        projects.forEach((project, index) => {
            project.style.transitionDelay = `${0.1 + (index * 0.15)}s`;
        });
    }

    setupParallaxEffects() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.hero-content');
            
            parallaxElements.forEach(el => {
                const speed = 0.5;
                el.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }

    setupPageTransition() {
        // Add page load animation
        document.body.classList.add('page-loaded');
        
        // Remove loading class after page load
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.body.classList.remove('page-loaded');
                document.body.classList.add('page-ready');
            }, 1000);
        });
    }

    createParticles() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: ${2 + Math.random() * 3}px;
                height: ${2 + Math.random() * 3}px;
                background: rgba(255, 255, 255, ${0.3 + Math.random() * 0.4});
                border-radius: 50%;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                animation: floatParticle ${10 + Math.random() * 10}s ease-in-out infinite;
                animation-delay: ${Math.random() * 5}s;
            `;
            hero.appendChild(particle);
        }
    }

    setupWhatsAppIntegration() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('user-name').value;
            const email = document.getElementById('user-email').value;
            const message = document.getElementById('user-message').value;
            
            const submitBtn = form.querySelector('button');
            const originalText = submitBtn.innerHTML;
            
            // Animate button
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            submitBtn.style.animation = 'pulse 0.6s ease-in-out infinite';
            
            setTimeout(() => {
                const whatsappText = 
                    `👨💻 *NEW PORTFOLIO MESSAGE* 👨💻%0A%0A` +
                    `*From:* ${name}%0A` +
                    `*Email:* ${email}%0A%0A` +
                    `*Message:*%0A${message}%0A%0A` +
                    `*Time:* ${new Date().toLocaleString()}%0A` +
                    `*Portfolio:* idelerichmond.netlify.app%0A%0A` +
                    `💡 *Quick Reply:*%0A` +
                    `Hello ${name.split(' ')[0]}! Thanks for checking out my portfolio. I'll get back to you shortly.`;
                
                const yourNumber = '2348149357007';
                
                const newWindow = window.open(`https://wa.me/${yourNumber}?text=${whatsappText}`, '_blank');
                
                if (newWindow) {
                    // Success animation
                    submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent Successfully!';
                    submitBtn.style.background = '#25D366';
                    submitBtn.style.animation = 'bounce 0.6s ease';
                    
                    setTimeout(() => {
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                        submitBtn.style.background = '';
                        submitBtn.style.animation = '';
                    }, 2000);
                } else {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.animation = '';
                    alert('Please allow pop-ups for WhatsApp to open.');
                }
                
                form.reset();
            }, 1500);
        });
    }
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioAnimations();
});

// Add CSS for particles
const style = document.createElement('style');
style.textContent = `
    @keyframes floatParticle {
        0%, 100% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0;
        }
        50% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) translateX(100px) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes rotateIn {
        from {
            transform: rotate(0deg) scale(0);
            opacity: 0;
        }
        to {
            transform: rotate(360deg) scale(1);
            opacity: 1;
        }
    }
    
    @keyframes bounce {
        0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
        }
        40% {
            transform: translateY(-20px);
        }
        60% {
            transform: translateY(-10px);
        }
    }
    
    .theme-transition {
        transition: all 0.3s ease !important;
    }
    
    .page-loaded {
        opacity: 0;
        animation: fadeIn 1s ease-in forwards;
    }
    
    .page-ready {
        opacity: 1;
    }
`;
document.head.appendChild(style);