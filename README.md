# andreacassini.com

My portfolio: a bilingual (EN/IT) Next.js site with case studies, live previews and small interactive demos. It is built around one idea: three years of software validation, now turned into building software.

**Live:** https://andreacassini.com

## Stack

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, fonts through `next/font`. No backend, no database: everything is static.

## Structure

```
app/                     layout, home, and /projects/[id] (static, one page per project)
components/Site.tsx      home page
components/ProjectPage   project write-up, live preview and demo
components/LivePreview   iframe viewer with desktop and phone modes
components/demos/        interactive demos that run in the browser
components/Chrome.tsx    shared navigation, footer and the inspection seal (SVG)
lib/projects.ts          project list and one-line descriptions (EN/IT)
lib/details.ts           long write-ups (EN/IT)
lib/i18n.tsx             language context (stored in localStorage)
```

## Interactive demos

- **Jarvis Core**: a TypeScript port of the planner and the safety policy from [jarvis-core](https://github.com/andreacassini/jarvis-core).
- **TestCraft AI**: a rule-based preview of requirement-to-test-case generation, with CSV export.
- **Jira Ticket Creator**: row validation and TF-IDF similarity ranking on invented sample defects.

The projects behind the last two are private, so these demos use sample data and fixed rules, not the real code.

## Run

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

Optional: `NEXT_PUBLIC_CONTACT_EMAIL` overrides the public contact address.

## Deploy

Pushing to `main` deploys to Vercel. Every other branch gets a preview URL.
