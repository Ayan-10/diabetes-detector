export function handleMissingData(missingData) {
  const questions = {
    "fasting glucose": "What is your fasting blood glucose level (mg/dL)?",
    HbA1c: "What is your most recent HbA1c percentage?",
    postprandial: "What is your postprandial glucose level (mg/dL)?",
  };

  return missingData.map((item) => ({
    field: item.replace(/\s+/g, "_"),
    question: questions[item] || `Please provide your ${item}`,
    type: "number",
  }));
}

export function checkMedicationInteractions(medications) {
  const interactions = {
    metformin: ["Contrast dye", "Alcohol"],
    insulin: ["Beta-blockers", "Alcohol"],
    glipizide: ["Aspirin", "Warfarin"],
  };

  return medications.flatMap(
    (med) =>
      interactions[med.toLowerCase()]?.map((int) => ({
        medication: med,
        interaction: int,
        severity: "High",
      })) || []
  );
}
