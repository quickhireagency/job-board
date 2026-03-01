(function () {
  // ====== IMPORTANT: update these paths ONLY if your pages use different filenames ======
  const ROUTES = {
    HOME: "/index.html",
    SIGNUP: "/signup.html",
    LOGIN: "/login.html",
    EMPLOYERS: "/employers.html",

    // You said: “re-link terms and privacy policy to the jobboard subdomain pages we just created.”
    // These MUST match real files in your repo. If your files are different, change these two.
    TERMS: "/terms-of-service.html",
    PRIVACY: "/privacy-policy.html",

    // Policy pages (these MUST match your repo filenames)
    EEO: "/policies/eeo.html",
    OSHA: "/policies/osha.html",
    DRUGS: "/policies/drug-alcohol.html",
    VETERANS: "/policies/veterans.html",
  };

  // ====== Images in repo root or assets folder? You told me they are “in the main repo”.
  // If they are in /assets/img/, change these paths to /assets/img/<filename>
  const IMG = {
    LOGO: "/QuickHireTransparentLogo02.png",
    VERIFIED_BADGE: "/QuickHireVerifiedEmployerBadge.png",

    VETERANS: "/topveteran employer00.jpg",
    EEO: "/Equal Employment Opportunity Logo.png",
    OSHA: "/OSHA-logo-1600x900-1.jpg",
    DRUGS: "/drugsarebadmkay.png",
  };

  const headerHTML = `
    <header class="qh-header">
      <div class="qh-header-inner">
        <a class="qh-brand" href="${ROUTES.HOME}" aria-label="QuickHire Job Board Home">
          <img class="qh-logo" src="${IMG.LOGO}" alt="QuickHire™" />
        </a>

        <nav class="qh-nav" aria-label="Primary">
          <a href="${ROUTES.HOME}">Job Board</a>
          <a href="${ROUTES.SIGNUP}">Sign Up</a>
          <a href="${ROUTES.LOGIN}">Login</a>
          <a href="${ROUTES.EMPLOYERS}">Employer Portal</a>
        </nav>
      </div>
    </header>
  `;

  const footerHTML = `
    <footer class="qh-footer" aria-label="QuickHire footer">
      <div class="qh-footer-top">
        <a class="qh-footer-logo-link" href="${ROUTES.HOME}" aria-label="Back to Job Board Home">
          <img class="qh-footer-logo" src="${IMG.LOGO}" alt="QuickHire™" />
        </a>
      </div>

      <p class="qh-footer-copyright">
        <strong>Copyright © 2017-<span id="qh-year"></span> | QuickHire Agency™</strong> — All Rights Reserved
      </p>

      <div class="qh-footer-grid">
        <section aria-label="Contact Us">
          <h3>Contact Us</h3>
          <p>
            <a href="mailto:info@quickhire.agency">info@quickhire.agency</a><br>
            <a href="tel:+13174421437">(317) 442-1437</a>
          </p>
        </section>

        <section aria-label="Location">
          <h3>Location</h3>
          <address>
            <span class="qh-line">151 N. Delaware Street</span>
            <span class="qh-line">Suite 122</span>
            <span class="qh-line">Indianapolis, IN 46204</span>
          </address>
        </section>

        <section aria-label="Hours of Operation">
          <h3>Hours of Operation</h3>
          <p>
            Monday – Friday: 9:00 AM – 5:00 PM (ET)<br>
            Saturday: Closed<br>
            Sunday: Closed
          </p>
        </section>
      </div>

      <div class="qh-footer-legal" aria-label="Legal and EEO">
        <h3>Equal Opportunity Employer</h3>

        <p>
          QuickHire™ is an equal opportunity employer, and does not discriminate on the basis of race, sex, religion, color, national origin,
          gender identity, pregnancy status, disability status, veteran status or any other protected category as defined by law, and in accordance
          with the Civil Rights Act of 1964, as amended, Americans with Disabilities Act of 1990, as amended, the Vietnam Era Veterans’ Readjustment
          Assistance Act of 1974, as amended, Uniformed Services Employment &amp; Reemployment Rights Act of 1994, as amended, and the Rehabilitation
          Act of 1973, as amended.
        </p>

        <p>
          If you believe you have experienced discrimination in the employment process, you may contact the Equal Employment Opportunity Commission
          by visiting <a href="https://www.eeoc.gov" target="_blank" rel="noopener">www.eeoc.gov</a> or by mail at:
          <span class="qh-line">131 M Street, NE, Washington, D.C., 20507</span>
          <span class="qh-line">or for IN, KY, MI applicant(s) &amp; employee(s): 115 W. Washington Street, South Tower, Suite 600, Indianapolis, IN 46204.</span>
        </p>

        <p class="qh-badge">VETERAN OWNED BUSINESS</p>

        <div class="qh-policy-logos" aria-label="Policy logos">
          <!-- ORDER REQUIRED: Veterans, EEO, OSHA, Drugs -->
          <a class="qh-policy-logo" href="${ROUTES.VETERANS}" aria-label="Veteran’s Policy">
            <img src="${IMG.VETERANS}" alt="Veterans Policy" />
          </a>
          <a class="qh-policy-logo" href="${ROUTES.EEO}" aria-label="EEO Policy">
            <img src="${IMG.EEO}" alt="Equal Employment Opportunity" />
          </a>
          <a class="qh-policy-logo" href="${ROUTES.OSHA}" aria-label="Workplace Safety OSHA">
            <img src="${IMG.OSHA}" alt="OSHA Workplace Safety" />
          </a>
          <a class="qh-policy-logo" href="${ROUTES.DRUGS}" aria-label="Drug & Alcohol Policy">
            <img src="${IMG.DRUGS}" alt="Drug & Alcohol Policy" />
          </a>
        </div>

        <nav class="qh-footer-links" aria-label="Footer links">
          <a href="${ROUTES.TERMS}" target="_self">Terms of Service</a>
          <a href="${ROUTES.PRIVACY}" target="_self">Privacy Policy</a>
        </nav>
      </div>
    </footer>
  `;

  function inject(id, html) {
    const el = document.getElementById(id);
    if (el) el.innerHTML = html;
  }

  inject("qhHeader", headerHTML);
  inject("qhFooter", footerHTML);

  const y = document.getElementById("qh-year");
  if (y) y.textContent = String(new Date().getFullYear());
})();
