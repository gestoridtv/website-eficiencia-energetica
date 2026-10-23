document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navMenu.querySelectorAll('.nav-link, .btn').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1200;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      el.textContent = Math.floor(progress * target);
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target;
    }
    requestAnimationFrame(tick);
  }

  const statObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.stat-number').forEach(el => statObserver.observe(el));

  const contactForm = document.getElementById('contactForm');
  const successMsg = contactForm.querySelector('.form-success');

  function setFieldError(field, message) {
    const wrapper = field.closest('.form-field');
    const errorEl = wrapper.querySelector('.form-error');
    if (message) {
      wrapper.classList.add('has-error');
      errorEl.textContent = message;
    } else {
      wrapper.classList.remove('has-error');
      errorEl.textContent = '';
    }
  }

  function validateContactForm() {
    let isValid = true;
    const name = contactForm.name;
    const email = contactForm.email;
    const service = contactForm.service;
    const message = contactForm.message;

    if (!name.value.trim()) { setFieldError(name, 'Ingrese su nombre.'); isValid = false; }
    else setFieldError(name, '');

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value.trim())) { setFieldError(email, 'Ingrese un email válido.'); isValid = false; }
    else setFieldError(email, '');

    if (!service.value) { setFieldError(service, 'Seleccione un servicio.'); isValid = false; }
    else setFieldError(service, '');

    if (!message.value.trim()) { setFieldError(message, 'Ingrese un mensaje.'); isValid = false; }
    else setFieldError(message, '');

    return isValid;
  }

  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!validateContactForm()) {
      successMsg.hidden = true;
      return;
    }
    // Real backend integration point: replace this block with, e.g.,
    // fetch('/api/contact', { method: 'POST', body: new FormData(contactForm) })
    successMsg.hidden = false;
    contactForm.reset();
  });

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`);
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(section => navObserver.observe(section));
});
