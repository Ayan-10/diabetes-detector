import HistoryChart from "./HistoryChart";
import { predictFutureRisk } from "@/lib/analyzer";
import { checkMedicationInteractions } from "@/lib/assistant";

export default function Dashboard({ history, userId }) {
  const latestReport = history[history.length - 1];
  const medications = latestReport.medications || ["metformin"];
  const interactions = checkMedicationInteractions(medications);
  const riskPrediction = predictFutureRisk(history);

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Health Dashboard</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-bold mb-4 text-lg">Risk Trend Analysis</h3>
          <HistoryChart history={history} />
          <div className="mt-4">
            <span className="font-medium">Risk Prediction:</span>{" "}
            {riskPrediction}
          </div>
        </div>

        <div>
          <div className="bg-white p-6 rounded-xl shadow mb-6">
            <h3 className="font-bold mb-4 text-lg">Medication Safety</h3>
            {interactions.length > 0 ? (
              <>
                <p className="text-red-600 mb-3">
                  Potential interactions found:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  {interactions.map((int, i) => (
                    <li key={i} className="text-red-600">
                      <span className="font-medium">{int.medication}</span> +
                      <span className="font-medium">{int.interaction}</span>(
                      {int.severity} risk)
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p className="text-green-600">
                No dangerous interactions detected
              </p>
            )}
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-bold mb-4 text-lg">Doctor Matching</h3>
            <div className="space-y-4">
              <div className="flex items-center p-3 border rounded-lg">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                <div className="ml-4">
                  <h4 className="font-bold">Dr. Sarah Johnson</h4>
                  <p>Endocrinologist • 2.3 miles away</p>
                  <p className="text-sm text-gray-600">
                    Next available: Tomorrow
                  </p>
                </div>
              </div>
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg">
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
