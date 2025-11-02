(function () {
  const MOCK = { jtm: 431.27, jtr: 892.77, pel: 23874 };

  function updateKPI() {
    document.getElementById("statJTM").textContent = MOCK.jtm.toFixed(2);
    document.getElementById("statJTR").textContent = MOCK.jtr.toFixed(2);
    document.getElementById("statPEL").textContent = MOCK.pel.toLocaleString();
  }

  document.getElementById("btnRefresh").onclick = updateKPI;

  window.addEventListener("DOMContentLoaded", () => {
    if (window.lucide) lucide.createIcons();
    updateKPI();
  });
})();
