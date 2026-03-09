document.addEventListener("DOMContentLoaded", () => {
  const navLinks = Array.from(document.querySelectorAll(".section-nav a"));
  const sections = Array.from(document.querySelectorAll(".scroll-target"));

  if (!navLinks.length || !sections.length) return;

  function setActiveLink(id) {
    navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      link.classList.toggle("is-active", href === `#${id}`);
    });
  }

  function updateActiveLinkOnScroll() {
    const nav = document.querySelector(".section-nav");
    const offset = (nav ? nav.offsetHeight : 0) + 28;

    let currentSectionId = sections[0].id;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - offset;
      if (window.scrollY >= sectionTop) {
        currentSectionId = section.id;
      }
    });

    setActiveLink(currentSectionId);
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const id = link.getAttribute("href")?.replace("#", "");
      if (id) setActiveLink(id);
    });
  });

  window.addEventListener("scroll", updateActiveLinkOnScroll, { passive: true });
  window.addEventListener("resize", updateActiveLinkOnScroll);

  updateActiveLinkOnScroll();
});