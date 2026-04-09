document.addEventListener("DOMContentLoaded", () => {
  initAnchorScroll();
  initHeroVideo();
  initApartmentPageNavigation();
  initTourFullscreen();
});

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

      const offset = 20;
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;

      window.scrollTo({
        top,
        behavior: "smooth"
      });
    });
  });
}

function initHeroVideo() {
  const heroVideo = document.querySelector(".hero__video");
  if (!heroVideo) return;

  const playPromise = heroVideo.play();
  if (playPromise !== undefined) {
    playPromise.catch(() => {
      heroVideo.classList.add("is-blocked");
    });
  }

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      heroVideo.pause();
    } else {
      heroVideo.play().catch(() => {});
    }
  });
}

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