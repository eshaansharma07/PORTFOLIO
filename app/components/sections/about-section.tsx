import type { PortfolioProfile } from "@/lib/types";
import { AiStoryPanel } from "@/components/ui/ai-story-panel";

export function AboutSection({
  profile,
  aiStory,
}: {
  profile: PortfolioProfile;
  aiStory: string;
}) {
  return (
    <section id="about" className="section-shell py-24">
      <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
        <div data-reveal className="space-y-4">
          <div className="eyebrow">About</div>
          <h2 className="text-3xl font-medium md:text-5xl">AI-generated story, grounded in real work.</h2>
          <p className="text-lg leading-8 text-[var(--muted)]">{profile.about}</p>
        </div>

        <div data-reveal className="glass-panel rounded-[32px] p-6 md:p-8">
          <p className="section-title text-xs text-[var(--muted)]">Resume Explainer</p>
          <AiStoryPanel fallback={aiStory} />

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {profile.achievements.map((achievement) => (
              <div key={achievement.title} className="rounded-[24px] border border-white/10 bg-black/15 p-4">
                <p className="font-medium">{achievement.title}</p>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{achievement.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
