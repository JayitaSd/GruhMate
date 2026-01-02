import { GoogleGenAI } from "@google/genai";
import fs from "fs";

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function scanInventory(imagePath) {
  try {
    const prompt = `
Extract item names and quantities from this image.
Return ONLY a JSON array.
Format:
[{ "item": "name", "quantity": 10, "unit": "kg" }]
`;

    const imageData = fs.readFileSync(imagePath);
    const base64Image = imageData.toString("base64");

    const result = await genAI.models.generateContent({
      model: "models/gemini-2.5-flash-lite",
      contents: [
        {
          role: "user",
          parts: [
            { text: prompt },
            {
              inlineData: {
                data: base64Image,
                mimeType: "image/jpeg",
              },
            },
          ],
        },
      ],
      generationConfig: {
        responseMimeType: "application/json",
      },
    });
    let text = result.text.trim();
    if (text.startsWith("```")) {
      text = text.replace(/```(json)?/g, "").trim();
    }
    return JSON.parse(text);

  } catch (error) {
    console.error("❌ Scan inventory error:", error.message);
    throw error;
  }
}
