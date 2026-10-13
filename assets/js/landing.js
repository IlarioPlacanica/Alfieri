const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('#main-nav');
function closeMenu() { menu.classList.remove('is-open'); menuButton.setAttribute('aria-expanded', 'false'); }
menuButton?.addEventListener('click', () => {
  const open = menu.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(open));
});
menu?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && menu?.classList.contains('is-open')) { closeMenu(); menuButton.focus(); } });
document.querySelectorAll('[data-carousel]').forEach(carousel => {
  const images = [...carousel.querySelectorAll('img')];
  let active = 0;
  function show(step) {
    active = (active + step + images.length) % images.length;
    images.forEach((image, index) => { image.hidden = index !== active; });
    carousel.querySelector('[data-carousel-status]').textContent = `Immagine ${active + 1} di ${images.length}`;
  }
  carousel.querySelector('.carousel-prev').addEventListener('click', () => show(-1));
  carousel.querySelector('.carousel-next').addEventListener('click', () => show(1));
  carousel.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); show(event.key === 'ArrowLeft' ? -1 : 1); }
  });
});
