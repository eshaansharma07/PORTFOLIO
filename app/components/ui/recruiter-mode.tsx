"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";

export function RecruiterMode() {
  const [viewerType, setViewerType] = useState("FAANG recruiter");
  const [pitch, setPitch] = useState(
    "Activate recruiter mode to generate a tailored hiring pitch grounded in the resume.",
  );
  const [loading, setLoading] = useState(false);

  async function generatePitch(type: string) {
    setLoading(true);
    setViewerType(type);

    try {
      const response = await fetch("/api/pitch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ viewerType: type }),
      });
      const data = (await response.json()) as { pitch: string };
      setPitch(data.pitch);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div id="recruiter-mode" className="glass-panel rounded-[32px] p-6 md:p-8">
      <div className="mb-5 flex items-center gap-3">
        <div className="rounded-2xl bg-[rgba(174,255,95,0.15)] p-3 text-[var(--accent-3)]">
          <Sparkles className="size-5" />
        </div>
        <div>
          <p className="section-title text-sm text-[var(--muted)]">Smart Recruiter Mode</p>
          <h3 className="mt-1 text-2xl font-medium">Why should you hire me?</h3>
        </div>
      </div>

      <div className="mb-5 flex flex-wrap gap-3">
        {["FAANG recruiter", "AI startup founder", "Backend hiring manager"].map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => void generatePitch(type)}
            className={`rounded-full px-4 py-2 text-sm transition ${
              viewerType === type
                ? "bg-[linear-gradient(135deg,var(--accent),var(--accent-2))] text-slate-950"
                : "border border-white/10 bg-white/5 text-[var(--muted)] hover:text-[var(--text)]"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      <p className="rounded-[24px] border border-white/10 bg-black/20 p-5 text-base leading-7 text-white/84">
        {loading ? "Generating recruiter-tailored positioning..." : pitch}
      </p>
    </div>
  );
}
