document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".section-nav a");
  const sections = document.querySelectorAll(".scroll-target");

  if (!navLinks.length || !sections.length) return;

  const setActiveLink = (id) => {
    navLinks.forEach((link) => {
      const target = link.getAttribute("href");
      link.classList.toggle("is-active", target === `#${id}`);
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      let visibleSection = null;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          visibleSection = entry.target;
        }
      });

      if (visibleSection) {
        setActiveLink(visibleSection.id);
      }
    },
    {
      root: null,
      rootMargin: "-35% 0px -35% 0px",
      threshold: 0.2
    }
  );

  sections.forEach((section) => observer.observe(section));

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const id = link.getAttribute("href")?.replace("#", "");
      if (id) setActiveLink(id);
    });
  });
});