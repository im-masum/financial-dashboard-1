window.onload = function () {
  createInvoiceChart();
  createLineChart();
  showChart("bar");
};

// Sidebar active state and accessibility
const sidebarItems = document.querySelectorAll(".sidebar nav ul li");
sidebarItems.forEach((item) => {
  item.addEventListener("click", function () {
    sidebarItems.forEach((i) => i.classList.remove("active"));
    this.classList.add("active");
  });
  item.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") {
      sidebarItems.forEach((i) => i.classList.remove("active"));
      this.classList.add("active");
    }
  });
});

document
  .querySelector(".search-profile input")
  .addEventListener("input", function () {
    const filter = this.value.toLowerCase();
    document.querySelectorAll(".history table tr").forEach((row) => {
      row.style.display = row.textContent.toLowerCase().includes(filter)
        ? ""
        : "none";
    });
  });

// Dark mode toggle
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
}

darkModeBtn.addEventListener("click", () => {
  setDarkMode(!body.classList.contains("dark-mode"));
  setTimeout(updateChartsForDarkMode, 300);
});

// On load, set dark mode from localStorage
window.addEventListener("DOMContentLoaded", () => {
  const dark = localStorage.getItem("darkMode") === "1";
  setDarkMode(dark);
});

// Invoice Chart with gradient bars and dark mode support
function createInvoiceChart() {
  const ctx = document.getElementById("barChart").getContext("2d");
  // Remove previous chart instance if exists
  if (window.invoiceChart) window.invoiceChart.destroy();

  // Gradient for bars
  let gradient = ctx.createLinearGradient(0, 0, 0, 200);
  if (document.body.classList.contains("dark-mode")) {
    gradient.addColorStop(0, "#ffce00");
    gradient.addColorStop(1, "#6c63ff");
  } else {
    gradient.addColorStop(0, "#6c63ff");
    gradient.addColorStop(1, "#48c6ef");
  }

  window.invoiceChart = new Chart(ctx, {
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
          backgroundColor: document.body.classList.contains("dark-mode")
            ? "#23263a"
            : "#fff",
          titleColor: document.body.classList.contains("dark-mode")
            ? "#ffce00"
            : "#6c63ff",
          bodyColor: document.body.classList.contains("dark-mode")
            ? "#ffce00"
            : "#333",
          borderColor: document.body.classList.contains("dark-mode")
            ? "#ffce00"
            : "#6c63ff",
          borderWidth: 1,
        },
      },
      animation: {
        duration: 1200,
        easing: "easeOutQuart",
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: document.body.classList.contains("dark-mode")
              ? "#23263a"
              : "#eee",
          },
          ticks: {
            color: document.body.classList.contains("dark-mode")
              ? "#ffce00"
              : "#6c63ff",
          },
        },
        x: {
          grid: { display: false },
          ticks: {
            color: document.body.classList.contains("dark-mode")
              ? "#ffce00"
              : "#6c63ff",
          },
        },
      },
    },
  });
}

// History search filter
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

// Chart toggle logic
const barChartCanvas = document.getElementById("barChart");
const lineChartCanvas = document.getElementById("lineChart");
const chartToggleBtns = document.querySelectorAll(".chart-toggle-btn");

function createLineChart() {
  const ctx = lineChartCanvas.getContext("2d");
  if (window.invoiceLineChart) window.invoiceLineChart.destroy();
  let gradient = ctx.createLinearGradient(0, 0, 0, 200);
  if (document.body.classList.contains("dark-mode")) {
    gradient.addColorStop(0, "#ffce00");
    gradient.addColorStop(1, "#6c63ff");
  } else {
    gradient.addColorStop(0, "#6c63ff");
    gradient.addColorStop(1, "#48c6ef");
  }
  window.invoiceLineChart = new Chart(ctx, {
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
          pointBackgroundColor: document.body.classList.contains("dark-mode")
            ? "#ffce00"
            : "#6c63ff",
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
          backgroundColor: document.body.classList.contains("dark-mode")
            ? "#23263a"
            : "#fff",
          titleColor: document.body.classList.contains("dark-mode")
            ? "#ffce00"
            : "#6c63ff",
          bodyColor: document.body.classList.contains("dark-mode")
            ? "#ffce00"
            : "#333",
          borderColor: document.body.classList.contains("dark-mode")
            ? "#ffce00"
            : "#6c63ff",
          borderWidth: 1,
        },
      },
      animation: {
        duration: 1200,
        easing: "easeOutQuart",
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: document.body.classList.contains("dark-mode")
              ? "#23263a"
              : "#eee",
          },
          ticks: {
            color: document.body.classList.contains("dark-mode")
              ? "#ffce00"
              : "#6c63ff",
          },
        },
        x: {
          grid: { display: false },
          ticks: {
            color: document.body.classList.contains("dark-mode")
              ? "#ffce00"
              : "#6c63ff",
          },
        },
      },
    },
  });
}

function showChart(type) {
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

chartToggleBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    chartToggleBtns.forEach((b) => b.classList.remove("active"));
    this.classList.add("active");
    showChart(this.dataset.type);
  });
});

// Update both charts on dark mode toggle
const updateChartsForDarkMode = () => {
  if (barChartCanvas.style.display !== "none") createInvoiceChart();
  if (lineChartCanvas.style.display !== "none") createLineChart();
};

// Sidebar user settings dropdown interactivity
const sidebarProfile = document.querySelector(".sidebar-profile");
const settingsMenu = document.querySelector(".sidebar-settings-menu");
const settingsIcon = document.querySelector(".sidebar-settings-icon");
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

sidebarProfile.addEventListener("click", function (e) {
  e.stopPropagation();
  if (settingsMenu.style.display === "flex") {
    closeSettingsMenu();
  } else {
    openSettingsMenu();
  }
});

settingsOptions.forEach((option) => {
  option.addEventListener("click", function (e) {
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
  if (!sidebarProfile.contains(e.target)) {
    closeSettingsMenu();
  }
});
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeSettingsMenu();
    sidebarProfile.focus();
  }
});

// Sidebar active state for all options (click and scroll)
const sidebarNavItems = document.querySelectorAll(".sidebar nav ul li");
const sectionMap = {
  home: document.getElementById("home"),
  documents: document.getElementById("documents"),
  analytics: document.getElementById("analytics"),
  settings: document.getElementById("settings"),
};
// Click: scroll to section and set active
sidebarNavItems.forEach((item) => {
  item.addEventListener("click", function () {
    const sectionId = this.getAttribute("data-section");
    if (sectionMap[sectionId]) {
      sectionMap[sectionId].scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    sidebarNavItems.forEach((i) => i.classList.remove("active"));
    this.classList.add("active");
  });
});
// Scroll: update active nav item
window.addEventListener("scroll", () => {
  let current = "home";
  const scrollY = window.scrollY;
  for (const [key, section] of Object.entries(sectionMap)) {
    if (section && section.offsetTop - 80 <= scrollY) {
      current = key;
    }
  }
  sidebarNavItems.forEach((i) => {
    i.classList.toggle("active", i.getAttribute("data-section") === current);
  });
});

// Chart type toggle logic for demo charts
function setupDemoChartToggles() {
  // Chart 1: Doughnut/Bar/Line
  const chart1Toggles = document.querySelectorAll(
    ".demo-chart-card:nth-of-type(1) .demo-chart-toggle-btn"
  );
  let chart1Type = "doughnut";
  chart1Toggles.forEach((btn) => {
    btn.addEventListener("click", function () {
      chart1Toggles.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");
      chart1Type = this.dataset.type;
      createDemoChart(chart1Type);
    });
  });
  // Chart 2: Radar/Polar
  const chart2Toggles = document.querySelectorAll(
    ".demo-chart-card:nth-of-type(2) .demo-chart-toggle-btn"
  );
  let chart2Type = "radar";
  chart2Toggles.forEach((btn) => {
    btn.addEventListener("click", function () {
      chart2Toggles.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");
      chart2Type = this.dataset.type;
      createDemoChart2(chart2Type);
    });
  });
  // Chart 3: Line/Bar
  const chart3Toggles = document.querySelectorAll(
    ".demo-chart-card:nth-of-type(3) .demo-chart-toggle-btn"
  );
  let chart3Type = "line";
  chart3Toggles.forEach((btn) => {
    btn.addEventListener("click", function () {
      chart3Toggles.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");
      chart3Type = this.dataset.type;
      createDemoChart3(chart3Type);
    });
  });
}

// Update chart creation functions to accept type
function createDemoChart(type = "doughnut") {
  const ctx = document.getElementById("demoChart").getContext("2d");
  if (window.demoChartInstance) window.demoChartInstance.destroy();
  const isDark = document.body.classList.contains("dark-mode");
  window.demoChartInstance = new Chart(ctx, {
    type: type,
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
      cutout: type === "doughnut" ? "70%" : undefined,
      animation: {
        animateRotate: true,
        duration: 1200,
      },
    },
  });
}

function createDemoChart2(type = "radar") {
  const ctx = document.getElementById("demoChart2").getContext("2d");
  if (window.demoChart2Instance) window.demoChart2Instance.destroy();
  const isDark = document.body.classList.contains("dark-mode");
  window.demoChart2Instance = new Chart(ctx, {
    type: type,
    data: {
      labels: ["Speed", "Reliability", "Comfort", "Safety", "Efficiency"],
      datasets: [
        {
          label: "Demo Radar",
          data: [65, 59, 90, 81, 56],
          fill: true,
          backgroundColor: isDark
            ? "rgba(255,206,0,0.2)"
            : "rgba(76,99,255,0.2)",
          borderColor: isDark ? "#ffce00" : "#6c63ff",
          pointBackgroundColor: isDark ? "#ffce00" : "#6c63ff",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: isDark ? "#ffce00" : "#6c63ff",
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
      scales:
        type === "radar"
          ? {
              r: {
                angleLines: { color: isDark ? "#ffce00" : "#6c63ff" },
                grid: { color: isDark ? "#23263a" : "#eee" },
                pointLabels: { color: isDark ? "#ffce00" : "#6c63ff" },
                ticks: { color: isDark ? "#ffce00" : "#6c63ff" },
              },
            }
          : undefined,
    },
  });
}

function createDemoChart3(type = "line") {
  const ctx = document.getElementById("demoChart3").getContext("2d");
  if (window.demoChart3Instance) window.demoChart3Instance.destroy();
  const isDark = document.body.classList.contains("dark-mode");
  window.demoChart3Instance = new Chart(ctx, {
    type: type,
    data: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [
        {
          label: "Demo Line",
          data: [12, 19, 3, 5, 2, 3, 9],
          fill: true,
          backgroundColor: isDark
            ? "rgba(255,206,0,0.15)"
            : "rgba(76,99,255,0.15)",
          borderColor: isDark ? "#ffce00" : "#6c63ff",
          borderWidth: 3,
          pointBackgroundColor: isDark ? "#ffce00" : "#6c63ff",
          pointBorderColor: "#fff",
          pointRadius: 6,
          pointHoverRadius: 8,
          tension: 0.4,
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
      scales: {
        y: {
          beginAtZero: true,
          grid: { color: isDark ? "#23263a" : "#eee" },
          ticks: { color: isDark ? "#ffce00" : "#6c63ff" },
        },
        x: {
          grid: { display: false },
          ticks: { color: isDark ? "#ffce00" : "#6c63ff" },
        },
      },
    },
  });
}

// Download/export functionality for demo charts
function setupDemoChartDownloads() {
  // Chart 1
  const downloadBtn1 = document.querySelector(
    ".demo-chart-card:nth-of-type(1) .demo-chart-download-btn"
  );
  if (downloadBtn1) {
    downloadBtn1.addEventListener("click", function () {
      if (window.demoChartInstance) {
        const url = window.demoChartInstance.toBase64Image();
        const a = document.createElement("a");
        a.href = url;
        a.download = "demo-chart-1.png";
        a.click();
      }
    });
  }
  // Chart 2
  const downloadBtn2 = document.querySelector(
    ".demo-chart-card:nth-of-type(2) .demo-chart-download-btn"
  );
  if (downloadBtn2) {
    downloadBtn2.addEventListener("click", function () {
      if (window.demoChart2Instance) {
        const url = window.demoChart2Instance.toBase64Image();
        const a = document.createElement("a");
        a.href = url;
        a.download = "demo-chart-2.png";
        a.click();
      }
    });
  }
  // Chart 3
  const downloadBtn3 = document.querySelector(
    ".demo-chart-card:nth-of-type(3) .demo-chart-download-btn"
  );
  if (downloadBtn3) {
    downloadBtn3.addEventListener("click", function () {
      if (window.demoChart3Instance) {
        const url = window.demoChart3Instance.toBase64Image();
        const a = document.createElement("a");
        a.href = url;
        a.download = "demo-chart-3.png";
        a.click();
      }
    });
  }
}

// Responsive sidebar navigation for mobile
const sidebar = document.getElementById("sidebar");
const sidebarOverlay = document.getElementById("sidebar-overlay");
const hamburger = document.querySelector(".hamburger");

function isMobile() {
  return window.innerWidth <= 768;
}

function getSidebarFocusable() {
  return sidebar.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
}

function openSidebar() {
  sidebar.classList.add("open");
  sidebarOverlay.style.display = "block";
  hamburger.classList.add("active");
  body.classList.add("body-no-scroll");
  // Focus first nav item
  const firstNav = sidebar.querySelector("nav ul li");
  if (firstNav) firstNav.focus();
  // Trap focus
  document.addEventListener("keydown", trapSidebarFocus);
  document.addEventListener("keydown", escSidebarClose);
}
function closeSidebar() {
  sidebar.classList.remove("open");
  sidebarOverlay.style.display = "none";
  hamburger.classList.remove("active");
  body.classList.remove("body-no-scroll");
  document.removeEventListener("keydown", trapSidebarFocus);
  document.removeEventListener("keydown", escSidebarClose);
  hamburger.focus();
}

function trapSidebarFocus(e) {
  if (!sidebar.classList.contains("open")) return;
  if (e.key !== "Tab") return;
  const focusable = sidebar.querySelectorAll(
    "nav ul li, .sidebar-profile, .settings-option"
  );
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (e.shiftKey) {
    if (document.activeElement === first) {
      e.preventDefault();
      last.focus();
    }
  } else {
    if (document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
}
function escSidebarClose(e) {
  if (e.key === "Escape") closeSidebar();
}

if (hamburger && sidebar && sidebarOverlay) {
  hamburger.addEventListener("click", openSidebar);
  sidebarOverlay.addEventListener("click", closeSidebar);
  // Close sidebar when a nav item is clicked (on mobile)
  sidebar.querySelectorAll("nav ul li").forEach((item) => {
    item.addEventListener("click", () => {
      if (isMobile()) closeSidebar();
    });
  });
}

// Show/hide hamburger based on screen size
function updateHamburgerDisplay() {
  if (isMobile()) {
    hamburger.style.display = "inline-flex";
    closeSidebar();
  } else {
    hamburger.style.display = "none";
    sidebar.classList.remove("open");
    sidebarOverlay.style.display = "none";
    hamburger.classList.remove("active");
    body.classList.remove("body-no-scroll");
  }
}
window.addEventListener("resize", updateHamburgerDisplay);
window.addEventListener("DOMContentLoaded", updateHamburgerDisplay);

// Render on load and on dark mode toggle
window.addEventListener("DOMContentLoaded", () => {
  createDemoChart("doughnut");
  createDemoChart2("radar");
  createDemoChart3("line");
  setupDemoChartToggles();
  setupDemoChartDownloads();
});
if (typeof darkModeBtn !== "undefined") {
  darkModeBtn.addEventListener("click", () => {
    setTimeout(() => {
      // Find active type for each chart
      const chart1Type =
        document.querySelector(
          ".demo-chart-card:nth-of-type(1) .demo-chart-toggle-btn.active"
        )?.dataset.type || "doughnut";
      const chart2Type =
        document.querySelector(
          ".demo-chart-card:nth-of-type(2) .demo-chart-toggle-btn.active"
        )?.dataset.type || "radar";
      const chart3Type =
        document.querySelector(
          ".demo-chart-card:nth-of-type(3) .demo-chart-toggle-btn.active"
        )?.dataset.type || "line";
      createDemoChart(chart1Type);
      createDemoChart2(chart2Type);
      createDemoChart3(chart3Type);
    }, 300);
  });
}
