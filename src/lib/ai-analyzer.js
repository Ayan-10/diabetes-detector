export async function analyzeDiabetesWithAI(text, userData = {}) {
  // Create prompt for diabetes analysis
  const prompt = `
You are a diabetes specialist AI analyzing a medical report. Consider these patient details:
- Age: ${userData.age || "unknown"}
- Weight: ${userData.weight || "unknown"} kg
- Height: ${userData.height || "unknown"} cm

Medical report text:
"${text}"

Analyze diabetes risk and return JSON format:
{
  "risk_level": "red/yellow/green/need_info",
  "reasoning": "2-3 sentence explanation",
  "recommendations": ["array", "of", "recommendations"],
  "missing_info": ["list", "of", "missing", "parameters"]
}
the missing_info field should only include parameters that are absolutely necessary for a complete analysis.

Only return valid JSON, no additional text.
  `;

  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization:
            "Bearer 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", // Free public key
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-r1-0528:free",
          messages: [{ role: "user", content: prompt }],
          response_format: { type: "json_object" },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    const resultText = data.choices[0]?.message?.content;

    console.log("AI response:", resultText);

    if (!resultText) {
      throw new Error("Empty response from AI");
    }

    // Parse JSON response
    const result = JSON.parse(resultText);

    // Validate risk level
    const validLevels = ["red", "yellow", "green", "need_info"];
    const riskLevel = validLevels.includes(result.risk_level)
      ? result.risk_level
      : "yellow";

    return {
      risk_level: riskLevel,
      reasoning: result.reasoning || "AI didn't provide reasoning",
      recommendations: result.recommendations || ["Consult a doctor"],
      missing_info: result.missing_info || [],
    };
  } catch (error) {
    console.error("AI analysis error:", error);
    return {
      risk_level: "yellow",
      reasoning: "AI system error: " + error.message,
      recommendations: ["Analysis failed - please provide details manually"],
      missing_info: ["manual_input"],
    };
  }
}
