"use strict";

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

function setupMobileNav() {
  const toggle = $(".nav-toggle");
  const links = $("#navLinks");

  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Close menu when clicking a link
  $$("#navLinks a").forEach((a) => {
    a.addEventListener("click", () => {
      links.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function setupFilters() {
  const pills = $$(".pill");
  const projects = $$(".project");

  function setActive(btn) {
    pills.forEach((p) => p.classList.remove("is-active"));
    btn.classList.add("is-active");
  }

  pills.forEach((pill) => {
    pill.addEventListener("click", () => {
      const filter = pill.dataset.filter;
      setActive(pill);

      projects.forEach((card) => {
        const tags = card.dataset.tags.split(",");
        const show = filter === "all" || tags.includes(filter);
        card.style.display = show ? "block" : "none";
      });
    });
  });
}

function setupContactForm() {
  const form = $("#contactForm");
  const note = $("#formNote");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const name = String(data.get("name")).trim();
    const email = String(data.get("email")).trim();
    const message = String(data.get("message")).trim();

    const payload =
`Name: ${name}
Email: ${email}

Message:
${message}`;

    try {
      await navigator.clipboard.writeText(payload);
      note.textContent = "Copied. Paste into an email and send it to lebanm04@uw.edu.";
      form.reset();
    } catch {
      note.textContent = "Couldn’t auto-copy — please copy manually and email lebanm04@uw.edu.";
    }
  });
}

function setupFooter() {
  $("#year").textContent = String(new Date().getFullYear());
  $("#toTop").addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

function setupResumeLink() {
  // Replace this later with your real resume file path (e.g., /LebanMohamud_Resume.pdf)
  const resume = $("#resumeLink");
  resume.addEventListener("click", (e) => {
    e.preventDefault();
    alert("Add your resume PDF and update the link in script.js (setupResumeLink).");
  });
}

setupMobileNav();
setupFilters();
setupContactForm();
setupFooter();
setupResumeLink();
