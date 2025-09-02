// ================= EmailJS Init =================
// Using EmailJS Browser SDK v4
window.addEventListener("DOMContentLoaded", () => {
  if (window.emailjs) {
    // Public key provided by user
    emailjs.init({ publicKey: "GhtvHEbXzgoG8HFQ8" });
  }
});

// ================= Mobile Nav Toggle =================
const toggle = document.querySelector('.nav-toggle');
const navList = document.querySelector('.nav-list');
if (toggle && navList) {
  toggle.addEventListener('click', () => {
    const open = navList.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
}

// ================= Smooth Scroll (native) =================
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (href.length > 1) {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      navList?.classList.remove('open');
      toggle?.setAttribute('aria-expanded', 'false');
    }
  });
});

// ================= GSAP Animations =================
window.addEventListener('load', () => {
  // Header drop-in
  gsap.from('.site-header', { y: -40, opacity: 0, duration: 0.8, ease: 'power3.out' });

  // Hero text sliding & button scale
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  tl.from('.hero-title', { y: 30, opacity: 0, duration: 0.9 })
    .from('.hero-subtitle', { y: 24, opacity: 0, duration: 0.7 }, '-=0.5')
    .from('.hero-cta .btn', { scale: 0.85, opacity: 0, stagger: 0.12, duration: 0.5 }, '-=0.4');

  // Section cards fade-up on scroll
  if (window.ScrollTrigger) {
    gsap.utils.toArray('[data-animate], .testimonial, .gallery-item, .card').forEach(el => {
      gsap.fromTo(el, { y: 18, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      });
    });
  }
});

// ================= EmailJS Form Handling =================
const form = document.getElementById('contactForm');
const statusEl = document.getElementById('formStatus');

function setStatus(type, msg){
  if (!statusEl) return;
  statusEl.className = 'form-status ' + (type || '');
  statusEl.textContent = msg || '';
}

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('.submit-btn');
    const formData = new FormData(form);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    // Basic validation
    if (!name || !email || !message) {
      setStatus('error', 'Please fill out all fields.');
      return;
    }

    setStatus('', 'Sending…');
    submitBtn.disabled = true;

    try {
      // Service & template per user details
      const SERVICE_ID = 'service_0vmnuza';
      const TEMPLATE_ID = 'template_656cmtc';

      // EmailJS expects a params object with your template variables
      const templateParams = {
        from_name: String(name),
        reply_to: String(email),
        message: String(message)
      };

      // Send
      const res = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams);

      // Success
      setStatus('success', 'Thanks! Your message has been sent.');
      form.reset();
      console.log('EmailJS response:', res);
    } catch (err) {
      console.error('EmailJS error:', err);
      // Helpful error in UI
      const msg = (err && err.text) ? err.text : 'We could not send your message. Please try again later.';
      setStatus('error', msg);
    } finally {
      submitBtn.disabled = false;
    }
  });
}