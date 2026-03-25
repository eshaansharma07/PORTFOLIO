import Link from "next/link";
import { ArrowDownRight, Github, Linkedin, Mail } from "lucide-react";
import type { PortfolioProfile } from "@/lib/types";
import { HeroSceneShell } from "@/components/3d/hero-scene-shell";
import { Typewriter } from "@/components/ui/typewriter";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function HeroSection({ profile }: { profile: PortfolioProfile }) {
  return (
    <section className="section-shell relative pt-6 md:pt-10">
      <div className="mb-6 flex items-center justify-between gap-3">
        <div className="eyebrow">Recruiter-grade immersive portfolio</div>
        <ThemeToggle />
      </div>

      <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div data-reveal className="space-y-8">
          <div className="space-y-5">
            <p className="section-title text-xs text-[var(--muted)]">AI + Product + Systems</p>
            <h1 className="max-w-4xl text-5xl font-medium leading-[0.92] tracking-tight md:text-7xl">
              <span className="text-gradient">{profile.name}</span>
              <br />
              engineers intelligent products that feel ahead of their time.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-[var(--muted)] md:text-xl">
              {profile.summary}
            </p>
          </div>

          <Typewriter
            lines={[
              profile.tagline,
              "Building at the intersection of AI systems and immersive interfaces",
              "Press H for recruiter mode, C for contact, T for theme",
            ]}
          />

          <div className="flex flex-wrap gap-3">
            <Link
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,var(--accent),var(--accent-2))] px-6 py-3 font-medium text-slate-950 transition hover:scale-[1.02]"
            >
              Explore Projects
              <ArrowDownRight className="size-4" />
            </Link>
            <Link href="#contact" className="glass-panel rounded-full px-6 py-3 text-sm font-medium">
              Talk to the AI Assistant
            </Link>
          </div>

          <div className="flex flex-wrap gap-3 text-sm text-[var(--muted)]">
            {profile.contacts.github ? (
              <a className="glass-panel rounded-full px-4 py-2" href={profile.contacts.github} target="_blank">
                <span className="inline-flex items-center gap-2">
                  <Github className="size-4" />
                  GitHub
                </span>
              </a>
            ) : null}
            {profile.contacts.linkedin ? (
              <a className="glass-panel rounded-full px-4 py-2" href={profile.contacts.linkedin} target="_blank">
                <span className="inline-flex items-center gap-2">
                  <Linkedin className="size-4" />
                  LinkedIn
                </span>
              </a>
            ) : null}
            {profile.contacts.email ? (
              <a className="glass-panel rounded-full px-4 py-2" href={`mailto:${profile.contacts.email}`}>
                <span className="inline-flex items-center gap-2">
                  <Mail className="size-4" />
                  {profile.contacts.email}
                </span>
              </a>
            ) : null}
          </div>
        </div>

        <div data-reveal className="relative">
          <HeroSceneShell />
          <div className="glass-panel absolute inset-x-6 bottom-6 rounded-[28px] p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="section-title text-xs text-[var(--muted)]">Signal Feed</p>
                <p className="mt-2 text-sm text-white/80">
                  {profile.contacts.location} | Organizer Head | AI/ML + Backend Systems
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs uppercase tracking-[0.25em] text-[var(--muted)]">Live Status</p>
                <p className="mt-2 text-sm text-[var(--accent)]">Open to high-impact roles</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
