import { portfolioProfile } from "@/lib/resume-parser";

const model = process.env.GEMINI_MODEL ?? "gemini-2.0-flash";
const endpoint = "https://generativelanguage.googleapis.com/v1beta/models";

export async function generateWithResumeContext(prompt: string, fallback: string) {
  const apiKey = process.env.GEMINI_API_KEY ?? process.env.GOOGLE_API_KEY;

  if (!apiKey) {
    return fallback;
  }

  try {
    const response = await fetch(`${endpoint}/${model}:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        systemInstruction: {
          parts: [
            {
              text:
                "You are a premium recruiter-facing AI assistant for a futuristic portfolio. Keep answers concise, confident, and grounded only in the candidate data provided.",
            },
          ],
        },
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `Candidate data:\n${portfolioProfile.rawText}\n\nTask:\n${prompt}`,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 500,
          topP: 0.9,
        },
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      return fallback;
    }

    const data = (await response.json()) as {
      candidates?: Array<{
        content?: {
          parts?: Array<{
            text?: string;
          }>;
        };
      }>;
    };

    const text = data.candidates?.[0]?.content?.parts?.map((part) => part.text ?? "").join("").trim();
    return text || fallback;
  } catch {
    return fallback;
  }
}

export function localPitch(viewerType = "recruiter") {
  return `Eshaan brings an unusual combination of AI curiosity, backend systems thinking, and community leadership. For a ${viewerType}, the strongest signal is range: he has built machine-learning driven tools, concurrency-focused backend systems with Redis locking, and practical student-facing applications, while also organizing technical communities around AI.`;
}

export function localStory() {
  return "The story starts with curiosity around intelligent systems, then expands into shipping useful tools. Eshaan is building from both sides of the stack: AI-first ideas like pest detection and attendance intelligence, and systems engineering foundations like Redis-backed concurrency control. That mix makes him valuable in teams that care about both experimentation and execution.";
}
