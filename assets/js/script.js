document.addEventListener("DOMContentLoaded", () => {
  initAnchorScroll();
  initHeroVideo();
  syncHeroIntroWidth();
  initApartmentPageNavigation();
  initTourFullscreen();
  initContextCarousel();
  initGalleryRenderCarousel();
  initRenderLightbox();
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

      const header = document.querySelector(".site-header");
      const headerOffset = header ? header.offsetHeight : 20;
      const offset = headerOffset + 12;
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

function syncHeroIntroWidth() {
  const intro = document.querySelector(".hero__intro");
  const eyebrow = intro?.querySelector(".hero__eyebrow");

  if (!intro || !eyebrow) return;

  function updateWidth() {
    const naturalWidth = Math.ceil(eyebrow.scrollWidth);
    if (!naturalWidth) return;

    const sharedWidth = Math.round(naturalWidth * 1.1);
    intro.style.setProperty("--hero-intro-width", `${sharedWidth}px`);
  }

  updateWidth();
  window.addEventListener("resize", updateWidth);
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

function initContextCarousel() {
  const carousel = document.querySelector("[data-context-carousel]");
  if (!carousel) return;

  const images = Array.from(carousel.querySelectorAll(".context-carousel__image"));
  const dots = Array.from(carousel.querySelectorAll(".context-carousel__dot"));
  const prevButton = carousel.querySelector(".context-carousel__nav--prev");
  const nextButton = carousel.querySelector(".context-carousel__nav--next");

  if (!images.length || !dots.length || !prevButton || !nextButton) return;

  const extensions = [".png", ".jpg", ".jpeg", ".webp"];
  let currentIndex = 0;

  images.forEach((image) => {
    image.dataset.extensionIndex = "0";

    image.addEventListener("error", () => {
      const base = image.dataset.base;
      const extensionIndex = Number(image.dataset.extensionIndex || "0") + 1;

      if (!base || extensionIndex >= extensions.length) return;

      image.dataset.extensionIndex = String(extensionIndex);
      image.src = `${base}${extensions[extensionIndex]}`;
    });
  });

  function setActiveImage(index) {
    currentIndex = (index + images.length) % images.length;

    images.forEach((image, imageIndex) => {
      image.classList.toggle("is-active", imageIndex === currentIndex);
    });

    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === currentIndex);
    });
  }

  prevButton.addEventListener("click", () => {
    setActiveImage(currentIndex - 1);
  });

  nextButton.addEventListener("click", () => {
    setActiveImage(currentIndex + 1);
  });

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      setActiveImage(index);
    });
  });

  carousel.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      setActiveImage(currentIndex - 1);
    }

    if (event.key === "ArrowRight") {
      setActiveImage(currentIndex + 1);
    }
  });
}

function initGalleryRenderCarousel() {
  const carousel = document.querySelector("[data-gallery-carousel]");
  if (!carousel) return;

  const images = Array.from(carousel.querySelectorAll(".gallery-render-carousel__image"));
  const dots = Array.from(carousel.querySelectorAll(".gallery-render-carousel__dot"));
  const prevButton = carousel.querySelector(".gallery-render-carousel__nav--prev");
  const nextButton = carousel.querySelector(".gallery-render-carousel__nav--next");

  if (!images.length || !dots.length || !prevButton || !nextButton) return;

  let currentIndex = 0;

  function setActiveImage(index) {
    currentIndex = (index + images.length) % images.length;

    images.forEach((image, imageIndex) => {
      image.classList.toggle("is-active", imageIndex === currentIndex);
    });

    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === currentIndex);
    });
  }

  prevButton.addEventListener("click", () => {
    setActiveImage(currentIndex - 1);
  });

  nextButton.addEventListener("click", () => {
    setActiveImage(currentIndex + 1);
  });

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      setActiveImage(index);
    });
  });

  carousel.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      setActiveImage(currentIndex - 1);
    }

    if (event.key === "ArrowRight") {
      setActiveImage(currentIndex + 1);
    }
  });
}

function initRenderLightbox() {
  const cards = Array.from(document.querySelectorAll(".gallery-render-card"));
  const carousel = document.querySelector("[data-gallery-carousel]");
  const carouselImages = Array.from(document.querySelectorAll(".gallery-render-carousel__image"));
  const carouselStage = carousel?.querySelector(".gallery-render-carousel__stage");
  const lightbox = document.getElementById("renderLightbox");
  const lightboxImage = document.getElementById("renderLightboxImage");
  const closeButton = document.querySelector(".render-lightbox__close");
  const prevButton = document.querySelector(".render-lightbox__nav--prev");
  const nextButton = document.querySelector(".render-lightbox__nav--next");

  if ((!cards.length && !carouselImages.length) || !lightbox || !lightboxImage || !closeButton || !prevButton || !nextButton) {
    return;
  }

  const sourceImages = cards.length
    ? cards.map((card) => card.querySelector("img"))
    : carouselImages;

  const images = sourceImages.map((img) => {
    return {
      src: img?.getAttribute("src") || "",
      alt: img?.getAttribute("alt") || ""
    };
  });

  let currentIndex = 0;

  function updateLightbox() {
    const currentImage = images[currentIndex];
    if (!currentImage) return;

    lightboxImage.src = currentImage.src;
    lightboxImage.alt = currentImage.alt;
  }

  function openLightbox(index) {
    currentIndex = index;
    updateLightbox();
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    lightboxImage.src = "";
    lightboxImage.alt = "";
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateLightbox();
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % images.length;
    updateLightbox();
  }

  cards.forEach((card, index) => {
    card.addEventListener("click", () => {
      openLightbox(index);
    });
  });

  carouselStage?.addEventListener("click", () => {
    const activeIndex = carouselImages.findIndex((image) => image.classList.contains("is-active"));
    openLightbox(activeIndex >= 0 ? activeIndex : 0);
  });

  closeButton.addEventListener("click", closeLightbox);
  prevButton.addEventListener("click", showPrev);
  nextButton.addEventListener("click", showNext);

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (!lightbox.classList.contains("is-open")) return;

    if (event.key === "Escape") {
      closeLightbox();
    }

    if (event.key === "ArrowLeft") {
      showPrev();
    }

    if (event.key === "ArrowRight") {
      showNext();
    }
  });
}
