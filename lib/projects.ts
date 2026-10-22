export type Lang = 'en';
export type L = Record<Lang, string>;

export interface Project {
  id: string;
  title: string;
  year: string;
  one: L;
  problem?: L;
  approach?: L;
  stack: string[];
  repo?: string;
  demo?: string;
  status?: L;
  private?: boolean;
}

const GH = 'https://github.com/andreacassini/';
const PAGES = 'https://andreacassini.github.io/';

const PRIVATE: L = { en: 'Private repository' };

/** Case studies: shown as expandable rows. Text comes from each repo's README. */
export const featured: Project[] = [
  {
    id: 'proofline',
    title: 'Proofline',
    year: '2026',
    private: true,
    status: PRIVATE,
    one: {
      en: 'An iOS assistant where several LLMs plan, review and verify engineering work.',
    },
    problem: {
      en: 'One model rarely gives advice you can verify on implementation, security, design and quality.',
    },
    approach: {
      en: 'A local runtime detects the available providers, chooses which models to involve and learns from results. Statuses separate planned work from executed work.',
    },
    stack: ['Swift', 'SwiftUI', 'Node.js', 'LLM orchestration'],
  },
  {
    id: 'travel-intelligence',
    title: 'Travel Intelligence',
    year: '2026',
    private: true,
    status: PRIVATE,
    one: {
      en: 'A trip decision engine that compares six travel providers in one flow.',
    },
    problem: {
      en: 'Provider results arrive in different shapes, so comparing them by hand is slow and inconsistent.',
    },
    approach: {
      en: 'A Turborepo monorepo: Next.js front end, NestJS API and Temporal workflows over normalised provider results. The first demo runs on declared mock fixtures.',
    },
    stack: ['Next.js', 'NestJS', 'Temporal', 'PostgreSQL', 'Docker'],
  },
  {
    id: 'testcraft',
    title: 'TestCraft AI',
    year: '2026',
    private: true,
    status: { en: 'Alpha · private repository' },
    one: {
      en: 'Structured test cases generated from natural-language requirements.',
    },
    problem: {
      en: 'A single requirement can take 30 to 60 minutes to cover, and quality varies between people.',
    },
    approach: {
      en: 'Upload a PDF, DOCX or text requirement and get happy paths, edge cases, negative flows and boundaries, ready to export. It comes from the work I did by hand for three years.',
    },
    stack: ['Python', 'React', 'Docker', 'LLM'],
  },
  {
    id: 'the-applied-brief',
    title: 'The Applied Brief',
    year: '2026',
    private: true,
    status: PRIVATE,
    one: {
      en: 'A newsletter system run by supervised agents with a human final approval.',
    },
    problem: {
      en: 'AI-written content needs review, originality checks and a person who signs off.',
    },
    approach: {
      en: 'A LangGraph supervisor, multi-agent review with plagiarism checks and mandatory human approval. n8n handles publishing, Postgres with pgvector holds memory.',
    },
    stack: ['LangGraph', 'Python', 'n8n', 'Postgres'],
  },
  {
    id: 'bug-ticket-creation',
    title: 'Jira Ticket Creator',
    year: '2026',
    private: true,
    status: PRIVATE,
    one: {
      en: 'Defects from Excel to Jira incidents, with similar tickets ranked first.',
    },
    problem: {
      en: 'Logging repetitive defects by hand is slow, and duplicates slip through.',
    },
    approach: {
      en: 'Reads defects from Excel, ranks similar existing tickets with embeddings and creates incidents through browser automation. 67 unit tests, no browser needed.',
    },
    stack: ['Python', 'OpenAI Embeddings', 'Playwright', 'pytest'],
  },
];

/** Demos and earlier work: compact cards with live demo and code links. */
export const earlier: Project[] = [
  {
    id: 'portfolio-professional', title: 'Portfolio 3D', year: '2025',
    one: { en: 'Previous portfolio with React Three Fiber scenes, GSAP animation and smooth scrolling.' },
    stack: ['Next.js', 'Three.js', 'GSAP'], repo: GH + 'portfolio-professional', demo: 'https://portfolio-mu-nine-25.vercel.app',
  },
  {
    id: 'jarvis-core', title: 'Jarvis Core', year: '2026',
    one: { en: 'A modular assistant core: pluggable skills, an intent planner and a safety policy for risky actions.' },
    stack: ['Python'], repo: GH + 'jarvis-core',
  },
  {
    id: 'openai-chatbot', title: 'OpenAI Chatbot', year: '2026',
    one: { en: 'A command-line chatbot on the OpenAI API, my first step into AI integration.' },
    stack: ['Python', 'OpenAI API'], repo: GH + 'openai-chatbot',
  },
  {
    id: 'spotify', title: 'Spotify Web', year: '2023',
    one: { en: 'Static recreation of the Spotify web player layout.' },
    stack: ['HTML', 'CSS'], repo: GH + 'html-css-spotifyweb', demo: PAGES + 'html-css-spotifyweb/',
  },
  {
    id: 'discord', title: 'Discord', year: '2023',
    one: { en: 'Static recreation of the Discord landing page.' },
    stack: ['HTML', 'CSS'], repo: GH + 'htmlcss-discord', demo: PAGES + 'htmlcss-discord/',
  },
  {
    id: 'dashboard', title: 'Admin Dashboard', year: '2023',
    one: { en: 'Admin dashboard layout with a classes table and a student form, built with Bootstrap.' },
    stack: ['HTML', 'CSS', 'Bootstrap'], repo: GH + 'html-css-bootstrap-dashboard', demo: PAGES + 'html-css-bootstrap-dashboard/',
  },
  {
    id: 'freelancer', title: 'Freelancer Theme', year: '2023',
    one: { en: 'The Start Bootstrap Freelancer theme, assembled as a Bootstrap study exercise.' },
    stack: ['HTML', 'CSS', 'Bootstrap'], repo: GH + 'html-css-bootstrap-freelancer', demo: PAGES + 'html-css-bootstrap-freelancer/',
  },
  {
    id: 'boolzapp', title: 'Boolzapp', year: '2023',
    one: { en: 'WhatsApp-style chat in Vue with contact search, conversations and automatic replies.' },
    stack: ['Vue', 'JavaScript'], repo: GH + 'vue-boolzapp',
  },
  {
    id: 'boolflix', title: 'Boolflix', year: '2023',
    one: { en: 'Netflix-style search of films and series through the TMDB API, built with Vue and Vite.' },
    stack: ['Vue', 'Vite', 'REST API'], repo: GH + 'vite-boolflix',
  },
  {
    id: 'laravel-api', title: 'Laravel API', year: '2023',
    one: { en: 'A small Laravel CMS for portfolio projects with an admin area and a JSON API.' },
    stack: ['Laravel', 'PHP', 'MySQL'], repo: GH + 'laravel-api',
  },
];

export const allProjects: Project[] = [...featured, ...earlier];
