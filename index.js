document.addEventListener("DOMContentLoaded", () => {
  const reveals = document.querySelectorAll(".reveal");

  const revealOnScroll = () => {
    reveals.forEach((reveal) => {
      const windowHeight = window.innerHeight;
      const elementTop = reveal.getBoundingClientRect().top;
      const elementVisible = 150;

      if (elementTop < windowHeight - elementVisible) {
        reveal.classList.add("visible");
      } else {
        reveal.classList.remove("visible");
      }
    });
  };

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll(); // Trigger on page load
});

// Mobile nav toggle
document.addEventListener("DOMContentLoaded", () => {
  const layout = document.getElementById('layout');
  const navLinks = document.getElementById('navLinks');

  if (layout && navLinks) {
    layout.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      layout.classList.toggle('open');
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('active');
        layout.classList.remove('open');
      });
    });
  }
});

// Cute Intro Curtain Dismissal
window.addEventListener("load", () => {
  const intro = document.getElementById("intro-curtain");
  if (intro) {
    setTimeout(() => {
      intro.classList.add("loaded");
      setTimeout(() => {
        intro.style.display = "none";
      }, 1400);
    }, 2400);
  }
});

// Hero 2x2 Nav Cards Morph Interaction
document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("heroCardsGrid");
  if (!grid) return;

  const cards = grid.querySelectorAll(".nav-card");
  cards.forEach(card => {
    card.addEventListener("mouseenter", () => {
      grid.classList.add("has-active");
      card.classList.add("is-expanded");
    });
    card.addEventListener("mouseleave", () => {
      grid.classList.remove("has-active");
      card.classList.remove("is-expanded");
    });
  });
});

// 3D Flip Card Toggle
function syncFlipCardHeight() {
  const cardInner = document.querySelector('.flip-card-inner');
  if (!cardInner) {
    return;
  }

  const front = cardInner.querySelector('.flip-card-front');
  const back = cardInner.querySelector('.flip-card-back');

  if (!front || !back) {
    return;
  }

  const frontHeight = front.scrollHeight;
  const backHeight = back.scrollHeight;
  const targetHeight = Math.max(frontHeight, backHeight);

  cardInner.style.height = `${targetHeight}px`;
}

function toggleFlip() {
  const cardInner = document.querySelector('.flip-card-inner');
  if (!cardInner) {
    return;
  }

  cardInner.classList.toggle('is-flipped');
  syncFlipCardHeight();
}

document.addEventListener('DOMContentLoaded', () => {
  syncFlipCardHeight();
  window.addEventListener('resize', syncFlipCardHeight);

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(syncFlipCardHeight);
  }
});

// Initialize Formspree AJAX
document.addEventListener('DOMContentLoaded', function() {
  if (window.formspree) {
    formspree('initForm', { formElement: '#contact-form', formId: 'xdajljao' });
  }
});


document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section[id]");
  const floatingMenu = document.getElementById('floating-menu');
  const menuToggle = document.getElementById('menu-toggle');

  // 1. Logic to open/close the menu when clicked
  if (menuToggle && floatingMenu) {
    menuToggle.addEventListener('click', () => {
      floatingMenu.classList.toggle('open');
    });

    // Automatically close the menu when a link inside it is clicked
    floatingMenu.querySelectorAll('.menu-item').forEach(link => {
      link.addEventListener('click', () => {
        floatingMenu.classList.remove('open');
      });
    });
  }

  // 2. Logic to watch the scroll position
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const currentId = entry.target.getAttribute("id");
        
        // Update URL
        window.history.replaceState(null, null, `#${currentId}`);

        // Hide the button if on the Hero section, show it everywhere else!
        if (floatingMenu) {
          if (currentId === 'hero') {
            floatingMenu.classList.add('hidden');
            floatingMenu.classList.remove('open'); // Force close if scrolling up
          } else {
            floatingMenu.classList.remove('hidden');
          }
        }
      }
    });
  }, {
    threshold: 0.5 
  });

  sections.forEach(section => {
    observer.observe(section);
  });
});