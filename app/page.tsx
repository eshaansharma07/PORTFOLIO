import { AboutSection } from "@/components/sections/about-section";
import { ContactSection } from "@/components/sections/contact-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { ClientEffects } from "@/components/ui/client-effects";
import { RecruiterMode } from "@/components/ui/recruiter-mode";
import { localStory } from "@/lib/ai";
import { portfolioProfile } from "@/lib/resume-parser";

export default function HomePage() {
  const story = localStory();

  return (
    <main className="relative overflow-hidden pb-12">
      <ClientEffects />
      <div className="absolute inset-0 -z-10 bg-grid-fade bg-[size:72px_72px] opacity-[0.08]" />
      <HeroSection profile={portfolioProfile} />
      <section className="section-shell py-12" data-reveal>
        <RecruiterMode />
      </section>
      <AboutSection profile={portfolioProfile} aiStory={story} />
      <SkillsSection profile={portfolioProfile} />
      <ProjectsSection profile={portfolioProfile} />
      <ExperienceSection profile={portfolioProfile} />
      <ContactSection profile={portfolioProfile} />
    </main>
  );
}
