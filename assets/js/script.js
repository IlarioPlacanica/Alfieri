document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".section-nav");
  const navLinks = Array.from(document.querySelectorAll(".section-nav a"));
  const sections = Array.from(document.querySelectorAll(".scroll-target"));

  if (!nav || !navLinks.length || !sections.length) return;

  let isManualScrolling = false;
  let manualScrollTimeout = null;

  function getOffset() {
    return nav.offsetHeight + 18;
  }

  function setActiveLink(id) {
    navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      link.classList.toggle("is-active", href === `#${id}`);
    });
  }

  function updateActiveLinkOnScroll() {
    if (isManualScrolling) return;

    const offset = getOffset();
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
    link.addEventListener("click", (event) => {
      event.preventDefault();

      const targetId = link.getAttribute("href")?.replace("#", "");
      const targetSection = document.getElementById(targetId);
      if (!targetSection) return;

      setActiveLink(targetId);

      isManualScrolling = true;
      clearTimeout(manualScrollTimeout);

      const targetTop = targetSection.offsetTop - getOffset();

      window.scrollTo({
        top: targetTop,
        behavior: "smooth"
      });

      manualScrollTimeout = setTimeout(() => {
        isManualScrolling = false;
        updateActiveLinkOnScroll();
      }, 700);
    });
  });

  window.addEventListener("scroll", updateActiveLinkOnScroll, { passive: true });
  window.addEventListener("resize", updateActiveLinkOnScroll);

  updateActiveLinkOnScroll();
});