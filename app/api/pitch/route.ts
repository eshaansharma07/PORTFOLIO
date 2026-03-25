import { NextRequest, NextResponse } from "next/server";
import { generateWithResumeContext, localPitch } from "@/lib/ai";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as { viewerType?: string };
  const viewerType = body.viewerType ?? "recruiter";

  const pitch = await generateWithResumeContext(
    `Write a short, high-conviction hiring pitch for a ${viewerType}. Focus on business value, technical range, and growth trajectory.`,
    localPitch(viewerType),
  );

  return NextResponse.json({ pitch });
}
