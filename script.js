// Init EmailJS
(function(){
  emailjs.init("GhtvHEbXzgoG8HFQ8"); // Your Public Key
})();

// Handle Form Submission
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    emailjs.sendForm("service_0vmnuza", "template_656cmtc", this)
      .then(() => {
        alert("Message sent successfully!");
        form.reset();
      }, (err) => {
        alert("Failed to send message: " + JSON.stringify(err));
      });
  });
});

// GSAP Animations
gsap.from(".hero h1", { y: -50, opacity: 0, duration: 1 });
gsap.from(".hero p", { y: 50, opacity: 0, duration: 1, delay: 0.5 });
gsap.from(".hero .btn", { scale: 0, opacity: 0, duration: 0.5, stagger: 0.3, delay: 1 });

gsap.from(".service-card", {
  scrollTrigger: ".services",
  opacity: 0,
  y: 50,
  duration: 0.8,
  stagger: 0.2
});

gsap.from(".project-card", {
  scrollTrigger: ".projects",
  opacity: 0,
  scale: 0.9,
  duration: 0.8,
  stagger: 0.3
});