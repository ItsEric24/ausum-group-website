// Contact Form JavaScript
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", handleFormSubmission);
  }

  // Add real-time validation
  const formInputs = contactForm.querySelectorAll("input, textarea, select");
  formInputs.forEach((input) => {
    input.addEventListener("blur", validateField);
    input.addEventListener("input", clearFieldError);
  });
});

function handleFormSubmission(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  };

  // Validate form
  if (!validateForm(data)) {
    return;
  }

  // Show loading state
  const submitButton = e.target.querySelector('button[type="submit"]');
  const originalText = submitButton.textContent;
  submitButton.textContent = "Sending...";
  submitButton.disabled = true;

  // Simulate form submission (replace with actual API call)
  setTimeout(() => {
    showSuccessMessage();
    e.target.reset();
    submitButton.textContent = originalText;
    submitButton.disabled = false;
  }, 2000);
}

function validateForm(data) {
  let isValid = true;

  // Clear previous errors
  clearAllErrors();

  // Validate name
  if (!data.name || data.name.trim().length < 2) {
    showFieldError(
      "name",
      "Please enter your full name (at least 2 characters)"
    );
    isValid = false;
  }

  // Validate email
  if (!data.email || !isValidEmail(data.email)) {
    showFieldError("email", "Please enter a valid email address");
    isValid = false;
  }

  // Validate message
  if (!data.message || data.message.trim().length < 10) {
    showFieldError(
      "message",
      "Please enter a message (at least 10 characters)"
    );
    isValid = false;
  }

  return isValid;
}

function validateField(e) {
  const field = e.target;
  const value = field.value.trim();

  clearFieldError(e);

  switch (field.name) {
    case "name":
      if (value && value.length < 2) {
        showFieldError("name", "Name must be at least 2 characters");
      }
      break;
    case "email":
      if (value && !isValidEmail(value)) {
        showFieldError("email", "Please enter a valid email address");
      }
      break;
    case "message":
      if (value && value.length < 10) {
        showFieldError("message", "Message must be at least 10 characters");
      }
      break;
  }
}

function clearFieldError(e) {
  const field = e.target;
  const formGroup = field.closest(".form-group");
  formGroup.classList.remove("error");

  const errorMessage = formGroup.querySelector(".error-message");
  if (errorMessage) {
    errorMessage.remove();
  }
}

function showFieldError(fieldName, message) {
  const field = document.querySelector(`[name="${fieldName}"]`);
  const formGroup = field.closest(".form-group");
  formGroup.classList.add("error");

  // Remove existing error message
  const existingError = formGroup.querySelector(".error-message");
  if (existingError) {
    existingError.remove();
  }

  // Add new error message
  const errorElement = document.createElement("span");
  errorElement.className = "error-message";
  errorElement.style.color = "var(--color-error)";
  errorElement.style.fontSize = "0.875rem";
  errorElement.style.marginTop = "var(--spacing-xs)";
  errorElement.textContent = message;
  formGroup.appendChild(errorElement);
}

function clearAllErrors() {
  const formGroups = document.querySelectorAll(".form-group");
  formGroups.forEach((group) => {
    group.classList.remove("error");
    const errorMessage = group.querySelector(".error-message");
    if (errorMessage) {
      errorMessage.remove();
    }
  });

  // Remove any existing success/error messages
  const existingMessages = document.querySelectorAll(
    ".form-success, .form-error"
  );
  existingMessages.forEach((msg) => msg.remove());
}

function showSuccessMessage() {
  const form = document.getElementById("contactForm");
  const successMessage = document.createElement("div");
  successMessage.className = "form-success fade-in";
  successMessage.innerHTML = `
    <h4>Message Sent Successfully! 🎉</h4>
    <p>Thank you for reaching out to Ausum Group. We've received your message and will get back to you within 24-48 hours.</p>
  `;

  form.parentNode.insertBefore(successMessage, form);

  // Scroll to success message
  successMessage.scrollIntoView({ behavior: "smooth", block: "center" });

  // Remove success message after 10 seconds
  setTimeout(() => {
    if (successMessage.parentNode) {
      successMessage.remove();
    }
  }, 10000);
}

function showErrorMessage(message) {
  const form = document.getElementById("contactForm");
  const errorMessage = document.createElement("div");
  errorMessage.className = "form-error fade-in";
  errorMessage.innerHTML = `
    <h4>Oops! Something went wrong</h4>
    <p>${message}</p>
  `;

  form.parentNode.insertBefore(errorMessage, form);

  // Scroll to error message
  errorMessage.scrollIntoView({ behavior: "smooth", block: "center" });

  // Remove error message after 8 seconds
  setTimeout(() => {
    if (errorMessage.parentNode) {
      errorMessage.remove();
    }
  }, 8000);
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Character counter for textarea
const messageTextarea = document.getElementById("message");
if (messageTextarea) {
  const formGroup = messageTextarea.closest(".form-group");
  const counter = document.createElement("div");
  counter.className = "character-counter";
  counter.style.textAlign = "right";
  counter.style.fontSize = "0.875rem";
  counter.style.color = "var(--color-gray-500)";
  counter.style.marginTop = "var(--spacing-xs)";
  formGroup.appendChild(counter);

  function updateCounter() {
    const length = messageTextarea.value.length;
    counter.textContent = `${length} characters`;

    if (length < 10) {
      counter.style.color = "var(--color-error)";
    } else if (length > 500) {
      counter.style.color = "var(--color-warning)";
    } else {
      counter.style.color = "var(--color-success)";
    }
  }

  messageTextarea.addEventListener("input", updateCounter);
  updateCounter(); // Initial call
}
