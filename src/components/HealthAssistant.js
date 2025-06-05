import { useState } from "react";

export default function HealthAssistant({ missingInfo, onSubmit }) {
  const [formData, setFormData] = useState({});

  const getQuestion = (info) => {
    const questions = {
      fasting_glucose: "Fasting blood glucose (mg/dL):",
      hba1c: "HbA1c percentage:",
      postprandial: "Post-meal glucose (mg/dL):",
      symptoms: "Describe any symptoms:",
      manual_input: "Please describe your health concerns:",
    };

    return questions[info] || `Please provide: ${info}`;
  };

  const handleChange = (info, value) => {
    setFormData((prev) => ({ ...prev, [info]: value }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <div className="mt-8 p-6 bg-yellow-50 border border-yellow-200 rounded-xl">
      <div className="flex items-center mb-4">
        <div className="text-3xl mr-3">💬</div>
        <div>
          <h2 className="text-xl font-bold">Additional Information Needed</h2>
          <p>Please provide the following details</p>
        </div>
      </div>

      <div className="space-y-4">
        {missingInfo.map((info, i) => (
          <div key={i}>
            <label className="block mb-1 font-medium">
              {getQuestion(info)}
            </label>
            {info === "symptoms" || info === "manual_input" ? (
              <textarea
                onChange={(e) => handleChange(info, e.target.value)}
                className="w-full p-3 border rounded-lg"
                rows="3"
                placeholder="Excessive thirst, frequent urination, etc."
              />
            ) : (
              <input
                onChange={(e) => handleChange(info, e.target.value)}
                className="w-full p-3 border rounded-lg"
                placeholder="Enter value"
                step={info === "hba1c" ? 0.1 : 1}
              />
            )}
          </div>
        ))}

        <button
          onClick={handleSubmit}
          className="w-full bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-600 mt-4"
        >
          Submit Information
        </button>
      </div>
    </div>
  );
}
