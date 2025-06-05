export function saveReport(report) {
  const history = JSON.parse(localStorage.getItem("diabetesReports") || "[]");
  history.push(report);
  localStorage.setItem("diabetesReports", JSON.stringify(history));
  return history;
}

export function getReports(userId) {
  const history = JSON.parse(localStorage.getItem("diabetesReports") || "[]");
  return history.filter((report) => report.userId === userId);
}
