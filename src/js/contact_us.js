const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("email_subject").value.trim();
  const message = document.getElementById("email_body").value.trim();

  // Clear previous errors
  document.getElementById("emailError").textContent = "";
  document.getElementById("subjectError").textContent = "";
  document.getElementById("messageError").textContent = "";

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    document.getElementById("emailError").textContent = "Please enter a valid email address";
    return;
  }

  // Validate subject
  if (subject.length < 3) {
    document.getElementById("subjectError").textContent = "Subject must be at least 3 characters long";
    return;
  }

  // Validate message
  if (!message) {
    document.getElementById("messageError").textContent = "Message cannot be empty";
    return;
  }

  // Reset the form and show success
  contactForm.reset();
  alert("Message sent successfully");
});
