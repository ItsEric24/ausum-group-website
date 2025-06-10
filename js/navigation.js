// Navigation JavaScript
document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const header = document.getElementById("header");
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-link");

  // Toggle mobile menu
  if (navToggle) {
    navToggle.addEventListener("click", () => {
      navToggle.classList.toggle("active");
      navMenu.classList.toggle("active");
      document.body.classList.toggle("no-scroll");
    });
  }

  // Handle nav link clicks in mobile view
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      navToggle.classList.remove("active");
      document.body.classList.remove("no-scroll");

      // Set active link
      navLinks.forEach((navLink) => navLink.classList.remove("active"));
      link.classList.add("active");
    });
  });

  // Header background on scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
  
  // Set active nav link based on current page
  function setActiveNavLink() {
    const currentPage =
      window.location.pathname.split("/").pop() || "index.html";

    navLinks.forEach((link) => {
      link.classList.remove("active");
      const linkHref = link.getAttribute("href");

      // Check if current page matches the link
      if (
        linkHref === currentPage ||
        (currentPage === "" && linkHref === "index.html") ||
        (currentPage === "index.html" && linkHref === "index.html")
      ) {
        link.classList.add("active");
      }
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = header.offsetHeight;
        const targetPosition =
          targetElement.getBoundingClientRect().top +
          window.scrollY -
          headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Initial call and add event listener for scroll
  setActiveNavLink();
  window.addEventListener("scroll", setActiveNavLink);
});
