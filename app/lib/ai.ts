import OpenAI from "openai";
import { portfolioProfile } from "@/lib/resume-parser";

const model = process.env.OPENAI_MODEL ?? "gpt-4.1-mini";

function createClient() {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return null;
  }

  return new OpenAI({ apiKey });
}

export async function generateWithResumeContext(prompt: string, fallback: string) {
  const client = createClient();

  if (!client) {
    return fallback;
  }

  const response = await client.responses.create({
    model,
    input: [
      {
        role: "system",
        content: [
          {
            type: "input_text",
            text:
              "You are a premium recruiter-facing AI assistant for a futuristic portfolio. Keep answers concise, confident, and grounded only in the candidate data provided.",
          },
        ],
      },
      {
        role: "user",
        content: [
          {
            type: "input_text",
            text: `Candidate data:\n${portfolioProfile.rawText}\n\nTask:\n${prompt}`,
          },
        ],
      },
    ],
  });

  return response.output_text || fallback;
}

export function localPitch(viewerType = "recruiter") {
  return `Eshaan brings an unusual combination of AI curiosity, backend systems thinking, and community leadership. For a ${viewerType}, the strongest signal is range: he has built machine-learning driven tools, concurrency-focused backend systems with Redis locking, and practical student-facing applications, while also organizing technical communities around AI.`;
}

export function localStory() {
  return "The story starts with curiosity around intelligent systems, then expands into shipping useful tools. Eshaan is building from both sides of the stack: AI-first ideas like pest detection and attendance intelligence, and systems engineering foundations like Redis-backed concurrency control. That mix makes him valuable in teams that care about both experimentation and execution.";
}
