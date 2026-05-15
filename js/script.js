// AOS Initialization
AOS.init({
  duration: 1000,
  once: true,
  offset: 100,
});

// Dark Mode Toggle
const darkModeToggle = document.getElementById("darkModeToggle");
if (darkModeToggle) {
  darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDarkMode = document.body.classList.contains("dark-mode");
    localStorage.setItem("darkMode", isDarkMode);

    const icon = darkModeToggle.querySelector("i");
    if (isDarkMode) {
      icon.classList.remove("fa-moon");
      icon.classList.add("fa-sun");
    } else {
      icon.classList.remove("fa-sun");
      icon.classList.add("fa-moon");
    }
  });
}

// Check saved dark mode preference
if (localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("dark-mode");
  const icon = darkModeToggle?.querySelector("i");
  if (icon) {
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
  }
}

// Mobile Navigation Toggle
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });
}

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (navMenu && navMenu.classList.contains("active")) {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
      navMenu.classList.remove("active");
    }
  }
});

// Stat Counter Animation
const statNumbers = document.querySelectorAll(".stat-number");
const animateNumbers = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const element = entry.target;
      const target = parseInt(element.getAttribute("data-count") || element.innerText);
      let current = 0;
      const increment = target / 50;
      const updateCounter = () => {
        if (current < target) {
          current += increment;
          element.innerText = Math.ceil(current);
          setTimeout(updateCounter, 20);
        } else {
          element.innerText = target;
        }
      };
      updateCounter();
      observer.unobserve(element);
    }
  });
};

const observer = new IntersectionObserver(animateNumbers, { threshold: 0.5 });
statNumbers.forEach((stat) => observer.observe(stat));

// Gallery Filter
const filterButtons = document.querySelectorAll(".filter-btn");
const galleryItems = document.querySelectorAll(".galeri-item");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.getAttribute("data-filter");

    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    galleryItems.forEach((item) => {
      if (filter === "all" || item.getAttribute("data-category") === filter) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });
});

// Image Modal for Gallery
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImage");
const modalCaption = document.getElementById("modalCaption");
const modalClose = document.querySelector(".modal-close");

if (modal && modalImg) {
  document.querySelectorAll(".galeri-item").forEach((item) => {
    item.addEventListener("click", () => {
      const img = item.querySelector("img");
      const title = item.querySelector(".galeri-overlay h3");
      modal.style.display = "block";
      modalImg.src = img.src;
      if (modalCaption && title) {
        modalCaption.innerHTML = title.innerHTML;
      }
    });
  });

  if (modalClose) {
    modalClose.addEventListener("click", () => {
      modal.style.display = "none";
    });
  }

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
}

// Background Music Control
const musicControl = document.getElementById("musicControl");
const bgMusic = document.getElementById("bgMusic");
let isMusicPlaying = false;

if (musicControl && bgMusic) {
  musicControl.addEventListener("click", () => {
    if (isMusicPlaying) {
      bgMusic.pause();
      musicControl.innerHTML = '<i class="fas fa-music"></i><i class="fas fa-volume-mute"></i>';
    } else {
      bgMusic.play();
      musicControl.innerHTML = '<i class="fas fa-music"></i><i class="fas fa-volume-up"></i>';
    }
    isMusicPlaying = !isMusicPlaying;
  });
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Scroll Indicator
const scrollIndicator = document.querySelector(".scroll-indicator");
if (scrollIndicator) {
  scrollIndicator.addEventListener("click", () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  });
}

// Contact Form Submit
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Terima kasih! Pesan Anda telah terkirim. Kami akan segera merespon.");
    contactForm.reset();
  });
}

// Navbar Scroll Effect
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    if (window.scrollY > 100) {
      navbar.style.padding = "0.5rem 0";
    } else {
      navbar.style.padding = "1rem 0";
    }
  }
});
