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

  $$("#navLinks a").forEach((a) => {
    a.addEventListener("click", () => {
      links.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("click", (e) => {
    const clickedInsideNav = e.target.closest(".nav");

    if (!clickedInsideNav && links.classList.contains("is-open")) {
      links.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && links.classList.contains("is-open")) {
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

  function setActive(btn) {
    pills.forEach((pill) => pill.classList.remove("is-active"));
    btn.classList.add("is-active");
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

        const shouldShow = filter === "all" || tags.includes(filter);

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

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();

    const payload =
`Name: ${name}
Email: ${email}

Message:
${message}`;

    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(payload);
    const mailtoLink = `mailto:lebanm04@uw.edu?subject=${subject}&body=${body}`;

    try {
      await navigator.clipboard.writeText(payload);
      window.location.href = mailtoLink;
      note.textContent =
        "Your message was prepared and your email app should open now.";
      form.reset();
    } catch (err) {
      window.location.href = mailtoLink;
      note.textContent =
        "Your email app should open now. If it does not, email lebanm04@uw.edu directly.";
    }
  });
}

function setupFooter() {
  const year = $("#year");
  const toTop = $("#toTop");

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  if (toTop) {
    toTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
}

function setupResumeLink() {
  const resume = $("#resumeLink");

  if (!resume) {
    return;
  }

  resume.href = "LebanMohamudResume.pdf";
  resume.setAttribute("target", "_blank");
  resume.setAttribute("rel", "noreferrer");
}

function init() {
  setupMobileNav();
  setupFilters();
  setupContactForm();
  setupFooter();
  setupResumeLink();
}

init();
