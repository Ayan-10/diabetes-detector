import { pipeline, env } from "@xenova/transformers";

// Configure to use local models
env.allowLocalModels = true;
env.localModelPath = "/models/";

// Singleton pattern for pipeline
let analyzer = null;

export async function getDiabetesAnalyzer() {
  if (!analyzer) {
    analyzer = await pipeline(
      "text2text-generation",
      "Xenova/LaMini-Flan-T5-248M",
      { quantized: true }
    );
  }
  return analyzer;
}
