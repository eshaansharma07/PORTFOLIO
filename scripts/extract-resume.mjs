import fs from "node:fs/promises";
import path from "node:path";

const target = path.join(process.cwd(), "app/data/resume-raw.ts");

console.log(
  [
    "This project currently ships with the extracted resume text already embedded.",
    "To automate PDF ingestion in production, install a PDF parser such as pdf-parse or pypdf,",
    "extract the uploaded resume text, and update app/data/resume-raw.ts.",
    `Target file: ${target}`,
  ].join("\n"),
);

await fs.access(target);
