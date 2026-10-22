import type { L } from './projects';

export interface Detail {
  overview: L;
  highlights: Record<'en' | 'it', string[]>;
  how?: L;
  status: L;
  notYet?: Record<'en' | 'it', string[]>;
  /** key of an interactive demo built into this site */
  demo?: 'jarvis' | 'testcraft' | 'tickets';
}

/** Long-form write-ups. Facts come from each repository's README, tree and source. */
export const details: Record<string, Detail> = {
  proofline: {
    overview: {
      en: 'Proofline is a chat-first iOS app that coordinates several LLMs to work out what to build, spot risks and propose changes you can verify across implementation, security, design and quality. A local runtime detects which providers are installed, decides who to involve for each request and learns from the results.',
      it: 'Proofline è un\'app iOS chat-first che coordina più LLM per capire cosa costruire, individuare rischi e proporre interventi verificabili su implementazione, sicurezza, design e qualità. Un runtime locale rileva i provider installati, decide chi coinvolgere per ogni richiesta e impara dai risultati.',
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
      it: [
        'Router adattivo con modalità Adaptive, Full Council e Fast Path: un modello veloce per il triage, candidati in parallelo solo quando il rischio lo richiede, uscita anticipata appena i controlli deterministici passano.',
        'Proposte in parallelo, peer review anonima e una fase di sintesi. Un pannello "agenti coinvolti" mostra quale modello ha scritto, rivisto e sintetizzato.',
        'Gli stati distinguono il lavoro pianificato da quello eseguito, così l\'interfaccia non dichiara mai come fatto ciò che non è stato eseguito.',
        'Le richieste visive ricevono un mockup renderizzato in chat (browser per i siti, iPhone per le app). I task solo backend non ne ricevono.',
        'Usa le CLI ufficiali già installate sul computer e le loro sessioni locali. Non legge, copia né salva credenziali.',
        'Solo locale per impostazione predefinita: la modalità "Piano · solo locale" non chiama modelli. Il council reale parte solo dopo un consenso esplicito.',
        'Un workspace condiviso mobile e desktop: progetti, board dei task, timeline, chat separate per progetto e caricamento file (fino a 6 file da 5 MB).',
      ],
    },
    how: {
      en: 'A Node.js coordinator (runtime in src/core and src/providers) probes the available providers, routes each task and serves the clients over the local network. The native client is SwiftUI for iOS 17, with an Expo React Native client for quick previews and a web console used only for development.',
      it: 'Un coordinator Node.js (runtime in src/core e src/providers) rileva i provider disponibili, instrada ogni task e serve i client sulla rete locale. Il client nativo è SwiftUI per iOS 17, con un client Expo React Native per anteprime rapide e una console web usata solo per lo sviluppo.',
    },
    status: {
      en: 'Prototype. The interface still simulates progress, and model calls are off unless the explicit execute flag is set.',
      it: 'Prototipo. L\'interfaccia simula ancora gli avanzamenti e le chiamate ai modelli sono disattivate se non si imposta il flag di esecuzione esplicito.',
    },
    notYet: {
      en: ['The account session is local and demonstrative.', 'Storage encryption, MFA and server-side authentication are listed as required before exposing it outside a trusted LAN.'],
      it: ['La sessione account è locale e dimostrativa.', 'Cifratura dell\'archivio, MFA e autenticazione lato server sono indicate come necessarie prima di esporlo fuori da una LAN fidata.'],
    },
  },

  'travel-intelligence': {
    overview: {
      en: 'Travel Intelligence is a monorepo for a trip decision engine. A search fans out to six normalised provider adapters through a Temporal workflow, and the results come back as one comparison you can act on.',
      it: 'Travel Intelligence è un monorepo per un motore decisionale di viaggio. Una ricerca si propaga a sei adapter di provider normalizzati tramite un workflow Temporal e i risultati tornano come un unico confronto su cui decidere.',
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
      it: [
        'Il percorso di una richiesta è Next.js, un backend-for-frontend GraphQL, un workflow Temporal e sei adapter di provider.',
        'L\'API ha moduli per confronto, calendario prezzi, pianificazione di rotte, report ed eventi di ricerca.',
        'Le migrazioni del database coprono persistenza delle ricerche, eventi in streaming, scadenze dei flussi dei provider, fasce di budget, itinerari e report (PostgreSQL con Prisma).',
        'Workspace separati per l\'app web, l\'app admin, l\'API, i worker e un pacchetto condiviso per l\'AI engine.',
        'Lo stack locale gira con Docker Compose (Temporal, PostgreSQL) e il repository ha workflow CI e una configurazione Terraform per lo staging.',
        'Una toolchain condivisa esegue format, lint, typecheck, test e build su ogni workspace.',
      ],
    },
    how: {
      en: 'Press Compare and the web app calls the GraphQL layer, which starts a workflow. The workflow calls the six adapters, normalises their output and persists the search so results can stream back.',
      it: 'Premendo Confronta l\'app web chiama il livello GraphQL, che avvia un workflow. Il workflow interroga i sei adapter, normalizza il loro output e salva la ricerca così i risultati possono arrivare in streaming.',
    },
    status: {
      en: 'The working demo (milestone M1) runs on mock fixtures declared in the code, so it needs no provider credentials and no Temporal Cloud.',
      it: 'La demo funzionante (milestone M1) gira su fixture simulate dichiarate nel codice, quindi non richiede credenziali dei provider né Temporal Cloud.',
    },
    notYet: {
      en: ['The adapters are mocks: no live provider is connected yet.'],
      it: ['Gli adapter sono simulati: nessun provider reale è ancora collegato.'],
    },
  },

  testcraft: {
    overview: {
      en: 'TestCraft AI is a B2B SaaS for QA teams who spend hours turning requirement documents into test cases. Upload a requirement as PDF, DOCX or text and get structured test cases, ready to edit and export.',
      it: 'TestCraft AI è un SaaS B2B per i team QA che passano ore a trasformare i documenti di requisiti in test case. Carichi un requisito in PDF, DOCX o testo e ottieni test case strutturati, pronti da modificare ed esportare.',
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
      it: [
        'Ogni test case ha precondizioni, procedura passo passo e risultati attesi.',
        'La copertura include percorso felice, casi limite, casi negativi e condizioni di confine.',
        'Configurabile: quanti casi per requisito, priorità e profondità della generazione.',
        'Modifica inline ed export CSV con colonne standard (ID, titolo, precondizioni, passi, risultato atteso, priorità) per strumenti come Polarion, Xray, TestRail e Zephyr.',
        'Una matrice di tracciabilità per progetto mostra quali test case coprono quale requisito, con la traccia di generazione (provider, modello, data), esportabile in CSV.',
        'Il livello LLM è indipendente dal provider: Anthropic Claude per impostazione predefinita, OpenAI sostituibile con una variabile d\'ambiente.',
      ],
    },
    how: {
      en: 'FastAPI backend (SQLAlchemy async, Alembic, Pydantic v2) on PostgreSQL, a Next.js 15 front end with TypeScript, Tailwind and TanStack Query, and Supabase for authentication and storage.',
      it: 'Backend FastAPI (SQLAlchemy async, Alembic, Pydantic v2) su PostgreSQL, front end Next.js 15 con TypeScript, Tailwind e TanStack Query, e Supabase per autenticazione e storage.',
    },
    status: {
      en: 'Alpha, in active development. Not production-ready.',
      it: 'Alpha, in sviluppo attivo. Non pronto per la produzione.',
    },
    notYet: {
      en: ['Stripe billing, direct Jira Xray / Polarion / Azure DevOps integrations, team roles, custom prompt templates, batch generation, a REST API and SSO are on the roadmap.'],
      it: ['Fatturazione Stripe, integrazioni dirette con Jira Xray / Polarion / Azure DevOps, ruoli di team, prompt personalizzati, generazione in batch, API REST e SSO sono nella roadmap.'],
    },
    demo: 'testcraft',
  },

  'the-applied-brief': {
    overview: {
      en: 'The Applied Brief is an Italian newsletter on applied AI for marketing and sales, produced by supervised AI agents. A multi-agent review pipeline with plagiarism checks sits between the draft and the reader, and a human must approve every issue before it is sent.',
      it: 'The Applied Brief è una newsletter italiana sull\'AI applicata a marketing e vendite, prodotta da agenti AI supervisionati. Tra la bozza e il lettore c\'è una pipeline di revisione multi-agent con controlli anti-plagio, e un umano deve approvare ogni numero prima dell\'invio.',
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
      it: [
        'Agenti Research e Copywriter, poi cinque stadi di revisione: fact-check, anti-plagio (Copyleaks, Originality.ai e un archivio interno pgvector, tutti bloccanti), voce del brand, conformità legale e dei claim, e una sintesi dell\'editor-in-chief.',
        'Un orchestrator LangGraph collega gli stadi in sequenza con auto-correzione condivisa: se uno stadio blocca, la bozza torna al copywriter con quel feedback, fino a un limite di tentativi.',
        'L\'invio è un comando separato ed esplicito, mai automatico dopo l\'approvazione. Se l\'ESP è giù il numero resta approvato e si può ritentare.',
        'Un analyst legge aperture e click da Brevo dopo l\'invio e segnala le soglie di bounce e disiscrizioni.',
        'La sponsorizzazione ha due binari: un flusso self-service in n8n e un agente commerciale che prepara bozze di contatto, sempre in attesa di approvazione umana. I pagamenti si confermano a mano, mai dal codice.',
        'Ruoli PostgreSQL a minimo privilegio, un kill switch protetto da trigger del database, un restore drill cronometrato e un set di eval sui contenuti che intercetta regressioni silenziose dei prompt.',
      ],
    },
    how: {
      en: 'Python with LangGraph for orchestration and state, n8n for scheduling and integrations, PostgreSQL with pgvector for memory, Brevo as the email service provider.',
      it: 'Python con LangGraph per orchestrazione e stato, n8n per scheduling e integrazioni, PostgreSQL con pgvector per la memoria, Brevo come provider email.',
    },
    status: {
      en: 'The minimal slice is complete. Distribution, monetisation and hardening phases are in progress.',
      it: 'La slice minima è completa. Le fasi di distribuzione, monetizzazione e hardening sono in corso.',
    },
    notYet: {
      en: ['The code is CLI-only with no web server, so n8n can be called but cannot call back; a return channel is still to be designed.', 'Social nodes in the n8n workflow are placeholders until a real instance and credentials exist.'],
      it: ['Il codice è solo CLI senza web server: può chiamare n8n ma non ricevere callback; un canale di ritorno resta da progettare.', 'I nodi social del workflow n8n sono segnaposto finché non ci sono un\'istanza reale e le credenziali.'],
    },
  },

  'bug-ticket-creation': {
    overview: {
      en: 'A desktop tool that turns a test-result Excel workbook into Jira incidents. It drives the browser to create each ticket, then links related defects ranked by similarity. It automates the repetitive part of reporting test results.',
      it: 'Uno strumento desktop che trasforma un file Excel di risultati di test in incident Jira. Guida il browser per creare ogni ticket, poi collega i difetti correlati ordinati per similarità. Automatizza la parte più ripetitiva del reporting dei risultati di test.',
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
      it: [
        'Riavviabile in sicurezza: il file Excel è la fonte di verità. Le righe che hanno già un numero di incident vengono saltate, quindi un nuovo avvio non crea mai duplicati.',
        'Le righe con campi obbligatori mancanti o non validi vengono saltate ed elencate nel riepilogo finale, invece di far fallire tutta l\'esecuzione.',
        'Una modalità dry-run compila il form senza cliccare Submit.',
        'La ricerca dei difetti ordina i risultati con OpenAI Embeddings se è configurata una chiave e usa un modello locale in alternativa.',
        'Due modi di usarlo: una finestra di chat desktop che guida i passi, oppure un launcher da terminale.',
        'Se login o autenticazione con codice monouso falliscono, viene salvato in automatico un pacchetto di debug con URL, testo visibile e screenshot.',
        '67 test unitari che girano senza browser.',
      ],
    },
    how: {
      en: 'Python with browser automation for Jira, an Excel reader and writer, an embeddings-based search module and pytest for the test suite. The tool is packaged as patches for distribution to colleagues.',
      it: 'Python con automazione del browser per Jira, lettura e scrittura Excel, un modulo di ricerca basato su embedding e pytest per i test. Lo strumento viene distribuito ai colleghi come patch.',
    },
    status: {
      en: 'Used by my team. The repository is private because it works against a company Jira instance; the demo below uses invented sample defects.',
      it: 'Usato dal mio team. Il repository è privato perché lavora su un\'istanza Jira aziendale; la demo qui sotto usa difetti di esempio inventati.',
    },
    demo: 'tickets',
  },

  'jarvis-core': {
    overview: {
      en: 'Jarvis Core is a modular core for a personal assistant. Skills plug in as separate modules, a planner turns a sentence into actions, and a policy layer decides what is allowed to run.',
      it: 'Jarvis Core è un core modulare per un assistente personale. Le skill si collegano come moduli separati, un planner trasforma una frase in azioni e un livello di policy decide cosa può essere eseguito.',
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
      it: [
        'Un servizio FastAPI con /v1/query, /v1/specs e /v1/health.',
        'Le skill vengono scoperte in automatico: ogni modulo del pacchetto skills che espone una SKILL viene registrato con le sue specifiche.',
        'Ogni specifica ha uno schema JSON dei parametri e un livello di rischio (basso, medio, alto).',
        'Il planner usa intenti e sinonimi e fa una domanda di chiarimento quando manca qualcosa o c\'è ambiguità. Lo stato del dialogo è per sessione.',
        'Le azioni ad alto rischio sono bloccate dalla policy finché l\'utente non conferma esplicitamente.',
        'Il planner è volutamente basato su regole e può essere sostituito con tool-calling senza toccare le skill.',
      ],
    },
    how: {
      en: 'Python, FastAPI and Pydantic. The demo below is a TypeScript port of the planner and the policy running in your browser: try asking it to open an app or shut the PC down.',
      it: 'Python, FastAPI e Pydantic. La demo qui sotto è un port in TypeScript del planner e della policy che gira nel tuo browser: prova a chiedergli di aprire un\'app o di spegnere il PC.',
    },
    status: {
      en: 'Early core. The Windows connector is a simulation: it reports what it would run and does nothing.',
      it: 'Core iniziale. Il connettore Windows è una simulazione: riporta cosa eseguirebbe e non fa nulla.',
    },
    demo: 'jarvis',
  },

  'openai-chatbot': {
    overview: {
      en: 'A command-line chatbot on the OpenAI API, and my first practical exercise in Python and AI integration. It reads a message, sends it to the model, prints the reply and loops until you type exit.',
      it: 'Un chatbot da riga di comando sull\'API OpenAI e il mio primo esercizio pratico con Python e l\'integrazione con l\'AI. Legge un messaggio, lo invia al modello, stampa la risposta e continua finché non scrivi exit.',
    },
    highlights: {
      en: ['Python 3 with a virtual environment, openai and python-dotenv.', 'The API key lives in a .env file that is never committed.', 'The README walks through setup step by step.'],
      it: ['Python 3 con ambiente virtuale, openai e python-dotenv.', 'La chiave API sta in un file .env che non viene mai committato.', 'Il README guida l\'installazione passo passo.'],
    },
    status: { en: 'Finished learning exercise.', it: 'Esercizio di apprendimento concluso.' },
  },

  'portfolio-professional': {
    overview: {
      en: 'My previous portfolio: a Next.js site with interactive 3D scenes built with React Three Fiber, GSAP animation and smooth scrolling. It is still online and you can open it below.',
      it: 'Il mio portfolio precedente: un sito Next.js con scene 3D interattive realizzate con React Three Fiber, animazioni GSAP e scorrimento fluido. È ancora online e puoi aprirlo qui sotto.',
    },
    highlights: {
      en: ['Next.js 16 and React 19 with Tailwind 4.', 'Three.js scenes through React Three Fiber and drei.', 'GSAP, Framer Motion and Lenis for animation and scrolling.', 'Home page previews of two team projects built at Boolean.'],
      it: ['Next.js 16 e React 19 con Tailwind 4.', 'Scene Three.js tramite React Three Fiber e drei.', 'GSAP, Framer Motion e Lenis per animazioni e scorrimento.', 'Anteprime in home di due progetti di gruppo realizzati a Boolean.'],
    },
    status: { en: 'Live on Vercel.', it: 'Online su Vercel.' },
  },

  spotify: {
    overview: { en: 'A static recreation of the Spotify web player, built to practise HTML and CSS structure and layout. It has the sidebar (Home, Search, Your Library, Create Playlist), a recently played row and the featured sections. The live version is embedded below.', it: 'Una ricostruzione statica del web player di Spotify, per esercitarmi su struttura e layout con HTML e CSS. Ha la sidebar (Home, Cerca, La tua libreria, Crea Playlist), la riga degli ascolti recenti e le sezioni in evidenza. La versione live è incorporata qui sotto.' },
    highlights: { en: ['Plain HTML and CSS, no framework.', 'Sidebar navigation, playlist list and recently played cards.', 'Browse sections for podcasts, charts, genres and moods, new releases and discover.'], it: ['HTML e CSS puri, senza framework.', 'Navigazione laterale, elenco delle playlist e card degli ascolti recenti.', 'Sezioni per podcast, classifiche, generi e mood, nuove uscite e scopri.'] },
    status: { en: 'Static page hosted on GitHub Pages. A layout exercise: it does not play music.', it: 'Pagina statica ospitata su GitHub Pages. Un esercizio di layout: non riproduce musica.' },
  },
  discord: {
    overview: { en: 'A static recreation of the Discord landing page, built to practise HTML and CSS layout. It has the navigation bar, the "Your place to talk" hero and the footer, with Font Awesome icons. The live version is embedded below.', it: 'Una ricostruzione statica della landing page di Discord, per esercitarmi sul layout con HTML e CSS. Ha la barra di navigazione, l\'hero "Il tuo posto per parlare" e il footer, con icone Font Awesome. La versione live è incorporata qui sotto.' },
    highlights: { en: ['Plain HTML and CSS with Font Awesome icons.', 'Navigation, hero section and footer.'], it: ['HTML e CSS puri con icone Font Awesome.', 'Navigazione, sezione hero e footer.'] },
    status: { en: 'Static page hosted on GitHub Pages. A layout exercise.', it: 'Pagina statica ospitata su GitHub Pages. Un esercizio di layout.' },
  },
  dashboard: {
    overview: { en: 'An admin dashboard layout built with Bootstrap for a course exercise: a navigation bar, an online-students counter, an upcoming classes table with status badges and a form to add a student. The live version is embedded below.', it: 'Un layout di dashboard amministrativa realizzato con Bootstrap per un esercizio del corso: barra di navigazione, contatore degli studenti online, tabella delle prossime classi con stati e un form per aggiungere uno studente. La versione live è incorporata qui sotto.' },
    highlights: { en: ['Bootstrap grid, table and form components.', 'Status badges (done, in process, failed) in the classes table.'], it: ['Griglia, tabella e form di Bootstrap.', 'Badge di stato (completata, in corso, fallita) nella tabella delle classi.'] },
    status: { en: 'Static page hosted on GitHub Pages. A layout exercise with sample data.', it: 'Pagina statica ospitata su GitHub Pages. Un esercizio di layout con dati di esempio.' },
  },
  freelancer: {
    overview: { en: 'The Start Bootstrap "Freelancer" theme, which I assembled and studied while learning Bootstrap: portfolio, about and contact sections in a one-page layout. It is not my own design. The live version is embedded below.', it: 'Il tema "Freelancer" di Start Bootstrap, che ho assemblato e studiato mentre imparavo Bootstrap: sezioni portfolio, chi sono e contatti in un layout one-page. Non è un mio design. La versione live è incorporata qui sotto.' },
    highlights: { en: ['Bootstrap one-page layout with navigation, sections, contact form and footer.', 'Used to learn how a Bootstrap theme is structured.'], it: ['Layout one-page Bootstrap con navigazione, sezioni, form di contatto e footer.', 'Usato per capire come è strutturato un tema Bootstrap.'] },
    status: { en: 'Third-party theme kept as a study exercise, hosted on GitHub Pages.', it: 'Tema di terze parti conservato come esercizio di studio, ospitato su GitHub Pages.' },
  },
  boolzapp: {
    overview: { en: 'A WhatsApp-style chat built with Vue during the Boolean course. You can search the contact list, open a conversation, send messages and get an automatic reply after a short delay.', it: 'Una chat in stile WhatsApp realizzata con Vue durante il corso Boolean. Puoi cercare tra i contatti, aprire una conversazione, inviare messaggi e ricevere una risposta automatica dopo breve tempo.' },
    highlights: { en: ['Vue with a single script file, HTML and CSS.', 'Contact search, per-contact conversations and sent and received messages.', 'A timed automatic reply.'], it: ['Vue con un solo file di script, HTML e CSS.', 'Ricerca dei contatti, conversazioni per contatto e messaggi inviati e ricevuti.', 'Una risposta automatica temporizzata.'] },
    status: { en: 'Course project. Code only for now.', it: 'Progetto del corso. Per ora solo il codice.' },
  },
  boolflix: {
    overview: { en: 'A Netflix-style search built with Vue and Vite. You type a title, the app queries the TMDB multi-search API and shows the results as cards with their poster.', it: 'Una ricerca in stile Netflix realizzata con Vue e Vite. Scrivi un titolo, l\'app interroga l\'API multi-search di TMDB e mostra i risultati come card con la locandina.' },
    highlights: { en: ['Vue 3 with Vite, split into header, main and card components.', 'A shared reactive store for the search text and the results.', 'REST requests to the TMDB API.'], it: ['Vue 3 con Vite, diviso nei componenti header, main e card.', 'Uno store reattivo condiviso per il testo cercato e i risultati.', 'Richieste REST all\'API di TMDB.'] },
    status: { en: 'Course project. Code only.', it: 'Progetto del corso. Solo il codice.' },
  },
  'laravel-api': {
    overview: { en: 'A Laravel project from my full-stack course: a small CMS for portfolio projects. An authenticated admin area manages posts, which are linked to a type and to several technologies, and a JSON API exposes the posts to a separate front end.', it: 'Un progetto Laravel del mio corso full-stack: un piccolo CMS per progetti di portfolio. Un\'area admin autenticata gestisce i post, collegati a un tipo e a più tecnologie, e un\'API JSON espone i post a un front end separato.' },
    highlights: { en: ['Admin CRUD for posts behind login, with a cover image.', 'Each post belongs to a type and has many technologies (one-to-many and many-to-many with a pivot table).', 'Authentication with Laravel Breeze (registration, login, password reset, email verification).', 'A public JSON API: the list of posts and a single post by slug.'], it: ['CRUD admin dei post dietro login, con immagine di copertina.', 'Ogni post appartiene a un tipo e ha più tecnologie (uno-a-molti e molti-a-molti con tabella pivot).', 'Autenticazione con Laravel Breeze (registrazione, login, reset password, verifica email).', 'Un\'API JSON pubblica: l\'elenco dei post e un singolo post tramite slug.'] },
    status: { en: 'Course project. Code only.', it: 'Progetto del corso. Solo il codice.' },
  },
};
