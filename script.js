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

// Improve sidebar: keyboard navigation for main nav items
const sidebarNavItems = document.querySelectorAll(".sidebar nav ul li");
sidebarNavItems.forEach((item) => {
  item.addEventListener("click", function () {
    sidebarNavItems.forEach((i) => i.classList.remove("active"));
    this.classList.add("active");
  });
  item.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") {
      sidebarNavItems.forEach((i) => i.classList.remove("active"));
      this.classList.add("active");
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = this.nextElementSibling || sidebarNavItems[0];
      next.focus();
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const prev =
        this.previousElementSibling ||
        sidebarNavItems[sidebarNavItems.length - 1];
      prev.focus();
    }
  });
  item.setAttribute("tabindex", "0");
});

function createDemoChart() {
  const ctx = document.getElementById("demoChart").getContext("2d");
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
      animation: {
        animateRotate: true,
        duration: 1200,
      },
    },
  });
}

// Render on load and on dark mode toggle
window.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("demoChart")) createDemoChart();
});
if (typeof darkModeBtn !== "undefined") {
  darkModeBtn.addEventListener("click", () => {
    setTimeout(() => {
      if (document.getElementById("demoChart")) createDemoChart();
    }, 300);
  });
}
