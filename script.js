window.onload = function () {
  createInvoiceChart();
  createLineChart();
  showChart("bar");
};

// === Helper: Get theme colors ===
function getThemeColors() {
  const isDark = document.body.classList.contains("dark-mode");
  return {
    barGradient: isDark ? ["#ffce00", "#6c63ff"] : ["#6c63ff", "#48c6ef"],
    tooltipBg: isDark ? "#23263a" : "#fff",
    tooltipTitle: isDark ? "#ffce00" : "#6c63ff",
    tooltipBody: isDark ? "#ffce00" : "#333",
    tooltipBorder: isDark ? "#ffce00" : "#6c63ff",
    yGrid: isDark ? "#23263a" : "#eee",
    yTicks: isDark ? "#ffce00" : "#6c63ff",
    xTicks: isDark ? "#ffce00" : "#6c63ff",
  };
}

// === Sidebar: Mobile Toggle ===
function createSidebarToggle() {
  if (document.querySelector(".sidebar-toggle")) return;
  const btn = document.createElement("button");
  btn.className = "sidebar-toggle";
  btn.setAttribute("aria-label", "Toggle sidebar");
  btn.innerHTML = "☰";
  btn.style.position = "fixed";
  btn.style.top = "10px";
  btn.style.left = "10px";
  btn.style.zIndex = "200";
  btn.style.fontSize = "2rem";
  btn.style.background = "#fff";
  btn.style.border = "none";
  btn.style.borderRadius = "8px";
  btn.style.boxShadow = "0 2px 8px #e0e0e0";
  btn.style.display = "none";
  document.body.appendChild(btn);
  return btn;
}

function handleSidebarToggle() {
  const sidebar = document.querySelector(".sidebar");
  const btn = createSidebarToggle();
  function updateBtnVisibility() {
    btn.style.display = window.innerWidth <= 700 ? "block" : "none";
    if (window.innerWidth > 700) sidebar.classList.remove("sidebar-collapsed");
  }
  btn.addEventListener("click", () => {
    sidebar.classList.toggle("sidebar-collapsed");
  });
  window.addEventListener("resize", updateBtnVisibility);
  updateBtnVisibility();
}

document.addEventListener("DOMContentLoaded", handleSidebarToggle);

// === Sidebar: Event Delegation for Nav ===
const sidebarNav = document.querySelector(".sidebar nav ul");
if (sidebarNav) {
  sidebarNav.addEventListener("click", function (e) {
    const li = e.target.closest("li");
    if (!li) return;
    sidebarNav
      .querySelectorAll("li")
      .forEach((i) => i.classList.remove("active"));
    li.classList.add("active");
  });
  sidebarNav.querySelectorAll("li").forEach((li) => {
    li.setAttribute("tabindex", "0");
    li.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        sidebarNav
          .querySelectorAll("li")
          .forEach((i) => i.classList.remove("active"));
        li.classList.add("active");
      }
    });
  });
}

// === Sidebar Profile Dropdown: Event Delegation ===
const sidebarProfile = document.querySelector(".sidebar-profile");
const settingsMenu = document.querySelector(".sidebar-settings-menu");
const settingsOptions = document.querySelectorAll(".settings-option");

function closeSettingsMenu() {
  settingsMenu.style.display = "none";
  sidebarProfile.classList.remove("open");
}
function openSettingsMenu() {
  settingsMenu.style.display = "flex";
  sidebarProfile.classList.add("open");
  settingsOptions[0].focus();
}
if (sidebarProfile) {
  sidebarProfile.addEventListener("click", function (e) {
    e.stopPropagation();
    if (settingsMenu.style.display === "flex") {
      closeSettingsMenu();
    } else {
      openSettingsMenu();
    }
  });
}
settingsOptions.forEach((option) => {
  option.addEventListener("click", function () {
    settingsOptions.forEach((opt) => opt.classList.remove("active"));
    this.classList.add("active");
    closeSettingsMenu();
  });
  option.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") {
      settingsOptions.forEach((opt) => opt.classList.remove("active"));
      this.classList.add("active");
      closeSettingsMenu();
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = this.nextElementSibling || settingsOptions[0];
      next.focus();
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const prev =
        this.previousElementSibling ||
        settingsOptions[settingsOptions.length - 1];
      prev.focus();
    }
    if (e.key === "Escape") {
      closeSettingsMenu();
      sidebarProfile.focus();
    }
  });
});
document.addEventListener("click", function (e) {
  if (!sidebarProfile.contains(e.target)) closeSettingsMenu();
});
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeSettingsMenu();
    sidebarProfile.focus();
  }
});

// === Dark Mode ===
const darkModeBtn = document.querySelector(".dark-mode-toggle");
const body = document.body;
function setDarkMode(enabled) {
  if (enabled) {
    body.classList.add("dark-mode");
    darkModeBtn.textContent = "☀️";
  } else {
    body.classList.remove("dark-mode");
    darkModeBtn.textContent = "🌙";
  }
  localStorage.setItem("darkMode", enabled ? "1" : "0");
  updateChartsForDarkMode();
}
darkModeBtn.addEventListener("click", () => {
  setDarkMode(!body.classList.contains("dark-mode"));
});
window.addEventListener("DOMContentLoaded", () => {
  const dark = localStorage.getItem("darkMode") === "1";
  setDarkMode(dark);
});

// === Chart.js: Invoice Bar & Line Charts ===
let invoiceChart, invoiceLineChart;
function createInvoiceChart() {
  const ctx = document.getElementById("barChart").getContext("2d");
  if (invoiceChart) invoiceChart.destroy();
  const colors = getThemeColors();
  const gradient = ctx.createLinearGradient(0, 0, 0, 200);
  gradient.addColorStop(0, colors.barGradient[0]);
  gradient.addColorStop(1, colors.barGradient[1]);
  invoiceChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
      datasets: [
        {
          label: "Invoices",
          data: [12, 19, 13, 15, 12, 10, 14, 11],
          backgroundColor: gradient,
          borderRadius: 12,
          barPercentage: 0.6,
          categoryPercentage: 0.5,
        },
      ],
    },
    options: {
      plugins: {
        legend: { display: false },
        tooltip: {
          enabled: true,
          backgroundColor: colors.tooltipBg,
          titleColor: colors.tooltipTitle,
          bodyColor: colors.tooltipBody,
          borderColor: colors.tooltipBorder,
          borderWidth: 1,
        },
      },
      animation: { duration: 1200, easing: "easeOutQuart" },
      scales: {
        y: {
          beginAtZero: true,
          grid: { color: colors.yGrid },
          ticks: { color: colors.yTicks },
        },
        x: {
          grid: { display: false },
          ticks: { color: colors.xTicks },
        },
      },
    },
  });
}
function createLineChart() {
  const ctx = document.getElementById("lineChart").getContext("2d");
  if (invoiceLineChart) invoiceLineChart.destroy();
  const colors = getThemeColors();
  const gradient = ctx.createLinearGradient(0, 0, 0, 200);
  gradient.addColorStop(0, colors.barGradient[0]);
  gradient.addColorStop(1, colors.barGradient[1]);
  invoiceLineChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
      datasets: [
        {
          label: "Invoices",
          data: [12, 19, 13, 15, 12, 10, 14, 11],
          fill: true,
          backgroundColor: gradient,
          borderColor: gradient,
          borderWidth: 3,
          pointBackgroundColor: colors.tooltipTitle,
          pointBorderColor: "#fff",
          pointRadius: 6,
          pointHoverRadius: 8,
          tension: 0.4,
        },
      ],
    },
    options: {
      plugins: {
        legend: { display: false },
        tooltip: {
          enabled: true,
          backgroundColor: colors.tooltipBg,
          titleColor: colors.tooltipTitle,
          bodyColor: colors.tooltipBody,
          borderColor: colors.tooltipBorder,
          borderWidth: 1,
        },
      },
      animation: { duration: 1200, easing: "easeOutQuart" },
      scales: {
        y: {
          beginAtZero: true,
          grid: { color: colors.yGrid },
          ticks: { color: colors.yTicks },
        },
        x: {
          grid: { display: false },
          ticks: { color: colors.xTicks },
        },
      },
    },
  });
}
function showChart(type) {
  const barChartCanvas = document.getElementById("barChart");
  const lineChartCanvas = document.getElementById("lineChart");
  if (type === "bar") {
    barChartCanvas.style.display = "";
    lineChartCanvas.style.display = "none";
    createInvoiceChart();
  } else {
    barChartCanvas.style.display = "none";
    lineChartCanvas.style.display = "";
    createLineChart();
  }
}
const chartToggleBtns = document.querySelectorAll(".chart-toggle-btn");
chartToggleBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    chartToggleBtns.forEach((b) => b.classList.remove("active"));
    this.classList.add("active");
    showChart(this.dataset.type);
  });
});
function updateChartsForDarkMode() {
  const barChartCanvas = document.getElementById("barChart");
  const lineChartCanvas = document.getElementById("lineChart");
  if (barChartCanvas && barChartCanvas.style.display !== "none")
    createInvoiceChart();
  if (lineChartCanvas && lineChartCanvas.style.display !== "none")
    createLineChart();
}

// === History Search Filter ===
const historySearch = document.querySelector(".history-search");
if (historySearch) {
  historySearch.addEventListener("input", function () {
    const filter = this.value.toLowerCase();
    document.querySelectorAll(".history tbody tr").forEach((row) => {
      row.style.display = row.textContent.toLowerCase().includes(filter)
        ? ""
        : "none";
    });
  });
}

// === Demo Chart (if present) ===
function createDemoChart() {
  const demoChartEl = document.getElementById("demoChart");
  if (!demoChartEl) return;
  const ctx = demoChartEl.getContext("2d");
  if (window.demoChartInstance) window.demoChartInstance.destroy();
  const isDark = document.body.classList.contains("dark-mode");
  window.demoChartInstance = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Red", "Blue", "Yellow"],
      datasets: [
        {
          label: "Demo Data",
          data: [30, 50, 20],
          backgroundColor: isDark
            ? ["#ffce00", "#6c63ff", "#23263a"]
            : ["#6c63ff", "#48c6ef", "#ffce00"],
          borderWidth: 2,
          borderColor: isDark ? "#181a20" : "#fff",
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          display: true,
          labels: {
            color: isDark ? "#ffce00" : "#6c63ff",
            font: { size: 14 },
          },
        },
      },
      cutout: "70%",
      animation: { animateRotate: true, duration: 1200 },
    },
  });
}
window.addEventListener("DOMContentLoaded", () => {
  createDemoChart();
});
if (typeof darkModeBtn !== "undefined") {
  darkModeBtn.addEventListener("click", () => {
    setTimeout(createDemoChart, 300);
  });
}
