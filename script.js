/**
 * PDFMaster — Main JavaScript
 * Handles: theme toggle, mobile menu, FAQ accordion, scroll effects,
 * tool cards rendering, contact form validation, and modals.
 */

(function () {
  'use strict';

  /* --------------------------------------------------------------------------
     PDF Tools Data — All tools for the homepage grid
     -------------------------------------------------------------------------- */
  const PDF_TOOLS = [
    { title: 'PDF Text Editor', desc: 'Edit text directly in your PDF documents online.', icon: '✏️', color: 'edit' },
    { title: 'Merge PDF', desc: 'Combine multiple PDFs into one unified document.', icon: '🔗', color: 'merge' },
    { title: 'Split PDF', desc: 'Separate one PDF into multiple individual files.', icon: '✂️', color: 'split' },
    { title: 'Compress PDF', desc: 'Reduce file size while maintaining quality.', icon: '🗜️', color: 'compress' },
    { title: 'PDF to Word', desc: 'Convert PDF files to editable Word documents.', icon: '📝', color: 'convert' },
    { title: 'PDF to PowerPoint', desc: 'Transform PDFs into PowerPoint presentations.', icon: '📊', color: 'convert' },
    { title: 'PDF to Excel', desc: 'Extract tables and data into Excel spreadsheets.', icon: '📈', color: 'convert' },
    { title: 'Word to PDF', desc: 'Convert Word documents to PDF format instantly.', icon: '📄', color: 'convert' },
    { title: 'PowerPoint to PDF', desc: 'Save presentations as professional PDF files.', icon: '🎯', color: 'convert' },
    { title: 'Excel to PDF', desc: 'Turn spreadsheets into shareable PDF documents.', icon: '📋', color: 'convert' },
    { title: 'JPG to PDF', desc: 'Convert images into a single PDF document.', icon: '🖼️', color: 'image' },
    { title: 'PDF to JPG', desc: 'Extract pages from PDF as high-quality images.', icon: '📷', color: 'image' },
    { title: 'Sign PDF', desc: 'Add electronic signatures to any PDF document.', icon: '✍️', color: 'sign' },
    { title: 'HTML to PDF', desc: 'Convert web pages and HTML files to PDF.', icon: '🌐', color: 'convert' },
    { title: 'Rotate PDF', desc: 'Rotate PDF pages to the correct orientation.', icon: '🔄', color: 'organize' },
    { title: 'Unlock PDF', desc: 'Remove password protection from PDF files.', icon: '🔓', color: 'security' },
    { title: 'Protect PDF', desc: 'Add password encryption to secure your PDFs.', icon: '🔒', color: 'security' },
    { title: 'Organize PDF', desc: 'Reorder, delete, or insert pages in your PDF.', icon: '📑', color: 'organize' },
    { title: 'Watermark PDF', desc: 'Add text or image watermarks to documents.', icon: '💧', color: 'edit' },
    { title: 'Translate PDF', desc: 'Translate PDF content into multiple languages.', icon: '🌍', color: 'advanced' },
    { title: 'PDF to PDF/A', desc: 'Convert to archival PDF/A format for long-term storage.', icon: '📦', color: 'advanced' },
    { title: 'Repair PDF', desc: 'Fix corrupted or damaged PDF files.', icon: '🔧', color: 'advanced' },
    { title: 'Add Page Numbers', desc: 'Insert page numbers with custom formatting.', icon: '#️⃣', color: 'organize' },
    { title: 'Scan to PDF', desc: 'Turn scanned documents into searchable PDFs.', icon: '📠', color: 'image' },
    { title: 'OCR PDF', desc: 'Make scanned PDFs searchable with OCR technology.', icon: '🔍', color: 'advanced' },
    { title: 'Compare PDF', desc: 'Find differences between two PDF documents.', icon: '⚖️', color: 'advanced' },
    { title: 'Redact PDF', desc: 'Permanently remove sensitive information from PDFs.', icon: '⬛', color: 'security' },
    { title: 'Crop PDF', desc: 'Trim margins and crop PDF pages precisely.', icon: '🖼️', color: 'edit' },
    { title: 'PDF Forms', desc: 'Create and fill interactive PDF form fields.', icon: '📋', color: 'edit' }
  ];

  /* --------------------------------------------------------------------------
     DOM Elements
     -------------------------------------------------------------------------- */
  const header = document.getElementById('header');
  const themeToggle = document.getElementById('themeToggle');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const toolsGrid = document.getElementById('toolsGrid');
  const html = document.documentElement;

  /* --------------------------------------------------------------------------
     Theme Toggle — Dark / Light mode with localStorage
     -------------------------------------------------------------------------- */
  function initTheme() {
    const saved = localStorage.getItem('pdfmaster-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = saved || (prefersDark ? 'dark' : 'light');
    html.setAttribute('data-theme', theme);
  }

  function toggleTheme() {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('pdfmaster-theme', next);
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }

  initTheme();

  /* --------------------------------------------------------------------------
     Sticky Navbar — Add glass effect on scroll
     -------------------------------------------------------------------------- */
  function handleScroll() {
    if (!header) return;
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    updateActiveNavLink();
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* --------------------------------------------------------------------------
     Mobile Menu Toggle
     -------------------------------------------------------------------------- */
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      navToggle.classList.toggle('active', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen);
      navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    });

    // Close menu when a link is clicked
    navMenu.querySelectorAll('.nav__link').forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* --------------------------------------------------------------------------
     Active Navbar Highlighting
     -------------------------------------------------------------------------- */
  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link[href^="#"]');
    if (!sections.length || !navLinks.length) return;

    let current = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach((section) => {
      if (section.offsetTop <= scrollPos) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  /* --------------------------------------------------------------------------
     Render PDF Tool Cards
     -------------------------------------------------------------------------- */
  function renderTools() {
    if (!toolsGrid) return;

    toolsGrid.innerHTML = PDF_TOOLS.map(
      (tool) => `
      <article class="tool-card reveal" data-tool="${tool.title}">
        <div class="tool-card__icon tool-card__icon--${tool.color}" aria-hidden="true">${tool.icon}</div>
        <h3>${tool.title}</h3>
        <p>${tool.desc}</p>
        <button class="btn btn--tool btn--sm" type="button">Use Tool</button>
      </article>
    `
    ).join('');

    // Re-observe new reveal elements
    observeReveal();
    bindToolCards();
  }

  /* --------------------------------------------------------------------------
     Tool Card Click — Demo modal
     -------------------------------------------------------------------------- */
  function bindToolCards() {
    const cards = document.querySelectorAll('.tool-card');
    cards.forEach((card) => {
      const btn = card.querySelector('.btn--tool');
      const handler = () => openToolModal(card.dataset.tool);
      card.addEventListener('click', (e) => {
        if (e.target !== btn) handler();
      });
      if (btn) btn.addEventListener('click', (e) => {
        e.stopPropagation();
        handler();
      });
    });
  }

  function openToolModal(toolName) {
    let overlay = document.getElementById('toolModal');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'toolModal';
      overlay.className = 'modal-overlay';
      overlay.innerHTML = `
        <div class="modal" role="dialog" aria-labelledby="modalTitle">
          <h3 id="modalTitle"></h3>
          <p>Drag and drop your file here to get started. This is a demo UI — connect your backend to enable real processing.</p>
          <div style="border:2px dashed var(--border);border-radius:12px;padding:32px;margin-bottom:20px;color:var(--text-muted)">
            📁 Drop PDF here or click to browse
          </div>
          <button class="btn btn--primary" id="modalCloseBtn">Got it</button>
        </div>
      `;
      document.body.appendChild(overlay);

      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeToolModal();
      });
      document.getElementById('modalCloseBtn').addEventListener('click', closeToolModal);
    }

    document.getElementById('modalTitle').textContent = toolName;
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeToolModal() {
    const overlay = document.getElementById('toolModal');
    if (overlay) {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeToolModal();
  });

  /* --------------------------------------------------------------------------
     FAQ Accordion
     -------------------------------------------------------------------------- */
  function initFAQ() {
    const items = document.querySelectorAll('.faq__item');
    items.forEach((item) => {
      const question = item.querySelector('.faq__question');
      const answer = item.querySelector('.faq__answer');

      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all other items
        items.forEach((other) => {
          other.classList.remove('active');
          other.querySelector('.faq__question').setAttribute('aria-expanded', 'false');
          other.querySelector('.faq__answer').style.maxHeight = null;
        });

        if (!isActive) {
          item.classList.add('active');
          question.setAttribute('aria-expanded', 'true');
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      });
    });
  }

  /* --------------------------------------------------------------------------
     Scroll Reveal Animations — Intersection Observer
     -------------------------------------------------------------------------- */
  let revealObserver;

  function observeReveal() {
    const elements = document.querySelectorAll('.reveal:not(.visible)');
    if (!revealObserver) {
      revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
      );
    }
    elements.forEach((el) => revealObserver.observe(el));
  }

  /* --------------------------------------------------------------------------
     Smooth Scrolling for anchor links
     -------------------------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* --------------------------------------------------------------------------
     Contact Form Validation
     -------------------------------------------------------------------------- */
  function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const fields = {
      name: { el: document.getElementById('name'), error: document.getElementById('nameError'), validate: (v) => v.trim().length >= 2 },
      email: { el: document.getElementById('email'), error: document.getElementById('emailError'), validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) },
      subject: { el: document.getElementById('subject'), error: document.getElementById('subjectError'), validate: (v) => v.trim().length >= 3 },
      message: { el: document.getElementById('message'), error: document.getElementById('messageError'), validate: (v) => v.trim().length >= 10 }
    };

    const successMsg = document.getElementById('formSuccess');

    function showError(field, message) {
      field.el.classList.add('error');
      field.error.textContent = message;
      field.error.classList.add('visible');
    }

    function clearError(field) {
      field.el.classList.remove('error');
      field.error.classList.remove('visible');
    }

    Object.values(fields).forEach((field) => {
      field.el.addEventListener('input', () => clearError(field));
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      if (!fields.name.validate(fields.name.el.value)) {
        showError(fields.name, 'Please enter your full name (min 2 characters).');
        valid = false;
      } else clearError(fields.name);

      if (!fields.email.validate(fields.email.el.value)) {
        showError(fields.email, 'Please enter a valid email address.');
        valid = false;
      } else clearError(fields.email);

      if (!fields.subject.validate(fields.subject.el.value)) {
        showError(fields.subject, 'Please enter a subject (min 3 characters).');
        valid = false;
      } else clearError(fields.subject);

      if (!fields.message.validate(fields.message.el.value)) {
        showError(fields.message, 'Please enter a message (min 10 characters).');
        valid = false;
      } else clearError(fields.message);

      if (valid) {
        if (successMsg) successMsg.classList.add('visible');
        form.reset();
        setTimeout(() => successMsg?.classList.remove('visible'), 5000);
      }
    });
  }

  /* --------------------------------------------------------------------------
     Set active nav link on inner pages
     -------------------------------------------------------------------------- */
  function setPageNavActive() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav__link').forEach((link) => {
      const href = link.getAttribute('href');
      if (href === path || (path === '' && href === 'index.html')) {
        link.classList.add('active');
      } else if (!href.startsWith('#')) {
        link.classList.remove('active');
      }
    });
  }

  /* --------------------------------------------------------------------------
     Initialize
     -------------------------------------------------------------------------- */
  function init() {
    renderTools();
    initFAQ();
    initContactForm();
    setPageNavActive();
    observeReveal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
