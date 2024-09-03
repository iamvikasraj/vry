document.addEventListener("DOMContentLoaded", () => {
  const menuIcon = document.getElementById("menuIcon");
  const navLinks = document.getElementById("navLinks");

  menuIcon.addEventListener("click", () => {
    menuIcon.classList.toggle("active");
    navLinks.classList.toggle("active");
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuIcon.classList.remove("active");
      navLinks.classList.remove("active");
    });
  });
});
