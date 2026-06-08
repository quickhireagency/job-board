/* QuickHire™ Global Site Shell | Built 2026-06-08T20:38:12Z UTC */
(function (window, document) {
  "use strict";

  const PATHS = {
    home: "/",
    help: "/help.html",
    login: "/auth/login.html",
    candidateSignup: "/auth/signup-job-seeker.html",
    employerSignup: "/auth/signup-employer.html",
    candidateDashboard: "/candidate/dashboard.html",
    employerDashboard: "/employer/dashboard.html",
    employerJobs: "/employer/jobs.html",
    postJob: "/employer/post-job.html",
    billingSuccess: "/billing/success/",
    legal: "/legal/",
    terms: "/legal/terms.html",
    privacy: "/legal/privacy.html",
    veterans: "/legal/veterans.html",
    eeo: "/legal/eeo.html",
    osha: "/legal/osha.html",
    drugAlcohol: "/legal/drug-alcohol.html"
  };

  const ICONS = [
    { rel: "icon", href: "/favicon.ico", type: "image/x-icon", sizes: "16x16 32x32 48x48 96x96" },
    { rel: "icon", href: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    { rel: "icon", href: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
    { rel: "icon", href: "/favicon-48x48.png", type: "image/png", sizes: "48x48" },
    { rel: "icon", href: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
    { rel: "icon", href: "/favicon-192x192.png", type: "image/png", sizes: "192x192" },
    { rel: "apple-touch-icon", href: "/apple-touch-icon.png", type: "image/png", sizes: "180x180" },
    { rel: "manifest", href: "/site.webmanifest" }
  ];

  function safeSession() {
    try {
      return JSON.parse(window.localStorage.getItem("qh_session") || "null") || {};
    } catch (error) {
      return {};
    }
  }

  function currentPath() {
    let path = window.location.pathname || "/";
    if (path.length > 1 && path.endsWith("/index.html")) path = path.slice(0, -10) || "/";
    return path;
  }

  function currentNext() {
    return (window.location.pathname || "/") + (window.location.search || "") + (window.location.hash || "");
  }

  function loginHref(role) {
    const query = new URLSearchParams();
    if (role) query.set("role", role);
    query.set("next", currentNext());
    return PATHS.login + "?" + query.toString();
  }

  function ensureHeadAssets() {
    ICONS.forEach((spec) => {
      const selector = `link[rel="${spec.rel}"][href="${spec.href}"]`;
      if (document.head.querySelector(selector)) return;
      const link = document.createElement("link");
      Object.keys(spec).forEach((key) => link.setAttribute(key, spec[key]));
      document.head.appendChild(link);
    });

    let theme = document.head.querySelector('meta[name="theme-color"]');
    if (!theme) {
      theme = document.createElement("meta");
      theme.setAttribute("name", "theme-color");
      document.head.appendChild(theme);
    }
    theme.setAttribute("content", "#1f7a4a");
  }

  function contextConfig(path) {
    const exact = {
      "/apply/": ["Apply", "Submit your application", [["Back to Jobs", PATHS.home]]],
      "/apply/index.html": ["Apply", "Submit your application", [["Back to Jobs", PATHS.home]]],
      "/auth/login.html": ["Login", "Sign in to your account", [
        ["Candidate Sign Up", PATHS.candidateSignup, "candidateSignupBtn", "blue"],
        ["Employer Sign Up", PATHS.employerSignup, "employerSignupBtn", "primary"]
      ]],
      "/auth/reset.html": ["Reset Password", "Request a reset link or use a token from email.", [
        ["Login", PATHS.login, "loginLink", "blue"], ["Job Board", PATHS.home]
      ]],
      "/auth/signup-employer.html": ["Employer Sign Up", "Create an Employer account", [
        ["Back to Jobs", PATHS.home], ["Candidate Sign Up", PATHS.candidateSignup, "candidateSignupBtn", "primary"]
      ]],
      "/auth/signup-job-seeker.html": ["Candidate Sign Up", "Create a Job Seeker account", [
        ["Back to Jobs", PATHS.home], ["Employer Sign Up", PATHS.employerSignup, "employerSignupBtn", "primary"]
      ]],
      "/billing/success/": ["Payment Success", "Attach your purchase", [["Back to Jobs", PATHS.home]]],
      "/billing/success/index.html": ["Payment Success", "Attach your purchase", [["Back to Jobs", PATHS.home]]],
      "/candidate/dashboard.html": ["Candidate Dashboard", "Resume, profile, and applications", [["Back to Jobs", PATHS.home], ["Help", PATHS.help]]],
      "/employer/dashboard.html": ["Employer Dashboard", "Plans, entitlements, and job posting", [
        ["My Jobs", PATHS.employerJobs, "", "blue"], ["Post a Job", PATHS.postJob, "", "primary"], ["Back to Job Board", PATHS.home]
      ]],
      "/employer/jobs.html": ["My Jobs", "Manage postings, applicants, and status", [
        ["Dashboard", PATHS.employerDashboard, "", "blue"], ["Post a Job", PATHS.postJob, "", "primary"],
        ["View Drafts", "#", "btnViewDrafts", "button"], ["Public Job Board", PATHS.home]
      ]],
      "/employer/post-job.html": ["Post a Job", "Create a new posting", [
        ["Dashboard", PATHS.employerDashboard, "", "blue"], ["My Jobs", PATHS.employerJobs],
        ["Claim Purchase", PATHS.billingSuccess, "", "primary"], ["Public Job Board", PATHS.home]
      ]],
      "/help.html": ["Help Center", "Candidates, Employers, Account Security, Billing", [
        ["Job Board", PATHS.home], ["Candidate Sign Up", PATHS.candidateSignup, "", "blue"], ["Employer Portal", PATHS.employerDashboard, "", "primary"]
      ]],
      "/job.html": ["Job Detail", "A single job posting page", [["Back to Job Board", PATHS.home, "backBtn"], ["Help", PATHS.help]]],
      "/legal/": ["Legal & Policies", "QuickHire™ legal and policy documents", [["Back to Jobs", PATHS.home]]],
      "/legal/index.html": ["Legal & Policies", "QuickHire™ legal and policy documents", [["Back to Jobs", PATHS.home]]],
      "/legal/candidate-packet.html": ["Candidate Packet", "Read fully, then return to signup to acknowledge.", [["All Policies", PATHS.legal], ["Back to Candidate Signup", PATHS.candidateSignup]]],
      "/legal/employer-packet.html": ["Employer Packet", "Read fully, then return to signup to acknowledge.", [["All Policies", PATHS.legal], ["Back to Employer Signup", PATHS.employerSignup]]],
      "/legal/drug-alcohol.html": ["Drug & Alcohol Policy", "QuickHire™ Legal", [["All Policies", PATHS.legal], ["Job Board", PATHS.home]]],
      "/legal/eeo.html": ["EEO Policy", "QuickHire™ Legal", [["All Policies", PATHS.legal], ["Job Board", PATHS.home]]],
      "/legal/osha.html": ["Workplace Safety (OSHA)", "QuickHire™ Legal", [["All Policies", PATHS.legal], ["Job Board", PATHS.home]]],
      "/legal/privacy.html": ["Privacy Policy", "QuickHire™ Legal", [["All Policies", PATHS.legal], ["Job Board", PATHS.home]]],
      "/legal/terms.html": ["Terms of Service", "QuickHire™ Legal", [["All Policies", PATHS.legal], ["Job Board", PATHS.home]]],
      "/legal/veterans.html": ["Veteran’s Policy", "QuickHire™ Legal", [["All Policies", PATHS.legal], ["Job Board", PATHS.home]]]
    };
    return exact[path] || null;
  }

  function contextHtml(config) {
    if (!config) return "";
    const [title, subtitle, links] = config;
    const actions = links.map(([label, href, id, style]) => {
      const classes = ["qh-shell-btn"];
      if (style === "blue") classes.push("qh-shell-btn-blue");
      if (style === "primary") classes.push("qh-shell-btn-primary");
      const idAttr = id ? ` id="${id}"` : "";
      if (style === "button") {
        return `<button class="${classes.join(" ")}"${idAttr} type="button">${label}</button>`;
      }
      return `<a class="${classes.join(" ")}"${idAttr} href="${href}" target="_self">${label}</a>`;
    }).join("");
    return `
      <div class="qh-shell-context">
        <div class="qh-shell-context-inner">
          <div class="qh-shell-context-copy">
            <div class="qh-shell-context-title">${title}</div>
            <div class="qh-shell-context-subtitle">${subtitle}</div>
          </div>
          <div class="qh-shell-context-links" aria-label="Page navigation">${actions}</div>
        </div>
      </div>`;
  }

  function headerHtml() {
    const session = safeSession();
    const candidate = Boolean(session.session_token && session.role === "job_seeker");
    const employer = Boolean(session.session_token && session.role === "employer");
    const loggedIn = candidate || employer;
    const menuLabel = employer ? "Employer Account" : "My Account";
    const dashboardHref = employer ? PATHS.employerDashboard : PATHS.candidateDashboard;
    const dashboardLabel = employer ? "Employer Dashboard" : "Candidate Dashboard";
    const context = contextConfig(currentPath());

    return `
      <header class="qh-global-header" aria-label="QuickHire global header">
        <div class="qh-global-header-inner">
          <div class="qh-global-brand" aria-label="QuickHire brand">
            <a href="${PATHS.home}" target="_self">
              <img src="/QuickHireTransparentLogo02.png" alt="QuickHire™">
              <div>
                <div class="qh-global-brand-title">Job Board</div>
                <div class="qh-global-brand-subtitle">Browse jobs. Apply with an account.</div>
              </div>
            </a>
          </div>

          <div class="qh-global-controls">
            <form class="qh-global-search" id="qhGlobalSearchForm" role="search" action="/" method="get" title="Keyword search">
              <input id="searchInput" name="q" type="search" placeholder="Search jobs (keyword)..." aria-label="Search jobs by keyword" autocomplete="off">
            </form>

            <div class="qh-global-actions" aria-label="Top actions">
              <a class="qh-shell-btn" id="helpBtn" href="${PATHS.help}" target="_self">Help</a>
              <a class="qh-shell-btn qh-shell-btn-blue" id="loginBtn" href="${loginHref("")}" target="_self">Login / Sign Up</a>

              <div class="qh-shell-account" id="acctWrap" data-qh-account style="display:${loggedIn ? "inline-flex" : "none"};">
                <button class="qh-shell-btn qh-shell-btn-blue" id="acctBtn" type="button" aria-haspopup="true" aria-expanded="false">${menuLabel}</button>
                <div class="qh-shell-menu" id="acctMenu" role="menu" aria-label="My Account menu">
                  <a href="${dashboardHref}" target="_self" role="menuitem">${dashboardLabel}</a>
                  <a href="${PATHS.employerJobs}" target="_self" role="menuitem" style="display:${employer ? "block" : "none"};">My Jobs</a>
                  <a href="${PATHS.postJob}" target="_self" role="menuitem" style="display:${employer ? "block" : "none"};">Post a Job</a>
                  <a href="${PATHS.billingSuccess}" target="_self" role="menuitem" style="display:${employer ? "block" : "none"};">Claim Purchase</a>
                  <div class="qh-shell-menu-separator" aria-hidden="true"></div>
                  <button class="qh-shell-menu-danger" id="logoutBtn" type="button" role="menuitem" style="display:${employer ? "none" : "block"};">Logout</button>
                  <button class="qh-shell-menu-danger" id="btnLogout" type="button" role="menuitem" style="display:${employer ? "block" : "none"};">Logout</button>
                </div>
              </div>

              <a class="qh-shell-btn qh-shell-btn-primary" id="employerBtn" href="${employer ? PATHS.employerDashboard : loginHref("employer")}" target="_self">Employer Portal</a>
            </div>
          </div>
        </div>
        ${contextHtml(context)}
      </header>`;
  }

  function footerHtml() {
    const year = new Date().getFullYear();
    return `
      <footer class="qh-global-footer" aria-label="QuickHire footer">
        <div class="qh-global-footer-logo-wrap" aria-label="QuickHire footer logo">
          <a href="https://www.quickhire.agency" target="_self" rel="noopener">
            <img class="qh-global-footer-logo" src="/QuickHireTransparentLogo02.png" alt="QuickHire™">
          </a>
        </div>

        <p class="qh-global-footer-copyright">
          <strong>Copyright © 2017-<span id="qh-year">${year}</span> | QuickHire Agency™</strong> — All Rights Reserved
        </p>

        <div class="qh-global-footer-grid">
          <section aria-label="Contact Us">
            <h3>Contact Us</h3>
            <p><a href="mailto:info@quickhire.agency">info@quickhire.agency</a><br><a href="tel:+13174421437">(317) 442-1437</a></p>
          </section>
          <section aria-label="Location">
            <h3>Location</h3>
            <address>
              <span class="qh-global-line">151 N. Delaware Street</span>
              <span class="qh-global-line">Suite 122</span>
              <span class="qh-global-line">Indianapolis, IN 46204</span>
            </address>
          </section>
          <section aria-label="Hours of Operation">
            <h3>Hours of Operation</h3>
            <p>Monday – Friday: 9:00 AM – 5:00 PM (ET)<br>Saturday: Closed<br>Sunday: Closed</p>
          </section>
        </div>

        <div class="qh-global-footer-legal" aria-label="Legal and EEO">
          <h3>Equal Opportunity Employer</h3>
          <p>QuickHire™ is an equal opportunity employer, and does not discriminate on the basis of race, sex, religion, color, national origin, gender identity, pregnancy status, disability status, veteran status or any other protected category as defined by law, and in accordance with the Civil Rights Act of 1964, as amended, Americans with Disabilities Act of 1990, as amended, the Vietnam Era Veterans’ Readjustment Assistance Act of 1974, as amended, Uniformed Services Employment &amp; Reemployment Rights Act of 1994, as amended, and the Rehabilitation Act of 1973, as amended.</p>
          <p>If you believe you have experienced discrimination in the employment process, you may contact the Equal Employment Opportunity Commission by visiting <a href="https://www.eeoc.gov" target="_self" rel="noopener">www.eeoc.gov</a> or by mail at: <span class="qh-global-line">131 M Street, NE, Washington, D.C., 20507</span><span class="qh-global-line">or for IN, KY, MI applicant(s) &amp; employee(s): 115 W. Washington Street, South Tower, Suite 600, Indianapolis, IN 46204.</span></p>
          <p class="qh-global-badge">VETERAN OWNED BUSINESS</p>
          <nav class="qh-global-footer-links" aria-label="Footer links">
            <a href="${PATHS.terms}" target="_self">Terms of Service</a>
            <a href="${PATHS.privacy}" target="_self">Privacy Policy</a>
            <a href="${PATHS.veterans}" target="_self">Veteran’s Policy</a>
            <a href="${PATHS.eeo}" target="_self">EEO Policy</a>
            <a href="${PATHS.osha}" target="_self">OSHA Policy</a>
            <a href="${PATHS.drugAlcohol}" target="_self">Drug Free Policy</a>
          </nav>
          <div class="qh-global-powered" aria-label="Powered by Cook Technology Services">
            <a href="https://cts.cook-international.com/" target="_self" rel="noopener">POWERED BY COOK TECHNOLOGY SERVICES</a>
          </div>
        </div>
      </footer>`;
  }

  function clearSession() {
    try {
      if (window.QH && typeof window.QH.clearSession === "function") window.QH.clearSession();
      else window.localStorage.removeItem("qh_session");
    } catch (error) {
      window.localStorage.removeItem("qh_session");
    }
  }

  function wireHeader(root) {
    if (!root || root.dataset.qhWired === "true") return;
    root.dataset.qhWired = "true";

    const path = currentPath();
    const form = root.querySelector("#qhGlobalSearchForm");
    const input = root.querySelector("#searchInput");
    const onHome = path === "/" || path === "/index.html";

    if (onHome && input) {
      const q = new URLSearchParams(window.location.search).get("q");
      if (q) input.value = q;
    }

    if (form) {
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const q = input ? String(input.value || "").trim() : "";
        if (onHome) {
          if (input) input.dispatchEvent(new Event("input", { bubbles: true }));
          return;
        }
        const target = q ? `/?q=${encodeURIComponent(q)}` : "/";
        window.location.assign(target);
      });
    }

    const account = root.querySelector("#acctWrap");
    const accountButton = root.querySelector("#acctBtn");
    const legacyMenuPage = path === "/" || path === "/index.html" || path === "/job.html" || path === "/candidate/dashboard.html";

    if (!legacyMenuPage && account && accountButton) {
      accountButton.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        const open = account.classList.toggle("open");
        accountButton.setAttribute("aria-expanded", open ? "true" : "false");
      });
      document.addEventListener("click", (event) => {
        if (!account.contains(event.target)) {
          account.classList.remove("open");
          accountButton.setAttribute("aria-expanded", "false");
        }
      });
    }

    const employerLegacyLogout = path === "/employer/dashboard.html" || path === "/employer/jobs.html" || path === "/employer/post-job.html";
    const candidateLegacyLogout = legacyMenuPage;

    if (!candidateLegacyLogout) {
      const logout = root.querySelector("#logoutBtn");
      if (logout) logout.addEventListener("click", () => { clearSession(); window.location.assign("/"); });
    }
    if (!employerLegacyLogout) {
      const employerLogout = root.querySelector("#btnLogout");
      if (employerLogout) employerLogout.addEventListener("click", () => { clearSession(); window.location.assign("/"); });
    }
  }

  function mountHeader() {
    const mount = document.getElementById("qh-global-header");
    if (!mount || mount.dataset.qhMounted === "true") return;
    mount.innerHTML = headerHtml();
    mount.dataset.qhMounted = "true";
    wireHeader(mount);
  }

  function mountFooter() {
    const mount = document.getElementById("qh-global-footer");
    if (!mount || mount.dataset.qhMounted === "true") return;
    mount.innerHTML = footerHtml();
    mount.dataset.qhMounted = "true";
  }

  ensureHeadAssets();

  window.QHGlobalShell = Object.freeze({
    mountHeader,
    mountFooter,
    refreshHeader: function () {
      const mount = document.getElementById("qh-global-header");
      if (!mount) return;
      mount.dataset.qhMounted = "false";
      mount.innerHTML = "";
      mountHeader();
    }
  });

  document.addEventListener("DOMContentLoaded", function () {
    mountHeader();
    mountFooter();
  });
})(window, document);
