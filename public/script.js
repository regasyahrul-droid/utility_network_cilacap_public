(function () {
  // ---------- THEME SWITCH ----------
  const body = document.body;
  const themeBtn = document.getElementById("themeBtn");
  const saved = localStorage.getItem("theme") || "hybrid";
  body.setAttribute("data-theme", saved);
  let vanta = null;

  function mountGlobe() {
    const el = document.getElementById("globeHero");
    if (!el) return;
    if (vanta) return; // already mounted
    try {
      vanta = VANTA.GLOBE({
        el,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 320.0,
        minWidth: 320.0,
        scale: 1.0,
        scaleMobile: 1.0,
        color: 0x38e0c4,
        color2: 0x0a84ae,
        size: 0.9,
        backgroundColor: 0x0b1a2d
      });
    } catch (e) {
      console.warn("VANTA failed:", e);
      el.style.background =
        "radial-gradient(600px 400px at 30% 20%, #163256, #0b1a2d)";
    }
  }
  function destroyGlobe() {
    if (vanta && vanta.destroy) vanta.destroy();
    vanta = null;
  }
  function setTheme(t) {
    body.setAttribute("data-theme", t);
    localStorage.setItem("theme", t);
    // switch globe mount
    if (t === "hybrid") mountGlobe();
    else destroyGlobe();
    // button label
    if (themeBtn) {
      themeBtn.querySelector("span").textContent =
        t === "hybrid" ? "Hybrid" : "Classic";
    }
  }
  if (themeBtn) {
    themeBtn.onclick = () => {
      const now = body.getAttribute("data-theme") === "hybrid" ? "classic" : "hybrid";
      setTheme(now);
    };
  }

  // ---------- KPI MOCK ----------
  const MOCK = { jtm: 431.27, jtr: 892.77, pel: 23874 };
  function updateKPI() {
    document.getElementById("statJTM").textContent = MOCK.jtm.toFixed(2);
    document.getElementById("statJTR").textContent = MOCK.jtr.toFixed(2);
    document.getElementById("statPEL").textContent = MOCK.pel.toLocaleString();
  }

  // ---------- INIT ----------
  window.addEventListener("DOMContentLoaded", () => {
    if (window.lucide) lucide.createIcons();
    // init theme + globe
    setTheme(saved);
    updateKPI();
    // hide loader
    const l = document.getElementById("loader");
    if (l) l.classList.add("hidden");
    // refresh button
    const btn = document.getElementById("btnRefresh");
    if (btn) btn.onclick = updateKPI;
  });
})();
