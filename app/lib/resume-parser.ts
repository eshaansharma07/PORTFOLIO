import { resumeRawText } from "@/data/resume-raw";
import type {
  Achievement,
  EducationItem,
  ExperienceItem,
  PortfolioProfile,
  Project,
  SkillGroup,
} from "@/lib/types";

const HEADINGS = [
  "PROFESSIONAL SUMMARY",
  "EDUCATION",
  "TECHNICAL SKILLS",
  "LEADERSHIP & ACTIVITIES",
  "PROJECTS",
] as const;

function normalize(raw: string) {
  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function extractSection(lines: string[], heading: string) {
  const start = lines.findIndex((line) => line === heading);

  if (start < 0) {
    return [];
  }

  const nextIndex = lines.findIndex(
    (line, index) => index > start && HEADINGS.includes(line as (typeof HEADINGS)[number]),
  );

  return lines.slice(start + 1, nextIndex < 0 ? undefined : nextIndex);
}

function splitCommaValues(line: string) {
  return line
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseSkills(lines: string[]): SkillGroup[] {
  const groups: SkillGroup[] = [];

  for (let index = 0; index < lines.length; index += 2) {
    const title = lines[index];
    const value = lines[index + 1];

    if (!title || !value) {
      continue;
    }

    groups.push({
      title,
      items: splitCommaValues(value.replace(/\s{2,}/g, " ")),
    });
  }

  return groups;
}

function parseEducation(lines: string[]): EducationItem[] {
  const items: EducationItem[] = [];

  if (lines.length >= 3) {
    items.push({
      title: lines[0],
      institution: lines[1],
      detail: lines[2],
    });
  }

  if (lines.length >= 5) {
    items.push({
      title: lines[3],
      institution: lines[4],
      detail: "Academic foundation in science, mathematics, and communication.",
    });
  }

  return items;
}

function parseExperience(lines: string[]): ExperienceItem[] {
  if (!lines.length) {
    return [];
  }

  const title = lines[0];
  const bullets = lines.slice(1);

  return [
    {
      title,
      organization: "AI Alliance, Chandigarh University",
      period: "Current",
      bullets,
    },
  ];
}

function inferTags(project: Project, skillGroups: SkillGroup[]) {
  const joined = `${project.title} ${project.summary} ${project.bullets.join(" ")}`.toLowerCase();
  const keywords = new Set<string>();

  skillGroups.flatMap((group) => group.items).forEach((skill) => {
    if (joined.includes(skill.toLowerCase())) {
      keywords.add(skill);
    }
  });

  if (joined.includes("redis")) keywords.add("Redis");
  if (joined.includes("api")) keywords.add("REST APIs");
  if (joined.includes("machine learning") || joined.includes("ai")) keywords.add("AI/ML");
  if (joined.includes("attendance")) keywords.add("Automation");
  if (joined.includes("backend")) keywords.add("Backend");

  return [...keywords];
}

function parseProjects(lines: string[], skillGroups: SkillGroup[]): Project[] {
  const projects: Project[] = [];
  let cursor = 0;

  while (cursor < lines.length) {
    const title = lines[cursor];
    const bullets = lines.slice(cursor + 1, cursor + 4).filter(Boolean);

    if (!title || bullets.length === 0) {
      break;
    }

    const project: Project = {
      title,
      summary: bullets[0],
      bullets,
      tags: [],
    };

    project.tags = inferTags(project, skillGroups);
    projects.push(project);
    cursor += bullets.length + 1;
  }

  return projects;
}

function parseAchievements(summary: string, education: EducationItem[], experience: ExperienceItem[]): Achievement[] {
  const achievements: Achievement[] = [];

  const cgpaMatch = education[0]?.detail.match(/(\d+(\.\d+)?)/);
  if (cgpaMatch) {
    achievements.push({
      title: "Academic Momentum",
      detail: `Maintaining a ${cgpaMatch[1]} CGPA while specializing in AI & ML.`,
    });
  }

  if (experience[0]) {
    achievements.push({
      title: "Community Leadership",
      detail: `Leads AI-focused events and collaboration as ${experience[0].title} of AI Alliance.`,
    });
  }

  achievements.push({
    title: "Builder Mindset",
    detail: summary,
  });

  return achievements;
}

export function buildPortfolioProfile(raw = resumeRawText): PortfolioProfile {
  const lines = normalize(raw);
  const name = lines[0] ?? "Eshaan Sharma";
  const tagline = lines[1] ?? "Artificial Intelligence & Machine Learning Enthusiast";
  const contactLine = lines[2] ?? "";
  const linksLine = lines[3] ?? "";

  const email = contactLine.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)?.[0];
  const phone = contactLine.match(/\+\d[\d\s]+/)?.[0]?.trim();
  const location = contactLine
    .replace(email ?? "", "")
    .replace(phone ?? "", "")
    .trim();
  const github = linksLine.match(/https?:\/\/github\.com\/[^\s]+/i)?.[0];
  const linkedin =
    linksLine.match(/(?:https?:\/\/)?(?:www\.)?linkedin\.com\/[^\s]+/i)?.[0]?.replace(/^www\./, "https://www.") ??
    undefined;

  const summary = extractSection(lines, "PROFESSIONAL SUMMARY").join(" ");
  const skillGroups = parseSkills(extractSection(lines, "TECHNICAL SKILLS"));
  const education = parseEducation(extractSection(lines, "EDUCATION"));
  const experience = parseExperience(extractSection(lines, "LEADERSHIP & ACTIVITIES"));
  const projects = parseProjects(extractSection(lines, "PROJECTS"), skillGroups);
  const achievements = parseAchievements(summary, education, experience);

  return {
    name,
    tagline,
    summary,
    about:
      "I design systems that make emerging technology feel usable, scalable, and human. My work lives at the edge of AI, backend engineering, and immersive product thinking.",
    skills: skillGroups,
    projects,
    experience,
    education,
    achievements,
    contacts: {
      email,
      phone,
      location,
      github,
      linkedin,
    },
    rawText: raw,
  };
}

export const portfolioProfile = buildPortfolioProfile();
