document.addEventListener("DOMContentLoaded", () => {
  initAnchorScroll();
  initHeroVideo();
  initApartmentPageNavigation();
  initTourFullscreen();
});

/* =========================================
   GLOBAL: smooth scroll link interni
========================================= */
function initAnchorScroll() {
  const internalLinks = document.querySelectorAll('a[href^="#"]');

  if (!internalLinks.length) return;

  internalLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");

      if (!href || href === "#") return;

      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();

      const headerOffset = 20;
      const targetTop =
        target.getBoundingClientRect().top + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: targetTop,
        behavior: "smooth"
      });
    });
  });
}

/* =========================================
   HOMEPAGE: gestione video hero
========================================= */
function initHeroVideo() {
  const heroVideo = document.querySelector(".home-hero__video");

  if (!heroVideo) return;

  // Prova a far partire il video in autoplay
  const playPromise = heroVideo.play();

  if (playPromise !== undefined) {
    playPromise.catch(() => {
      // Se il browser blocca l'autoplay, resta visibile il poster
      heroVideo.classList.add("is-blocked");
    });
  }

  // Effetto leggero: pausa video se tab non attiva
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      heroVideo.pause();
    } else {
      heroVideo.play().catch(() => {
        // fallback silenzioso
      });
    }
  });
}

/* =========================================
   PAGINE APPARTAMENTO: nav sticky + sezione attiva
========================================= */
function initApartmentPageNavigation() {
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
    const activationY = window.scrollY + offset + window.innerHeight * 0.35;

    let currentSectionId = sections[0].id;

    sections.forEach((section) => {
      if (activationY >= section.offsetTop) {
        currentSectionId = section.id;
      }
    });

    const nearBottom =
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 4;

    if (nearBottom) {
      currentSectionId = sections[sections.length - 1].id;
    }

    setActiveLink(currentSectionId);
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href")?.replace("#", "");
      const targetSection = document.getElementById(targetId);

      if (!targetId || !targetSection) return;

      event.preventDefault();
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
}

/* =========================================
   PAGINE APPARTAMENTO: fullscreen tour
========================================= */
function initTourFullscreen() {
  const tourContainer = document.getElementById("tour-container");
  const tourFullscreenBtn = document.getElementById("tour-fullscreen-btn");

  if (!tourContainer || !tourFullscreenBtn) return;

  tourFullscreenBtn.addEventListener("click", async () => {
    try {
      if (!document.fullscreenElement) {
        await tourContainer.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error("Errore fullscreen tour:", error);
    }
  });

  document.addEventListener("fullscreenchange", () => {
    if (document.fullscreenElement === tourContainer) {
      tourFullscreenBtn.textContent = "✕";
      tourFullscreenBtn.setAttribute("aria-label", "Esci da schermo intero");
    } else {
      tourFullscreenBtn.textContent = "⤢";
      tourFullscreenBtn.setAttribute("aria-label", "Schermo intero");
    }
  });
}