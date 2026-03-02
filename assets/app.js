/* global QH_CONFIG */
const QH = {
  apiBase() {
    if (!window.QH_CONFIG || !window.QH_CONFIG.API_BASE) {
      throw new Error("Missing config/config.js (QH_CONFIG.API_BASE).");
    }
    return window.QH_CONFIG.API_BASE;
  },

  async apiGet(action, params = {}) {
    const url = new URL(QH.apiBase());
    url.searchParams.set("mode", "public_api");
    url.searchParams.set("action", action);
    Object.keys(params).forEach(k => {
      if (params[k] != null && params[k] !== "") url.searchParams.set(k, params[k]);
    });
    const res = await fetch(url.toString(), { method: "GET" });
    const data = await res.json();
    return data;
  },

  async apiPost(action, body = {}) {
    const res = await fetch(QH.apiBase(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mode: "public_api", action, ...body })
    });
    const data = await res.json();
    return data;
  },

  saveSession(session) {
    localStorage.setItem("qh_session", JSON.stringify(session));
  },
  loadSession() {
    try { return JSON.parse(localStorage.getItem("qh_session") || "null"); }
    catch { return null; }
  },
  clearSession() {
    localStorage.removeItem("qh_session");
  },

  toast(title, message) {
    const el = document.getElementById("toast");
    if (!el) return alert(title + "\n\n" + message);
    el.querySelector(".t").textContent = title;
    el.querySelector(".m").textContent = message;
    el.classList.add("show");
    clearTimeout(window.__qh_toast_timer);
    window.__qh_toast_timer = setTimeout(() => el.classList.remove("show"), 4200);
  },

requireSession(role) {
  const s = QH.loadSession();

  if (!s || !s.session_token || (role && s.role !== role)) {
    const here = window.location.pathname + window.location.search;
    window.location.href = "/auth/login.html?next=" + encodeURIComponent(here);
    return null;
  }
  return s;
};
