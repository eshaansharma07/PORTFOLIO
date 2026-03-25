import { NextRequest, NextResponse } from "next/server";
import { generateWithResumeContext } from "@/lib/ai";
import { portfolioProfile } from "@/lib/resume-parser";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as {
    messages?: Array<{ role: string; content: string }>;
  };
  const latest = body.messages?.at(-1)?.content ?? "Summarize the candidate.";

  const fallback = latest.toLowerCase().includes("project")
    ? `Featured projects include ${portfolioProfile.projects.map((project) => project.title).join(", ")}. They span AI pest detection, Redis-based concurrency control, attendance intelligence, and e-commerce backend APIs.`
    : `${portfolioProfile.name} is an AI/ML-focused computer science engineering student with hands-on experience in backend systems, full-stack development, and technical community leadership.`;

  const answer = await generateWithResumeContext(
    `Answer this recruiter question in 3 to 5 sentences: ${latest}`,
    fallback,
  );

  return NextResponse.json({ answer });
}
