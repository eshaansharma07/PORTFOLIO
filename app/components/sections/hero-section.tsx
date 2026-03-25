import Link from "next/link";
import { ArrowDownRight, Github, Instagram, Linkedin, Twitter } from "lucide-react";
import type { PortfolioProfile } from "@/lib/types";
import { TechOrbit } from "@/components/ui/tech-orbit";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function HeroSection({ profile }: { profile: PortfolioProfile }) {
  return (
    <section className="section-shell relative pt-6 md:pt-10">
      <div className="hero-frame relative overflow-hidden rounded-[36px] border border-white/10 px-5 py-5 shadow-[0_40px_120px_rgba(0,0,0,0.35)] md:px-8 md:py-7">
        <div className="hero-eclipse pointer-events-none absolute inset-x-[18%] top-0 h-44" />
        <div className="hero-stars pointer-events-none absolute inset-0 opacity-70" />

        <div className="relative z-10 flex items-center justify-between gap-4 rounded-full border border-white/10 bg-black/30 px-4 py-3 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-fuchsia-400/30 bg-[radial-gradient(circle,rgba(120,79,255,0.35),rgba(94,242,255,0.08))] text-sm font-semibold">
              ES
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{profile.name}</p>
              <p className="text-xs text-[var(--muted)]">AI Futurist</p>
            </div>
          </div>

          <nav className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1 text-sm text-white/80 md:flex">
            <Link className="rounded-full px-4 py-2 transition hover:bg-white/10" href="#about">
              About me
            </Link>
            <Link className="rounded-full px-4 py-2 transition hover:bg-white/10" href="#skills">
              Skills
            </Link>
            <Link className="rounded-full px-4 py-2 transition hover:bg-white/10" href="#projects">
              Projects
            </Link>
            <a
              className="rounded-full px-4 py-2 transition hover:bg-white/10"
              href={profile.contacts.github ?? "#"}
              target="_blank"
            >
              Source Code
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a className="hidden rounded-full p-2 text-white/80 transition hover:bg-white/10 md:inline-flex" href={profile.contacts.linkedin} target="_blank">
              <Linkedin className="size-4" />
            </a>
            <a className="hidden rounded-full p-2 text-white/80 transition hover:bg-white/10 md:inline-flex" href={profile.contacts.github} target="_blank">
              <Github className="size-4" />
            </a>
            <span className="hidden rounded-full p-2 text-white/40 md:inline-flex">
              <Instagram className="size-4" />
            </span>
            <span className="hidden rounded-full p-2 text-white/40 md:inline-flex">
              <Twitter className="size-4" />
            </span>
          </div>
        </div>

        <div className="relative z-10 grid min-h-[720px] items-center gap-10 px-3 pb-8 pt-12 md:px-10 md:pb-12 md:pt-20 lg:grid-cols-[0.9fr_1.1fr]">
          <div data-reveal className="max-w-xl space-y-8">
            <div className="inline-flex items-center rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-2 text-sm text-white/70 shadow-[0_0_30px_rgba(133,94,255,0.18)]">
              Fullstack AI Builder Portfolio
            </div>

            <div className="space-y-5">
              <h1 className="max-w-xl text-5xl font-medium leading-[0.95] tracking-tight text-white md:text-7xl">
                Building
                <span className="text-gradient"> the future </span>
                with AI systems and product-grade engineering.
              </h1>
              <p className="max-w-lg text-lg leading-8 text-white/60 md:text-xl">
                AI/ML engineer, backend builder, and student leader crafting tools that feel fast, useful, and a little cinematic.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="#projects"
                className="inline-flex min-w-40 items-center justify-center gap-2 rounded-xl bg-[linear-gradient(180deg,rgba(130,76,255,0.9),rgba(91,54,204,0.95))] px-6 py-3 font-medium text-white shadow-[0_14px_40px_rgba(111,73,255,0.35)] transition hover:scale-[1.02]"
              >
                Explore Work
                <ArrowDownRight className="size-4" />
              </Link>
              <Link
                href="#contact"
                className="inline-flex min-w-40 items-center justify-center rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-medium text-white/90 backdrop-blur-xl transition hover:bg-white/10"
              >
                Contact Me
              </Link>
            </div>

            <div className="grid gap-3 text-sm text-white/55">
              <p>{profile.tagline}</p>
              <p>Organizer Head at AI Alliance, Chandigarh University</p>
              <p>Press H for recruiter mode, C for contact, T for theme</p>
            </div>
          </div>

          <div data-reveal className="relative flex items-center justify-center">
            <TechOrbit />
          </div>
        </div>
      </div>
    </section>
  );
}
