document.addEventListener('DOMContentLoaded', () => {
  // 1. Header Scroll Effect
  const header = document.querySelector('.header');
  if (header && !header.classList.contains('header--internal')) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // 2. Mobile Menu Toggle
  const menuBtn = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
      nav.classList.toggle('open');
      document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
    });

    // Close menu when clicking a link
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // 3. Scroll Reveal Animations
  const reveals = document.querySelectorAll('.reveal');
  const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };

  const revealOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('active');
      observer.unobserve(entry.target);
    });
  }, revealOptions);

  reveals.forEach(reveal => {
    revealOnScroll.observe(reveal);
  });

  // 4. Testimonials Manual Rotation
  const testimonials = document.querySelectorAll('.testimonial');
  const btnPrev = document.querySelector('.t-btn--prev');
  const btnNext = document.querySelector('.t-btn--next');
  let currentTestimonial = 0;

  if (testimonials.length > 0 && btnPrev && btnNext) {
    function showTestimonial(index) {
      testimonials.forEach(t => t.classList.remove('active'));
      testimonials[index].classList.add('active');
    }

    btnNext.addEventListener('click', () => {
      currentTestimonial = (currentTestimonial + 1) % testimonials.length;
      showTestimonial(currentTestimonial);
    });

    btnPrev.addEventListener('click', () => {
      currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
      showTestimonial(currentTestimonial);
    });
  }

  // 5. FAQ Accordion
  const accordions = document.querySelectorAll('.accordion-btn');
  accordions.forEach(acc => {
    acc.addEventListener('click', function() {
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      
      // Close all others
      accordions.forEach(a => {
        a.setAttribute('aria-expanded', 'false');
        a.nextElementSibling.style.maxHeight = null;
      });

      if (!isExpanded) {
        this.setAttribute('aria-expanded', 'true');
        const content = this.nextElementSibling;
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  });

  // 6. Portfolio Lightbox
  const galleryItems = document.querySelectorAll('.gallery__item img');
  const lightbox = document.querySelector('.lightbox');
  const lightboxImg = document.querySelector('.lightbox__img');
  const lightboxClose = document.querySelector('.lightbox__close');

  if (galleryItems.length > 0 && lightbox) {
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        lightboxImg.src = item.src;
        lightboxImg.alt = item.alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    lightboxClose.addEventListener('click', () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    });

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
});
