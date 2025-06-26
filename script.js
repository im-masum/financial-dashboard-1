
// script.js

// Toggle Dark Mode
const toggleBtn = document.createElement("button");
toggleBtn.textContent = "Toggle Dark Mode";
toggleBtn.className = "toggle-btn";
document.body.appendChild(toggleBtn);

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// Simple Bar Chart Animation
window.addEventListener("DOMContentLoaded", () => {
  const bars = document.querySelectorAll(".bar");
  bars.forEach((bar, index) => {
    const height = bar.style.height;
    bar.style.height = "0";
    setTimeout(() => {
      bar.style.transition = "height 0.8s ease";
      bar.style.height = height;
    }, index * 100);
  });
});

// Export chart data to CSV
function exportChartData() {
  const bars = document.querySelectorAll(".bar");
  const months = ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];
  let csv = "Month,Value\n";

  bars.forEach((bar, index) => {
    const value = bar.style.height.replace('%', '');
    csv += `${months[index]},${value}\n`;
  });

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "chart-data.csv";
  a.click();
  URL.revokeObjectURL(url);
}

// Create Export Button
const exportBtn = document.createElement("button");
exportBtn.textContent = "Export Chart";
exportBtn.className = "toggle-btn";
exportBtn.style.top = "60px";
document.body.appendChild(exportBtn);

exportBtn.addEventListener("click", exportChartData);

// Scroll Reveal Effect
const revealElements = document.querySelectorAll(".card");
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("reveal");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(el => revealObserver.observe(el));

// Export to PDF (basic snapshot)
function exportPageToPDF() {
  import("https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js").then(html2pdf => {
    const element = document.body;
    html2pdf.default().from(element).save("dashboard.pdf");
  });
}

const pdfBtn = document.createElement("button");
pdfBtn.textContent = "Export PDF";
pdfBtn.className = "toggle-btn";
pdfBtn.style.top = "100px";
document.body.appendChild(pdfBtn);

pdfBtn.addEventListener("click", exportPageToPDF);
