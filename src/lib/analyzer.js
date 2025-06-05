import { Chat } from "@mlc-ai/web-llm";

let chat = null;

export async function analyzeDiabetesWithAI(text, userData = {}) {
  try {
    if (!chat) {
      chat = new Chat();
      await chat.reload("TinyLlama-1.1B-Chat-v0.4-q4f32_1", undefined, {
        model_list: [
          {
            model_url:
              "https://huggingface.co/mlc-ai/TinyLlama-1.1B-Chat-v0.4-q4f32_1/resolve/main/",
            local_id: "TinyLlama-1.1B-Chat-v0.4-q4f32_1",
          },
        ],
      });
    }

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

Only return valid JSON, no additional text.
    `;

    const response = await chat.generate(prompt);

    // Improved JSON extraction with fallbacks
    let result = {
      risk_level: "yellow",
      reasoning: "Analysis incomplete",
      recommendations: ["Please provide more information"],
      missing_info: [],
    };

    try {
      // Extract JSON from response
      const jsonStart = Math.max(response.indexOf("{"), 0);
      const jsonEnd = Math.min(response.lastIndexOf("}") + 1, response.length);
      const jsonStr = response.substring(jsonStart, jsonEnd);
      const parsed = JSON.parse(jsonStr);

      // Validate risk level
      const validLevels = ["red", "yellow", "green", "need_info"];
      if (parsed.risk_level && validLevels.includes(parsed.risk_level)) {
        result = parsed;
      } else {
        result.reasoning =
          "Invalid risk level format. AI response: " +
          response.substring(0, 200);
      }
    } catch (e) {
      result.reasoning =
        "JSON parse error: " +
        e.message +
        ". AI response: " +
        response.substring(0, 200);
    }

    return result;
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
