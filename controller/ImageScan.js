import { GoogleGenAI } from '@google/genai';
import fs from "fs";

const client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function scanInventory(imagePath) {
  try {
    const prompt = `
      Extract item names and quantities from this image.
      Return ONLY a JSON array.
      Format:
      [{ "item": "name", "quantity": 10, "unit": "kg" }]
    `;

    // Using gemini-3-flash-preview (The stable 2025 free-tier choice)
    const result = await client.models.generateContent({
      model: "gemini-3-flash-preview", 
      contents: [
        {
          role: 'user',
          parts: [
            { text: prompt },
            {
              inlineData: {
                data: fs.readFileSync(imagePath).toString("base64"),
                mimeType: "image/jpeg",
              },
            },
          ],
        },
      ],
    });

    // CRITICAL: New models wrap JSON in markdown blocks. We must strip them.
    const rawText = result.text;
    const cleanJson = rawText.replace(/```json|```/g, "").trim();

    return JSON.parse(cleanJson);
    
  } catch (error) {
    if (error.status === 429) {
      console.error("429 ERROR: Your free quota is locked at 0. Link a billing account in AI Studio.");
    }
    throw error;
  }
}