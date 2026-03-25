import { NextRequest, NextResponse } from "next/server";
import { generateWithResumeContext, localPitch } from "@/lib/ai";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as { viewerType?: string };
  const viewerType = body.viewerType ?? "hiring manager";
  const brief = await generateWithResumeContext(
    `Create a recruiter mode brief tailored for a ${viewerType}. Include strengths, best-fit role types, and standout proof points in one compact paragraph.`,
    localPitch(viewerType),
  );

  return NextResponse.json({ brief });
}
