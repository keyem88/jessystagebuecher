const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector("#site-nav");
const body = document.body;

const updateHeader = () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 24);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

if (navToggle && siteNav) {
  const setMenuState = (open) => {
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Menü schließen" : "Menü öffnen");
    siteNav.classList.toggle("is-open", open);
    body.classList.toggle("nav-open", open);
  };

  navToggle.addEventListener("click", () => {
    setMenuState(navToggle.getAttribute("aria-expanded") !== "true");
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenuState(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navToggle.getAttribute("aria-expanded") === "true") {
      setMenuState(false);
      navToggle.focus();
    }
  });
}

const reveals = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  reveals.forEach((element) => observer.observe(element));
} else {
  reveals.forEach((element) => element.classList.add("is-visible"));
}

const tiltArea = document.querySelector("[data-tilt]");
const finePointer = window.matchMedia("(pointer: fine)").matches;
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (tiltArea && finePointer && !reducedMotion) {
  const book = tiltArea.querySelector(".book");

  if (book) {
    tiltArea.addEventListener("mousemove", (event) => {
      const rect = tiltArea.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      book.style.transform = `rotateY(${-12 + x * 6}deg) rotateX(${2 - y * 4}deg)`;
    });

    tiltArea.addEventListener("mouseleave", () => {
      book.style.transform = "";
    });
  }
}
