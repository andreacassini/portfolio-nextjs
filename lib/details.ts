import type { L } from './projects';

export interface Detail {
  overview: L;
  highlights: Record<'en', string[]>;
  how?: L;
  status: L;
  notYet?: Record<'en', string[]>;
  /** key of an interactive demo built into this site */
  demo?: 'jarvis' | 'testcraft' | 'tickets';
}

/** Long-form write-ups. Facts come from each repository's README, tree and source. */
export const details: Record<string, Detail> = {
  proofline: {
    overview: {
      en: 'Proofline is a chat-first iOS app that coordinates several LLMs to work out what to build, spot risks and propose changes you can verify across implementation, security, design and quality. A local runtime detects which providers are installed, decides who to involve for each request and learns from the results.',
    },
    highlights: {
      en: [
        'Adaptive router with Adaptive, Full Council and Fast Path modes: a fast model for triage, parallel candidates only when the risk calls for it, early exit once deterministic checks pass.',
        'Parallel proposals, anonymous peer review and a synthesis step. An "agents involved" panel shows which model wrote, reviewed and synthesised.',
        'Statuses separate planned work from executed work, so the interface never claims something ran when it did not.',
        'Visual requests get a rendered mockup in the chat (browser for sites, iPhone for apps). Backend-only tasks get none.',
        'Uses the official CLIs already installed on the machine and their local sessions. It does not read, copy or store credentials.',
        'Local-only by default: the "Plan · local only" mode calls no models. The real council runs only after explicit consent.',
        'A shared workspace for mobile and desktop: projects, task board, timeline, separate chats per project and file uploads (up to 6 files of 5 MB).',
      ],
    },
    how: {
      en: 'A Node.js coordinator (runtime in src/core and src/providers) probes the available providers, routes each task and serves the clients over the local network. The native client is SwiftUI for iOS 17, with an Expo React Native client for quick previews and a web console used only for development.',
    },
    status: {
      en: 'Prototype. The interface still simulates progress, and model calls are off unless the explicit execute flag is set.',
    },
    notYet: {
      en: ['The account session is local and demonstrative.', 'Storage encryption, MFA and server-side authentication are listed as required before exposing it outside a trusted LAN.'],
    },
  },

  'travel-intelligence': {
    overview: {
      en: 'Travel Intelligence is a monorepo for a trip decision engine. A search fans out to six normalised provider adapters through a Temporal workflow, and the results come back as one comparison you can act on.',
    },
    highlights: {
      en: [
        'The request path is Next.js, a GraphQL backend-for-frontend, a Temporal workflow and six provider adapters.',
        'The API has modules for comparison, price calendar, route planning, reports and search events.',
        'Database migrations cover search persistence, streaming events, provider stream deadlines, budget tiers, itineraries and reports (PostgreSQL with Prisma).',
        'Separate workspaces for the web app, the admin app, the API, the workers and a shared AI engine package.',
        'The local stack runs with Docker Compose (Temporal, PostgreSQL) and the repository has CI workflows and a Terraform setup for staging.',
        'A shared toolchain runs format, lint, typecheck, test and build across every workspace.',
      ],
    },
    how: {
      en: 'Press Compare and the web app calls the GraphQL layer, which starts a workflow. The workflow calls the six adapters, normalises their output and persists the search so results can stream back.',
    },
    status: {
      en: 'The working demo (milestone M1) runs on mock fixtures declared in the code, so it needs no provider credentials and no Temporal Cloud.',
    },
    notYet: {
      en: ['The adapters are mocks: no live provider is connected yet.'],
    },
  },

  testcraft: {
    overview: {
      en: 'TestCraft AI is a B2B SaaS for QA teams who spend hours turning requirement documents into test cases. Upload a requirement as PDF, DOCX or text and get structured test cases, ready to edit and export.',
    },
    highlights: {
      en: [
        'Each test case has preconditions, step-by-step procedure and expected results.',
        'Coverage includes happy path, edge cases, negative cases and boundary conditions.',
        'Configurable: how many cases per requirement, priority tagging and generation depth.',
        'Inline editing, and CSV export with standard columns (ID, title, preconditions, steps, expected result, priority) for tools like Polarion, Xray, TestRail and Zephyr.',
        'A traceability matrix per project shows which test cases cover which requirement, with the generation audit trail (provider, model, timestamp), also exportable as CSV.',
        'The LLM layer is provider-agnostic: Anthropic Claude by default, OpenAI swappable through an environment variable.',
      ],
    },
    how: {
      en: 'FastAPI backend (SQLAlchemy async, Alembic, Pydantic v2) on PostgreSQL, a Next.js 15 front end with TypeScript, Tailwind and TanStack Query, and Supabase for authentication and storage.',
    },
    status: {
      en: 'Alpha, in active development. Not production-ready.',
    },
    notYet: {
      en: ['Stripe billing, direct Jira Xray / Polarion / Azure DevOps integrations, team roles, custom prompt templates, batch generation, a REST API and SSO are on the roadmap.'],
    },
    demo: 'testcraft',
  },

  'the-applied-brief': {
    overview: {
      en: 'The Applied Brief is an Italian newsletter on applied AI for marketing and sales, produced by supervised AI agents. A multi-agent review pipeline with plagiarism checks sits between the draft and the reader, and a human must approve every issue before it is sent.',
    },
    highlights: {
      en: [
        'Research and Copywriter agents, then five review stages: fact-check, plagiarism (Copyleaks, Originality.ai and an internal pgvector archive, all blocking), brand voice, legal and claims compliance, and an editor-in-chief synthesis.',
        'A LangGraph orchestrator links the stages in sequence with shared self-correction: when a stage blocks, the draft returns to the copywriter with that feedback, up to a retry limit.',
        'Sending is a separate, explicit command, never automatic after approval. If the ESP is down the issue stays approved and can be retried.',
        'An analyst agent reads opens and clicks from Brevo after sending and raises alerts on bounce and unsubscribe thresholds.',
        'Sponsorship runs on two tracks: an inbound self-service flow in n8n, and a sales agent that drafts outreach which always waits for human approval. Payments are confirmed by hand, never by code.',
        'Least-privilege PostgreSQL roles, a kill switch protected by a database trigger, a timed restore drill and a content eval set that catches silent prompt regressions.',
      ],
    },
    how: {
      en: 'Python with LangGraph for orchestration and state, n8n for scheduling and integrations, PostgreSQL with pgvector for memory, Brevo as the email service provider.',
    },
    status: {
      en: 'The minimal slice is complete. Distribution, monetisation and hardening phases are in progress.',
    },
    notYet: {
      en: ['The code is CLI-only with no web server, so n8n can be called but cannot call back; a return channel is still to be designed.', 'Social nodes in the n8n workflow are placeholders until a real instance and credentials exist.'],
    },
  },

  'bug-ticket-creation': {
    overview: {
      en: 'A desktop tool that turns a test-result Excel workbook into Jira incidents. It drives the browser to create each ticket, then links related defects ranked by similarity. It automates the repetitive part of reporting test results.',
    },
    highlights: {
      en: [
        'Restart-safe: the Excel file is the source of truth. Rows that already have an incident number are skipped, so a re-run never creates duplicates.',
        'Rows with missing or invalid mandatory fields are skipped and listed in the final summary instead of failing the whole run.',
        'A dry-run mode fills the form without clicking Submit.',
        'Defect search ranks results with OpenAI Embeddings when a key is configured and falls back to a local model otherwise.',
        'Two ways to use it: a desktop chat window that guides the steps, or a classic terminal launcher.',
        'If login or one-time-code authentication fails, a debug bundle with URL, visible text and a screenshot is saved automatically.',
        '67 unit tests run without a browser.',
      ],
    },
    how: {
      en: 'Python with browser automation for Jira, an Excel reader and writer, an embeddings-based search module and pytest for the test suite. The tool is packaged as patches for distribution to colleagues.',
    },
    status: {
      en: 'Used by my team. The repository is private because it works against a company Jira instance; the demo below uses invented sample defects.',
    },
    demo: 'tickets',
  },

  'jarvis-core': {
    overview: {
      en: 'Jarvis Core is a modular core for a personal assistant. Skills plug in as separate modules, a planner turns a sentence into actions, and a policy layer decides what is allowed to run.',
    },
    highlights: {
      en: [
        'A FastAPI service with /v1/query, /v1/specs and /v1/health.',
        'Skills are discovered automatically: any module in the skills package that exposes a SKILL is registered with its tool specs.',
        'Each tool spec carries a JSON schema for its parameters and a risk level (low, medium, high).',
        'The planner uses intents and synonyms, and asks a clarifying question when something is missing or ambiguous. Dialogue state is kept per session.',
        'High-risk actions are blocked by the policy until the user explicitly confirms.',
        'The planner is rule-based on purpose and can be replaced by tool-calling without touching the skills.',
      ],
    },
    how: {
      en: 'Python, FastAPI and Pydantic. The demo below is a TypeScript port of the planner and the policy running in your browser: try asking it to open an app or shut the PC down.',
    },
    status: {
      en: 'Early core. The Windows connector is a simulation: it reports what it would run and does nothing.',
    },
    demo: 'jarvis',
  },

  'openai-chatbot': {
    overview: {
      en: 'A command-line chatbot on the OpenAI API, and my first practical exercise in Python and AI integration. It reads a message, sends it to the model, prints the reply and loops until you type exit.',
    },
    highlights: {
      en: ['Python 3 with a virtual environment, openai and python-dotenv.', 'The API key lives in a .env file that is never committed.', 'The README walks through setup step by step.'],
    },
    status: { en: 'Finished learning exercise.' },
  },

  'portfolio-professional': {
    overview: {
      en: 'My previous portfolio: a Next.js site with interactive 3D scenes built with React Three Fiber, GSAP animation and smooth scrolling. It is still online and you can open it below.',
    },
    highlights: {
      en: ['Next.js 16 and React 19 with Tailwind 4.', 'Three.js scenes through React Three Fiber and drei.', 'GSAP, Framer Motion and Lenis for animation and scrolling.', 'Home page previews of two team projects built at Boolean.'],
    },
    status: { en: 'Live on Vercel.' },
  },

  spotify: {
    overview: { en: 'A static recreation of the Spotify web player, built to practise HTML and CSS structure and layout. It has the sidebar (Home, Search, Your Library, Create Playlist), a recently played row and the featured sections. The live version is embedded below.' },
    highlights: { en: ['Plain HTML and CSS, no framework.', 'Sidebar navigation, playlist list and recently played cards.', 'Browse sections for podcasts, charts, genres and moods, new releases and discover.'] },
    status: { en: 'Static page hosted on GitHub Pages. A layout exercise: it does not play music.' },
  },
  discord: {
    overview: { en: 'A static recreation of the Discord landing page, built to practise HTML and CSS layout. It has the navigation bar, the "Your place to talk" hero and the footer, with Font Awesome icons. The live version is embedded below.' },
    highlights: { en: ['Plain HTML and CSS with Font Awesome icons.', 'Navigation, hero section and footer.'] },
    status: { en: 'Static page hosted on GitHub Pages. A layout exercise.' },
  },
  dashboard: {
    overview: { en: 'An admin dashboard layout built with Bootstrap for a course exercise: a navigation bar, an online-students counter, an upcoming classes table with status badges and a form to add a student. The live version is embedded below.' },
    highlights: { en: ['Bootstrap grid, table and form components.', 'Status badges (done, in process, failed) in the classes table.'] },
    status: { en: 'Static page hosted on GitHub Pages. A layout exercise with sample data.' },
  },
  freelancer: {
    overview: { en: 'The Start Bootstrap "Freelancer" theme, which I assembled and studied while learning Bootstrap: portfolio, about and contact sections in a one-page layout. It is not my own design. The live version is embedded below.' },
    highlights: { en: ['Bootstrap one-page layout with navigation, sections, contact form and footer.', 'Used to learn how a Bootstrap theme is structured.'] },
    status: { en: 'Third-party theme kept as a study exercise, hosted on GitHub Pages.' },
  },
  boolzapp: {
    overview: { en: 'A WhatsApp-style chat built with Vue during the Boolean course. You can search the contact list, open a conversation, send messages and get an automatic reply after a short delay.' },
    highlights: { en: ['Vue with a single script file, HTML and CSS.', 'Contact search, per-contact conversations and sent and received messages.', 'A timed automatic reply.'] },
    status: { en: 'Course project. Code only for now.' },
  },
  boolflix: {
    overview: { en: 'A Netflix-style search built with Vue and Vite. You type a title, the app queries the TMDB multi-search API and shows the results as cards with their poster.' },
    highlights: { en: ['Vue 3 with Vite, split into header, main and card components.', 'A shared reactive store for the search text and the results.', 'REST requests to the TMDB API.'] },
    status: { en: 'Course project. Code only.' },
  },
  'laravel-api': {
    overview: { en: 'A Laravel project from my full-stack course: a small CMS for portfolio projects. An authenticated admin area manages posts, which are linked to a type and to several technologies, and a JSON API exposes the posts to a separate front end.' },
    highlights: { en: ['Admin CRUD for posts behind login, with a cover image.', 'Each post belongs to a type and has many technologies (one-to-many and many-to-many with a pivot table).', 'Authentication with Laravel Breeze (registration, login, password reset, email verification).', 'A public JSON API: the list of posts and a single post by slug.'] },
    status: { en: 'Course project. Code only.' },
  },
};
