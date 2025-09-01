// Professional Portfolio Animations for IDDEVELOPER Company
class ProfessionalPortfolio {
    constructor() {
        this.init();
    }

    init() {
        this.setupTheme();
        this.setupSmoothScrolling();
        this.setupAnimations();
        this.setupContactForm();
        this.setupScrollProgress();
        this.setupProfessionalEffects();
    }

    setupTheme() {
        const themeToggle = document.getElementById('theme-toggle');
        const body = document.body;

        const savedTheme = localStorage.getItem('theme') || 'light';
        body.setAttribute('data-theme', savedTheme);
        this.updateToggleButton(savedTheme);

        themeToggle.addEventListener('click', () => {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            this.updateToggleButton(newTheme);
        });
    }

    updateToggleButton(theme) {
        const themeToggle = document.getElementById('theme-toggle');
        themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
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
        // Intersection Observer for scroll animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });
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

        // Simulate form submission
        setTimeout(() => {
            // Success message
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent Successfully!';
            submitBtn.style.background = 'var(--success-color)';
            
            // Reset form
            form.reset();
            
            // Reset button after delay
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            }, 3000);
        }, 2000);
    }

    setupProfessionalEffects() {
        // Add subtle hover effects to cards
        const cards = document.querySelectorAll('.service-card, .project-card, .testimonial-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-5px)';
                card.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
            });
        });

        // Add typing effect to hero text
        this.typeWriterEffect();
    }

    typeWriterEffect() {
        const heroText = document.querySelector('.hero-content h2');
        if (!heroText) return;

        const text = heroText.textContent;
        heroText.textContent = '';
        let i = 0;

        function typeWriter() {
            if (i < text.length) {
                heroText.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }

        // Start typing effect after a delay
        setTimeout(typeWriter, 1000);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ProfessionalPortfolio();
    console.log('IDDEVELOPER Portfolio - Professional Edition Loaded');
});

// Add professional styles
const professionalStyles = `
    .service-card, .testimonial-card, .project-card {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .btn {
        transition: all 0.3s ease;
        font-weight: 500;
    }
    
    .btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .animate-on-scroll {
        animation: fadeInUp 0.6s ease-out forwards;
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = professionalStyles;
document.head.appendChild(styleSheet);