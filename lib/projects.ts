export type Lang = 'en' | 'it';
type L = Record<Lang, string>;

export interface Project {
  id: string;
  title: string;
  tag: L;
  summary: L;
  stack: string[];
  kind: 'ai' | 'web' | 'app' | 'ui';
  repo?: string;
  demo?: string;
  private?: boolean;
  year: string;
}

const GH = 'https://github.com/andreacassini/';
const PAGES = 'https://andreacassini.github.io/';

export const projects: Project[] = [
  {
    id: 'proofline',
    title: 'Proofline',
    year: '2026',
    kind: 'ai',
    private: true,
    tag: { en: 'Multi-LLM iOS assistant', it: 'Assistente iOS multi-LLM' },
    summary: {
      en: 'Chat-first iOS app that coordinates several LLMs to plan, review and verify engineering work. A local runtime picks which models to involve and learns from the results.',
      it: 'App iOS chat-first che coordina più LLM per pianificare, rivedere e verificare il lavoro di sviluppo. Un runtime locale sceglie i modelli da coinvolgere e impara dai risultati.',
    },
    stack: ['Swift', 'SwiftUI', 'Node.js', 'LLM orchestration'],
  },
  {
    id: 'travel-intelligence',
    title: 'Travel Intelligence',
    year: '2026',
    kind: 'app',
    private: true,
    tag: { en: 'Trip decision engine', it: 'Motore decisionale per viaggi' },
    summary: {
      en: 'Turborepo monorepo with a Next.js front end, NestJS API and Temporal workflows that compare normalized results from six travel providers.',
      it: 'Monorepo Turborepo con front end Next.js, API NestJS e workflow Temporal che confrontano i risultati normalizzati di sei provider di viaggio.',
    },
    stack: ['Next.js', 'NestJS', 'Temporal', 'PostgreSQL', 'Docker'],
  },
  {
    id: 'testcraft',
    title: 'TestCraft AI',
    year: '2026',
    kind: 'ai',
    private: true,
    tag: { en: 'Test cases from requirements', it: 'Test case dai requisiti' },
    summary: {
      en: 'B2B SaaS for QA teams. Upload a requirement document and get structured test cases: happy path, edge cases, negative flows and boundaries.',
      it: 'SaaS B2B per team QA. Carichi un documento di requisiti e ottieni test case strutturati: percorso felice, casi limite, flussi negativi e confini.',
    },
    stack: ['Python', 'React', 'Docker', 'LLM'],
  },
  {
    id: 'the-applied-brief',
    title: 'The Applied Brief',
    year: '2026',
    kind: 'ai',
    private: true,
    tag: { en: 'Multi-agent newsletter system', it: 'Sistema multi-agent per newsletter' },
    summary: {
      en: 'Italian newsletter on applied AI, produced by a supervised agent pipeline with multi-agent review, plagiarism checks and mandatory human approval.',
      it: 'Newsletter italiana sull\'AI applicata, prodotta da una pipeline di agenti supervisionata con revisione multi-agent, controllo anti-plagio e approvazione umana obbligatoria.',
    },
    stack: ['LangGraph', 'Python', 'n8n', 'Postgres', 'pgvector'],
  },
  {
    id: 'bug-ticket-creation',
    title: 'Jira Ticket Creator',
    year: '2026',
    kind: 'ai',
    private: true,
    tag: { en: 'Jira automation', it: 'Automazione Jira' },
    summary: {
      en: 'Reads defects from Excel, ranks similar existing tickets with embeddings and creates Jira incidents through browser automation. Covered by 67 unit tests.',
      it: 'Legge i difetti da Excel, classifica i ticket simili con gli embedding e crea gli incident Jira tramite automazione del browser. Coperto da 67 test unitari.',
    },
    stack: ['Python', 'OpenAI Embeddings', 'Browser automation', 'pytest'],
  },
  {
    id: 'jarvis-core',
    title: 'Jarvis Core',
    year: '2026',
    kind: 'ai',
    repo: GH + 'jarvis-core',
    tag: { en: 'Modular assistant core', it: 'Core modulare per assistente' },
    summary: {
      en: 'Python core for a personal assistant, split into connectors, core logic and installable skills.',
      it: 'Core Python per un assistente personale, diviso in connettori, logica centrale e skill installabili.',
    },
    stack: ['Python'],
  },
  {
    id: 'openai-chatbot',
    title: 'OpenAI Chatbot',
    year: '2026',
    kind: 'ai',
    repo: GH + 'openai-chatbot',
    tag: { en: 'Command-line chatbot', it: 'Chatbot da riga di comando' },
    summary: {
      en: 'A small CLI chatbot built on the OpenAI API, my first step into AI integration.',
      it: 'Un piccolo chatbot CLI basato sull\'API OpenAI, il mio primo passo nell\'integrazione con l\'AI.',
    },
    stack: ['Python', 'OpenAI API'],
  },
  {
    id: 'portfolio-professional',
    title: 'Portfolio 3D',
    year: '2025',
    kind: 'web',
    repo: GH + 'portfolio-professional',
    demo: 'https://portfolio-mu-nine-25.vercel.app',
    tag: { en: 'Interactive 3D portfolio', it: 'Portfolio 3D interattivo' },
    summary: {
      en: 'Previous portfolio with React Three Fiber scenes, GSAP animation and smooth scrolling.',
      it: 'Portfolio precedente con scene React Three Fiber, animazioni GSAP e scorrimento fluido.',
    },
    stack: ['Next.js', 'Three.js', 'GSAP', 'Tailwind'],
  },
  {
    id: 'spotify',
    title: 'Spotify Web',
    year: '2023',
    kind: 'ui',
    repo: GH + 'html-css-spotifyweb',
    demo: PAGES + 'html-css-spotifyweb/',
    tag: { en: 'UI clone', it: 'Clone di interfaccia' },
    summary: {
      en: 'Static recreation of the Spotify web player layout.',
      it: 'Ricostruzione statica del layout del web player di Spotify.',
    },
    stack: ['HTML', 'CSS'],
  },
  {
    id: 'discord',
    title: 'Discord',
    year: '2023',
    kind: 'ui',
    repo: GH + 'htmlcss-discord',
    demo: PAGES + 'htmlcss-discord/',
    tag: { en: 'UI clone', it: 'Clone di interfaccia' },
    summary: {
      en: 'Static recreation of the Discord landing page.',
      it: 'Ricostruzione statica della landing page di Discord.',
    },
    stack: ['HTML', 'CSS'],
  },
  {
    id: 'dashboard',
    title: 'Admin Dashboard',
    year: '2023',
    kind: 'ui',
    repo: GH + 'html-css-bootstrap-dashboard',
    demo: PAGES + 'html-css-bootstrap-dashboard/',
    tag: { en: 'Responsive dashboard', it: 'Dashboard responsive' },
    summary: {
      en: 'Responsive admin dashboard layout built with Bootstrap.',
      it: 'Layout responsive di una dashboard amministrativa realizzato con Bootstrap.',
    },
    stack: ['HTML', 'CSS', 'Bootstrap'],
  },
  {
    id: 'freelancer',
    title: 'Freelancer Theme',
    year: '2023',
    kind: 'ui',
    repo: GH + 'html-css-bootstrap-freelancer',
    demo: PAGES + 'html-css-bootstrap-freelancer/',
    tag: { en: 'Bootstrap landing page', it: 'Landing page Bootstrap' },
    summary: {
      en: 'One-page freelancer portfolio template built with Bootstrap.',
      it: 'Template di portfolio one-page per freelance realizzato con Bootstrap.',
    },
    stack: ['HTML', 'CSS', 'Bootstrap'],
  },
  {
    id: 'boolzapp',
    title: 'Boolzapp',
    year: '2023',
    kind: 'app',
    repo: GH + 'vue-boolzapp',
    tag: { en: 'Chat app in Vue', it: 'Chat app in Vue' },
    summary: {
      en: 'WhatsApp-style chat with conversations, search and message actions.',
      it: 'Chat in stile WhatsApp con conversazioni, ricerca e azioni sui messaggi.',
    },
    stack: ['Vue', 'JavaScript'],
  },
  {
    id: 'boolflix',
    title: 'Boolflix',
    year: '2023',
    kind: 'app',
    repo: GH + 'vite-boolflix',
    tag: { en: 'Streaming catalogue', it: 'Catalogo streaming' },
    summary: {
      en: 'Netflix-style catalogue that searches films and series through the TMDB API.',
      it: 'Catalogo in stile Netflix che cerca film e serie tramite l\'API di TMDB.',
    },
    stack: ['Vue', 'Vite', 'REST API'],
  },
  {
    id: 'laravel-api',
    title: 'Laravel API',
    year: '2023',
    kind: 'app',
    repo: GH + 'laravel-api',
    tag: { en: 'Back end and REST API', it: 'Back end e REST API' },
    summary: {
      en: 'Laravel project with authentication, many-to-many relations and a JSON API consumed by a Vue front end.',
      it: 'Progetto Laravel con autenticazione, relazioni many-to-many e un\'API JSON consumata da un front end Vue.',
    },
    stack: ['Laravel', 'PHP', 'MySQL', 'REST'],
  },
];
