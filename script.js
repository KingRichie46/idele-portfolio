document.addEventListener('DOMContentLoaded', () => {
  // GSAP Intro Animation (Landing Page)
  if (document.querySelector('.hero-title')) {
    const tl = gsap.timeline();
    tl.from(".logo", {duration: 1, opacity: 0, scale: 0.5, delay: 0.5})
      .from(".hero-title", {duration: 1, opacity: 0, y: 30})
      .from(".hero-subtitle", {duration: 1, opacity: 0, y: 30})
      .from(".cta-btn", {duration: 0.8, opacity: 0, scale: 0.8, stagger: 0.2});
  }

  // EmailJS Contact Form (Clients & Contact pages)
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    // Initialize EmailJS with public key
    emailjs.init('GhtvHEbXzgoG8HFQ8');
    contactForm.addEventListener('submit', function(event) {
      event.preventDefault();
      emailjs.sendForm('service_0vmnuza', 'template_656cmtc', this)
        .then(() => {
          alert('Message sent!');
          contactForm.reset();
        }, (error) => {
          alert('Send failed: ' + error);
        });
    });
  }
});