export type Lang = 'en' | 'it';
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

const PRIVATE: L = { en: 'Private repository', it: 'Repository privato' };

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
      it: 'Un assistente iOS in cui più LLM pianificano, rivedono e verificano il lavoro di sviluppo.',
    },
    problem: {
      en: 'One model rarely gives advice you can verify on implementation, security, design and quality.',
      it: 'Un solo modello raramente dà indicazioni verificabili su implementazione, sicurezza, design e qualità.',
    },
    approach: {
      en: 'A local runtime detects the available providers, chooses which models to involve and learns from results. Statuses separate planned work from executed work.',
      it: 'Un runtime locale rileva i provider disponibili, sceglie quali modelli coinvolgere e impara dai risultati. Gli stati distinguono il lavoro pianificato da quello eseguito.',
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
      it: 'Un motore decisionale per viaggi che confronta sei provider in un unico flusso.',
    },
    problem: {
      en: 'Provider results arrive in different shapes, so comparing them by hand is slow and inconsistent.',
      it: 'I risultati dei provider arrivano in formati diversi, quindi confrontarli a mano è lento e incoerente.',
    },
    approach: {
      en: 'A Turborepo monorepo: Next.js front end, NestJS API and Temporal workflows over normalised provider results. The first demo runs on declared mock fixtures.',
      it: 'Un monorepo Turborepo: front end Next.js, API NestJS e workflow Temporal sui risultati normalizzati dei provider. La prima demo usa fixture simulate dichiarate.',
    },
    stack: ['Next.js', 'NestJS', 'Temporal', 'PostgreSQL', 'Docker'],
  },
  {
    id: 'testcraft',
    title: 'TestCraft AI',
    year: '2026',
    private: true,
    status: { en: 'Alpha · private repository', it: 'Alpha · repository privato' },
    one: {
      en: 'Structured test cases generated from natural-language requirements.',
      it: 'Test case strutturati generati da requisiti in linguaggio naturale.',
    },
    problem: {
      en: 'A single requirement can take 30 to 60 minutes to cover, and quality varies between people.',
      it: 'Coprire un singolo requisito può richiedere da 30 a 60 minuti e la qualità varia da persona a persona.',
    },
    approach: {
      en: 'Upload a PDF, DOCX or text requirement and get happy paths, edge cases, negative flows and boundaries, ready to export. It comes from the work I did by hand for three years.',
      it: 'Carichi un requisito in PDF, DOCX o testo e ottieni percorsi felici, casi limite, flussi negativi e confini, pronti da esportare. Nasce dal lavoro che ho fatto a mano per tre anni.',
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
      it: 'Un sistema di newsletter gestito da agenti supervisionati con approvazione umana finale.',
    },
    problem: {
      en: 'AI-written content needs review, originality checks and a person who signs off.',
      it: 'I contenuti scritti dall\'AI richiedono revisione, controlli di originalità e una persona che approva.',
    },
    approach: {
      en: 'A LangGraph supervisor, multi-agent review with plagiarism checks and mandatory human approval. n8n handles publishing, Postgres with pgvector holds memory.',
      it: 'Un supervisore LangGraph, revisione multi-agent con controllo anti-plagio e approvazione umana obbligatoria. n8n gestisce la pubblicazione, Postgres con pgvector la memoria.',
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
      it: 'Dai difetti in Excel agli incident Jira, con i ticket simili ordinati per primi.',
    },
    problem: {
      en: 'Logging repetitive defects by hand is slow, and duplicates slip through.',
      it: 'Registrare a mano difetti ripetitivi è lento e i duplicati sfuggono.',
    },
    approach: {
      en: 'Reads defects from Excel, ranks similar existing tickets with embeddings and creates incidents through browser automation. 67 unit tests, no browser needed.',
      it: 'Legge i difetti da Excel, ordina i ticket simili con gli embedding e crea gli incident tramite automazione del browser. 67 test unitari, nessun browser necessario.',
    },
    stack: ['Python', 'OpenAI Embeddings', 'Playwright', 'pytest'],
  },
];

/** Demos and earlier work: compact cards with live demo and code links. */
export const earlier: Project[] = [
  {
    id: 'portfolio-professional', title: 'Portfolio 3D', year: '2025',
    one: { en: 'Previous portfolio with React Three Fiber scenes, GSAP animation and smooth scrolling.', it: 'Portfolio precedente con scene React Three Fiber, animazioni GSAP e scorrimento fluido.' },
    stack: ['Next.js', 'Three.js', 'GSAP'], repo: GH + 'portfolio-professional', demo: 'https://portfolio-mu-nine-25.vercel.app',
  },
  {
    id: 'jarvis-core', title: 'Jarvis Core', year: '2026',
    one: { en: 'A modular assistant core: pluggable skills, an intent planner and a safety policy for risky actions.', it: 'Un core modulare per assistente: skill collegabili, un planner di intenti e una policy di sicurezza per le azioni rischiose.' },
    stack: ['Python'], repo: GH + 'jarvis-core',
  },
  {
    id: 'openai-chatbot', title: 'OpenAI Chatbot', year: '2026',
    one: { en: 'A command-line chatbot on the OpenAI API, my first step into AI integration.', it: 'Un chatbot da riga di comando sull\'API OpenAI, il mio primo passo nell\'integrazione con l\'AI.' },
    stack: ['Python', 'OpenAI API'], repo: GH + 'openai-chatbot',
  },
  {
    id: 'spotify', title: 'Spotify Web', year: '2023',
    one: { en: 'Static recreation of the Spotify web player layout.', it: 'Ricostruzione statica del layout del web player di Spotify.' },
    stack: ['HTML', 'CSS'], repo: GH + 'html-css-spotifyweb', demo: PAGES + 'html-css-spotifyweb/',
  },
  {
    id: 'discord', title: 'Discord', year: '2023',
    one: { en: 'Static recreation of the Discord landing page.', it: 'Ricostruzione statica della landing page di Discord.' },
    stack: ['HTML', 'CSS'], repo: GH + 'htmlcss-discord', demo: PAGES + 'htmlcss-discord/',
  },
  {
    id: 'dashboard', title: 'Admin Dashboard', year: '2023',
    one: { en: 'Admin dashboard layout with a classes table and a student form, built with Bootstrap.', it: 'Layout di dashboard amministrativa con tabella delle classi e form studente, con Bootstrap.' },
    stack: ['HTML', 'CSS', 'Bootstrap'], repo: GH + 'html-css-bootstrap-dashboard', demo: PAGES + 'html-css-bootstrap-dashboard/',
  },
  {
    id: 'freelancer', title: 'Freelancer Theme', year: '2023',
    one: { en: 'The Start Bootstrap Freelancer theme, assembled as a Bootstrap study exercise.', it: 'Il tema Freelancer di Start Bootstrap, assemblato come esercizio di studio su Bootstrap.' },
    stack: ['HTML', 'CSS', 'Bootstrap'], repo: GH + 'html-css-bootstrap-freelancer', demo: PAGES + 'html-css-bootstrap-freelancer/',
  },
  {
    id: 'boolzapp', title: 'Boolzapp', year: '2023',
    one: { en: 'WhatsApp-style chat in Vue with contact search, conversations and automatic replies.', it: 'Chat in stile WhatsApp in Vue con ricerca dei contatti, conversazioni e risposte automatiche.' },
    stack: ['Vue', 'JavaScript'], repo: GH + 'vue-boolzapp',
  },
  {
    id: 'boolflix', title: 'Boolflix', year: '2023',
    one: { en: 'Netflix-style search of films and series through the TMDB API, built with Vue and Vite.', it: 'Ricerca in stile Netflix di film e serie tramite l\'API di TMDB, con Vue e Vite.' },
    stack: ['Vue', 'Vite', 'REST API'], repo: GH + 'vite-boolflix',
  },
  {
    id: 'laravel-api', title: 'Laravel API', year: '2023',
    one: { en: 'A small Laravel CMS for portfolio projects with an admin area and a JSON API.', it: 'Un piccolo CMS Laravel per progetti di portfolio con area admin e API JSON.' },
    stack: ['Laravel', 'PHP', 'MySQL'], repo: GH + 'laravel-api',
  },
];

export const allProjects: Project[] = [...featured, ...earlier];
