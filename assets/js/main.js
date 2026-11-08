const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const navLinks = [...document.querySelectorAll(".site-nav a")];
const sections = navLinks
  .map((link) => link.getAttribute("href"))
  .filter((href) => href?.startsWith("#"))
  .map((href) => document.querySelector(href))
  .filter(Boolean);
const mobileMedia = window.matchMedia("(max-width: 760px)");
const motionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");
const motionButton = document.querySelector(".motion-toggle");
const revealItems = [...document.querySelectorAll(".reveal")];
let userPaused = false;
try {
  userPaused = sessionStorage.getItem("portfolio-motion-paused") === "true";
} catch {
  // File previews and restricted browsers may not expose session storage.
}
let scrollScheduled = false;

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

const closeMenu = ({ restoreFocus = false } = {}) => {
  const wasOpen = menuToggle?.getAttribute("aria-expanded") === "true";
  menuToggle?.setAttribute("aria-expanded", "false");
  menuToggle?.setAttribute("aria-label", "Open navigation");
  siteNav?.classList.remove("is-open");
  if (siteNav) siteNav.inert = mobileMedia.matches;
  if (restoreFocus && wasOpen) menuToggle?.focus();
};

menuToggle?.addEventListener("click", () => {
  const open = menuToggle.getAttribute("aria-expanded") !== "true";
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute(
    "aria-label",
    open ? "Close navigation" : "Open navigation",
  );
  siteNav?.classList.toggle("is-open", open);
  if (siteNav) siteNav.inert = !open;
});
navLinks.forEach((link) => link.addEventListener("click", () => closeMenu()));
mobileMedia.addEventListener("change", () => closeMenu());
closeMenu();
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu({ restoreFocus: true });
});
document.addEventListener("click", (event) => {
  if (
    menuToggle?.getAttribute("aria-expanded") === "true" &&
    !header?.contains(event.target)
  )
    closeMenu();
});

const syncScroll = () => {
  const range = document.documentElement.scrollHeight - window.innerHeight;
  const progress =
    range > 0 ? Math.min(1, Math.max(0, window.scrollY / range)) : 0;
  document.documentElement.style.setProperty(
    "--scroll-progress",
    String(progress),
  );
  header?.classList.toggle("is-scrolled", window.scrollY > 12);
  const marker = (header?.offsetHeight || 82) + 95;
  let current;
  sections.forEach((section) => {
    if (section.getBoundingClientRect().top <= marker) current = section;
  });
  navLinks.forEach((link) => {
    const active = Boolean(
      current && link.getAttribute("href") === `#${current.id}`,
    );
    link.classList.toggle("is-active", active);
    if (active) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });
  scrollScheduled = false;
};
const scheduleScroll = () => {
  if (scrollScheduled) return;
  scrollScheduled = true;
  window.requestAnimationFrame(syncScroll);
};
window.addEventListener("scroll", scheduleScroll, { passive: true });
window.addEventListener("resize", scheduleScroll);
window.addEventListener("load", scheduleScroll);
syncScroll();

// Content is visible by default. Reveal effects are enabled only with observer support.
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.06, rootMargin: "0px 0px -20px 0px" },
  );
  revealItems.forEach((item, index) => {
    item.style.setProperty("--delay", `${(index % 3) * 65}ms`);
    revealObserver.observe(item);
  });
  if (!motionMedia.matches)
    document.documentElement.classList.add("motion-ready");
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

document.querySelectorAll(".pipeline").forEach((pipeline) => {
  pipeline.setAttribute("data-motion-scene", "");
  [...pipeline.children].forEach((step, index) =>
    step.style.setProperty("--stage", String(index)),
  );
});
const scenes = document.querySelectorAll("[data-motion-scene]");
if ("IntersectionObserver" in window) {
  const sceneObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) =>
        entry.target.classList.toggle("is-in-view", entry.isIntersecting),
      );
    },
    { threshold: 0.05 },
  );
  scenes.forEach((scene) => sceneObserver.observe(scene));
} else {
  scenes.forEach((scene) => scene.classList.add("is-in-view"));
}

const syncMotion = () => {
  const reduced = motionMedia.matches;
  const paused = userPaused || reduced || document.hidden;
  document.documentElement.toggleAttribute("data-motion-paused", paused);
  if (reduced) {
    document.documentElement.classList.remove("motion-ready");
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }
  if (!motionButton) return;
  motionButton.disabled = reduced;
  motionButton.setAttribute("aria-pressed", String(userPaused));
  motionButton.querySelector("[data-motion-label]").textContent = reduced
    ? "Reduced motion enabled"
    : userPaused
      ? "Resume animations"
      : "Pause animations";
  motionButton.querySelector(".motion-symbol").textContent = userPaused
    ? "▶"
    : "Ⅱ";
};
motionButton?.addEventListener("click", () => {
  userPaused = !userPaused;
  try {
    sessionStorage.setItem("portfolio-motion-paused", String(userPaused));
  } catch {
    // The control continues to work when storage is unavailable.
  }
  syncMotion();
});
motionMedia.addEventListener("change", syncMotion);
document.addEventListener("visibilitychange", syncMotion);
syncMotion();

const commerceSteps = [
  {
    request: "Lightweight shoes for walking.",
    state: ["Footwear", "Walking", "Lightweight"],
    explanation:
      "Identify the shopping task, retrieve eligible catalog listings, and explain the results using supplied listing details.",
  },
  {
    request: "Under $60 instead.",
    state: ["Footwear", "Walking", "Lightweight", "Budget: under $60"],
    explanation:
      "Retain the earlier requirements and update the budget. Refine retrieval against the catalog’s historical price observations.",
  },
  {
    request: "Compare the first two.",
    state: ["Same shopping task", "Previous results", "Listing evidence"],
    explanation:
      "Resolve the reference to the previous results and compare their supplied listing details. Keep unknown attributes explicit.",
  },
];
document.querySelectorAll("[data-commerce-demo]").forEach((demo) => {
  demo.querySelectorAll("[data-commerce-step]").forEach((button) => {
    button.addEventListener("click", () => {
      const step = commerceSteps[Number(button.dataset.commerceStep)];
      if (!step) return;
      demo
        .querySelectorAll("[data-commerce-step]")
        .forEach((item) =>
          item.setAttribute("aria-pressed", String(item === button)),
        );
      demo.querySelector("[data-demo-request]").textContent = step.request;
      demo.querySelector("[data-demo-explanation]").textContent =
        step.explanation;
      demo.querySelector("[data-demo-state]").replaceChildren(
        ...step.state.map((label) => {
          const tag = document.createElement("span");
          tag.textContent = label;
          return tag;
        }),
      );
    });
  });
});
