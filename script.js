// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

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

// Smooth Scrolling
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

// Enhanced Animations on Page Load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Site loaded with animations! 🎉');
    
    // Typewriter effect for hero text
    const heroText = document.querySelector('.hero-content h2');
    if (heroText) {
        heroText.style.animation = 'typewriter 2s steps(20) 1s both, blink 0.8s infinite';
    }
    
    // Scroll animations
    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, 100);
            }
        });
    }, { threshold: 0.1 });
    
    // Observe all animate-on-scroll elements
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        animateOnScroll.observe(el);
    });
    
    // Floating effect for WhatsApp button
    const whatsappBtn = document.querySelector('.btn.primary');
    if (whatsappBtn) {
        setInterval(() => {
            whatsappBtn.style.transform = 'translateY(-5px)';
            setTimeout(() => {
                whatsappBtn.style.transform = 'translateY(0)';
            }, 500);
        }, 2000);
    }
});

// Enhanced WhatsApp Integration with Animations
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('user-name').value;
    const email = document.getElementById('user-email').value;
    const message = document.getElementById('user-message').value;
    
    // Animate button while processing
    const submitBtn = this.querySelector('button');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        // CUSTOMIZED WHATSAPP MESSAGE
        const whatsappText = 
            `👨💻 *NEW PORTFOLIO MESSAGE* 👨💻%0A%0A` +
            `*From:* ${name}%0A` +
            `*Email:* ${email}%0A%0A` +
            `*Message:*%0A${message}%0A%0A` +
            `*Time:* ${new Date().toLocaleString()}%0A` +
            `*Portfolio:* idelerichmond.netlify.app%0A%0A` +
            `💡 *Quick Reply:*%0A` +
            `Hello ${name.split(' ')[0]}! Thanks for checking out my portfolio. I'll get back to you shortly.`;
        
        // Your number
        const yourNumber = '2348149357007';
        
        // Open WhatsApp
        const newWindow = window.open(`https://wa.me/${yourNumber}?text=${whatsappText}`, '_blank');
        
        // Success animation
        if (newWindow) {
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
            submitBtn.style.background = '#25D366';
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            }, 2000);
        } else {
            // If window didn't open, reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            alert('Please allow pop-ups for WhatsApp to open.');
        }
        
        // Reset form
        this.reset();
    }, 1000);
});