document.documentElement.classList.add("js");

// 1. Smooth Scroll
function enableSmoothScroll() {
  const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "auto"
    : "smooth";
  document.querySelectorAll('.site-nav a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior, block: "start" });
    });
  });
}

// 2. Fade-in on Scroll (Bidirectional / Bisa Reverse)
function enableScrollFadeIn() {
  const elements = document.querySelectorAll(".fade-in");
  if (!("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        } else {
          entry.target.classList.remove("is-visible"); // Reverse saat scroll ke atas
        }
      });
    },
    { threshold: 0.15 },
  );
  elements.forEach((element) => observer.observe(element));
}

// 3. Smart Navbar & Parallax
function enableScrollEffects() {
  let lastScrollTop = 0;
  const header = document.querySelector(".site-header");
  const heroCopy = document.querySelector(".hero-copy");
  window.addEventListener("scroll", () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (header) {
      if (scrollTop > lastScrollTop && scrollTop > 80) {
        header.classList.add("nav-hidden");
      } else {
        header.classList.remove("nav-hidden");
      }
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    if (heroCopy) {
      // Teks memudar total di scroll 400px
      const fadeThreshold = 400;
      heroCopy.style.opacity = Math.max(0, 1 - scrollTop / fadeThreshold);

      // Teks bergerak ke ATAS (nilai negatif) agar tidak menabrak elemen di bawahnya
      heroCopy.style.transform = `translateY(${scrollTop * -0.2}px)`;
    }
  });
}

// 4. Spotify Text Reveal Effect
function enableTextReveal() {
  const revealText = document.querySelector(".text-reveal");
  if (!revealText) return;

  // Pecah teks jadi kata per kata
  if (revealText.querySelectorAll("span").length === 0) {
    const words = revealText.textContent.trim().split(/\s+/);
    revealText.innerHTML = "";
    words.forEach((word) => {
      const span = document.createElement("span");
      span.textContent = word + " ";
      revealText.appendChild(span);
    });
  }

  const spans = revealText.querySelectorAll("span");

  window.addEventListener("scroll", () => {
    const rect = revealText.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const start = windowHeight * 0.85;
    const end = windowHeight * 0.3;
    const current = rect.top;

    let progress = (start - current) / (start - end);
    progress = Math.max(0, Math.min(1, progress));

    const totalWords = spans.length;
    const wordsToReveal = Math.floor(progress * totalWords);

    spans.forEach((span, index) => {
      if (index < wordsToReveal) {
        span.style.color = "#1d1d1f"; // Warna hitam (aktif)
      } else {
        span.style.color = ""; // Balik ke abu-abu (CSS)
      }
    });
  });
}

// Preloader
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add("preloader-hidden");
    }, 300);
  }
});

// Panggil Semua Fungsi
enableSmoothScroll();
enableScrollFadeIn();
enableScrollEffects();
enableTextReveal();
