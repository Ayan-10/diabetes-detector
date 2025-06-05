export default function EmergencyPage() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-red-600">
        Emergency Diabetes Assistance
      </h1>

      <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Immediate Actions</h2>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Call emergency services or go to the nearest hospital</li>
          <li>If you have insulin, administer as prescribed</li>
          <li>Drink water to stay hydrated</li>
          <li>Do not exercise if blood sugar is extremely high</li>
          <li>Monitor blood sugar every 15 minutes</li>
        </ol>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border rounded-lg p-4">
          <h3 className="font-bold mb-2">Emergency Contacts</h3>
          <ul className="space-y-2">
            <li>National Emergency: 112</li>
            <li>Diabetes Hotline: 1800 121 2096</li>
            <li>Poison Control: 1-800-222-1222</li>
          </ul>
        </div>

        <div className="border rounded-lg p-4">
          <h3 className="font-bold mb-2">Nearest Hospitals</h3>
          <ul className="space-y-2">
            <li>City General Hospital - 2.3 miles</li>
            <li>University Medical Center - 3.1 miles</li>
            <li>Community Health Clinic - 1.7 miles</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
