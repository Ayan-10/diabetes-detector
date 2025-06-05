import { createWorker } from "tesseract.js";

export async function extractTextFromImage(file) {
  try {
    const worker = await createWorker("eng");
    const { data } = await worker.recognize(file);
    await worker.terminate();
    return data.text;
  } catch (error) {
    console.error("OCR Error:", error);
    return "";
  }
}
