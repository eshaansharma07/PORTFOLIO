import type { PortfolioProfile } from "@/lib/types";

export function ExperienceSection({ profile }: { profile: PortfolioProfile }) {
  return (
    <section id="experience" className="section-shell py-24">
      <div data-reveal className="mb-10">
        <div className="eyebrow">Experience</div>
        <h2 className="text-3xl font-medium md:text-5xl">Leadership with execution behind it.</h2>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-5">
          {profile.experience.map((item, index) => (
            <div key={item.title} data-reveal className="glass-panel rounded-[30px] p-6">
              <div className="mb-4 flex items-center justify-between gap-4">
                <div>
                  <p className="section-title text-xs text-[var(--muted)]">0{index + 1}</p>
                  <h3 className="mt-2 text-2xl font-medium">{item.title}</h3>
                  <p className="mt-1 text-sm text-[var(--muted)]">{item.organization}</p>
                </div>
                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.25em] text-[var(--muted)]">
                  {item.period}
                </span>
              </div>
              <div className="space-y-3">
                {item.bullets.map((bullet) => (
                  <div key={bullet} className="rounded-2xl border border-white/10 bg-black/15 px-4 py-3 text-sm leading-7 text-white/80">
                    {bullet}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-5">
          {profile.education.map((item) => (
            <div key={item.title} data-reveal className="glass-panel rounded-[30px] p-6">
              <p className="section-title text-xs text-[var(--muted)]">Education</p>
              <h3 className="mt-3 text-xl font-medium">{item.title}</h3>
              <p className="mt-2 text-sm text-white/80">{item.institution}</p>
              <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
