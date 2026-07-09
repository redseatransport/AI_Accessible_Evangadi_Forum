import {GoogleGenAI} from "@google/genai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_TEXT_MODEL =
  process.env.GEMINI_TEXT_MODEL || "gemini-2.5-flash-lite";

if (!GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY environment variable is required");
}

const ai = new GoogleGenAI({
  apiKey: GEMINI_API_KEY,
});

export const generatePresentation = async (req, res) => {
  try {
    const {title, presenter, description} = req.body;

    const prompt = `
You are an expert presentation creator.

Create a presentation based on the following information.

Title:
${title}

Presenter:
${presenter}

Description:
${description}

Return ONLY valid JSON.

Example:

[
  {
    "title":"Introduction",
    "content":"Welcome everyone..."
  },
  {
    "title":"Overview",
    "content":"..."
  }
]

Generate between 6 and 8 slides.

Do NOT include markdown.
Do NOT include \`\`\`json.
Return ONLY the JSON array.
`;

    const response = await ai.models.generateContent({
      model: GEMINI_TEXT_MODEL,
      contents: prompt,
    });

    let text = response.text || "";

    // Remove markdown if Gemini adds it
    text = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const slides = JSON.parse(text);

    res.json(slides);
  } catch (err) {
    console.error("Presentation Error:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
