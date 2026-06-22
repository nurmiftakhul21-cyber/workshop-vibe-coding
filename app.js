// Interactions & Scroll Animations

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Dynamic Typing / Cycling Effect for Hero Section ---
  const roles = [
    { text: "Tech Educator", color: "text-indigo-400" },
    { text: "Content Creator", color: "text-violet-400" },
    { text: "Software Developer", color: "text-emerald-400" }
  ];
  
  const typeTarget = document.getElementById('typing-text');
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeEffect() {
    const currentRole = roles[roleIndex];
    
    // Apply role-specific color
    typeTarget.className = `font-bold ${currentRole.color} transition-colors duration-300`;

    if (isDeleting) {
      typeTarget.textContent = currentRole.text.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50; // Delete faster
    } else {
      typeTarget.textContent = currentRole.text.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 120; // Normal typing speed
    }

    // Determine state
    if (!isDeleting && charIndex === currentRole.text.length) {
      isDeleting = true;
      typingSpeed = 2000; // Pause at full word
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 500; // Pause before typing next word
    }

    setTimeout(typeEffect, typingSpeed);
  }

  if (typeTarget) {
    typeEffect();
  }

  // --- 2. Mobile Menu Toggler ---
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');

  function toggleMenu() {
    const isOpen = !mobileMenu.classList.contains('hidden');
    if (isOpen) {
      mobileMenu.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
    } else {
      mobileMenu.classList.remove('hidden');
      document.body.classList.add('overflow-hidden');
    }
  }

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', toggleMenu);
    
    // Close mobile menu when a link is clicked
    mobileMenuLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
      });
    });
  }

  // --- 3. Scroll Reveal (Intersection Observer) ---
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Option to stop observing once animated
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // --- 4. Active Navigation State on Scroll ---
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function highlightNav() {
    let scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120; // offset for sticky nav
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('text-indigo-400', 'border-b-2', 'border-indigo-400');
          link.classList.add('text-zinc-400');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('text-indigo-400', 'border-b-2', 'border-indigo-400');
            link.classList.remove('text-zinc-400');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNav);

  // --- 5. Projects & Content Filtering ---
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle button active states
      filterButtons.forEach(b => {
        b.classList.remove('bg-indigo-600', 'text-white');
        b.classList.add('bg-zinc-900', 'text-zinc-400', 'hover:bg-zinc-800');
      });
      btn.classList.remove('bg-zinc-900', 'text-zinc-400', 'hover:bg-zinc-800');
      btn.classList.add('bg-indigo-600', 'text-white');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        // Simple animation using scaling and opacity
        card.style.opacity = '0';
        card.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
          if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
            card.classList.remove('hidden');
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'scale(1)';
            }, 50);
          } else {
            card.classList.add('hidden');
          }
        }, 300);
      });
    });
  });

  // --- 6. Contact Form Validation & Submission ---
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('form-name').value.trim();
      const email = document.getElementById('form-email').value.trim();
      const subject = document.getElementById('form-subject').value.trim();
      const message = document.getElementById('form-message').value.trim();

      if (!name || !email || !message) {
        showStatus('Please fill in all required fields.', 'error');
        return;
      }

      // Simulate form submission
      showStatus('Sending message...', 'info');

      setTimeout(() => {
        showStatus('Message sent successfully! I will get back to you soon.', 'success');
        contactForm.reset();
      }, 1500);
    });
  }

  function showStatus(msg, type) {
    if (!formStatus) return;

    formStatus.textContent = msg;
    formStatus.className = 'text-center text-sm py-2 px-4 rounded-md transition-all duration-300 ';

    if (type === 'error') {
      formStatus.className += 'bg-red-950/80 text-red-400 border border-red-800/50';
    } else if (type === 'info') {
      formStatus.className += 'bg-indigo-950/80 text-indigo-400 border border-indigo-800/50';
    } else if (type === 'success') {
      formStatus.className += 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/50';
    }

    formStatus.classList.remove('hidden');

    if (type === 'success') {
      setTimeout(() => {
        formStatus.classList.add('hidden');
      }, 5000);
    }
  }
});
