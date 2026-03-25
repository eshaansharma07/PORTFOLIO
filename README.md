# Eshaan Sharma 3D Portfolio

Premium interactive portfolio built with Next.js, React Three Fiber, Tailwind CSS, Framer Motion, GSAP, and Gemini-ready API routes.

## Highlights

- Futuristic 3D hero scene with holographic geometry, particles, and layered lighting
- Resume-driven content model parsed from structured raw resume text
- AI recruiter assistant, AI pitch generator, and resume storyteller endpoints
- Responsive sections for hero, about, skills, projects, experience, and contact
- Theme switch, keyboard shortcuts, glassmorphism styling, and recruiter mode

## Run locally

1. Install dependencies:

```bash
npm install
```

2. Add environment variables in `.env.local`:

```bash
GEMINI_API_KEY=your_google_ai_key_here
GEMINI_MODEL=gemini-2.0-flash
GMAIL_USER=eshaansharma800@gmail.com
GMAIL_APP_PASSWORD=your_gmail_app_password
CONTACT_TO_EMAIL=eshaansharma800@gmail.com
```

3. Start the development server:

```bash
npm run dev
```

4. Open `http://localhost:3000`

## Gmail contact delivery

- The contact form sends recruiter messages through Gmail SMTP using `nodemailer`.
- Create a Google App Password for the Gmail account you want to send from.
- Set `GMAIL_USER`, `GMAIL_APP_PASSWORD`, and `CONTACT_TO_EMAIL` locally and in Vercel.

## Gemini setup

- Create an API key in Google AI Studio.
- Add `GEMINI_API_KEY` in `.env.local` and in Vercel.
- Optional: set `GEMINI_MODEL`, default is `gemini-2.0-flash`.

## Deploy on Vercel

1. Push this project to GitHub.
2. Import the GitHub repo into Vercel.
3. Add the same environment variables from `.env.local` into the Vercel project settings.
4. Trigger a deployment.

## Keyboard shortcuts

- `H`: jump to recruiter mode
- `C`: jump to contact / AI assistant
- `T`: toggle light and dark cyber themes

## Resume data flow

- Source text lives in `app/data/resume-raw.ts`
- Parsing logic lives in `app/lib/resume-parser.ts`
- Shared structured profile powers both UI sections and AI routes

## Optional resume extraction

You can adapt `scripts/extract-resume.mjs` to read a PDF and overwrite the raw text source before deployment.
