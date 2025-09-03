/* IDDEVELOPER — Interactivity, Animations, EmailJS */

// ===== Utility: Toast
const toastEl = document.getElementById('toast');
function toast(msg, type = 'info'){
  if(!toastEl) return;
  toastEl.textContent = msg;
  toastEl.style.borderColor = type === 'success' ? 'rgba(0,255,127,.35)' :
                              type === 'error'   ? 'rgba(255,99,99,.45)' :
                              'rgba(255,255,255,.15)';
  toastEl.style.display = 'block';
  setTimeout(()=> toastEl.style.display = 'none', 4200);
}

// ===== Year
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Mobile Nav
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
if(navToggle){
  navToggle.addEventListener('click', ()=>{
    const open = siteNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
}

// ===== Particles (tiny, no library)
(function particles(){
  const canvas = document.getElementById('particles');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, dots;
  const DPR = Math.min(2, window.devicePixelRatio || 1);

  function resize(){
    w = canvas.width = canvas.offsetWidth * DPR;
    h = canvas.height = canvas.offsetHeight * DPR;
    ctx.scale(DPR, DPR);
    dots = Array.from({length: 60}, ()=> ({
      x: Math.random()*canvas.offsetWidth,
      y: Math.random()*canvas.offsetHeight,
      vx: (Math.random()-0.5)*0.3,
      vy: (Math.random()-0.5)*0.3,
      r: Math.random()*1.6 + 0.4,
      a: Math.random()*0.5 + 0.2
    }));
  }
  function step(){
    ctx.clearRect(0,0,canvas.offsetWidth, canvas.offsetHeight);
    ctx.globalCompositeOperation = 'lighter';
    dots.forEach(p=>{
      p.x += p.vx; p.y += p.vy;
      if(p.x<0||p.x>canvas.offsetWidth) p.vx*=-1;
      if(p.y<0||p.y>canvas.offsetHeight) p.vy*=-1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fillStyle = `rgba(255,215,0,${p.a})`;
      ctx.fill();
    });
    requestAnimationFrame(step);
  }
  window.addEventListener('resize', resize);
  resize(); step();
})();

// ===== GSAP Reveal Animations
window.addEventListener('load', ()=>{
  if (window.gsap && window.ScrollTrigger){
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray('.reveal-up').forEach((el, i)=>{
      gsap.to(el, {
        y: 0, opacity: 1, duration: .9, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%' }
      });
    });
    gsap.utils.toArray('.reveal-fade').forEach((el)=>{
      gsap.to(el, {
        opacity: 1, duration: 1, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 85%' }
      });
    });
  }
});

// ===== Smooth anchor focus (a11y)
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const id = a.getAttribute('href');
    const target = document.querySelector(id);
    if(target){
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth', block:'start'});
      target.setAttribute('tabindex','-1'); target.focus({preventScroll:true});
    }
  });
});

// ===== EmailJS (configured with your IDs)
const EMAILJS_SERVICE = 'service_0vmnuza';
const EMAILJS_TEMPLATE = 'template_656cmtc';
const EMAILJS_PUBLIC = 'GhtvHEbXzgoG8HFQ8';

function initEmailJS(){
  if(!window.emailjs) return;
  emailjs.init({ publicKey: EMAILJS_PUBLIC });
}
document.addEventListener('DOMContentLoaded', initEmailJS);

// Compose params in a consistent way across forms
function sendEmailJS({from_name, from_email, subject, message, meta = {}}){
  if(!window.emailjs){ toast('Email service not loaded. Try again.', 'error'); return Promise.reject('No EmailJS'); }
  const params = {
    from_name,
    from_email,
    subject,
    message,
    // Extra metadata fields the template can reference:
    role: meta.role || '',
    service: meta.service || '',
    track: meta.track || '',
    portfolio: meta.portfolio || '',
  };
  return emailjs.send(EMAILJS_SERVICE, EMAILJS_TEMPLATE, params);
}

// ===== Forms
function handleStudentForm(){
  const form = document.getElementById('studentForm');
  if(!form) return;
  form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const name = form.student_name.value.trim();
    const email = form.student_email.value.trim();
    const track = form.student_track.value;
    const subject = `New Student Sign-Up — ${track}`;
    const message = `Student: ${name}\nEmail: ${email}\nTrack: ${track}`;

    try{
      form.querySelector('button[type="submit"]').disabled = true;
      await sendEmailJS({from_name:name, from_email:email, subject, message, meta:{role:'Student', track}});
      toast('Student sign-up sent. We’ll contact you soon ✅', 'success');
      form.reset();
    }catch(err){
      console.error(err);
      toast('Could not send sign-up. Please try again.', 'error');
    }finally{
      form.querySelector('button[type="submit"]').disabled = false;
    }
  });
}

function handleClientForm(){
  const form = document.getElementById('clientForm');
  if(!form) return;
  form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const name = form.client_name.value.trim();
    const email = form.client_email.value.trim();
    const service = form.client_service.value;
    const brief = form.client_message.value.trim();
    const subject = `Client Project Request — ${service}`;
    const message = `Client: ${name}\nEmail: ${email}\nService: ${service}\n\nBrief:\n${brief}`;

    try{
      form.querySelector('button[type="submit"]').disabled = true;
      await sendEmailJS({from_name:name, from_email:email, subject, message, meta:{role:'Client', service}});
      toast('Request sent. We’ll reply shortly ✅', 'success');
      form.reset();
    }catch(err){
      console.error(err);
      toast('Could not send request. Please try again.', 'error');
    }finally{
      form.querySelector('button[type="submit"]').disabled = false;
    }
  });
}

function handleWorkerForm(){
  const form = document.getElementById('workerForm');
  if(!form) return;
  form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const name = form.worker_name.value.trim();
    const email = form.worker_email.value.trim();
    const role = form.worker_role.value;
    const portfolio = form.worker_portfolio.value.trim();
    const about = form.worker_message.value.trim();
    const subject = `Expert Registration — ${role}`;
    const message = `Expert: ${name}\nEmail: ${email}\nRole: ${role}\nPortfolio: ${portfolio}\n\nAbout:\n${about}`;

    try{
      form.querySelector('button[type="submit"]').disabled = true;
      await sendEmailJS({from_name:name, from_email:email, subject, message, meta:{role:'Worker', portfolio}});
      toast('Application submitted. Thank you! ✅', 'success');
      form.reset();
    }catch(err){
      console.error(err);
      toast('Could not submit application. Please try again.', 'error');
    }finally{
      form.querySelector('button[type="submit"]').disabled = false;
    }
  });
}

function handleContactForm(){
  const form = document.getElementById('contactForm');
  if(!form) return;
  form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const name = form.contact_name.value.trim();
    const email = form.contact_email.value.trim();
    const messageBody = form.contact_message.value.trim();
    const subject = `General Inquiry`;

    try{
      form.querySelector('button[type="submit"]').disabled = true;
      await sendEmailJS({from_name:name, from_email:email, subject, message:messageBody, meta:{role:'Contact'}});
      toast('Message sent. We’ll be in touch ✅', 'success');
      form.reset();
    }catch(err){
      console.error(err);
      toast('Could not send message. Please try again.', 'error');
    }finally{
      form.querySelector('button[type="submit"]').disabled = false;
    }
  });
}

// Initialize forms
document.addEventListener('DOMContentLoaded', ()=>{
  handleStudentForm();
  handleClientForm();
  handleWorkerForm();
  handleContactForm();
});