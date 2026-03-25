"use client";

import { useState } from "react";
import { Github, Rocket } from "lucide-react";
import type { PortfolioProfile } from "@/lib/types";

export function ProjectsSection({ profile }: { profile: PortfolioProfile }) {
  const [active, setActive] = useState(profile.projects[0]?.title);

  return (
    <section id="projects" className="section-shell py-24">
      <div data-reveal className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="eyebrow">Projects</div>
          <h2 className="text-3xl font-medium md:text-5xl">Interactive builds with technical depth.</h2>
        </div>
        <p className="max-w-2xl text-base leading-7 text-[var(--muted)]">
          These projects show a pattern: useful AI, practical automation, and backend thinking that scales beyond toy demos.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {profile.projects.map((project, index) => (
          <article
            key={project.title}
            data-reveal
            onMouseMove={(event) => {
              const target = event.currentTarget;
              const rect = target.getBoundingClientRect();
              const mx = ((event.clientX - rect.left) / rect.width) * 100;
              const my = ((event.clientY - rect.top) / rect.height) * 100;
              target.style.setProperty("--mx", `${mx}%`);
              target.style.setProperty("--my", `${my}%`);
            }}
            onMouseEnter={() => setActive(project.title)}
            className={`spotlight-card glass-panel group rounded-[32px] p-6 transition duration-300 hover:-translate-y-1 ${
              active === project.title ? "border-cyan/40" : ""
            }`}
            style={{
              transform: `perspective(1200px) rotateX(${active === project.title ? -2 : 0}deg) rotateY(${active === project.title ? 2 : 0}deg)`,
            }}
          >
            <div className="mb-5 flex items-center justify-between">
              <div className="section-title text-xs text-[var(--muted)]">0{index + 1}</div>
              <div className="flex gap-2">
                <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-[var(--muted)]">
                  {project.tags[0] ?? "Featured"}
                </span>
              </div>
            </div>

            <h3 className="text-2xl font-medium">{project.title}</h3>
            <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{project.summary}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-white/5 px-3 py-2 text-xs text-white/75">
                  {tag}
                </span>
              ))}
            </div>

            <ul className="mt-6 space-y-3 text-sm leading-7 text-white/80">
              {project.bullets.map((bullet) => (
                <li key={bullet} className="rounded-2xl border border-white/10 bg-black/15 px-4 py-3">
                  {bullet}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={project.demo ?? "#contact"}
                className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,var(--accent),var(--accent-2))] px-4 py-2 text-sm font-medium text-slate-950"
              >
                <Rocket className="size-4" />
                Live Story
              </a>
              <a
                href={project.github ?? profile.contacts.github ?? "#"}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm"
              >
                <Github className="size-4" />
                Code
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
