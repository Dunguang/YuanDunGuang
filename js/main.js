(function () {
  'use strict';

  const sidebar = document.querySelector('.sidebar');
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelectorAll('.nav-link');
  const panels = document.querySelectorAll('.panel');

  /* Mobile menu */
  if (menuToggle && sidebar) {
    menuToggle.addEventListener('click', () => {
      const isOpen = sidebar.classList.toggle('open');
      menuToggle.classList.toggle('open', isOpen);
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        sidebar.classList.remove('open');
        menuToggle.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* Active nav on scroll */
  const sections = Array.from(panels).map(panel => ({
    id: panel.id,
    el: panel
  })).filter(s => s.id);

  function updateActiveNav() {
    const scrollY = window.scrollY + 120;
    let current = 'home';

    sections.forEach(({ id, el }) => {
      if (el.offsetTop <= scrollY) current = id;
    });

    navLinks.forEach(link => {
      const href = link.getAttribute('href').slice(1);
      link.classList.toggle('active', href === current);
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();

  /* Scroll reveal */
  const revealEls = document.querySelectorAll(
    '.panel h2, .panel p, .service-card, .value-item, .info-card, .contact-layout, .leaf-card'
  );

  revealEls.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealEls.forEach(el => observer.observe(el));
})();
