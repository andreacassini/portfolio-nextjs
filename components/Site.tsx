'use client';

import { useEffect, useMemo, useState } from 'react';
import WaveField from './WaveField';
import { useLang } from '@/lib/i18n';
import { projects, type Lang, type Project } from '@/lib/projects';

const EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'info@andreacassini.com';
const LINKEDIN = 'https://www.linkedin.com/in/andrea-cassini-a316161ba';
const CV = '/Andrea_Cassini_CV_en_2026.pdf';

const t = {
  en: {
    nav: ['Projects', 'About', 'Contact'],
    hi: 'Hi, my name is',
    roles: ['junior software developer', 'computer engineering graduate', 'Vue, Laravel and Python', 'based in Turin, Italy'],
    lead: 'Computer Engineering graduate with full-stack training and nearly three years in automotive software validation. I build web apps and AI tools. Browse the projects, read the code and open the live demos.',
    seeWork: 'See projects',
    getInTouch: 'Get in touch',
    cv: 'Download CV',
    projects: 'Projects',
    count: (n: number) => `${n} selected from GitHub`,
    all: 'All',
    kinds: { ai: 'AI', web: 'Web', app: 'Apps', ui: 'UI' },
    demo: 'Live demo',
    code: 'Code',
    priv: 'Private repository',
    about: 'About',
    p1: 'I am a Computer Engineering graduate based in Turin. I learned full-stack development with PHP, Laravel, JavaScript and Vue.js, then spent nearly three years in software validation at Reply, testing infotainment, connectivity and powertrain systems for automotive clients.',
    p2: 'Testing taught me to find root causes and to write software that is easy to verify. Now I am moving into development, with a focus on backend and AI applications, and I build my own projects with the OpenAI and Anthropic APIs.',
    skills: [
      ['Front end', ['JavaScript', 'TypeScript', 'Vue.js', 'React', 'Next.js', 'HTML / CSS', 'Bootstrap', 'Tailwind']],
      ['Back end', ['PHP', 'Laravel', 'Node.js', 'Python', 'MySQL', 'PostgreSQL', 'REST APIs']],
      ['AI and automation', ['OpenAI API', 'Anthropic API', 'LangGraph', 'n8n', 'Playwright']],
      ['Testing and tools', ['Test design', 'Defect analysis', 'pytest', 'Jira', 'Postman', 'Git', 'Docker']],
    ] as [string, string[]][],
    contact: "Let's build something.",
    contactLead: 'I am looking for a junior software developer role, with an interest in backend and AI applications. Write to me or find me on LinkedIn.',
    email: 'Send an email',
    github: 'GitHub',
    linkedin: 'LinkedIn',
    top: 'Back to top',
    built: 'Built with Next.js',
  },
  it: {
    nav: ['Progetti', 'Chi sono', 'Contatti'],
    hi: 'Ciao, mi chiamo',
    roles: ['junior software developer', 'laureato in Ing. Informatica', 'Vue, Laravel e Python', 'di base a Torino'],
    lead: 'Laureato in Ingegneria Informatica con formazione full-stack e quasi tre anni di validazione software nel settore automotive. Sviluppo web app e strumenti AI. Trovi i progetti, il codice e le demo online.',
    seeWork: 'Vedi i progetti',
    getInTouch: 'Contattami',
    cv: 'Scarica il CV',
    projects: 'Progetti',
    count: (n: number) => `${n} selezionati da GitHub`,
    all: 'Tutti',
    kinds: { ai: 'AI', web: 'Web', app: 'App', ui: 'UI' },
    demo: 'Demo live',
    code: 'Codice',
    priv: 'Repository privato',
    about: 'Chi sono',
    p1: 'Sono laureato in Ingegneria Informatica e vivo a Torino. Ho imparato lo sviluppo full-stack con PHP, Laravel, JavaScript e Vue.js, poi ho passato quasi tre anni in validazione software in Reply, testando sistemi di infotainment, connettività e powertrain per clienti automotive.',
    p2: 'Il testing mi ha insegnato a cercare le cause radice e a scrivere software facile da verificare. Ora passo allo sviluppo, con interesse per backend e applicazioni AI, e costruisco progetti miei con le API di OpenAI e Anthropic.',
    skills: [
      ['Front end', ['JavaScript', 'TypeScript', 'Vue.js', 'React', 'Next.js', 'HTML / CSS', 'Bootstrap', 'Tailwind']],
      ['Back end', ['PHP', 'Laravel', 'Node.js', 'Python', 'MySQL', 'PostgreSQL', 'API REST']],
      ['AI e automazione', ['API OpenAI', 'API Anthropic', 'LangGraph', 'n8n', 'Playwright']],
      ['Testing e strumenti', ['Test design', 'Analisi dei difetti', 'pytest', 'Jira', 'Postman', 'Git', 'Docker']],
    ] as [string, string[]][],
    contact: 'Costruiamo qualcosa.',
    contactLead: 'Cerco un ruolo da junior software developer, con interesse per backend e applicazioni AI. Scrivimi o trovami su LinkedIn.',
    email: 'Scrivimi una email',
    github: 'GitHub',
    linkedin: 'LinkedIn',
    top: 'Torna su',
    built: 'Realizzato con Next.js',
  },
};

function useTyped(words: string[]) {
  const [text, setText] = useState(words[0]);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setText(words[0]); return; }
    let w = 0, i = 0, del = false;
    let id: ReturnType<typeof setTimeout>;
    const tick = () => {
      const word = words[w];
      i += del ? -1 : 1;
      setText(word.slice(0, i));
      let wait = del ? 28 : 65;
      if (!del && i === word.length) { del = true; wait = 1600; }
      else if (del && i === 0) { del = false; w = (w + 1) % words.length; wait = 350; }
      id = setTimeout(tick, wait);
    };
    id = setTimeout(tick, 400);
    return () => clearTimeout(id);
  }, [words]);
  return text;
}

const TONES: Record<Project['kind'], string> = { ai: 'sun', web: 'coral', app: 'sea', ui: 'mint' };

function Art({ kind }: { kind: Project['kind'] }) {
  const p = { fill: 'none', stroke: 'currentColor', strokeWidth: 3 } as const;
  if (kind === 'ai') return (
    <svg viewBox="0 0 200 120" aria-hidden="true">{[0, 1, 2, 3, 4].map((i) => <circle key={i} cx={40 + i * 30} cy={60 + (i % 2 ? 22 : -22)} r={10 + i * 3} {...p} />)}</svg>
  );
  if (kind === 'web') return (
    <svg viewBox="0 0 200 120" aria-hidden="true"><rect x="20" y="16" width="160" height="88" rx="10" {...p} /><path d="M20 38h160" {...p} /><circle cx="36" cy="27" r="3" fill="currentColor" /><path d="M44 62h60M44 78h90" {...p} /></svg>
  );
  if (kind === 'app') return (
    <svg viewBox="0 0 200 120" aria-hidden="true"><rect x="70" y="8" width="60" height="104" rx="14" {...p} /><path d="M88 20h24" {...p} /><circle cx="100" cy="92" r="6" {...p} /></svg>
  );
  return (
    <svg viewBox="0 0 200 120" aria-hidden="true">{[0, 1, 2, 3].map((i) => <path key={i} d={`M10 ${30 + i * 24} Q 55 ${10 + i * 24} 100 ${30 + i * 24} T 190 ${30 + i * 24}`} {...p} />)}</svg>
  );
}

function Card({ p, lang }: { p: Project; lang: Lang }) {
  const c = t[lang];
  const [tilt, setTilt] = useState('');
  return (
    <article
      className={`tile ${TONES[p.kind]}`}
      style={{ transform: tilt }}
      onPointerMove={(e) => {
        if (e.pointerType !== 'mouse') return;
        const r = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        setTilt(`perspective(900px) rotateX(${(-y * 4).toFixed(2)}deg) rotateY(${(x * 4).toFixed(2)}deg) scale(1.015)`);
      }}
      onPointerLeave={() => setTilt('')}
    >
      <div className="tile-art"><Art kind={p.kind} /></div>
      <div className="tile-meta"><span>{c.kinds[p.kind]}</span><span>{p.year}</span></div>
      <h3>{p.title}</h3>
      <p className="tag">{p.tag[lang]}</p>
      <p className="sum">{p.summary[lang]}</p>
      <ul className="stack">{p.stack.map((s) => <li key={s}>{s}</li>)}</ul>
      <div className="acts">
        {p.demo && <a className="pill dark" href={p.demo} target="_blank" rel="noopener noreferrer">{c.demo}<i>↗</i></a>}
        {p.repo && <a className="pill ghost" href={p.repo} target="_blank" rel="noopener noreferrer">{c.code}<i>↗</i></a>}
        {p.private && <span className="priv">{c.priv}</span>}
      </div>
    </article>
  );
}

export default function Site() {
  const { lang, setLang } = useLang();
  const c = t[lang];
  const typed = useTyped(c.roles);
  const [filter, setFilter] = useState<'all' | Project['kind']>('all');

  useEffect(() => {
    try {
      const s = localStorage.getItem('theme');
      if (s === 'light' || s === 'dark') document.documentElement.dataset.theme = s;
    } catch {}
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    const dark = root.dataset.theme === 'dark' || (!root.dataset.theme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    const next = dark ? 'light' : 'dark';
    root.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch {}
  };

  const kinds = useMemo(() => Array.from(new Set(projects.map((p) => p.kind))), []);
  const shown = projects.filter((p) => filter === 'all' || p.kind === filter);
  const marquee = useMemo(() => Array.from(new Set(projects.flatMap((p) => p.stack))), []);

  return (
    <>
      <header className="nav">
        <div className="wrap nav-in">
          <a className="logo" href="#top">AC<span>.</span></a>
          <nav className="links" aria-label="Main">
            <a href="#projects">{c.nav[0]}</a>
            <a href="#about">{c.nav[1]}</a>
            <a href="#contact">{c.nav[2]}</a>
          </nav>
          <div className="tools">
            <div className="seg" role="group" aria-label="Language">
              <button aria-pressed={lang === 'en'} onClick={() => setLang('en')}>EN</button>
              <button aria-pressed={lang === 'it'} onClick={() => setLang('it')}>IT</button>
            </div>
            <button className="round" onClick={toggleTheme} aria-label="Toggle theme">◐</button>
          </div>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <WaveField />
          <div className="wrap hero-in">
            <span className="eyebrow">{c.hi}</span>
            <h1>Andrea<br />Cassini<span>.</span></h1>
            <div className="role">{typed}</div>
            <p className="lead">{c.lead}</p>
            <div className="cta">
              <a className="pill sun big" href="#projects">{c.seeWork}<i>↓</i></a>
              <a className="pill outline big" href="#contact">{c.getInTouch}<i>→</i></a>
              <a className="pill outline big" href={CV} target="_blank" rel="noopener noreferrer">{c.cv}<i>↓</i></a>
            </div>
          </div>
        </section>

        <div className="marquee" aria-hidden="true">
          <div className="track">
            {[...marquee, ...marquee].map((s, i) => <span key={i}>{s}<b>✦</b></span>)}
          </div>
        </div>

        <section className="block" id="projects">
          <div className="wrap">
            <div className="sec-head">
              <h2>{c.projects}</h2>
              <span>{c.count(projects.length)}</span>
            </div>
            <div className="filters" role="group" aria-label="Filter">
              <button className="pill ghost" aria-pressed={filter === 'all'} onClick={() => setFilter('all')}>{c.all}</button>
              {kinds.map((k) => (
                <button key={k} className="pill ghost" aria-pressed={filter === k} onClick={() => setFilter(k)}>{c.kinds[k]}</button>
              ))}
            </div>
            <div className="grid">
              {shown.map((p) => <Card key={p.id} p={p} lang={lang} />)}
            </div>
          </div>
        </section>

        <section className="block about-band" id="about">
          <div className="wrap about">
            <div>
              <h2>{c.about}</h2>
              <p>{c.p1}</p>
              <p className="soft">{c.p2}</p>
            </div>
            <div className="skills">
              {c.skills.map(([name, items]) => (
                <div key={name}>
                  <h3>{name}</h3>
                  <ul className="stack big">{items.map((s) => <li key={s}>{s}</li>)}</ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="block contact" id="contact">
          <div className="wrap">
            <h2>{c.contact}</h2>
            <p className="lead">{c.contactLead}</p>
            <div className="cta">
              <a className="pill sun big" href={`mailto:${EMAIL}`}>{c.email}<i>→</i></a>
              <a className="pill big outline" href={LINKEDIN} target="_blank" rel="noopener noreferrer">{c.linkedin}<i>↗</i></a>
              <a className="pill big outline" href="https://github.com/andreacassini" target="_blank" rel="noopener noreferrer">{c.github}<i>↗</i></a>
              <a className="pill big outline" href={CV} target="_blank" rel="noopener noreferrer">{c.cv}<i>↓</i></a>
            </div>
            <p className="addr">{EMAIL}</p>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap foot">
          <span>© {new Date().getFullYear()} Andrea Cassini · {c.built}</span>
          <a href="#top">{c.top} ↑</a>
        </div>
      </footer>
    </>
  );
}
