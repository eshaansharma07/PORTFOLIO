import { NextResponse } from "next/server";
import { generateWithResumeContext, localStory } from "@/lib/ai";

export async function GET() {
  const story = await generateWithResumeContext(
    "Write an immersive but concise portfolio story in 4 sentences based on the resume.",
    localStory(),
  );

  return NextResponse.json({ story });
}
