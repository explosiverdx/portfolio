(function () {
  "use strict";

  var THEME_KEY = "rohit-portfolio-theme";

  function prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function getStoredTheme() {
    try {
      return localStorage.getItem(THEME_KEY);
    } catch (e) {
      return null;
    }
  }

  function setStoredTheme(value) {
    try {
      localStorage.setItem(THEME_KEY, value);
    } catch (e) {
      /* ignore */
    }
  }

  function getSystemTheme() {
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  }

  function applyTheme(theme, persist) {
    var root = document.documentElement;
    if (theme === "light") {
      root.setAttribute("data-theme", "light");
    } else {
      root.removeAttribute("data-theme");
    }
    if (persist) {
      setStoredTheme(theme);
    }

    var btn = document.querySelector("[data-theme-toggle]");
    if (btn) {
      btn.setAttribute("aria-pressed", theme === "light" ? "true" : "false");
      btn.setAttribute(
        "aria-label",
        theme === "light" ? "Switch to dark theme" : "Switch to light theme"
      );
    }
  }

  function initTheme() {
    var stored = getStoredTheme();
    var theme;
    var persist;
    if (stored === "light" || stored === "dark") {
      theme = stored;
      persist = true;
    } else {
      theme = getSystemTheme() === "light" ? "light" : "dark";
      persist = false;
    }
    applyTheme(theme, persist);

    var btn = document.querySelector("[data-theme-toggle]");
    if (btn) {
      btn.addEventListener("click", function () {
        var next = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
        applyTheme(next, true);
      });
    }
  }

  function initNavToggle() {
    var nav = document.querySelector(".site-nav");
    var toggle = document.querySelector(".nav-toggle");

    if (toggle && nav) {
      toggle.addEventListener("click", function () {
        var open = nav.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
    }
  }

  function closeMobileNav() {
    var nav = document.querySelector(".site-nav");
    var toggle = document.querySelector(".nav-toggle");
    if (nav && nav.classList.contains("is-open")) {
      nav.classList.remove("is-open");
      if (toggle) {
        toggle.setAttribute("aria-expanded", "false");
      }
    }
  }

  function initNavCloseOnLinkClick() {
    document.querySelectorAll(".site-nav a").forEach(function (link) {
      link.addEventListener("click", function () {
        closeMobileNav();
      });
    });
  }

  function initSmoothScroll() {
    document.addEventListener(
      "click",
      function (e) {
        var a = e.target.closest('a[href^="#"]');
        if (!a) {
          return;
        }
        var href = a.getAttribute("href");
        if (!href || href === "#") {
          return;
        }
        var id = href.slice(1);
        var el = document.getElementById(id);
        if (!el) {
          return;
        }
        e.preventDefault();
        el.scrollIntoView({
          behavior: prefersReducedMotion() ? "auto" : "smooth",
          block: "start",
        });
        if (window.history && window.history.replaceState) {
          try {
            window.history.replaceState(null, "", href);
          } catch (err) {
            /* e.g. some file:// contexts */
          }
        }
      },
      false
    );

    if (window.location.hash && window.location.hash.length > 1) {
      var target = document.getElementById(window.location.hash.slice(1));
      if (target) {
        window.requestAnimationFrame(function () {
          target.scrollIntoView({
            behavior: prefersReducedMotion() ? "auto" : "smooth",
            block: "start",
          });
        });
      }
    }
  }

  function initScrollReveal() {
    if (prefersReducedMotion()) {
      return;
    }

    document.documentElement.classList.add("js-reveal");

    var selector = [
      ".site-main > .section",
      ".project-card",
      ".skills-categories",
      ".timeline__item",
      ".contact-section",
    ].join(", ");

    var nodes = document.querySelectorAll(selector);
    if (!nodes.length) {
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    nodes.forEach(function (el) {
      el.classList.add("reveal-target");
      observer.observe(el);
    });
  }

  function initProjectCardHover() {
    if (prefersReducedMotion()) {
      return;
    }

    document.querySelectorAll(".project-card").forEach(function (card) {
      function setPointer(e) {
        var rect = card.getBoundingClientRect();
        var x = ((e.clientX - rect.left) / rect.width) * 100;
        var y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty("--pointer-x", x + "%");
        card.style.setProperty("--pointer-y", y + "%");
      }

      card.addEventListener("mouseenter", setPointer);
      card.addEventListener("mousemove", setPointer);
      card.addEventListener("mouseleave", function () {
        card.style.removeProperty("--pointer-x");
        card.style.removeProperty("--pointer-y");
      });
    });
  }

  function initActiveNav() {
    var current = window.location.pathname.split("/").pop() || "index.html";
    if (current === "" || current === "/") {
      current = "index.html";
    }

    document.querySelectorAll(".site-nav a").forEach(function (link) {
      var href = link.getAttribute("href");
      if (!href || href.indexOf(".pdf") !== -1) {
        return;
      }
      if (href === current) {
        link.classList.add("is-active");
      }
    });
  }

  function initYear() {
    var yearEl = document.getElementById("year");
    if (yearEl) {
      yearEl.textContent = String(new Date().getFullYear());
    }
  }

  document.documentElement.classList.add("js");

  initTheme();
  initNavToggle();
  initNavCloseOnLinkClick();
  initSmoothScroll();
  initScrollReveal();
  initProjectCardHover();
  initActiveNav();
  initYear();
})();
