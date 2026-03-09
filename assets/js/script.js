document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".section-nav a");

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");
      if (!href || !href.startsWith("#")) return;
      const target = document.querySelector(href);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  console.log("A14 layout caricato");
});
