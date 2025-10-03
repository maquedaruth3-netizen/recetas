const hamburger = document.getElementById('hamburger');
const sidebar   = document.getElementById('sidebar');
const closeBtn  = document.getElementById('close-btn');

if (hamburger && sidebar) {
  hamburger.addEventListener('click', () => {
    sidebar.classList.add('active');
    sidebar.setAttribute('aria-hidden', 'false');
  });
}
if (closeBtn && sidebar) {
  closeBtn.addEventListener('click', () => {
    sidebar.classList.remove('active');
    sidebar.setAttribute('aria-hidden', 'true');
  });
}

if (sidebar) {
  sidebar.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      sidebar.classList.remove('active');
      sidebar.setAttribute('aria-hidden', 'true');
    });
  });
}

const cards = document.querySelectorAll('.receta-card');
if ('IntersectionObserver' in window && cards.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
        entry.target.style.transition = 'all 0.6s ease-out';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  cards.forEach(c => observer.observe(c));
} else {
  cards.forEach(c => {
    c.style.opacity = 1;
    c.style.transform = 'translateY(0)';
  });
}

const botones = document.querySelectorAll('button, .boton-receta');
botones.forEach(btn => {
  btn.addEventListener('mouseenter', () => btn.style.transform = 'scale(1.05)');
  btn.addEventListener('mouseleave', () => btn.style.transform = 'scale(1)');
});

const themeButtons = document.querySelectorAll('.theme-toggle');

if (localStorage.getItem('tema') === 'oscuro') {
  document.body.classList.add('oscuro');
}

function toggleThemeAndSave() {
  document.body.classList.toggle('oscuro');
  if (document.body.classList.contains('oscuro')) {
    localStorage.setItem('tema', 'oscuro');
  } else {
    localStorage.setItem('tema', 'claro');
  }
}

if (themeButtons.length) {
  themeButtons.forEach(btn => btn.addEventListener('click', toggleThemeAndSave));
}

// --- FORMULARIO NEWSLETTER ---
const form = document.querySelector('#newsletter form');
const mensaje = document.getElementById('mensaje');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const emailInput = document.getElementById('email');
    const email = emailInput.value.trim();

    if (email === '') {
      mensaje.textContent = '❌ Por favor ingresa un correo.';
      mensaje.style.color = 'red';
      return;
    }

    const regex = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(email)) {
      mensaje.textContent = '⚠️ Ingresa un correo válido.';
      mensaje.style.color = 'orange';
      return;
    }

    mensaje.textContent = '✅ ¡Gracias por suscribirte!';
    mensaje.style.color = 'green';
    emailInput.value = '';
  });
}







