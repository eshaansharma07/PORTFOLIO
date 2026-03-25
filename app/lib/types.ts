export type SkillGroup = {
  title: string;
  items: string[];
};

export type Project = {
  title: string;
  summary: string;
  bullets: string[];
  tags: string[];
  github?: string;
  demo?: string;
};

export type ExperienceItem = {
  title: string;
  organization: string;
  period: string;
  bullets: string[];
};

export type EducationItem = {
  title: string;
  institution: string;
  detail: string;
};

export type Achievement = {
  title: string;
  detail: string;
};

export type ContactLinks = {
  email?: string;
  phone?: string;
  location?: string;
  github?: string;
  linkedin?: string;
};

export type PortfolioProfile = {
  name: string;
  tagline: string;
  summary: string;
  about: string;
  skills: SkillGroup[];
  projects: Project[];
  experience: ExperienceItem[];
  education: EducationItem[];
  achievements: Achievement[];
  contacts: ContactLinks;
  rawText: string;
};
