// ===== DROPDOWN NAV MENUS =====
// Desktop: menus open on hover (see CSS). Clicking the label navigates normally.
// Touch/mobile: tapping the little arrow opens the menu.
document.querySelectorAll('.dropdown-arrow').forEach(function (arrow) {
  arrow.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    const parent = arrow.closest('.dropdown');
    const isOpen = parent.classList.contains('open');
    document.querySelectorAll('.dropdown.open').forEach(function (d) { d.classList.remove('open'); });
    if (!isOpen) parent.classList.add('open');
  });
});
document.addEventListener('click', function (e) {
  if (!e.target.closest('.dropdown')) {
    document.querySelectorAll('.dropdown.open').forEach(function (d) { d.classList.remove('open'); });
  }
});

// ===== CONTACT FORM =====
const form = document.getElementById('contact-form');
if (form) {
  const status = document.getElementById('form-status');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    status.textContent = "Thanks for reaching out! (Note: this form isn't connected to email yet.)";
    status.style.color = "#4a5cff";
    form.reset();
  });
}

// ===== HERO CAROUSEL (home page) =====
const heroSlides = document.querySelectorAll('.hero-slide');
if (heroSlides.length > 0) {
  let currentSlide = 0;
  setInterval(function () {
    heroSlides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % heroSlides.length;
    heroSlides[currentSlide].classList.add('active');
  }, 5000);
}

// ===== HOME PAGE CATEGORY TILE CAROUSELS (rotate on hover) =====
document.querySelectorAll('.category-tile').forEach(function (tile) {
  const slides = tile.querySelectorAll('.tile-slide');
  if (slides.length <= 1) return;
  let current = 0;
  let intervalId = null;
  tile.addEventListener('mouseenter', function () {
    intervalId = setInterval(function () {
      slides[current].classList.remove('active');
      current = (current + 1) % slides.length;
      slides[current].classList.add('active');
    }, 1200);
  });
  tile.addEventListener('mouseleave', function () {
    clearInterval(intervalId);
    slides[current].classList.remove('active');
    current = 0;
    slides[0].classList.add('active');
  });
});

// ===== IMAGE LIGHTBOX (project pages) =====
document.querySelectorAll('.project-section-images img, .project-main-image img, .featured-plan img, .plan-cell img, .idec-callout img').forEach(function (img) {
  img.style.cursor = 'zoom-in';
  img.addEventListener('click', function () {
    const overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    const big = document.createElement('img');
    big.src = img.src;
    overlay.appendChild(big);
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';
    overlay.addEventListener('click', function () {
      overlay.remove();
      document.body.style.overflow = '';
    });
  });
});

// ===== EDITORIAL CARD MINI-CAROUSELS =====
document.querySelectorAll('.editorial-image-full').forEach(function (container) {
  const slides = Array.from(container.querySelectorAll('.editorial-slide')).filter(function (s) {
    return s.style.backgroundImage && s.style.backgroundImage !== 'none';
  });
  if (slides.length <= 1) return;

  let current = 0;

  function goTo(index) {
    slides[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
  }

  const prevBtn = document.createElement('div');
  prevBtn.className = 'editorial-nav prev';
  prevBtn.innerHTML = '&#10094;';
  prevBtn.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    goTo(current - 1);
  });

  const nextBtn = document.createElement('div');
  nextBtn.className = 'editorial-nav next';
  nextBtn.innerHTML = '&#10095;';
  nextBtn.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    goTo(current + 1);
  });

  container.appendChild(prevBtn);
  container.appendChild(nextBtn);
});