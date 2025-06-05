import { Chart } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register all necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function HistoryChart({ history }) {
  // Sort history by timestamp
  const sortedHistory = [...history].sort(
    (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
  );

  // Prepare data for chart
  const labels = sortedHistory.map((report) =>
    new Date(report.timestamp).toLocaleDateString()
  );

  const glucoseData = sortedHistory.map((report) => report.values.glucose);
  const hba1cData = sortedHistory.map((report) => report.values.hba1c);

  // Risk level colors
  const riskColors = sortedHistory.map((report) => {
    switch (report.riskLevel) {
      case "red":
        return "rgba(220, 38, 38, 0.8)";
      case "yellow":
        return "rgba(234, 179, 8, 0.8)";
      default:
        return "rgba(34, 197, 94, 0.8)";
    }
  });

  const data = {
    labels,
    datasets: [
      {
        label: "Glucose (mg/dL)",
        data: glucoseData,
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.5)",
        yAxisID: "y",
        tension: 0.3,
        type: "line",
      },
      {
        label: "HbA1c (%)",
        data: hba1cData,
        borderColor: "rgb(139, 92, 246)",
        backgroundColor: "rgba(139, 92, 246, 0.5)",
        yAxisID: "y1",
        tension: 0.3,
        type: "line",
      },
      {
        label: "Risk Level",
        data: new Array(sortedHistory.length).fill(1),
        backgroundColor: riskColors,
        barPercentage: 0.6,
        categoryPercentage: 1.0,
        type: "bar",
      },
    ],
  };

  const options = {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        type: "linear",
        display: true,
        position: "left",
        title: {
          display: true,
          text: "Glucose (mg/dL)",
        },
        min: 0,
        max:
          Math.max(200, ...glucoseData.filter((v) => v !== null).concat([0])) +
          20,
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",
        title: {
          display: true,
          text: "HbA1c (%)",
        },
        min: 0,
        max:
          Math.max(10, ...hba1cData.filter((v) => v !== null).concat([0])) + 1,
        grid: {
          drawOnChartArea: false,
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          footer: (tooltipItems) => {
            const index = tooltipItems[0].dataIndex;
            const report = sortedHistory[index];
            return `Risk: ${report.riskLevel.toUpperCase()}`;
          },
        },
      },
    },
  };

  return <Chart type="bar" data={data} options={options} />;
}
