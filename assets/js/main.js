/* ============================================================
   Arif Hossain — Portfolio
   Vanilla JavaScript: navigation, scroll effects, form demo
   ============================================================ */

(function () {
  "use strict";

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ---------------------------------------------------------
     1. Mobile navigation
     --------------------------------------------------------- */
  const header = document.getElementById("site-header");
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const iconOpen = document.getElementById("menu-icon-open");
  const iconClose = document.getElementById("menu-icon-close");
  const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll("a") : [];

  function setMenu(open) {
    if (!menuToggle || !mobileMenu) return;

    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
    mobileMenu.classList.toggle("is-open", open);
    mobileMenu.setAttribute("aria-hidden", String(!open));
    header?.classList.toggle("is-solid", open || window.scrollY > 12);

    iconOpen?.classList.toggle("hidden", open);
    iconClose?.classList.toggle("hidden", !open);
  }

  menuToggle?.addEventListener("click", function () {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    setMenu(!isOpen);
  });

  mobileLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      setMenu(false);
    });
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      setMenu(false);
    }
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth >= 768) {
      setMenu(false);
    }
  });

  /* ---------------------------------------------------------
     2. Header background on scroll + back-to-top visibility
     --------------------------------------------------------- */
  const toTop = document.getElementById("to-top");

  function onScroll() {
    const scrolled = window.scrollY > 12;
    const menuOpen = mobileMenu?.classList.contains("is-open");

    header?.classList.toggle("is-solid", scrolled || Boolean(menuOpen));
    toTop?.classList.toggle("is-visible", window.scrollY > 480);

    setActiveNavLink();
  }

  /* ---------------------------------------------------------
     3. Active navigation link
     --------------------------------------------------------- */
  const allNavLinks = Array.from(
    document.querySelectorAll('.nav-link, .mobile-link')
  );
  const sections = Array.from(
    document.querySelectorAll("main section[id]")
  ).filter(function (section) {
    return allNavLinks.some(function (link) {
      return link.getAttribute("href") === "#" + section.id;
    });
  });

  function setActiveNavLink() {
    if (!sections.length) return;

    const probe = window.scrollY + window.innerHeight * 0.32;
    let current = sections[0].id;

    sections.forEach(function (section) {
      if (section.offsetTop <= probe) {
        current = section.id;
      }
    });

    // At the very bottom, highlight the last section.
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 4) {
      current = sections[sections.length - 1].id;
    }

    allNavLinks.forEach(function (link) {
      const isActive = link.getAttribute("href") === "#" + current;
      link.classList.toggle("is-active", isActive);
      if (isActive) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  /* ---------------------------------------------------------
     4. Scroll reveal + animated skill bars
     --------------------------------------------------------- */
  const revealItems = document.querySelectorAll(".reveal");
  const skillBars = document.querySelectorAll(".skill-fill");

  function fillSkillBar(bar) {
    const level = Number(bar.dataset.level) || 0;
    bar.style.width = Math.max(0, Math.min(100, level)) + "%";
  }

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    revealItems.forEach(function (item) {
      revealObserver.observe(item);
    });

    const skillObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          const bar = entry.target.querySelector(".skill-fill");
          if (bar) fillSkillBar(bar);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.3 }
    );

    document.querySelectorAll(".skill-card").forEach(function (card) {
      skillObserver.observe(card);
    });
  } else {
    revealItems.forEach(function (item) {
      item.classList.add("is-visible");
    });
    skillBars.forEach(fillSkillBar);
  }

  /* ---------------------------------------------------------
     5. Contact form (front-end demo only)
     --------------------------------------------------------- */
  const form = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");

  if (form) {
    const fields = {
      name: {
        input: document.getElementById("name"),
        error: document.getElementById("name-error"),
        validate: function (value) {
          if (!value) return "Please enter your name.";
          if (value.length < 2) return "Your name needs at least 2 characters.";
          return "";
        },
      },
      email: {
        input: document.getElementById("email"),
        error: document.getElementById("email-error"),
        validate: function (value) {
          if (!value) return "Please enter your email address.";
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
            return "Please enter a valid email, e.g. you@example.com.";
          }
          return "";
        },
      },
      message: {
        input: document.getElementById("message"),
        error: document.getElementById("message-error"),
        validate: function (value) {
          if (!value) return "Please write a short message.";
          if (value.length < 10) return "Please write at least 10 characters.";
          return "";
        },
      },
    };

    function showFieldError(field, message) {
      if (!field.input) return;
      field.input.classList.toggle("is-invalid", Boolean(message));
      field.input.classList.toggle("is-valid", !message && Boolean(field.input.value.trim()));
      field.input.setAttribute("aria-invalid", String(Boolean(message)));
      if (field.error) field.error.textContent = message;
    }

    function validateField(field) {
      const value = field.input ? field.input.value.trim() : "";
      const message = field.validate(value);
      showFieldError(field, message);
      return !message;
    }

    Object.keys(fields).forEach(function (key) {
      const field = fields[key];
      if (!field.input) return;

      field.input.addEventListener("blur", function () {
        validateField(field);
      });

      field.input.addEventListener("input", function () {
        // Only clear errors while typing; don't show new ones yet.
        if (field.input.classList.contains("is-invalid")) {
          validateField(field);
        }
      });
    });

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      let valid = true;
      Object.keys(fields).forEach(function (key) {
        if (!validateField(fields[key])) {
          valid = false;
        }
      });

      if (!valid) {
        formStatus?.classList.remove("is-visible");
        const firstInvalid = form.querySelector(".is-invalid");
        firstInvalid?.focus();
        return;
      }

      // Demo success state — replace with a real request when ready.
      formStatus?.classList.add("is-visible");
      form.reset();

      Object.keys(fields).forEach(function (key) {
        const field = fields[key];
        field.input?.classList.remove("is-valid", "is-invalid");
        field.input?.removeAttribute("aria-invalid");
        if (field.error) field.error.textContent = "";
      });

      formStatus?.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "nearest",
      });

      window.setTimeout(function () {
        formStatus?.classList.remove("is-visible");
      }, 8000);
    });
  }

  /* ---------------------------------------------------------
     6. Back to top
     --------------------------------------------------------- */
  toTop?.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
    menuToggle?.focus({ preventScroll: true });
  });

  /* ---------------------------------------------------------
     7. Footer year
     --------------------------------------------------------- */
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  /* ---------------------------------------------------------
     8. Scroll listener (rAF-throttled)
     --------------------------------------------------------- */
  let ticking = false;

  window.addEventListener(
    "scroll",
    function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () {
        onScroll();
        ticking = false;
      });
    },
    { passive: true }
  );

  window.addEventListener("load", onScroll);
  onScroll();
})();
