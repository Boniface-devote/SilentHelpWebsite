const themeToggles = document.querySelectorAll('.theme-toggle');
const storedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const initialTheme = storedTheme || (prefersDark ? 'dark' : 'light');

const demoIframe = document.querySelector('.demo-frame iframe');

const iframeOrigin = window.location.origin || '*';
function syncIframeTheme(theme) {
  if (demoIframe?.contentWindow) {
    demoIframe.contentWindow.postMessage({ type: 'theme', theme }, iframeOrigin);
  }
}

function updateToggleButtons(theme) {
  themeToggles.forEach(button => {
    button.innerHTML = theme === 'dark' ? '☀️ Light' : '🌙 Dark';
    button.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  });
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  updateToggleButtons(theme);
  syncIframeTheme(theme);
}

applyTheme(initialTheme);

if (demoIframe) {
  demoIframe.addEventListener('load', () => syncIframeTheme(document.documentElement.getAttribute('data-theme')));
}

if (themeToggles.length) {
  themeToggles.forEach(button => {
    button.addEventListener('click', () => {
      const nextTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);
      localStorage.setItem('theme', nextTheme);
    });
  });
}

const menu = document.querySelector('.nav-menu');
const toggle = document.querySelector('.nav-toggle');
const navLinks = ['Problem', 'Features', 'Demo', 'FAQ', 'Technical', 'Accessibility', 'Contact'];
if (menu && toggle) {
  menu.innerHTML = navLinks.map(label => {
    const anchor = label.toLowerCase().replace(/\s+/g, '-');
    return `<a href="#${anchor}" data-nav>${label}</a>`;
  }).join('');
  toggle.addEventListener('click', () => {
    const open = !menu.classList.contains('open');
    menu.classList.toggle('open', open);
    menu.setAttribute('aria-hidden', String(!open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });
  menu.addEventListener('click', event => {
    if (event.target.matches('a')) {
      menu.classList.remove('open');
      menu.setAttribute('aria-hidden', 'true');
      toggle.setAttribute('aria-label', 'Open navigation');
    }
  });
}

  document.querySelectorAll('.faq-item').forEach(button => {
    button.addEventListener('click', () => {
      const isOpen = button.getAttribute('aria-expanded') === 'true';
      const panel = button.nextElementSibling;
      button.setAttribute('aria-expanded', String(!isOpen));
      panel.classList.toggle('open', !isOpen);
    });
  });
  const phraseData = {
    help: {
      text: 'I need help now. Please respond quickly. My location is attached to this message.',
      meta: 'English • Swahili: Nahitaji msaada sasa. Tafadhali jibu haraka. • Luganda: Nkyetaaga obuyambi. Obuwandiike buliwo.'
    },
    translate: {
      text: 'Can you translate this message? I want to be understood by the person receiving it.',
      meta: 'English • Swahili: Unaweza kutafsiri ujumbe huu? Nataka kueleweka. • Luganda: Osobola okutaputa ekigambo kino? Njagala okusomebwa bulungi.'
    },
    location: {
      text: 'Where are you? Please send your location again if the link did not arrive.',
      meta: 'English • Swahili: Uko wapi? Tafadhali tuma eneo lako tena ikiwa kiungo hakijaenda. • Luganda: Oli wa? Ttula ekifo kyo ebbiri singa kiungo tekija.'
    }
  };
  document.querySelectorAll('.phrase-btn').forEach(button => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.phrase-btn').forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      const key = button.dataset.key;
      const preview = phraseData[key];
      document.querySelector('.preview-text').textContent = preview.text;
      document.querySelector('.preview-meta').textContent = preview.meta;
    });
  });
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('visible', window.scrollY > 400);
    });
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }
  const contactForm = document.getElementById('contact-form');
  const successMessage = document.getElementById('form-success');
  if (contactForm && successMessage) {
    contactForm.addEventListener('submit', event => {
      event.preventDefault();
      const name = contactForm.name.value.trim();
      const email = contactForm.email.value.trim();
      const message = contactForm.message.value.trim();
      if (!name || !email || !message) {
        successMessage.textContent = 'Please fill out every field before sending.';
        successMessage.style.color = 'var(--coral)';
        successMessage.classList.add('visible');
        return;
      }
      successMessage.textContent = 'Thanks! Your message is ready to send from your device.';
      successMessage.style.color = 'var(--teal)';
      successMessage.classList.add('visible');
      contactForm.reset();
    });
  }


