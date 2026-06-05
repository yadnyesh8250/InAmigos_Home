const navToggle = document.querySelector("[data-nav-toggle]");
const navPanel = document.querySelector("[data-nav-panel]");
const navLinks = document.querySelectorAll(".nav-panel a");
const header = document.querySelector("[data-header]");

const closeMenu = () => {
  navPanel?.classList.remove("open");
  navToggle?.setAttribute("aria-expanded", "false");
  navToggle?.setAttribute("aria-label", "Open menu");
};

const toggleMenu = () => {
  const isOpen = navPanel.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
};

if (window.lucide) {
  window.lucide.createIcons();
}

document.addEventListener("click", (event) => {
  if (event.target.closest("[data-nav-toggle]")) {
    toggleMenu();
    return;
  }

  if (event.target.closest(".nav-panel a")) {
    closeMenu();
    return;
  }

  if (!header?.contains(event.target)) {
    closeMenu();
  }
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    closeMenu();
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});

const sections = [...document.querySelectorAll("main section[id]")];
const activeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: "-35% 0px -55% 0px", threshold: 0.01 }
);

sections.forEach((section) => activeObserver.observe(section));

document.querySelectorAll("[data-form]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const status = form.querySelector(".form-status");
    if (status) {
      status.textContent =
        form.dataset.form === "volunteer"
          ? "Thank you. Our team will contact you about volunteering opportunities."
          : "Thank you. Your message has been received.";
    }
    form.reset();
  });
});

document.querySelectorAll(".amounts button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".amounts button").forEach((item) => item.classList.remove("selected"));
    button.classList.add("selected");
  });
});
