"use strict";

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

function setupMobileNav() {
  const toggle = $(".nav-toggle");
  const links = $("#navLinks");

  if (!toggle || !links) {
    return;
  }

  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  $$("#navLinks a").forEach((link) => {
    link.addEventListener("click", () => {
      links.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("click", (event) => {
    const insideNav = event.target.closest(".nav");

    if (!insideNav && links.classList.contains("is-open")) {
      links.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && links.classList.contains("is-open")) {
      links.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.focus();
    }
  });
}

function setupFilters() {
  const pills = $$(".pill");
  const projects = $$(".project");

  if (!pills.length || !projects.length) {
    return;
  }

  function setActive(button) {
    pills.forEach((pill) => {
      pill.classList.remove("is-active");
    });

    button.classList.add("is-active");
  }

  function showCard(card) {
    card.classList.remove("is-hidden");

    requestAnimationFrame(() => {
      card.classList.add("is-visible");
    });
  }

  function hideCard(card) {
    card.classList.remove("is-visible");

    window.setTimeout(() => {
      if (!card.classList.contains("is-visible")) {
        card.classList.add("is-hidden");
      }
    }, 180);
  }

  pills.forEach((pill) => {
    pill.addEventListener("click", () => {
      const filter = pill.dataset.filter;

      setActive(pill);

      projects.forEach((card) => {
        const tags = card.dataset.tags
          .split(",")
          .map((tag) => tag.trim());

        const shouldShow =
          filter === "all" ||
          tags.includes(filter);

        if (shouldShow) {
          showCard(card);
        } else {
          hideCard(card);
        }
      });
    });
  });
}

function setupContactForm() {
  const form = $("#contactForm");
  const note = $("#formNote");

  if (!form || !note) {
    return;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const data = new FormData(form);

    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();

    const payload =
`Name: ${name}
Email: ${email}

Message:
${message}`;

    const subject =
      encodeURIComponent(`Portfolio inquiry from ${name}`);

    const body =
      encodeURIComponent(payload);

    const mailtoLink =
      `mailto:lebanm04@uw.edu?subject=${subject}&body=${body}`;

    try {
      await navigator.clipboard.writeText(payload);

      window.location.href = mailtoLink;

      note.textContent =
        "Your message has been prepared and your email application should open.";

      form.reset();
    } catch (error) {
      window.location.href = mailtoLink;

      note.textContent =
        "Your email application should open. If it doesn't, email me directly at lebanm04@uw.edu.";
    }
  });
}

function setupFooter() {
  const year = $("#year");
  const toTop = $("#toTop");

  if (year) {
    year.textContent =
      String(new Date().getFullYear());
  }

  if (toTop) {
    toTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }
}

function setupResumeLink() {
  const resume = $("#resumeLink");

  if (!resume) {
    return;
  }

  resume.href = "LebanMohamudResume.pdf";

  resume.setAttribute(
    "target",
    "_blank"
  );

  resume.setAttribute(
    "rel",
    "noreferrer"
  );
}

function setupCapstoneAnimations() {
  const cards = $$(".capstone-card");

  if (!cards.length) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    },
    {
      threshold: 0.15
    }
  );

  cards.forEach((card) => {
    observer.observe(card);
  });
}

function setupSmoothScrolling() {
  const links = document.querySelectorAll(
    'a[href^="#"]'
  );

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId =
        link.getAttribute("href");

      if (!targetId || targetId === "#") {
        return;
      }

      const target =
        document.querySelector(targetId);

      if (!target) {
        return;
      }

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });
}

function setupProjectHoverEffects() {
  const projects = $$(".project");

  projects.forEach((project) => {
    project.addEventListener("mouseenter", () => {
      project.style.transform =
        "translateY(-4px)";
    });

    project.addEventListener("mouseleave", () => {
      project.style.transform =
        "";
    });
  });
}

function init() {
  setupMobileNav();
  setupFilters();
  setupContactForm();
  setupFooter();
  setupResumeLink();
  setupCapstoneAnimations();
  setupSmoothScrolling();
  setupProjectHoverEffects();
}

document.addEventListener(
  "DOMContentLoaded",
  init
);
