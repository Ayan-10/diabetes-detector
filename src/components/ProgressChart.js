import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Convert risk level to numeric value
const riskToNumber = (risk) => {
  switch (risk) {
    case "red":
      return 3;
    case "yellow":
      return 2;
    case "green":
      return 1;
    default:
      return 0;
  }
};

export default function ProgressChart({ history }) {
  // Sort by date (newest first)
  const sortedHistory = [...history]
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(0, 10); // Show last 10 reports

  const data = {
    labels: sortedHistory.map((report) =>
      new Date(report.timestamp).toLocaleDateString()
    ),
    datasets: [
      {
        label: "Risk Level",
        data: sortedHistory.map((report) => riskToNumber(report.risk_level)),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        yAxisID: "y",
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        min: 0,
        max: 3,
        ticks: {
          stepSize: 1,
          callback: (value) => {
            if (value === 3) return "Red";
            if (value === 2) return "Yellow";
            if (value === 1) return "Green";
            return "N/A";
          },
        },
      },
    },
  };

  return <Line options={options} data={data} />;
}
