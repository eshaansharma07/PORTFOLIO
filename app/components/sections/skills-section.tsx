import type { PortfolioProfile } from "@/lib/types";

export function SkillsSection({ profile }: { profile: PortfolioProfile }) {
  return (
    <section id="skills" className="section-shell py-24">
      <div data-reveal className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="eyebrow">Skills Matrix</div>
          <h2 className="text-3xl font-medium md:text-5xl">3D-inspired skill orbit.</h2>
        </div>
        <p className="max-w-2xl text-base leading-7 text-[var(--muted)]">
          Core strengths from the resume are mapped into rotating clusters, combining full-stack fundamentals with AI-first execution.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div data-reveal className="glass-panel relative flex min-h-[360px] items-center justify-center overflow-hidden rounded-[32px] p-8">
          <div className="orbital-ring absolute h-[320px] w-[320px] rounded-full border border-cyan/20" />
          <div className="orbital-ring reverse absolute h-[240px] w-[240px] rounded-full border border-fuchsia-400/20" />
          <div className="orbital-ring absolute h-[160px] w-[160px] rounded-full border border-lime-300/20" />
          <div className="glow floating relative flex h-36 w-36 items-center justify-center rounded-full border border-cyan/25 bg-[radial-gradient(circle_at_30%_30%,rgba(94,242,255,0.45),rgba(9,17,31,0.18)_70%)] text-center">
            <div>
              <p className="section-title text-[10px] text-white/60">Core</p>
              <p className="mt-2 text-lg font-medium">AI + Systems</p>
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          {profile.skills.map((group) => (
            <div key={group.title} data-reveal className="spotlight-card glass-panel rounded-[28px] p-5">
              <p className="section-title text-xs text-[var(--muted)]">{group.title}</p>
              <div className="mt-4 flex flex-wrap gap-3">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
