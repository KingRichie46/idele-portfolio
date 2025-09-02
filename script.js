// Initialize EmailJS
(function() {
  emailjs.init("GhtvHEbXzgoG8HFQ8"); // Public Key
})();

// Contact Form Submission
document.getElementById("contact-form").addEventListener("submit", function(e) {
  e.preventDefault();

  const sendBtn = document.getElementById("sendBtn");
  const btnText = sendBtn.querySelector(".btn-text");
  const spinner = sendBtn.querySelector(".spinner");
  const status = document.getElementById("status");

  // Show spinner
  btnText.textContent = "Sending...";
  spinner.style.display = "inline-block";
  sendBtn.disabled = true;

  emailjs.sendForm("service_0vmnuza", "template_656cmtc", this)
    .then(() => {
      btnText.textContent = "✅ Sent!";
      spinner.style.display = "none";
      status.innerHTML = "<span class='success'>Message sent successfully!</span>";
      this.reset();
    }, (err) => {
      btnText.textContent = "❌ Try Again";
      spinner.style.display = "none";
      status.innerHTML = "<span class='error'>Failed to send. Please try again.</span>";
      console.error("EmailJS Error:", err);
    })
    .finally(() => {
      setTimeout(() => {
        btnText.textContent = "Send Message";
        sendBtn.disabled = false;
      }, 3000);
    });
});

// GSAP Animations
gsap.from(".hero h1", {opacity:0, y:-50, duration:1});
gsap.from(".hero p", {opacity:0, y:50, duration:1, delay:0.5});
gsap.from(".hero-buttons", {opacity:0, duration:1, delay:1});

gsap.utils.toArray("section").forEach(section => {
  gsap.from(section, {
    scrollTrigger: {trigger: section, start: "top 80%"},
    opacity: 0, y: 50, duration: 1
  });
});