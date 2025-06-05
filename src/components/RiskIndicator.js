// src/components/RiskIndicator.js
import { generatePDFReport } from "@/lib/pdfGenerator";

export default function RiskIndicator({ report }) {
  const riskLevel = report.risk_level || "need_info";

  const colorMap = {
    red: "bg-red-500",
    yellow: "bg-yellow-400",
    green: "bg-green-500",
    need_info: "bg-gray-400",
  };

  const iconMap = {
    red: "⚠️",
    yellow: "⚠️",
    green: "✅",
    need_info: "❓",
  };

  const handleDownload = () => {
    generatePDFReport({
      ...report,
      userName: report.userName,
      userAge: report.userAge,
    });
  };

  return (
    <div className={`mt-8 p-6 rounded-xl text-white ${colorMap[riskLevel]}`}>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold">Diabetes Risk Assessment</h2>
          <p className="opacity-90">{report.timestamp}</p>
        </div>
        <div className="text-5xl">{iconMap[riskLevel]}</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-bold mb-2">Analysis Results</h3>
          <div className="bg-white/20 p-4 rounded-lg">
            <p className="mb-2">
              <span className="font-bold">Risk Level:</span>{" "}
              {riskLevel.toUpperCase()}
            </p>
            <p>
              <span className="font-bold">Reasoning:</span>{" "}
              {report.reasoning || "No reasoning provided"}
            </p>
          </div>
        </div>

        <div>
          <h3 className="font-bold mb-2">Recommendations</h3>
          <ul className="list-disc pl-5 space-y-1">
            {(report.recommendations || ["No recommendations available"]).map(
              (rec, i) => (
                <li key={i}>{rec}</li>
              )
            )}
          </ul>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-4">
        <button
          onClick={handleDownload}
          className="bg-white text-blue-600 py-2 px-4 rounded-lg font-medium"
        >
          Download PDF Report
        </button>

        {riskLevel === "red" && (
          <a
            href="/emergency"
            className="bg-red-800 text-white py-2 px-4 rounded-lg font-medium"
          >
            Emergency Assistance
          </a>
        )}
      </div>
    </div>
  );
}
