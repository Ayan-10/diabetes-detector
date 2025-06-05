"use client";
import { useState, useEffect } from "react";
import { extractTextFromImage } from "@/lib/ocr";
import { analyzeDiabetesWithAI } from "@/lib/ai-analyzer";
import Uploader from "@/components/Uploader";
import RiskIndicator from "@/components/RiskIndicator";
import HealthAssistant from "@/components/HealthAssistant";
import ProgressChart from "@/components/ProgressChart";

export default function DiabetesDetector() {
  const [user, setUser] = useState({ id: "user1", name: "John Doe", age: 45 });
  const [report, setReport] = useState(null);
  const [history, setHistory] = useState([]);
  const [additionalData, setAdditionalData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  // Load history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem("diabetesReports");
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const handleUpload = async (file) => {
    setReport(null);
    setAdditionalData(null);

    setIsLoading(true);
    setProgress(10);
    try {
      // Step 1: OCR Processing
      const text = await extractTextFromImage(file);
      setProgress(40);

      // Step 2: AI Analysis
      const analysis = await analyzeDiabetesWithAI(text, user);
      setProgress(80);

      // Step 3: Handle missing data
      if (
        analysis.risk_level === "need_info" ||
        analysis.missing_info?.length > 0
      ) {
        setAdditionalData({
          ocrText: text,
          file: URL.createObjectURL(file),
          initialAnalysis: analysis,
        });
      } else {
        // Create report object
        // Create report object with userAge
        const fullReport = {
          ...analysis,
          userId: user.id,
          userName: user.name,
          userAge: user.age, // Add age for PDF
          reportText: text,
          file: URL.createObjectURL(file),
          timestamp: new Date().toLocaleString(),
        };

        // Save and update state
        const newHistory = [fullReport, ...history];
        setHistory(newHistory);

        localStorage.setItem("diabetesReports", JSON.stringify(newHistory));
        setReport(fullReport);
      }
    } catch (error) {
      console.error("Processing error:", error);
    } finally {
      setProgress(100);
      setTimeout(() => setIsLoading(false), 500);
    }
  };

  const handleAdditionalDataSubmit = async (data) => {
    setIsLoading(true);
    try {
      // Combine OCR text with user input
      const combinedText = `${
        additionalData.ocrText
      }\n\nAdditional Information:\n${JSON.stringify(data)}`;

      // Reanalyze with complete information
      const analysis = await analyzeDiabetesWithAI(combinedText, {
        ...user,
        ...data,
      });

      // Create full report
      const fullReport = {
        ...analysis,
        userId: user.id,
        userName: user.name,
        reportText: combinedText,
        file: additionalData.file,
        timestamp: new Date().toLocaleString(),
        manualInput: data,
      };

      // Save and update state
      const newHistory = [fullReport, ...history];
      setHistory(newHistory);

      localStorage.setItem("diabetesReports", JSON.stringify(newHistory));
      setReport(fullReport);
      setAdditionalData(null);
    } catch (error) {
      console.error("Reanalysis error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-800">
        AI Diabetes Risk Analyzer
      </h1>

      {/* User Profile */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">User Profile</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Name</label>
            <input
              type="text"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              className="w-full p-3 border rounded-lg"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Age</label>
            <input
              type="number"
              value={user.age}
              onChange={(e) => setUser({ ...user, age: e.target.value })}
              className="w-full p-3 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">User ID</label>
            <input
              type="text"
              value={user.id}
              readOnly
              className="w-full p-3 border rounded-lg bg-gray-100"
            />
          </div>
        </div>
      </div>

      {/* Upload Section */}
      <Uploader onUpload={handleUpload} isLoading={isLoading} />

      {/* Progress Bar */}
      {isLoading && (
        <div className="mt-6">
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-blue-600 h-4 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="mt-2 text-center text-gray-600">
            {progress < 40 && "Extracting text from report..."}
            {progress >= 40 && progress < 80 && "Analyzing with AI..."}
            {progress >= 80 && "Finalizing results..."}
          </p>
        </div>
      )}

      {/* Health Assistant */}
      {additionalData && (
        <HealthAssistant
          missingInfo={additionalData.initialAnalysis.missing_info || []}
          onSubmit={handleAdditionalDataSubmit}
        />
      )}

      {/* Progress Chart */}
      {history.length > 1 && (
        <div className="mt-8 bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Health Progress</h2>
          <ProgressChart history={history} />
        </div>
      )}

      {/* Results */}
      {report && <RiskIndicator report={report} />}

      {/* History */}
      {history.length > 0 && (
        <div className="mt-8 bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Assessment History</h2>
          <div className="space-y-4">
            {history.map((report, index) => {
              const riskLevel = report.risk_level || "need_info";

              return (
                <div key={index} className="border rounded-lg p-4 relative">
                  <div className="flex justify-between">
                    <span className="font-bold">{report.timestamp}</span>
                    <span
                      className={`px-3 py-1 rounded-full ${
                        riskLevel === "red"
                          ? "bg-red-100 text-red-800"
                          : riskLevel === "yellow"
                          ? "bg-yellow-100 text-yellow-800"
                          : riskLevel === "green"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {riskLevel.toUpperCase()}
                    </span>
                  </div>
                  <p className="mt-2 text-gray-600">
                    {report.reasoning?.substring(0, 100) ||
                      "No reasoning available"}
                    ...
                  </p>

                  <button
                    onClick={() => generatePDFForHistory(report)}
                    className="absolute bottom-4 right-4 text-blue-600 hover:text-blue-800"
                    title="Download PDF"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// PDF generator for history items
function generatePDFForHistory(report) {
  const pdfReport = {
    ...report,
    userName: report.userName,
    userAge: report.userAge,
  };

  // Use the same PDF generator
  import("@/lib/pdfGenerator").then(({ generatePDFReport }) => {
    generatePDFReport(pdfReport);
  });
}
