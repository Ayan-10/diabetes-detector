import { jsPDF } from "jspdf";

export function generatePDFReport(report) {
  const doc = new jsPDF();

  // Title
  doc.setFontSize(20);
  doc.text("Diabetes Risk Assessment Report", 105, 15, null, null, "center");

  // Report Details
  doc.setFontSize(12);
  doc.text(`Date: ${report.timestamp}`, 20, 30);
  doc.text(`Patient: ${report.userName}`, 20, 40);
  doc.text(`Age: ${report.userAge || "N/A"}`, 20, 50);

  // Risk Level
  doc.setFontSize(16);
  const riskColor = {
    red: [255, 0, 0],
    yellow: [255, 204, 0],
    green: [0, 153, 0],
    need_info: [128, 128, 128],
  }[report.risk_level];

  doc.setTextColor(...riskColor);
  doc.text(`Risk Level: ${report.risk_level.toUpperCase()}`, 20, 70);
  doc.setTextColor(0, 0, 0);

  // Analysis
  doc.setFontSize(12);
  doc.text("Analysis:", 20, 85);
  doc.text(report.reasoning, 20, 95, { maxWidth: 170 });

  // Recommendations
  doc.text("Recommendations:", 20, 130);
  report.recommendations.forEach((rec, i) => {
    doc.text(`• ${rec}`, 25, 140 + i * 10);
  });

  // Save PDF
  const fileName = `diabetes-report-${
    new Date().toISOString().split("T")[0]
  }.pdf`;
  doc.save(fileName);
}
