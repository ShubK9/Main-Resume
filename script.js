// Hamburger menu toggle for mobile
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const menu = document.querySelector(".menu");
  hamburger.addEventListener("click", function (e) {
    menu.classList.toggle("active");
    hamburger.classList.toggle("open");
    e.stopPropagation(); // Prevent closing when clicking hamburger itself
  });
  // Close hamburger menu when clicking outside
  document.addEventListener("click", function (e) {
    if (menu.classList.contains("active")) {
      // If click is outside menu and hamburger
      if (!menu.contains(e.target) && !hamburger.contains(e.target)) {
        menu.classList.remove("active");
        hamburger.classList.remove("open");
      }
    }
  });

  // Lottie hero animation
  const container = document.getElementById("lottie-hero");
  if (container && window.lottie) {
    lottie.loadAnimation({
      container,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "https://lottie.host/0388a471-98d5-4e74-8421-bdaf3deb4287/bXrTPypEqO.json",
    });
  } else {
    console.warn("Hero Lottie not initialized.");
  }

  // Lottie about animation
  const aboutContainer = document.getElementById("lottie-about");
  if (aboutContainer && window.lottie) {
    lottie.loadAnimation({
      container: aboutContainer,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "https://lottie.host/4981b75a-2d24-4fc0-a651-1cb9d19ced68/IHF963nlEq.json",
    });
  } else {
    console.warn("About Lottie not initialized.");
  }

  // Typewriter
  const words = [
    "developer",
    "UI designer",
    "SEO specialist",
    "YouTube manager",
  ];
  const target = document.getElementById("typewriter-word");
  if (target) {
    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;
    const typeSpeed = 90;
    const deleteSpeed = 50;
    const holdTime = 1400;

    function typeLoop() {
      const current = words[wordIndex];
      if (!deleting) {
        target.textContent = current.slice(0, ++charIndex);
        if (charIndex === current.length) {
          deleting = true;
          setTimeout(typeLoop, holdTime);
          return;
        }
      } else {
        target.textContent = current.slice(0, --charIndex);
        if (charIndex === 0) {
          deleting = false;
          wordIndex = (wordIndex + 1) % words.length;
        }
      }
      setTimeout(typeLoop, deleting ? deleteSpeed : typeSpeed);
    }
    typeLoop();
  }

  // Skill cards reveal animation
  const skillCards = document.querySelectorAll(".skill-card");
  if (skillCards.length) {
    skillCards.forEach((c) => (c.style.opacity = 0));
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.transition =
              "opacity .9s ease, transform .9s ease";
            entry.target.style.opacity = 1;
            entry.target.style.transform = "translateY(0)";
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    skillCards.forEach((c, i) => {
      c.style.transform = "translateY(24px)";
      c.style.transitionDelay = i * 40 + "ms";
      obs.observe(c);
    });
  }

  // Projects page filter logic
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(
    ".projects-collection .project-card, .projects-preview .project-card"
  );
  if (filterButtons.length) {
    filterButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const active = document.querySelector(".filter-btn.active");
        if (active && active !== btn) active.classList.remove("active");
        btn.classList.add("active");
        const filter = btn.getAttribute("data-filter");
        projectCards.forEach((card) => {
          const type = card.getAttribute("data-type");
          if (filter === "all" || type === filter) {
            card.style.display = "";
            requestAnimationFrame(() => {
              card.style.opacity = 1;
              card.style.transform = "translateY(0)";
            });
          } else {
            card.style.opacity = 0;
            card.style.transform = "translateY(12px)";
            setTimeout(() => {
              card.style.display = "none";
            }, 250);
          }
        });
      });
    });
  }

  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href.length > 1 && document.querySelector(href)) {
        e.preventDefault();
        document.querySelector(href).scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });

  // Dynamic year in footer
  const yearSpan = document.getElementById("year");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // Live counter animation
  const liveCounter = document.getElementById("live-counter");
  if (liveCounter) {
    const target = parseInt(liveCounter.getAttribute("data-target"), 10);
    let current = 0;
    const duration = 1800; // ms
    const frameRate = 30; // fps
    const totalFrames = Math.round(duration / (1000 / frameRate));
    const increment = target / totalFrames;
    function animateCounter() {
      current += increment;
      if (current < target) {
        liveCounter.textContent = Math.floor(current);
        setTimeout(animateCounter, 1000 / frameRate);
      } else {
        liveCounter.textContent = target;
      }
    }
    liveCounter.textContent = "0";
    animateCounter();
  }
});
